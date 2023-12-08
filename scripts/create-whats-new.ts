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
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const projects = [
    'vscode-brightscript-language',
    'brighterscript',
    'roku-deploy',
    'logger',
    'bslib',
    'roku-debug',
    'brighterscript-formatter',
    'bslint',
    'ropm',
    'roku-report-analyzer',
    'roku-promise',
    'brs'
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

    private async write() {
        let result = [
            `---`,
            `date: ${monthNames[this.startDate.getMonth()]} ${this.startDate.getFullYear()}`,
            `summary: Changes to ${this.projects.filter(x => x.commits.length > 0).map(x => x.name).join(', ')}`,
            `layout: ../../layouts/WhatsNewPost.astro`,
            `---`,
            `# Overview`,
            ``,
            `# Editor`,
            ``,
            `# Debugging`,
            ``,
            `# Formatting`,
            ``,
            `# Language Features`,
            ``,
            `# BrighterScript`,
            ``,
            `# Preview features`,
            ``,
            `# Documentation`,
            ``,
            `# Misc`,
            ``,
            `# For Contributors`,
            ``,
            `# TODO`,
            `***Move the items in this list to the appropriate section above, then delete this section***`,
            ...this.projects.map(project => {
                return project.commits.map(commit => {
                    const date = `${commit.date.getFullYear()}-${(commit.date.getMonth() + 1).toString().padStart(2, '0')}-${commit.date.getDate().toString().padStart(2, '0')}`;
                    if (commit.pullRequestId) {
                        return `${project.name} (${date}): ${commit.message} ([#${commit.pullRequestId}](${project.repositoryUrl}/pull/${commit.pullRequestId}))`;
                    } else {
                        return `${project.name} (${date}): ${commit.message} ([${commit.hash}](${project.repositoryUrl}/commit/${commit.hash}))`;
                    }
                });
            }).flat().flat().map(x => ` - ${x}`)
        ] as string[];

        result.push(
            '',
            '# Thank you\n',
            `Last but certainly not least, a big **_Thank You_** to the following people who contributed this month:`
        );
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
                                ? `${commit.message} ([PR #${commit.pullRequestId}](${project.repositoryUrl}/pull/${commit.pullRequestId}))`
                                : `${commit.message} ([${commit.hash}](${project.repositoryUrl}/commit/${commit.hash}))`
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
            commits.map(x => x.author.username.toLowerCase()).sort().map(x => [x, []])
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

        const matchedReleases = releases.map((release, index) => {
            return {
                date: release.date,
                version: release.version,
                previousRef: this.getPreviousReleaseTagOrRef(project, release.version),
                commits: [] as Commit[]
            };

            //only keep releases that happened within the specified range
        }).filter(x => x.date >= this.startDate && x.date < this.endDate);

        //if there's no previous release, use the first commit as the baseline for changes in this release
        if (matchedReleases[0] && !matchedReleases[0].previousRef) {
            const execResult2 = await exec('git rev-list --max-parents=0 HEAD', { cwd: project.dir });
            matchedReleases[0].previousRef = execResult2.stdout?.trim();
        }

        //find all commits that were included for all of these releases, and dedupe them by hash
        const commitMap = new Map<string, Commit>();
        for (const release of matchedReleases) {
            this.log(project, `finding commits for ${release.version}`);
            for (const commit of this.getCommitsForReleaseVersion(project, release.version, release.previousRef)) {
                commitMap.set(commit.hash, commit);
            }
        }
        let commits = [...commitMap.values()];

        commits = commits
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            //exclude version-only commit messages
            .filter(x => !semver.valid(x.message))
            //exclude those "update changelog for..." message
            .filter(x => !x.message.toLowerCase().startsWith('update changelog for '))
            //exclude "merge branch 'xyz' of ... messages
            .filter(x => !/\s*merge branch '.*?'/i.test(x.message))
            //exclude dependabot commits
            .filter(x => !x.author?.name?.toLowerCase().includes('dependabot'));

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
        ).toString().split(/[\r\n]/g).map(x => {
            return /.*\btag:[ \t]*(v.*?)[,)]/.exec(x.trim())?.[1];
        }).filter(x => !!x && x !== releaseTag);
        return releases[0] ?? mergePointHash;
    }

    /**
     * Given a release version tag, walk backwards in the commit history until we find the first commit message with a release version with a tag earlier than the start date
     */
    private getCommitsForReleaseVersion(project: Project, releaseTag: string, previousRef: string) {
        const command = `git log ${previousRef}..${releaseTag} --pretty=format:"%h%x09%ad%x09%an%x09%d%x09%s" --decorate=short`;
        const execResult = this.execSync(command, project);
        const commits = execResult.split(/\r?\n/g).map(x => {
            let [hash, date, authorName, refs, message] = x.split('\t');
            const pullRequestId = /\(#(\d+)\)/.exec(message)?.[1];
            message = message.replace(/\(#(\d+)\)/, '').trim();
            return {
                hash: hash,
                date: new Date(date),
                author: {
                    name: authorName
                } as Commit['author'],
                tag: /.*\btag:[ \t]*(v.*?)[,)]/.exec(refs)?.[1],
                message: message,
                pullRequestId: pullRequestId
            } as Commit;
            //sort by date descending
        }).sort((a, b) => b.date.getTime() - a.date.getTime());

        // find the release that occurred right before the first release in this month
        for (let i = 0; i < commits.length; i++) {
            let commit = commits[i];

            //this commit date is earlier than this month's start date, and it has a tag. we found it!
            if (commit.date < this.startDate && commit.tag) {
                const result = commits.slice(0, i);
                return result;
            }
        }
        //we didn't find a release...so assume ALL the commits were part of a release found within the date range
        return commits;
    }


    private async hydrateCommit(project: Project, commit: Commit) {
        const keys = [project.repositoryUrl, 'commits', commit.hash];
        let githubCommit: Awaited<ReturnType<Octokit['rest']['repos']['getCommit']>>['data'];
        //load info about this commit
        if (this.cache.has(keys)) {
            this.log(project, `Hydrating #${commit.hash} (from cache)`);
            githubCommit = this.cache.get(keys);
        } else {
            this.log(project, `Hydrating #${commit.hash} (from github.com)`);
            githubCommit = await this.cache.getOrAdd([project.repositoryUrl, 'commits', commit.hash], async () => {
                return (await this.octokit.rest.repos.getCommit({
                    repo: project.repoName,
                    owner: project.repoOwner,
                    ref: commit.hash
                })).data;
            });
        }
        //temporarily write the cache after every read so we don't annoy the github api
        this.cache.write();
        commit.author = {
            email: githubCommit.author?.email,
            name: githubCommit.commit.author?.name,
            profileUrl: githubCommit.author?.html_url,
            username: githubCommit.author?.login
        };
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

    public async getOrAdd<T>(keys: string[], factory: () => T | Promise<T>) {
        let value = this.get(keys);
        if (!value) {
            value = this.set(keys, Promise.resolve(factory()));
            //once the promise has finished loading, write the raw value
            this.set(keys, await value);
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

interface Commit {
    hash: string;
    message: string;
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
    pullRequestId: string;
    /**
     * The value of a tag on the commit (if it has one)
     */
    tag?: string;
}

interface Release {
    date: Date;
    version: string;
    previousRef: string;
    commits: Commit[];
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

const options = yargs(hideBin(process.argv))
    .usage('$0', 'BrighterScript, a superset of Roku\'s BrightScript language')
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
