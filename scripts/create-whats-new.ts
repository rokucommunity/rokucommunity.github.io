/**
 * This script automates building the what's new page. It scans for all releases that happened for the prior month. As such, it should only be run in the month AFTER
 * the desired blog post month. (i.e. run November 1-30 to generate for October)
 */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fsExtra from 'fs-extra';
import * as childProcess from 'child_process';
import * as util from 'util';
const exec = util.promisify(childProcess.exec);
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
    'roku-promise'
];

class Runner {
    constructor(
        options: RunnerOptions
    ) {
        this.configure(options);
    }

    public cache = new Cache(s`${__dirname}/.cache/${path.basename(__filename)}.json`);

    public async run() {
        //fail if we already have a document, and we're not forcing
        if (fsExtra.pathExistsSync(this.outputPath) && !this.force) {
            throw new Error(`what's new doc already exists at ${this.outputPath}. Use --force to overwrite.`);
        }

        console.log('Creating tempDir', this.tempDir);
        if (this.emptyTempDirOnRun) {
            fsExtra.emptyDirSync(this.tempDir);
        }

        // await Promise.all(
        //     this.projects.map(async project => {
        for (const project of this.projects) {
            await this.processProject(project);
        }
        //     })
        // );

        await this.write();
    }

    /**
     * Should the temp dir be deleted before running
     */
    private emptyTempDirOnRun = false;

    private octokit: Octokit;

    private configure(options: RunnerOptions) {
        options.token ??= process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? process.env.TOKEN;
        if (options.token) {
            console.log('github token was defined. using it!');
        } else {
            console.log('github token was NOT defined');
        }
        //exit early just because I want to know if the token is defined
        process.exit(1);

        this.octokit = new Octokit({
            auth: options.token
        });

        this.emptyTempDirOnRun = options.noclear === true ? false : true;
        this.force = options.force ?? false;
        this.cwd = s(options.cwd ?? process.cwd());
        this.tempDir = path.resolve(this.cwd, options.tempDir ?? s`${__dirname}/../.tmp/whatsnew`);

        //construct the date range
        let today: Date;
        if (options.today) {
            today = new Date(options.today);
        } else {
            today = new Date();
        }
        console.log('today', today);
        const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
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

        this.projects = (options.projects ?? projects).map(x => {
            let project = {
                releases: []
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

        this.outputPath = s`${__dirname}/../src/pages/whats-new/${this.startDate.getFullYear()}-${(this.startDate.getMonth() + 1).toString().padStart(2, '0')}-${monthNames[this.startDate.getMonth()]}.md`;
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
        project.releases = await this.getReleases(project);
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
            `summary: Changes to ${this.projects.filter(x => x.releases.length > 0).map(x => x.name).join(', ')}`,
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
                return project.releases.map(release => {
                    return release.commits.map(commit => {
                        if (commit.pullRequestId) {
                            return `${project.name}: ${commit.message} ([#${commit.pullRequestId}](${project.repositoryUrl}/pull/${commit.pullRequestId}))`;
                        } else {
                            return `${project.name}: ${commit.message} ([${commit.ref}](${project.repositoryUrl}/commit/${commit.ref}))`;
                        }
                    });
                });
            }).flat().flat().map(x => ` - ${x}`)
        ] as string[];

        result.push(
            '',
            '# Thank you',
            `Last but certainly not least, a big ***Thank You*** to the following people who contributed this month:`
        );
        for (const project of this.projects) {
            //skip projects that had no releases this month
            if (project.releases.length === 0) {
                continue;
            }
            result.push('', `Contributions to [${project.name}](${project.repositoryUrl}):`);
            for (const [, commits] of this.groupCommitsByUser(project)) {
                const { author } = commits[0];
                result.push(` - [@${author.username} (${author.name})](${author.profileUrl})`);
                for (const commit of commits) {
                    result.push(
                        '    - ' + (
                            commit.pullRequestId
                                ? `${commit.message} ([PR #${commit.pullRequestId}](${project.repositoryUrl}/pull/${commit.pullRequestId}))`
                                : `${commit.message} ([${commit.ref}](${project.repositoryUrl}/commit/${commit.ref}))`
                        )
                    );
                }
            }
        }
        await fsExtra.outputFile(this.outputPath, result.join('\n'));
    }

    private groupCommitsByUser(project: Project) {
        const result = new Map<string, Commit[]>();
        for (const release of project.releases) {
            const commits = [...release.commits];
            //group the commits by email address
            while (commits.length > 0) {
                const commit = commits.shift();
                const username = commit.author.username.toLowerCase();
                if (!result.has(username)) {
                    result.set(username, []);
                }
                result.get(username).push(commit);
            }
        }
        return result;
    }

