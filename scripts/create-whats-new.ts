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
        console.log(options);
        this.configure(options);
    }

    public async run() {
        //fail if we already have a document, and we're not forcing
        if (fsExtra.pathExistsSync(this.outputPath) && !this.force) {
            throw new Error(`what's new doc already exists at ${this.outputPath}`);
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

        this.write();
    }

    /**
     * Should the temp dir be deleted before running
     */
    private emptyTempDirOnRun = false;

    private configure(options: RunnerOptions) {
        this.emptyTempDirOnRun = options.noclear === true ? false : true;
        this.force = options.force ?? false;
        this.cwd = s(options.cwd ?? process.cwd());
        this.tempDir = path.resolve(this.cwd, options.tempDir ?? s`${__dirname}/../.tmp/whatsnew`);

        //construct the date range
        const today = new Date();
        const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.getFullYear(), firstDayOfCurrentMonth.getMonth() - 1, 1);
        let monthIndex = monthNames.findIndex(x => x.toLocaleLowerCase().startsWith(options.month?.toString().toLowerCase()));
        if (monthIndex < 0) {
            monthIndex = firstDayOfPreviousMonth.getMonth();
        }
        let year = options.year;
        if (typeof year !== 'number') {
            year = firstDayOfPreviousMonth.getFullYear();
        }

        //build start and end dates so we can do >= startDate && < endDate
        this.startDate = new Date(options.year, monthIndex, 1);
        this.endDate = new Date(options.year, monthIndex + 1, 1);

        this.projects = (options.projects ?? projects).map(x => {
            let project = {
                releases: []
            } as Project;
            if (typeof x === 'string') {
                project.name = x;
                project.repositoryUrl = `https://github.com/RokuCommunity/${project.name}`;
                project.dir = s`${this.tempDir}/${x}`;
            }
            let url = project.repositoryUrl;
            if (!url) {
                project.repositoryUrl = `https://github.com/rokucommunity/${project.name}`;
            }

            return project;
        });

        this.outputPath = s`${__dirname}/../src/pages/whats-new/${this.startDate.getFullYear()}-${this.startDate.getMonth() + 1}-${monthNames[this.startDate.getMonth()]}.mdx`;
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

    private write() {
        let result = [
            `---`,
            `date: ${monthNames[this.startDate.getMonth()]} ${this.startDate.getFullYear()}`,
            `summary: Changes to ${this.projects.filter(x => x.releases.length > 0).map(x => x.name).join(', ')}`,
            `layout: ../../layouts/WhatsNewPost.astro`,
            `---`
        ] as string[];
        fsExtra.outputFileSync(this.outputPath, result.join('\n'));
    }

    /**
     * Find all the releases for a given date range, including the leading and trailing releases that are outside the date range
     */
    private async getReleases(project: Project): Promise<Release[]> {
        this.log(project, `Finding releases between ${dayjs(this.startDate).format('YYYY-MM-DD')} and ${dayjs(this.endDate).format('YYYY-MM-DD')}`);
        /**
         * generates output like:
         *      2022-11-03 16:01:48 -0400  (tag: v0.60.5)
         *      2022-10-28 13:02:25 -0400  (tag: v0.60.4)
         */
        const execResult = await exec('git log --tags --simplify-by-decoration --pretty="format:%ci %d"', { cwd: project.dir });
        //https://regex101.com/r/cGcKUj/2
        const releases = [
            ...execResult.stdout.matchAll(/(\d+-\d+-\d+\s*(?:\d+:\d+:\d+(?:\s*[+-]?\d+))?).*?\(tag:[ \t]*(v.*?)\)/g)
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
        const commitMessages = (await exec(`git log ${startRef}...${endRef} --oneline`, {
            cwd: project?.dir
        })).stdout.toString()
            .split(/\r?\n/g)
            //exclude empty lines
            .filter(x => x.trim())
            .map(x => {
                const [, hash, branchInfo, message, prNumber] = /\s*([a-z0-9]+)\s*(?:\((.*?)\))?\s*(.*?)\s*(?:\(#(\d+)\))?$/gm.exec(x) ?? [];
                return {
                    hash: hash,
                    branchInfo: branchInfo,
                    message: message ?? x,
                    pullRequestId: prNumber
                };
            })
            //exclude version-only commit messages
            .filter(x => !semver.valid(x.message))
            //exclude those "update changelog for..." message
            .filter(x => !x.message.toLowerCase().startsWith('update changelog for '));

        return commitMessages;
    }
}

interface Project {
    name: string;
    repositoryUrl: string;
    dir: string;
    releases: Release[];
}

interface Commit {
    hash: string;
    branchInfo: string;
    message: string;
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
}

const options = yargs(hideBin(process.argv))
    .usage('$0', 'BrighterScript, a superset of Roku\'s BrightScript language')
    .help('help', 'View help information about this tool.')
    .option('projects', { type: 'array', description: 'A list of the projects that will be used for this whats-new page?', default: projects })
    .option('force', { type: 'boolean', description: 'Should the whats-new post be created even if it will overwrite a previous one?', default: false })
    .option('noclear', { type: 'boolean', description: 'Don\'t clear the temp dir (mostly useful for testing)', default: false })
    .option('month', { type: 'string', description: 'The month the post should be generated for' })
    .option('year', { type: 'number', description: 'The year the should be generated for' })
    .argv as unknown as RunnerOptions;

new Runner(options).run().catch((error) => {
    console.error(error);
    process.exit(1);
});

