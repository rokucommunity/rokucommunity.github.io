/**
 * This script automates building the what's new page. It scans for all releases that happened for the prior month. As such, it should only be run in the month AFTER
 * the desired blog post month. (i.e. run November 1-30 to generate for October)
 */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fsExtra from 'fs-extra';
import * as child_process from 'child_process';
import * as util from 'util';
const exec = util.promisify(child_process.exec);
const { execSync } = child_process;
import chalk from 'chalk';
import { standardizePath as s } from 'brighterscript';
import dayjs from 'dayjs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import semver from 'semver';
import { Octokit } from 'octokit';
import * as dotenv from 'dotenv';
import fastGlob from 'fast-glob';
import { undent } from 'undent';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const projects = [
    'vscode-brightscript-language',
    'brighterscript',
    'roku-deploy',
    'roku-debug',
    'brighterscript-formatter',
    'bslint',
    'ropm',
    'roku-report-analyzer',
    'brs',
    //ropm packages
    'promises',
    'roku-image-fader',
    'roku-smart-label',
    'roku-promise',
    'roku-animated-poster',
    'roku-requests'
];

class Runner {
    public cache = new Cache(s`${__dirname}/.cache/${path.basename(__filename)}.json`);

    public async run(
        options: RunnerOptions
    ) {
        this.configure(options);
        options.count--;

        console.log([
            '\n', '-'.repeat(30),
            '\nProcessing ',
            monthNames[this.startDate.getMonth()], ' ', this.startDate.getFullYear(), ', ',
            options.count, ' months remaining\n',
            '-'.repeat(30), '\n'
        ].join(''));

        //load all historic referenced commits up to this point
        this.loadReferencedCommits();

        //fail if we already have a document, and we're not forcing
        if (fsExtra.pathExistsSync(this.outputPath) && !this.force) {
            throw new Error(`what's new doc already exists at ${this.outputPath}. Use --force to overwrite.`);
        }

        console.log('Creating tempDir', this.tempDir);
        if (this.emptyTempDirOnRun) {
            fsExtra.emptyDirSync(this.tempDir);
        }

        for (const project of this.projects) {
            await this.processProject(project);
        }

        await this.write();

        //if a count was specified, generate another month whatsnew
        if (options.count > 0) {
            options.year = undefined;
            options.month = undefined;

            //add over a month to the end date to make sure we're soundly in the NEXT month
            const nextDate = new Date(this.endDate.getTime());
            nextDate.setDate(this.endDate.getDate() + 40);
            options.today = nextDate.toISOString();

            await this.run(options);
        }
    }

    /**
     * Should the temp dir be deleted before running
     */
    private emptyTempDirOnRun = false;

    private octokit: Octokit;

    private configure(options: RunnerOptions) {
        options.count ??= 1;
        options.token ??= process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? process.env.TOKEN;
        if (options.token) {
            console.log('github token was defined. using it!');
        } else {
            console.log('github token was NOT defined');
        }

        this.octokit = new Octokit({
            auth: options.token
        });

        this.emptyTempDirOnRun = options.noclear === true ? false : true;
        this.force = options.force ?? false;
        this.cwd = s(options.cwd ?? process.cwd());
        this.tempDir = path.resolve(this.cwd, options.tempDir ?? s`${__dirname}/../.tmp/whatsnew`);

        this.projects = (options.projects ?? projects).map(x => {
            let project = {
                commits: []
            } as Project;
            if (typeof x === 'string') {
                project.name = x;
                project.repoName = x;
                project.repoOwner = 'RokuCommunity';
                project.repositoryUrl = `https://github.com/RokuCommunity/${project.name}`;
                project.dir = s`${this.tempDir}/${x}`;
            }
            let url = project.repositoryUrl;
            if (!url) {
                project.repositoryUrl = `https://github.com/rokucommunity/${project.name}`;
            }

            return project;
        });

        this.configureDate();

        this.outputPath = s`${__dirname}/../src/pages/whats-new/${this.startDate.getFullYear()}-${(this.startDate.getMonth() + 1).toString().padStart(2, '0')}-${monthNames[this.startDate.getMonth()]}.md`;
    }

