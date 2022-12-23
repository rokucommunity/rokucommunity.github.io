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
import * as path from 'path';
import { fileURLToPath } from 'url';
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
] as Array<Project | string>;

class Runner {
    constructor(
        options: RunnerOptions
    ) {
        console.log(options);
        Object.assign(this, options);
        this.startDate = new Date(options.year, options.month, 1);
        this.endDate = new Date(options.year, options.month + 1, 1);
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
    private get outputPath() {
        return path.normalize(
            path.join(__dirname, `../src/pages/whats-new/${this.startDate.getFullYear()}-${this.startDate.getMonth() + 1}-${monthNames[this.startDate.getMonth()]}.mdx`)
        );
    }

    private tempDir = path.normalize(path.join(__dirname, '/../.tmp/whatsnew'));

    public async run() {
        //fail if we already have a document, and we're not forcing
        if (fsExtra.pathExistsSync(this.outputPath) && !this.force) {
            throw new Error(`what's new doc already exists at ${this.outputPath}`);
        }

        console.log('Creating tempDir', this.tempDir);
        fsExtra.emptyDirSync(this.tempDir);

        // await Promise.all(
        //     this.projects.map(async project => {
        for (const project of this.projects) {
            await this.processProject(project);
        }
        //     })
        // );

        this.write();
    }

    private write() {
        let result = [
            `---`,
            `date: ${monthNames[this.startDate.getMonth()]} ${this.startDate.getFullYear()}`,
            `summary: Changes to ${this.projects.filter(x => x.changes.length > 0).map(x => x.name).join(', ')}`,
            `layout: ../../layouts/WhatsNewPost.astro`,
            `---`
        ] as string[];
        fsExtra.outputFileSync(this.outputPath, result.join('\n'));
    }

    /**
     * Find the year-month-day of the specified release from git logs
     */
    private async getReleasesForDateRange(cwd: string, startDate: Date, endDate: Date) {
        /**
         * generates output like:
         *      2022-11-03 16:01:48 -0400  (tag: v0.60.5)
         *      2022-10-28 13:02:25 -0400  (tag: v0.60.4)
         */
        const execResult = await exec('git log --tags --simplify-by-decoration --pretty="format:%ci %d"', { cwd: cwd });
        //https://regex101.com/r/cGcKUj/2
        const result = [
            ...execResult.stdout.matchAll(/(\d+-\d+-\d+\s*(?:\d+:\d+:\d+(?:\s*[+-]?\d+))?).*?\(tag:[ \t]*(v.*?)\)/g)
        ].map(x => ({
            date: new Date(x[1]),
            version: x[2]
        })).filter(x => {
            //only keep releases that happened within the specified range
            return x.date >= startDate && x.date < endDate;
        });
        return result;
    }

    // private async getCommitLogs(projectName: string, startVersion: string, endVersion: string) {
    //     startVersion = startVersion.startsWith('v') ? startVersion : 'v' + startVersion;
    //     endVersion = endVersion.startsWith('v') || endVersion === 'HEAD' ? endVersion : 'v' + endVersion;
    //     const project = this.getProject(projectName);
    //     const commitMessages = (await exec(`git log ${startVersion}...${endVersion} --oneline`, {
    //         cwd: project?.dir
    //     })).toString()
    //         .split(/\r?\n/g)
    //         //exclude empty lines
    //         .filter(x => x.trim())
    //         .map(x => {
    //             const [, hash, branchInfo, message, prNumber] = /\s*([a-z0-9]+)\s*(?:\((.*?)\))?\s*(.*?)\s*(?:\(#(\d+)\))?$/gm.exec(x) ?? [];
    //             return {
    //                 hash: hash,
    //                 branchInfo: branchInfo,
    //                 message: message ?? x,
    //                 prNumber: prNumber
    //             };
    //         })
    //         //exclude version-only commit messages
    //         .filter(x => !semver.valid(x.message))
    //         //exclude those "update changelog for..." message
    //         .filter(x => !x.message.toLowerCase().startsWith('update changelog for '));


    //     return commitMessages;
    // }

    private async processProject(project: Project) {
        await this.cloneProject(project);
        //get a list of all releases
        const releases = await this.getReleasesForDateRange(project.dir, this.startDate, this.endDate);
        console.log(releases);
    }

    private async cloneProject(project: Project) {
        const repoName = project.name.split('/').pop();

        let url = project.repositoryUrl;
        if (!url) {
            url = `https://github.com/rokucommunity/${repoName}`;
        }

        //clone the project
        project.dir = `${this.tempDir}/${repoName}`;
        console.log(`Cloning ${url} `);
        await exec(`git clone "${url}" "${project.dir}"`);
    }
}

interface Project {
    name: string;
    repositoryUrl: string;
    dir: string;
    changes: [];
}

interface Commit {
    hash: string;
    branchInfo: string;
    message: string;
    prNumber: string;
}

interface RunnerOptions {
    projects: string[];
    force: boolean;
    year: number;
    month: number;
}

const options = yargs(hideBin(process.argv))
    .usage('$0', 'BrighterScript, a superset of Roku\'s BrightScript language')
    .help('help', 'View help information about this tool.')
    .option('force', { type: 'boolean', description: 'Should the whats-new post be created even if it will overwrite a previous one?', default: false })
    .option('month', { type: 'number', description: 'The month the post should be generated for' })
    .option('year', { type: 'number', description: 'The year the should be generated for' })
    .check((argv: any) => {
        const today = new Date();
        const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.getFullYear(), firstDayOfCurrentMonth.getMonth() - 1, 1);
        if (typeof argv.month !== 'number') {
            argv.month = firstDayOfPreviousMonth.getMonth();
        }
        if (typeof argv.year !== 'number') {
            argv.year = firstDayOfPreviousMonth.getFullYear();
        }
        argv.projects = projects.map(x => {
            let result = {
                changes: []
            } as Project;
            if (typeof x === 'string') {
                result.name = x;
                result.repositoryUrl = `https://github.com/RokuCommunity/${result.name}`;
            }
            return result;
        });
        return argv;
    })
    .argv as unknown as RunnerOptions;

new Runner(options).run().catch((error) => {
    console.error(error);
    process.exit(1);
});

