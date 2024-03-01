import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fsExtra from 'fs-extra';

const options = yargs(hideBin(process.argv))
    .usage('$0', 'generate markdown bullet list for a given whats-new markdown file')
    .help('help', 'View help information about this tool.')
    .command('$0 [files..]', '', () => { }, (args) => {
        run(args.files[0]);
    })
    .argv as unknown;

function run(filePath: string) {
    console.log('\n\n');
    const contents = fsExtra.readFileSync(
        `${process.cwd()}/src/pages/whats-new/${filePath}`
    ).toString();
    let match: RegExpExecArray;
    const regexp = /^\s*(#+)\s*(.*)$/gm;
    while ((match = regexp.exec(contents))) {
        const [, headerCount, text] = match;
        console.log(`${headerCount.replace(/#/g, ' '.repeat((headerCount.length - 1) * 2))}- [${text}](#${githubSanitizedAnchor(text)})`);
    }
    console.log('\n\n');
}

function githubSanitizedAnchor(header) {
    return header
        .toLowerCase() // Step 1: Lowercase the text
        .replace(/[^a-z0-9 -]/g, '') // Step 2: Remove special characters
        .replace(/\s+/g, '-') // Step 3: Replace spaces with hyphens
        .replace(/^-+|-+$/g, ''); // Step 4: Remove leading/trailing hyphens
}