    private getFirstDayOfMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    private configureDate() {
        //construct the date range
        let today: Date;
        if (options.today) {
            today = new Date(options.today);
        } else {
            today = new Date();
        }
        console.log('today', today);
        const firstDayOfCurrentMonth = this.getFirstDayOfMonth(today);
        const firstDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.getFullYear(), firstDayOfCurrentMonth.getMonth() - 1, 1);
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        let monthIndex = monthNames.findIndex(x => x.toLocaleLowerCase().startsWith(options.month?.toString().toLowerCase() || undefined));
        if (monthIndex < 0) {
            monthIndex = firstDayOfPreviousMonth.getMonth();
        }
        let year = parseInt(options.year?.toString());
        if (isNaN(year) || typeof year !== 'number') {
            year = firstDayOfPreviousMonth.getFullYear();
        }

        //build start and end dates so we can do >= startDate && < endDate
        this.startDate = new Date(year, monthIndex, 1);
        this.endDate = new Date(year, monthIndex + 1, 1);
    }

    private projects: Project[];
    private force: boolean;
    /**
     * The very first moment of the first day of the month (i.e. 11/1 - 11/31, this value should be 11/1 00:00:00)
     */
    private startDate: Date;
    /**
     * Should be the very first moment of the next day. (i.e. 11/1 - 11/31, this value should be 12/1 00:00:00)
     */
    private endDate: Date;

    /**
     * The path to the whatsnew file that will be created in this script
     */
    private outputPath;

    private cwd = process.cwd();

    private tempDir = s`${__dirname}/../.tmp/whatsnew`;

    private log(project: Project, ...args) {
        console.log(chalk.green(project.name), ...args);
    }

    private async processProject(project: Project) {
        await this.cloneProject(project);
        //get all commits grouped by their release
        project.commits = await this.getCommits(project);
    }

    private async cloneProject(project: Project) {
        const dirExists = await fsExtra.pathExists(project.dir);
        this.log(project, `Cloning ${project.repositoryUrl}${dirExists ? '(skipped)' : ''}`);
        if (!dirExists) {
            await exec(`git clone "${project.repositoryUrl}" "${project.dir}"`);
        }
    }

    private dayMonthYear(date: Date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }

    private async write() {

        const projects = [...this.projects];
        let result: string[] = [];

        const writeCommits = (projectName: string, leadingLineIfNotEmpty?: string) => {
            const lines = [];
            const project = findAndSplice(projects, x => x.name === projectName);
            if (project?.commits?.length > 0 && leadingLineIfNotEmpty) {
                lines.push(leadingLineIfNotEmpty);
            }
            for (const commit of project?.commits ?? []) {
                const date = `${commit.date.getFullYear()}-${(commit.date.getMonth() + 1).toString().padStart(2, '0')}-${commit.date.getDate().toString().padStart(2, '0')}`;
                let refLink = commit.pullRequestId
                    ? `${project.repositoryUrl}/pull/${commit.pullRequestId}`
                    : `([${commit.hash}](${project.repositoryUrl}/commit/${commit.hash}))`;

                lines.push(
                    `## ${commit.title}`,
                    `<!-- ${date} (for ${commit.forRelease.version} released on ${this.dayMonthYear(commit.forRelease.date)}), ${refLink} -->`,
                    '',
                    commit.body ?? '',
                    '',
                    ''
                );
            }
            return lines;
        };

        result.push(
            `---`,
            `date: ${monthNames[this.startDate.getMonth()]} ${this.startDate.getFullYear()}`,
            `summary: Changes to ${this.projects.filter(x => x.commits.length > 0).map(x => x.name).join(', ')}`,
            `layout: ../../layouts/WhatsNewPost.astro`,
            `---`,
            `# Overview`,
            `Welcome to the ${monthNames[this.startDate.getMonth()]} ${this.startDate.getFullYear()} edition of "What's New in RokuCommunity." Please consider <a target="_blank" href="https://rokucommunity.substack.com/">subscribing</a> to stay up to date with what's happening in RokuCommunity.`,
            '',
            undent`
                ## We need your help
                The RokuCommunity projects are maintained by a relatively small group of developers (mostly volunteers), and we have a growing list of unresolved issues. We need your help! There are many different ways you can contribute. Whether it's addressing bugs, improving documentation, introducing new features, or simply helping us manage our expanding list of GitHub issues, your involvement would be greatly appreciated. We are more than happy to guide you in finding the most suitable contribution method that aligns with your interests. To learn more about how you can contribute, feel free to reach out to us on [Slack](https://join.slack.com/t/rokudevelopers/shared_invite/zt-4vw7rg6v-NH46oY7hTktpRIBM_zGvwA), or explore the existing GitHub issues:

                -   [vscode-brightscript-language](https://github.com/rokucommunity/vscode-brightscript-language/issues)
                -   [brighterscript](https://github.com/rokucommunity/brighterscript/issues)
                -   [brighterscript-formatter](https://github.com/rokucommunity/brighterscript-formatter/issues)
                -   [roku-deploy](https://github.com/rokucommunity/roku-deploy/issues)
                -   [roku-debug](https://github.com/rokucommunity/roku-debug/issues)
                -   [bslint](https://github.com/rokucommunity/bslint/issues)
                -   [ropm](https://github.com/rokucommunity/ropm/issues)
                -   [brs](https://github.com/rokucommunity/brs/issues)
                -   [roku-report-analyzer](https://github.com/rokucommunity/roku-report-analyzer/issues)
                -   [@rokucommunity/promises](https://github.com/rokucommunity/promises/issues)
                -   [roku-http](https://github.com/rokucommunity/roku-http)

                ## Issue of the month

                In this section, we highlight a specific issue where we could benefit from the community's assistance in finding a solution. These problems are generally straightforward to address, and serve as an excellent opportunity to become acquainted with the various RokuCommunity codebases.

                This month, we'd like to highlight [SOME_GH_ISSUE](SOME_URL). SOME_DESCRIPTION


                If you're interested in working on this feature, please comment on the [github issue](SOME_LINK) or reach out to us on [Slack](https://join.slack.com/t/rokudevelopers/shared_invite/zt-4vw7rg6v-NH46oY7hTktpRIBM_zGvwA)
            `,
            `# Editor`,
            ...writeCommits('vscode-brightscript-language'),
            ``,
            `# Debugging`,
            ``,
            ...writeCommits('roku-debug'),
            ``,
            `# BrighterScript`,
            ``,
            ...writeCommits('brighterscript'),
            ``,
            `# Community Tools`,
            ``,
            ...writeCommits('bslint', '## bslint'),
            ...writeCommits('brs', '## brs'),
            ...writeCommits('roku-deploy', '## roku-deploy'),
            ...writeCommits('roku-report-analyzer', '# roku-report-analyzer'),
            ...writeCommits('ropm', '## ropm'),
            ``,
            `# Community Libraries`,
            ``,
            ...writeCommits('roku-promise', '## roku-promise'),
            ...writeCommits('promises', '## promises'),
            ...writeCommits('roku-image-fader', '## roku-image-fader'),
            ...writeCommits('roku-smart-label', '## roku-smart-label'),
            ...writeCommits('roku-animated-poster', '## roku-animated-poster'),
            ...writeCommits('roku-requests', '## roku-requests'),
            ``,
            `# Formatting`,
            ``,
            ...writeCommits('brighterscript-formatter'),
            ``,
            `# Preview features`,
            '<!-- any alpha/beta changes across all projects should be documented here and not in their primary area above-->',
            ``,
            `# Documentation`,
            ``,
            `# Misc`,
            ``,
            `# For Contributors`,
            ``,
            `***`,
            ``,
            `# TODO`,
            `***Move these items to an appropriate section above, then delete this section***`,
            ...projects.flatMap(x => writeCommits(x.name)),
            '',
            '***',
            '',
            '# Thank you\n',
            `Last but certainly not least, a big **_Thank You_** to the following people who contributed this month:`
        );

        //contributions list
        for (const project of this.projects) {
            //skip projects that had no releases this month
            if (project.commits.length === 0) {
                continue;
            }
            result.push('', `Contributions to [${project.name}](${project.repositoryUrl}):\n`);
            for (const [, commits] of this.groupCommitsByUser(project)) {
                const { author } = commits[0];
                result.push(`-   [@${author.username} (${author.name})](${author.profileUrl})`);
                for (const commit of commits) {
                    result.push(
                        '    -   ' + (
                            commit.pullRequestId
                                ? `${commit.title} ([PR #${commit.pullRequestId}](${project.repositoryUrl}/pull/${commit.pullRequestId}))`
                                : `${commit.title} ([${commit.hash}](${project.repositoryUrl}/commit/${commit.hash}))`
                        )
                    );
                }
            }
        }
        await fsExtra.outputFile(this.outputPath, result.join('\n'));
    }

    private groupCommitsByUser(project: Project) {
        const commits = [...project.commits];
        //pre-create the results list sorted alphabetically by username
        const result = new Map<string, Commit[]>(
            commits.map(x => x?.author.username?.toLowerCase() ?? '').sort().map(x => [x, []])
        );
        //group the commits by email address
        while (commits.length > 0) {
            const commit = commits.shift();
            const username = commit.author.username.toLowerCase();
            if (!result.has(username)) {
                result.set(username, []);
            }
            result.get(username).push(commit);
        }
        return result;
    }

    /**
     * Find all the releases for a given date range, including the leading and trailing releases that are outside the date range
     */
    private async getCommits(project: Project): Promise<Commit[]> {
        this.log(project, `Finding releases between ${dayjs(this.startDate).format('YYYY-MM-DD')} and ${dayjs(this.endDate).format('YYYY-MM-DD')} `);
        /**
         * generates output like:
         *      2022-11-03 16:01:48 -0400  (tag: v0.60.5)
         *      2022-10-28 13:02:25 -0400  (tag: v0.60.4)
         */
        //widen the dates by 2 days to overscan a bit (avoids weird UTC issues)
        const startDateText = dayjs(this.startDate).subtract(2, 'days').format('YYYY-MM-DD');
        const endDateText = dayjs(this.endDate).add(2, 'days').format('YYYY-MM-DD');
        const execResult = this.execSync(
            `git log --tags --simplify-by-decoration --pretty="format:%ci %d" --since="${startDateText}" --until="${endDateText}"`,
            project
        );
        //https://regex101.com/r/cGcKUj/3
        const releases = [
            ...execResult.matchAll(/(\d+-\d+-\d+\s*(?:\d+:\d+:\d+(?:\s*[+-]?\d+))?).*?\(.*\btag:[ \t]*(v.*?)[,)]/g)
        ].map(x => ({
            date: new Date(x[1]),
            version: x[2]
        })).sort((a, b) => a.date.getTime() - b.date.getTime());

        const matchedReleases = releases
            .map((release, index) => {
                return {
                    date: release.date,
                    version: release.version,
                    previousRef: this.getPreviousReleaseTagOrRef(project, release.version),
                    commits: [] as Commit[]
                };

            })
            //only keep releases that happened within the specified range
            .filter(x => x.date >= this.startDate && x.date < this.endDate)
            //discard the v0.0.0-packages releases
            .filter(x => x.version !== 'v0.0.0-packages');

        //if there's no previous release, use the first commit as the baseline for changes in this release
        if (matchedReleases[0] && !matchedReleases[0].previousRef) {
            const execResult2 = await exec('git rev-list --max-parents=0 HEAD', { cwd: project.dir });
            matchedReleases[0].previousRef = execResult2.stdout?.trim();
        }

        //find all commits that were included for all of these releases, and dedupe them by hash
        const commitMap = new Map<string, Commit>();
        for (const release of matchedReleases) {
            this.log(project, `finding commits for ${release.version}`);
            const commits = this.getCommitsForReleaseVersion(project, release, release.previousRef);
            for (const commit of commits) {
                commitMap.set(commit.hash, commit);
            }
        }
        let commits = [...commitMap.values()];

        commits = commits
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            //exclude version-only commit messages
            .filter(x => !semver.valid(x.title))
            //exclude those "update changelog for..." message
            .filter(x => !x.title.toLowerCase().startsWith('update changelog for '))
            //exclude "merge branch 'xyz' of ... messages
            .filter(x => !/\s*merge branch '.*?'/i.test(x.title))
            //exclude dependabot commits
            .filter(x => !x.author?.name?.toLowerCase().includes('dependabot'))
            //exclude commits referenced by previous writeups
            .filter(x => {
                if (this.isReferencedInPreviousWriteup(x, project)) {
                    console.log(`skipping commit because it was referenced in a previous writeup: ${x.hash}`, x.pullRequestId ? `#${x.pullRequestId})` : '');
                    return false;
                }
                return true;
            });

        //enrich each commit
        for (const commit of commits) {
            await this.hydrateCommit(project, commit);
        }
        return commits;
    }

    private execSync(command: string, project: Project) {
        return execSync(command, { cwd: project.dir }).toString();
    }

    /**
     * Find the previous release tag, relative to the current release tag. If no tag found, returns the earliest ref
     * @param project
     * @param releaseTag
     * @returns
     */
    private getPreviousReleaseTagOrRef(project: Project, releaseTag: string) {
        //find the commit where this branch merged from
        let [, mergePointHash] = /^commit\s+([a-z0-9]+)/i.exec(
            this.execSync(`git log master..${releaseTag} --reverse`, project)
        ) ?? [];

        if (!mergePointHash) {
            //look up and use the hash of the first commit in the repo
            mergePointHash = this.execSync('git rev-list --max-parents=0 HEAD --first-parent', project).trim();
        }

        //get only releases found on this branch
        const releases = execSync(
            `git log --no-merges --oneline --first-parent --decorate ${mergePointHash}..${releaseTag}`,
            { cwd: project.dir }
        )
            .toString()
            .split(/[\r\n]/g)
            .map(x => {
                return /.*\btag:[ \t]*(v.*?)[,)]/.exec(x.trim())?.[1];
            })
            .filter(x => !!x && x !== releaseTag)
            //exclude releases called `v0.0.0-packages`
            .filter(x => x !== 'v0.0.0-packages');
        return releases[0] ?? mergePointHash;
    }

    /**
     * Given a release version tag, walk backwards in the commit history until we find the first commit message with a release version with a tag earlier than the start date
     */
    private getCommitsForReleaseVersion(project: Project, release: Release, previousRef: string) {
        const command = `git log ${previousRef}..${release.version} --pretty=format:"%h%x09%ad%x09%an%x09%d%x09%s" --decorate=short`;
        const execResult = this.execSync(command, project);
        const commits = execResult.split(/\r?\n/g).map(x => {
            let [hash, date, authorName, refs, title] = x.split('\t');
            const pullRequestId = /\(#(\d+)\)\s*$/.exec(title)?.[1];
            title = title.replace(/\(#(\d+)\)/, '').trim();
            return {
                hash: hash,
                date: new Date(date),
                author: {
                    name: authorName
                } as Commit['author'],
                tag: /.*\btag:[ \t]*(v.*?)[,)]/.exec(refs)?.[1],
                title: title,
                pullRequestId: parseInt(pullRequestId),
                forRelease: release
            } as Commit;
            //sort by date descending
        }).sort((a, b) => b.date.getTime() - a.date.getTime());
        return commits;
    }

    private async hydrateCommit(project: Project, commit: Commit) {
        try {
            //load info about this commit
            let githubCommit = await this.cache.getOrAdd([project.repositoryUrl, 'commits', commit.hash], async () => {
                this.log(project, `Hydrating ${commit.hash} commit info (from github.com)`);

                return (await this.octokit.rest.repos.getCommit({
                    repo: project.repoName,
                    owner: project.repoOwner,
                    ref: commit.hash
                })).data;

            }, () => this.log(project, `Hydrating ${commit.hash} commit info (from cache)`));

            commit.author = {
                email: githubCommit.author?.email,
                name: githubCommit.commit?.author?.name,
                profileUrl: githubCommit.author?.html_url,
                username: githubCommit.author?.login
            };
        } catch (e) {
            console.error(e);
        }

        //fetch pull request info (if available)
        if (commit.pullRequestId) {
            try {
                const prData = await this.cache.getOrAdd([project.repositoryUrl, 'pullRequests', commit.pullRequestId.toString()], async () => {
                    this.log(project, `Hydrating PR #${commit.pullRequestId} info (from github.com)`);

                    return (await this.octokit.rest.pulls.get({
                        repo: project.repoName,
                        owner: project.repoOwner,
                        pull_number: commit.pullRequestId
                    })).data;

                }, () => this.log(project, `Hydrating PR #${commit.pullRequestId} info (from cache)`));
                commit.body = prData.body;
                commit.title = prData.title;
            } catch (e) {
                console.error(e);
            }
        }

        // write the cache after every read so we don't annoy the github api
        this.cache.write();
    }

    /**
     * look through all previous writeups to see if this commit was already mentioned
     * @param commit
     * @param projectName
     */
    private isReferencedInPreviousWriteup(commit: Commit, project: Project) {
        // this is a PR
        if (commit.pullRequestId) {
            return this.refs.has(
                `${project.repositoryUrl}/pull/${commit.pullRequestId}`
            );

            //this is a commit hash
        } else {
            return this.refs.has(
                `${project.repositoryUrl}/commit/${commit.hash}`
            );
        }
    }

    /**
     * As list of every ref that we've used in previous writeups
     */
    private refs = new Set<string>();

    /**
     * A list of writeups that we've already processed for loading previously-used refs
     */
    private processedWriteups = new Set<string>();

    /**
     * Load all the commits listed in each "#thanks" block for each month. This will help us filter already-documented commits
     */
    private loadReferencedCommits() {
        const files = fastGlob.sync('**/*.md', {
            cwd: `${__dirname}/../src/pages/whats-new`,
            absolute: true
        }).sort();
        for (const file of files) {
            const [, year, month] = /(\d\d\d\d)-(\d\d)/.exec(path.basename(file)) ?? [];
            //skip this file if we couldn't parse the file format
            if (!year || !month) {
                continue;
            }

            //set the date to the 3rd of the month so it definitely falls within the current date range if on same month
            const fileDate = new Date(parseInt(year), parseInt(month) - 1, 3);
            //TODO skip the rest of the files this file if it's during or after the current time range.
            if (fileDate > this.startDate && fileDate < this.endDate) {
                break;
            }

            //skip this file if it has already been loaded
            if (this.processedWriteups.has(file)) {
                continue;
            }
            this.processedWriteups.add(file);

            console.log(`Loading referenced commits from ${path.basename(file)}`);

            const contents = fsExtra.readFileSync(file).toString();

            let lines = contents.split(/\r?\n/g);
            //walk up from the bottom to find the final # Thank You section. throw away everything above
            for (let i = lines.length - 1; i >= 0; i--) {
                if (/^\s*#\s*Thank\s+you/g.test(lines[i])) {
                    lines.splice(0, i);
                    break;
                }
            }
            lines = lines
                .map(x => x.trim())
                //remove empty lines
                .filter(x => x !== '')
                //remove author lines
                .filter(x => !/^-\s*\[@/.test(x));

            let project: Project;
            for (const line of lines) {
                //grab the project name
                const [, projectName] = /contributions to \[(.*)\]/i.exec(line) ?? [];
                if (projectName) {
                    project = this.projects.find(x => x.name === projectName);
                    //this line only contains project name info so skip to next line
                    continue;
                }
                //move to next line if we don't have a project
                if (!project) {
                    continue;
                }
                //grab the PR number or commit hash
                const ref = (
                    /\(\[((?:PR\s+#)?.+?)\]\(/.exec(line)?.[1] ?? ''
                ).trim();
                if (!ref) {
                    continue;
                }
                // this is a PR
                if (ref.startsWith('PR')) {
                    this.refs.add(`${project.repositoryUrl}/pull/${ref.replace(/^\s*PR\s*\#/i, '')}`);

                    //this is a commit hash
                } else {
                    this.refs.add(`${project.repositoryUrl}/commit/${ref}`);
                }
            }
        }
    }
}

class Cache {
    constructor(
        private path: string
    ) {
        this.load();
    }

    public get<R = any>(keys: string[]) {
        keys = [...keys ?? []];
        let value: any = this.data;
        while (keys.length > 0) {
            value = value[keys.shift()];
            if (value === undefined) {
                return value;
            }
        }
        return value as R;
    }

    public has(keys: string[]) {
        return !!this.get(keys);
    }

    public async getOrAdd<T>(keys: string[], factory: () => T | Promise<T>, cacheHitCallback?: () => void) {
        let value = this.get(keys);
        if (!value) {
            value = this.set(keys, Promise.resolve(factory()));
            try {
                //once the promise has finished loading, write the raw value
                this.set(keys, await value);
            } catch (e) {
                this.delete(keys);
                throw e;
            }
        } else {
            cacheHitCallback?.();
        }
        return value as T;
    }

    private set<T = any>(keys: string[], value: T | Promise<T>) {
        let data: any = this.data;
        //build the structure
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!data[key]) {
                data[key] = {};
            }
            data = data[key];
        }
        data[keys[keys.length - 1]] = value;
        return value;
    }

    private delete<T = any>(keys: string[]) {
        let data: any = this.data;
        //build the structure
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!data[key]) {
                data[key] = {};
            }
            data = data[key];
        }
        delete data[keys[keys.length - 1]];
    }


    private data: Record<string, any>;

    public load() {
        try {
            this.data = fsExtra.readJsonSync(this.path);
        } catch {
            this.data = {};
        }
    }

    public write() {
        fsExtra.outputJsonSync(this.path, this.data, {
            spaces: 4
        });
    }
}

interface Project {
    name: string;
    repositoryUrl: string;
    repoOwner: string;
    repoName: string;
    dir: string;
    commits: Commit[];
}

interface Release {
    date: Date;
    version: string;
    previousRef: string;
    commits: Commit[];
}

interface Commit {
    hash: string;
    title: string;
    /**
     * If available, the body of the PR this commit was associated with. This helps us prepopulate descriptions of the various
     * commits instead of needing to manually copy/paste them from github
     */
    body?: string;
    date: Date;
    author: {
        name: string;
        username: string;
        email: string;
        profileUrl: string;
    };
    /**
     * The ID of the pull request on github
     */
    pullRequestId: number;
    /**
     * The value of a tag on the commit (if it has one)
     */
    tag?: string;
    /**
     * What release was this commit attached to? (i.e. we asked for all commits that composed v1.2.3, so this would be the release object for v1.2.3)
     */
    forRelease?: Release;
}

interface RunnerOptions {
    cwd?: string;
    tempDir?: string;
    projects?: string[];
    force?: boolean;
    year?: number;
    month?: number | string;
    count?: number;
    noclear?: boolean;
    today?: string;
    token?: string;
}

/**
 * Find an item in an array, and return it and splice it out of the array if found.
 * @param list
 * @param cb
 * @returns
 */
function findAndSplice<T>(list: T[], cb: (x: T) => boolean | undefined) {
    const index = list.findIndex(cb);
    if (index > -1) {
        return list.splice(index, 1)?.[0];
    }
}

const options = yargs(hideBin(process.argv))
    .usage('$0', 'Generate a series of whats-new pages based on the community tools commit history')
    .help('help', 'View help information about this tool.')
    .option('projects', { type: 'array', description: 'A list of the projects that will be used for this whats-new page?', default: projects })
    .option('force', { type: 'boolean', description: 'Should the whats-new post be created even if it will overwrite a previous one?', default: false })
    .option('noclear', { type: 'boolean', description: 'Don\'t clear the temp dir (mostly useful for testing)', default: false })
    .option('month', { type: 'string', description: 'The month the post should be generated for' })
    .option('year', { type: 'number', description: 'The year the should be generated for' })
    .option('count', { type: 'number', description: 'Number of months that should be generated starting at the supplied month and year' })
    .option('today', { type: 'string', description: 'A string used to construct a new new date, used for any `today` variables' })
    .option('token', { type: 'string', description: 'A github auth token that can be used to help work around rate limits' })
    .argv as unknown as RunnerOptions;

const runner = new Runner();
runner.run(options).catch((error) => {
    console.error(error);
    process.exit(1);
}).finally(() => {
    //write the cache to help with performance in the future
    runner.cache.write();
});
