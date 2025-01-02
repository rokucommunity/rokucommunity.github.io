---
date: December 2024
summary: Changes to vscode-brightscript-language, brighterscript, roku-deploy, roku-debug, ropm, brs
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
Welcome to the December 2024 edition of "What's New in RokuCommunity." Please consider <a target="_blank" href="https://rokucommunity.substack.com/">subscribing</a> to stay up to date with what's happening in RokuCommunity.

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
# Editor
## Added AppManager AppMemoryMonitor AppMemoryMonitorEvent coloring
<!-- 2024-11-14 (for v2.51.0 released on 2024-12-20), https://github.com/RokuCommunity/vscode-brightscript-language/pull/602 -->




## Potental fix for numeric literal colorization
<!-- 2024-11-14 (for v2.51.0 released on 2024-12-20), https://github.com/RokuCommunity/vscode-brightscript-language/pull/603 -->

Fixes https://github.com/rokucommunity/vscode-brightscript-language/issues/547 (decimal number without leading digit syntax highlighting bug)

**Before:**
![image](https://github.com/user-attachments/assets/daba2f66-e8b6-4acd-b73a-6428eb9e8a40)


**After:**
![image](https://github.com/user-attachments/assets/0a84b3f0-7921-493c-a2b9-9cd9175c6902)



## Syntax highlighting but for object functions
<!-- 2024-11-20 (for v2.51.0 released on 2024-12-20), https://github.com/RokuCommunity/vscode-brightscript-language/pull/604 -->

Fixes https://github.com/rokucommunity/vscode-brightscript-language/issues/411 syntax highlighting for the `as` keyword in function return types when a parameter is also of type `function`

**Before:**
![image](https://github.com/user-attachments/assets/0afcb88d-0585-4a90-9590-ec33ef406cdc)

**After (notice the `as` is purple now):**
![image](https://github.com/user-attachments/assets/3ad56485-ffb7-4ed0-b174-d86f500f3e90)



## Task/new remote commands
<!-- 2024-11-22 (for v2.51.0 released on 2024-12-20), https://github.com/RokuCommunity/vscode-brightscript-language/pull/605 -->

**Added the following new commands:**
- `extension.brightscript.setVolume`: Set a target volume level by repeatedly pressing VolumeDown followed by VolumeUp buttons on the Roku remote
- `extension.brightscript.pressBlue`: Press the Blue button on the Roku remote
- `extension.brightscript.pressGreen`: Press the Green button on the Roku remote
- `extension.brightscript.pressRed`: Press the Red button on the Roku remote
- `extension.brightscript.pressYellow`: Press the Yellow button on the Roku remote
- `extension.brightscript.pressExit`: Press the Exit button on the Roku remote

**Fixed the following commands:**
- `extension.brightscript.pressVolumeUp`: This was sending the wrong value to the device resulting in an error and failing to execute


## Fix issues with busy spinner showing too many error messages
<!-- 2024-12-11 (for v2.51.0 released on 2024-12-20), https://github.com/RokuCommunity/vscode-brightscript-language/pull/607 -->

Fixes a bug when the busy spinner has run too long, it would show _many_ console logs instead of 1 at the end. This fixes that.



# Debugging

## Fix cli bug
<!-- 2024-12-02 (for v0.21.13 released on 2024-12-20), https://github.com/RokuCommunity/roku-debug/pull/201 -->

Fixes a bug that was preventing the cli from actually running (due to missing `yargs` prod dependency).
Fixes #195 


## Upgrade dependencies
<!-- 2024-12-02 (for v0.21.13 released on 2024-12-20), https://github.com/RokuCommunity/roku-debug/pull/202 -->

Some dependency maintenance:

- Migrate `vscode-debugadapter` and `vscode-debugprotocol` to `@vscode/debugadapter` and `@vscode/debugprotocol`.
- remove `vscode-languageserver` in favor of a local interface (and references to stuff from brighterscript)
- upgrade to latest `postman-request`
- fix a few npm audit issues



## Add the missing `Diagnostic` props to `BSDebugDiagnostic`
<!-- 2024-12-02 (for v0.21.13 released on 2024-12-20), https://github.com/RokuCommunity/roku-debug/pull/203 -->

Followup to #202 that adds a few mission props to the `BSDebugDiagnostic`


## Add children roSGNode containers
<!-- 2024-12-03 (for v0.21.13 released on 2024-12-20), https://github.com/RokuCommunity/roku-debug/pull/192 -->

Adds virtual variables for `$count` and `$children` for `roSGNode` and `$count` for arrays. 

![image](https://github.com/user-attachments/assets/d04399ef-13bf-4847-b080-10c2b24d0816)



## Check for two error types. Make sure we do not double display an error
<!-- 2024-12-11 (for v0.21.13 released on 2024-12-20), https://github.com/RokuCommunity/roku-debug/pull/204 -->





# BrighterScript

## Add more convenience exports from vscode-languageserver
<!-- 2024-12-03 (for v0.68.2 released on 2024-12-06), https://github.com/RokuCommunity/brighterscript/pull/1359 -->

Adds a few additional exports from the vscode-languageserver package to eliminate the need for external projects to directly require that package.



# Community Tools

## brs
## Implemented Optional Chaining Operators
<!-- 2024-11-26 (for v0.47.1 released on 2024-12-20), https://github.com/RokuCommunity/brs/pull/81 -->

This closes #20 


## roku-deploy
## Bump dependencies to remove audit issues
<!-- 2024-11-06 (for v3.12.3 released on 2024-12-06), https://github.com/RokuCommunity/roku-deploy/pull/178 -->

Bump some npm dependencies to eliminate some audit issues.


## Identify when a 577 error is thrown, send a new developer friendly message
<!-- 2024-11-26 (for v3.12.3 released on 2024-12-06), https://github.com/RokuCommunity/roku-deploy/pull/180 -->




## Fix issues with detecting "check for updates required"
<!-- 2024-12-04 (for v3.12.3 released on 2024-12-06), https://github.com/RokuCommunity/roku-deploy/pull/181 -->

Improves upon #180 . Apparently the device actually returns status code `200` instead of `577`. `577` is some other type of error, we should handle that separately.

This now checks for `200` responses to see if the exact text `'Failed to check for software update'` is found. If so, that's when we throw the `UpdateCheckRequiredError` error.


## ropm
## Add create-package script
<!-- 2024-11-21 (for v0.10.28 released on 2024-12-20), https://github.com/RokuCommunity/ropm/pull/81 -->

Adds the `create-package` script to help test packages before they're merged or released.


## Fixes missing prefixes in .bs and d.bs files for interfaces, enums, and constants
<!-- 2024-11-25 (for v0.10.28 released on 2024-12-20), https://github.com/RokuCommunity/ropm/pull/80 -->

Fixes a pretty big bug where ropm doesn't understand root-level enums, interfaces, or constants! 

- now properly wraps top-level enums, constants, and interfaces with the prefixed namespaces
- prefixes interface and class member types with the prefix namespaces


## Fix EINVAL crash
<!-- 2024-12-23 (for v0.10.29 released on 2024-12-23), https://github.com/RokuCommunity/ropm/pull/82 -->

Related Issues:
- [EINVAL crash on latest nodejs](https://github.com/rokucommunity/ropm/issues/77)

> There's a weird crash with the latest version of NodeJS when running ropm.

```$ ropm install roku-requests
Error: spawn EINVAL
    at ChildProcess.spawn (node:internal/child_process:421:11)
    at Object.spawn (node:child_process:760:9)
    at C:\Users\bronley\AppData\Roaming\npm\node_modules\ropm\dist\util.js:24:40
    at new Promise (<anonymous>)
    at Util.spawnAsync (C:\Users\bronley\AppData\Roaming\npm\node_modules\ropm\dist\util.js:23:16)
    at Util.spawnNpmAsync (C:\Users\bronley\AppData\Roaming\npm\node_modules\ropm\dist\util.js:37:21)
    at InstallCommand.npmInstall (C:\Users\bronley\AppData\Roaming\npm\node_modules\ropm\dist\commands\InstallCommand.js:70:27)
    at async InstallCommand.run (C:\Users\bronley\AppData\Roaming\npm\node_modules\ropm\dist\commands\InstallCommand.js:39:13) {
  errno: -4071,
  code: 'EINVAL',
  syscall: 'spawn'
} ```

Adding `shell: true` fixes the crash



# Community Libraries


# Formatting


# Preview features
<!-- any alpha/beta changes across all projects should be documented here and not in their primary area above-->

# Documentation

# Misc

# For Contributors

***

# TODO
***Move these items to an appropriate section above, then delete this section***

***

# Thank you

Last but certainly not least, a big **_Thank You_** to the following people who contributed this month:

Contributions to [vscode-brightscript-language](https://github.com/RokuCommunity/vscode-brightscript-language):

-   [@chrisdp (Christopher Dwyer-Perkins)](https://github.com/chrisdp)
    -   Added AppManager AppMemoryMonitor AppMemoryMonitorEvent coloring ([PR #602](https://github.com/RokuCommunity/vscode-brightscript-language/pull/602))
    -   Potental fix for numeric literal colorization ([PR #603](https://github.com/RokuCommunity/vscode-brightscript-language/pull/603))
    -   Syntax highlighting but for object functions ([PR #604](https://github.com/RokuCommunity/vscode-brightscript-language/pull/604))
    -   Task/new remote commands ([PR #605](https://github.com/RokuCommunity/vscode-brightscript-language/pull/605))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fix issues with busy spinner showing too many error messages ([PR #607](https://github.com/RokuCommunity/vscode-brightscript-language/pull/607))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):

-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Add more convenience exports from vscode-languageserver ([PR #1359](https://github.com/RokuCommunity/brighterscript/pull/1359))

Contributions to [roku-deploy](https://github.com/RokuCommunity/roku-deploy):

-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Identify when a 577 error is thrown, send a new developer friendly message ([PR #180](https://github.com/RokuCommunity/roku-deploy/pull/180))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Bump dependencies to remove audit issues ([PR #178](https://github.com/RokuCommunity/roku-deploy/pull/178))
    -   Fix issues with detecting "check for updates required" ([PR #181](https://github.com/RokuCommunity/roku-deploy/pull/181))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):

-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Add children roSGNode containers ([PR #192](https://github.com/RokuCommunity/roku-debug/pull/192))
    -   Check for two error types. Make sure we do not double display an error ([PR #204](https://github.com/RokuCommunity/roku-debug/pull/204))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fix cli bug ([PR #201](https://github.com/RokuCommunity/roku-debug/pull/201))
    -   Upgrade dependencies ([PR #202](https://github.com/RokuCommunity/roku-debug/pull/202))
    -   Add the missing `Diagnostic` props to `BSDebugDiagnostic` ([PR #203](https://github.com/RokuCommunity/roku-debug/pull/203))

Contributions to [ropm](https://github.com/RokuCommunity/ropm):

-   [@addison-adler (Addison)](https://github.com/addison-adler)
    -   Fix EINVAL crash ([PR #82](https://github.com/RokuCommunity/ropm/pull/82))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Add create-package script ([PR #81](https://github.com/RokuCommunity/ropm/pull/81))
    -   Fixes missing prefixes in .bs and d.bs files for interfaces, enums, and constants ([PR #80](https://github.com/RokuCommunity/ropm/pull/80))

Contributions to [brs](https://github.com/RokuCommunity/brs):

-   [@lvcabral (Marcelo Lv Cabral)](https://github.com/lvcabral)
    -   Implemented Optional Chaining Operators ([PR #81](https://github.com/RokuCommunity/brs/pull/81))