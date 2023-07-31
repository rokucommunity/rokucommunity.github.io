---
date: February 2023
summary: Significant internal changes to internal debugger logic, progress on BrighterScript's File API and Component Statement
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
Not much happened this month in terms of released features. However, behind the scenes, [Bronley](https://github.com/TwitchBronBron) and [Chris](https://github.com/chrisdp) were hard at work on a massive overhaul of the debugger to improve testability and also to prepare for Roku's spring 2023 OS release. You can read a little more about it [here](#debug-protocol-refactor). We'll go into more detail once the pull request is finally merged.

If you weren't already aware, the debug protocol is a new binary socket-based debugger that Roku introduced in Roku OS 9.2. The debug protocol is much more stable and consistent than our regex-powered telnet debugger because instead of scraping text, we're able to communicate with the Roku device directly using established data structures. You can enable the debug protocol by setting `"enableDebugProtocol": true"` in your `launch.json` in vscode.

We've also made progress on the [File API](#file-api) and [Component Statement](#component-statement) implementations, so stay tuned for more information on those in the coming months.

# Debugging
## Debug protocol refactor
The code in [roku-debug](https://github.com/rokucommunity/roku-debug) is some of the oldest code in RokuCommunity, and has been historically very difficult to unit test because of how much it interacts with an actual Roku device. [roku-debug#107](https://github.com/rokucommunity/roku-debug/pull/107) makes great strides in improving that experience by creating a fully functional mock server that imitates Roku's debug protocol. This allows us to write much more extensive tests in our client code to ensure the binary data we're sending to the roku is valid, as well as verifying that we properly handle the incoming data. These changes also include improvements to the debug protocol logic that align us more closely with what we expect to see in Roku OS 12 which is likely to launch this spring.

We'll do a larger writeup on all of these features when feature lands (hopefully sometime in March or early April), but you can take a look at the [pull request](https://github.com/rokucommunity/roku-debug/pull/107) if you're curious.


# BrighterScript
## File API
We've been hard at work designing the upcoming [file API](https://github.com/rokucommunity/brighterscript/pull/408) for BrighterScript. Currently in BrighterScript, only `.brs`,`.bs`, and `.xml` files are loaded into the program. All other files are copied as-is from `./src` to `./staging`. Even manifest files are only loaded in read-only mode and cannot be changed by plugins. The file API introduced in [BrighterScript#408](https://github.com/rokucommunity/brighterscript/pull/408) will empower brighterscript plugins to process, transform, and even completely rewrite files of any type. We're excited to see what the community will do with these new features, so hopefully we can get it finished up in the next few months.

## Component Statement
Component statement is a proposal to the BrighterScript language that would allow developers to define SceneGraph components *in brighterscript code* instead of xml. It's built off the foundations of the [File API](#file-api), and is being used to validate that the File API is functionally capable of its goals. You can read more about the Component Statmenet designs in [this PR](https://github.com/rokucommunity/brighterscript/pull/575), and we're hopeful to land this feature before summer.

# Thank you
Last but certainly not least, a big ***Thank You*** to the following people who contributed this month:

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Debug protocol server ([PR #107](https://github.com/RokuCommunity/roku-debug/pull/107))
 - [@chrisdp (Christopher Dwyer-Perkins)](https://github.com/chrisdp)
    - Debug protocol server ([PR #107](https://github.com/RokuCommunity/roku-debug/pull/107))