    /**
     * Find all the releases for a given date range, including the leading and trailing releases that are outside the date range
     */
    private async getReleases(project: Project): Promise<Release[]> {
        this.log(project, `Finding releases between ${dayjs(this.startDate).format('YYYY-MM-DD')
            } and ${dayjs(this.endDate).format('YYYY-MM-DD')} `);
        /**
         * generates output like:
         *      2022-11-03 16:01:48 -0400  (tag: v0.60.5)
         *      2022-10-28 13:02:25 -0400  (tag: v0.60.4)
         */
        const execResult = await exec('git log --tags --simplify-by-decoration --pretty="format:%ci %d"', { cwd: project.dir });
        //https://regex101.com/r/cGcKUj/3
        const releases = [
            ...execResult.stdout.matchAll(/(\d+-\d+-\d+\s*(?:\d+:\d+:\d+(?:\s*[+-]?\d+))?).*?\(.*\btag:[ \t]*(v.*?)[,)]/g)
        ].map(x => ({
            date: new Date(x[1]),
            version: x[2]
        })).sort((a, b) => a.date.getTime() - b.date.getTime());

        const matchedReleases = releases.map((release, index) => {
            return {
                date: release.date,
                version: release.version,
                previousRef: releases[index - 1]?.version,
                commits: [] as Commit[]
            };
        }).filter(x => {
            //only keep releases that happened within the specified range
            return x.date >= this.startDate && x.date < this.endDate;
        });
        //if there's no leading release, use the first commit as the baseline for changes in this release
        if (matchedReleases[0] && !matchedReleases[0].previousRef) {
            const execResult2 = await exec('git rev-list --max-parents=0 HEAD', { cwd: project.dir });
            matchedReleases[0].previousRef = execResult2.stdout?.trim();
        }
        for (const release of matchedReleases) {
            this.log(project, `finding commits for ${release.version}`);
            release.commits = await this.getCommits(project, release.previousRef, release.version);
        }
        return matchedReleases;
    }

    private async getCommits(project: Project, startRef: string, endRef: string): Promise<Commit[]> {
        const commits = (await exec(`git log ${startRef}...${endRef} --oneline`, {
            cwd: project?.dir
        })).stdout.toString()
            .split(/\r?\n/g)
            //exclude empty lines
            .filter(x => x.trim())
            .map(x => {
                const [, ref, branchInfo, message, prNumber] = /\s*([a-z0-9]+)\s*(?:\((.*?)\))?\s*(.*?)\s*(?:\(#(\d+)\))?$/gm.exec(x) ?? [];
                return {
                    ref: ref,
                    branchInfo: branchInfo,
                    message: message ?? x,
                    pullRequestId: prNumber,
                    author: undefined as Commit['author']
                };
            })
            //exclude version-only commit messages
            .filter(x => !semver.valid(x.message))
            //exclude those "update changelog for..." message
            .filter(x => !x.message.toLowerCase().startsWith('update changelog for '));

        //hydrate with author info
        for (const commit of commits) {
            await this.hydrateCommit(project, commit);
            // {
            //     name: 'Bronley Plumb',
            //     email: 'bronley@gmail.com',
            //     username: 'TwitchBronBron',
            //     profileUrl: 'https://github.com/TwitchBronBron'
            // }
        }
        return commits;
    }

    private async hydrateCommit(project: Project, commit: Commit) {
        this.log(project, `Hydrating #${commit.ref}`);
        //load info about this commit
        const githubCommit = await this.cache.getOrAdd([project.repositoryUrl, 'commits', commit.ref], async () => {
            return (await this.octokit.rest.repos.getCommit({
                repo: project.repoName,
                owner: project.repoOwner,
                ref: commit.ref
            })).data;
        });
        //temporarily write the cache after every read so we don't annoy the github api
        this.cache.write();
        commit.author = {
            email: githubCommit.author.email,
            name: githubCommit.commit.author.name,
            profileUrl: githubCommit.author.html_url,
            username: githubCommit.author.login
        };
    }
}

class Cache {
    constructor(
        private path: string
    ) {
        this.load();
    }

    private get(keys: string[]) {
        keys = [...keys ?? []];
        let value: any = this.data;
        while (keys.length > 0) {
            value = value[keys.shift()];
            if (value === undefined) {
                return value;
            }
        }
        return value;
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
    releases: Release[];
}

interface Commit {
    ref: string;
    branchInfo: string;
    message: string;
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
    .option('today', { type: 'string', description: 'A string used to construct a new new date, used for any `today` variables' })
    .option('token', { type: 'string', description: 'A github auth token that can be used to help work around rate limits' })
    .argv as unknown as RunnerOptions;

const runner = new Runner(options);
runner.run().catch((error) => {
    console.error(error);
    process.exit(1);
}).finally(() => {
    //write the cache to help with performance in the future
    runner.cache.write();
});
