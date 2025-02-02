---
date: January 2025
summary: Changes to vscode-brightscript-language, brighterscript, roku-deploy, roku-debug, brighterscript-formatter, bslint, brs
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
Welcome to the January 2025 edition of "What's New in RokuCommunity." Please consider <a target="_blank" href="https://rokucommunity.substack.com/">subscribing</a> to stay up to date with what's happening in RokuCommunity.

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
## Retain original newlines in BrightScript Log output panel, and also strip ansii colors
<!-- 2025-01-13 (for v2.52.0 released on 2025-01-13), https://github.com/RokuCommunity/vscode-brightscript-language/pull/609 -->

Retain the original newlines in the `BrightScript Log` output panel that were sent from the device (we had some if statements excluding them). Also strip ansii colors from the output panel because they're very ugly and not supported.


## Support multiple named automations
<!-- 2025-01-16 (for v2.52.1 released on 2025-01-23), https://github.com/RokuCommunity/vscode-brightscript-language/pull/599 -->

Adds ability to save/load/delete multiple automations by name.

Fixes https://github.com/rokucommunity/vscode-brightscript-language/issues/542

https://github.com/user-attachments/assets/d08008d6-c14d-4815-9550-0f9e2d7946ec




## Fix release script to support the new merge style for PRs
<!-- 2025-01-31 (for v2.53.1 released on 2025-01-31), ([9e72786](https://github.com/RokuCommunity/vscode-brightscript-language/commit/9e72786)) -->





# Debugging

## Caught uncaught exceptions
<!-- 2025-01-08 (for v0.21.14 released on 2025-01-13), https://github.com/RokuCommunity/roku-debug/pull/198 -->

Adds support for the new "exceptions breakpoints" feature in the BrightScript debug protocol available starting in protocol version 3.3 (Roku OS 14.1.4). Here's an example:

![image](https://github.com/user-attachments/assets/18d9a723-116d-4205-b93f-da6123c6e14d)



## variables improvements
<!-- 2025-01-08 (for v0.21.14 released on 2025-01-13), https://github.com/RokuCommunity/roku-debug/pull/199 -->

Adds support for virtual variables, which was added to Roku's BrightScript debug protocol in version 3.3 (Roku OS 14.1.4). 

This is similar to https://github.com/rokucommunity/roku-debug/pull/192 except these are provided directly by the device and are significantly more efficient. All virtual variables are prefixed with `$`, as per the official Roku implementation.

![image](https://github.com/user-attachments/assets/723d84fb-e582-4049-b163-eab8a319a74f)



## Better handling of split log messages
<!-- 2025-01-13 (for v0.21.15 released on 2025-01-13), https://github.com/RokuCommunity/roku-debug/pull/206 -->

Fixes some bugs related to how we're handling split log messages. For example, if we received messages like this:
- `'hello w'`
- `'orld\nhow are you'`

We now join them together and emit `'hello world\n'` and hold onto `'how are you'` until we receive the next newline.

This fixes several issues related to incorrectly trimming newlines or leading whitespace chars. The console output should now be much more accurate to what the device originally sent. 


## Sudo code
<!-- 2025-01-22 (for v0.21.17 released on 2025-01-31), ([526facc](https://github.com/RokuCommunity/roku-debug/commit/526facc)) -->




## Added pkg path scraping to the sendLogOutput logic
<!-- 2025-01-22 (for v0.21.17 released on 2025-01-31), ([1a10c07](https://github.com/RokuCommunity/roku-debug/commit/1a10c07)) -->




## Added some more caching logic to the SourceMapManager
<!-- 2025-01-22 (for v0.21.17 released on 2025-01-31), ([491829b](https://github.com/RokuCommunity/roku-debug/commit/491829b)) -->




## ProjectManager getSourceLocation can now take column number
<!-- 2025-01-22 (for v0.21.17 released on 2025-01-31), ([6b115ff](https://github.com/RokuCommunity/roku-debug/commit/6b115ff)) -->




## Tests and clean up to path scraping
<!-- 2025-01-22 (for v0.21.17 released on 2025-01-31), ([f370e1f](https://github.com/RokuCommunity/roku-debug/commit/f370e1f)) -->




## Uninitialize __brs_err__ when stepping or continuing
<!-- 2025-01-22 (for v0.21.16 released on 2025-01-22), https://github.com/RokuCommunity/roku-debug/pull/207 -->




## Added launch config setting to turn off pkg path conversions
<!-- 2025-01-23 (for v0.21.17 released on 2025-01-31), ([8297918](https://github.com/RokuCommunity/roku-debug/commit/8297918)) -->




## Fixed bug where no logs where being sent
<!-- 2025-01-23 (for v0.21.17 released on 2025-01-31), ([d92c036](https://github.com/RokuCommunity/roku-debug/commit/d92c036)) -->




## Added path replasment support for backtrace objects
<!-- 2025-01-23 (for v0.21.17 released on 2025-01-31), ([97c63bd](https://github.com/RokuCommunity/roku-debug/commit/97c63bd)) -->




## fixed linting error
<!-- 2025-01-23 (for v0.21.17 released on 2025-01-31), ([a372378](https://github.com/RokuCommunity/roku-debug/commit/a372378)) -->




## Added an error log in shutdown to match other trys
<!-- 2025-01-23 (for v0.21.17 released on 2025-01-31), ([88f73f6](https://github.com/RokuCommunity/roku-debug/commit/88f73f6)) -->




## Fixed a crash in the custom virtual variables
<!-- 2025-01-23 (for v0.21.17 released on 2025-01-31), ([53e14c1](https://github.com/RokuCommunity/roku-debug/commit/53e14c1)) -->




## Added some customs for nodes for those running debugger less then v3.3.0
<!-- 2025-01-23 (for v0.21.17 released on 2025-01-31), ([3ae2fab](https://github.com/RokuCommunity/roku-debug/commit/3ae2fab)) -->




## Removed redundent assingment
<!-- 2025-01-23 (for v0.21.17 released on 2025-01-31), ([274074a](https://github.com/RokuCommunity/roku-debug/commit/274074a)) -->




## inital lazy variable support
<!-- 2025-01-23 (for v0.21.17 released on 2025-01-31), ([b85463e](https://github.com/RokuCommunity/roku-debug/commit/b85463e)) -->




## Fixed issue looking up primitive variables on hover
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([3c05ea0](https://github.com/RokuCommunity/roku-debug/commit/3c05ea0)) -->




## Fixed all objects looking expandable
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([fa1b215](https://github.com/RokuCommunity/roku-debug/commit/fa1b215)) -->




## Cleaned up the custom variables utils and EvaluateContainer interface
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([5926ec4](https://github.com/RokuCommunity/roku-debug/commit/5926ec4)) -->




## Added the ability to evaluate right away or lazy
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([1f79734](https://github.com/RokuCommunity/roku-debug/commit/1f79734)) -->




## Updated what we display as the type for Object variable types
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([8b30253](https://github.com/RokuCommunity/roku-debug/commit/8b30253)) -->




## Added a helper to force key types in some cases
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([3444a6b](https://github.com/RokuCommunity/roku-debug/commit/3444a6b)) -->




## Clean up on types and inital values for custom variables
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([c12c852](https://github.com/RokuCommunity/roku-debug/commit/c12c852)) -->




## moved variables for roUrlTransfer out of current debugger version checks
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([d55e87a](https://github.com/RokuCommunity/roku-debug/commit/d55e87a)) -->




## Cleaned up unessisary params in the custom variables utils
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([06e8ebb](https://github.com/RokuCommunity/roku-debug/commit/06e8ebb)) -->




## roDateTime virtual variables
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([005a45b](https://github.com/RokuCommunity/roku-debug/commit/005a45b)) -->




## Added roDeviceInfo virtual variables
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([f6ebb82](https://github.com/RokuCommunity/roku-debug/commit/f6ebb82)) -->




## Added roAppInfo and roAppManager virtual variables
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([f555cc1](https://github.com/RokuCommunity/roku-debug/commit/f555cc1)) -->




## Added roAudioMetadata virtual variables
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([b38dd53](https://github.com/RokuCommunity/roku-debug/commit/b38dd53)) -->




## Apply suggestions from code review
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([d16be47](https://github.com/RokuCommunity/roku-debug/commit/d16be47)) -->




## Update src/adapters/customVariableUtils.ts
<!-- 2025-01-24 (for v0.21.17 released on 2025-01-31), ([3c076ea](https://github.com/RokuCommunity/roku-debug/commit/3c076ea)) -->




## Moved logic around and creted helper files for all the different interfaces and event objects
<!-- 2025-01-25 (for v0.21.17 released on 2025-01-31), ([419215f](https://github.com/RokuCommunity/roku-debug/commit/419215f)) -->




## Fixed some links, typos, and missed export
<!-- 2025-01-25 (for v0.21.17 released on 2025-01-31), ([9e76e9b](https://github.com/RokuCommunity/roku-debug/commit/9e76e9b)) -->




## Update to the debupping check in pushCustomVariableToContainer
<!-- 2025-01-25 (for v0.21.17 released on 2025-01-31), ([9621da1](https://github.com/RokuCommunity/roku-debug/commit/9621da1)) -->




## Fixed missing export
<!-- 2025-01-25 (for v0.21.17 released on 2025-01-31), ([0b3044d](https://github.com/RokuCommunity/roku-debug/commit/0b3044d)) -->




## Updated the variable type for SubtypedObject to always reflect the primary type as the subtime is listed in the value
<!-- 2025-01-25 (for v0.21.17 released on 2025-01-31), ([3225db7](https://github.com/RokuCommunity/roku-debug/commit/3225db7)) -->




## added all the ro object lookup and interface variables
<!-- 2025-01-25 (for v0.21.17 released on 2025-01-31), ([7f406b4](https://github.com/RokuCommunity/roku-debug/commit/7f406b4)) -->




## Fixed a bunch of issues with custom variable deffinitions
<!-- 2025-01-25 (for v0.21.17 released on 2025-01-31), ([de9f0a0](https://github.com/RokuCommunity/roku-debug/commit/de9f0a0)) -->




## Expose the current thread ID from the addapters
<!-- 2025-01-25 (for v0.21.17 released on 2025-01-31), ([8c7fa2e](https://github.com/RokuCommunity/roku-debug/commit/8c7fa2e)) -->




## Handle when a variable type changes better and if needed refresh the ui
<!-- 2025-01-25 (for v0.21.17 released on 2025-01-31), ([fd0e92c](https://github.com/RokuCommunity/roku-debug/commit/fd0e92c)) -->




## Fixed issue looking up primitive variables on hover
<!-- 2025-01-27 (for v0.21.17 released on 2025-01-31), https://github.com/RokuCommunity/roku-debug/pull/210 -->




## folder and file renames
<!-- 2025-01-27 (for v0.21.17 released on 2025-01-31), ([c09418c](https://github.com/RokuCommunity/roku-debug/commit/c09418c)) -->




## Fixed some issues with hovers and dynamic lazy values
<!-- 2025-01-27 (for v0.21.17 released on 2025-01-31), ([a2bbc88](https://github.com/RokuCommunity/roku-debug/commit/a2bbc88)) -->




## Updated naming of many custom vars
<!-- 2025-01-27 (for v0.21.17 released on 2025-01-31), ([adbe7b6](https://github.com/RokuCommunity/roku-debug/commit/adbe7b6)) -->




## Fixed bug in hovers clearing variables
<!-- 2025-01-27 (for v0.21.17 released on 2025-01-31), ([6a0232a](https://github.com/RokuCommunity/roku-debug/commit/6a0232a)) -->




## Updates to some types, lazy status, and missed list object type
<!-- 2025-01-27 (for v0.21.17 released on 2025-01-31), ([7218647](https://github.com/RokuCommunity/roku-debug/commit/7218647)) -->




## Fixed some error handling
<!-- 2025-01-27 (for v0.21.17 released on 2025-01-31), ([80cc06a](https://github.com/RokuCommunity/roku-debug/commit/80cc06a)) -->




## Fixed a display but with types vs value on keyed objects
<!-- 2025-01-27 (for v0.21.17 released on 2025-01-31), ([44c01f7](https://github.com/RokuCommunity/roku-debug/commit/44c01f7)) -->




## More display tweeks
<!-- 2025-01-27 (for v0.21.17 released on 2025-01-31), ([fccbe44](https://github.com/RokuCommunity/roku-debug/commit/fccbe44)) -->




## Fixed unit tests
<!-- 2025-01-27 (for v0.21.17 released on 2025-01-31), ([c337fb0](https://github.com/RokuCommunity/roku-debug/commit/c337fb0)) -->




## Fixed a variable fetching recursion bug and made it so any custom var type can be resolved right away
<!-- 2025-01-28 (for v0.21.17 released on 2025-01-31), ([b64373e](https://github.com/RokuCommunity/roku-debug/commit/b64373e)) -->




## Fixed a bug where some logs could get lost bt the debugger
<!-- 2025-01-28 (for v0.21.17 released on 2025-01-31), ([fadb476](https://github.com/RokuCommunity/roku-debug/commit/fadb476)) -->




## Added another test
<!-- 2025-01-28 (for v0.21.17 released on 2025-01-31), ([c48602d](https://github.com/RokuCommunity/roku-debug/commit/c48602d)) -->




## Merge pull request #212 from rokucommunity/bugfix/missing-device-logs
<!-- 2025-01-28 (for v0.21.17 released on 2025-01-31), ([11cc60a](https://github.com/RokuCommunity/roku-debug/commit/11cc60a)) -->




## inlined regext for getPotentialPkgPaths
<!-- 2025-01-28 (for v0.21.17 released on 2025-01-31), ([44e757a](https://github.com/RokuCommunity/roku-debug/commit/44e757a)) -->




## inlined regex and replace line_number in convertBacktracePaths
<!-- 2025-01-28 (for v0.21.17 released on 2025-01-31), ([01c07e7](https://github.com/RokuCommunity/roku-debug/commit/01c07e7)) -->




## renamed new setting to retainDeploymentArchive and sets the defualt
<!-- 2025-01-28 (for v0.21.17 released on 2025-01-31), ([003820e](https://github.com/RokuCommunity/roku-debug/commit/003820e)) -->




## Merge pull request #208 from rokucommunity/feature/convert-pkg-path-to-file-system-path-in-logs
<!-- 2025-01-28 (for v0.21.17 released on 2025-01-31), ([99bac49](https://github.com/RokuCommunity/roku-debug/commit/99bac49)) -->




## Apply suggestions from code review
<!-- 2025-01-28 (for v0.21.17 released on 2025-01-31), ([bcfbe01](https://github.com/RokuCommunity/roku-debug/commit/bcfbe01)) -->




## index var fixes and stuff
<!-- 2025-01-28 (for v0.21.17 released on 2025-01-31), ([2996304](https://github.com/RokuCommunity/roku-debug/commit/2996304)) -->




## Fixed unit test
<!-- 2025-01-28 (for v0.21.17 released on 2025-01-31), ([d967389](https://github.com/RokuCommunity/roku-debug/commit/d967389)) -->




## Fixes for pagination
<!-- 2025-01-29 (for v0.21.17 released on 2025-01-31), ([35b7d7a](https://github.com/RokuCommunity/roku-debug/commit/35b7d7a)) -->




## Fixed an issue in telnet where non-containers where showing as such in variable panels
<!-- 2025-01-29 (for v0.21.17 released on 2025-01-31), ([7e29ef3](https://github.com/RokuCommunity/roku-debug/commit/7e29ef3)) -->




## Fixed some issues with file paths with spaces and links not working on windows
<!-- 2025-01-29 (for v0.21.17 released on 2025-01-31), ([d23c39a](https://github.com/RokuCommunity/roku-debug/commit/d23c39a)) -->




## Updated EvaluateContainer to impiment DebugProtocol.VariablePresentationHint
<!-- 2025-01-29 (for v0.21.17 released on 2025-01-31), ([754f7ca](https://github.com/RokuCommunity/roku-debug/commit/754f7ca)) -->




## Fix for the auto evaluation always triggering on non-lavy variables
<!-- 2025-01-29 (for v0.21.17 released on 2025-01-31), ([1363c2f](https://github.com/RokuCommunity/roku-debug/commit/1363c2f)) -->




## Added comment based on PR feedback
<!-- 2025-01-30 (for v0.21.17 released on 2025-01-31), ([3ea373b](https://github.com/RokuCommunity/roku-debug/commit/3ea373b)) -->




## Combined two evaluate commands into one
<!-- 2025-01-30 (for v0.21.17 released on 2025-01-31), ([d766053](https://github.com/RokuCommunity/roku-debug/commit/d766053)) -->




## Added setting for turning auto resolve on and off
<!-- 2025-01-30 (for v0.21.17 released on 2025-01-31), ([ab33e5f](https://github.com/RokuCommunity/roku-debug/commit/ab33e5f)) -->




## Added bulk loading support
<!-- 2025-01-30 (for v0.21.17 released on 2025-01-31), ([568ca41](https://github.com/RokuCommunity/roku-debug/commit/568ca41)) -->




## Some unit test fixes
<!-- 2025-01-30 (for v0.21.17 released on 2025-01-31), ([4284150](https://github.com/RokuCommunity/roku-debug/commit/4284150)) -->




## Updated test
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([4120b7c](https://github.com/RokuCommunity/roku-debug/commit/4120b7c)) -->




## Updated doc block
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([22e3fd7](https://github.com/RokuCommunity/roku-debug/commit/22e3fd7)) -->




## Little bit of clean up
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([c493cc2](https://github.com/RokuCommunity/roku-debug/commit/c493cc2)) -->




## Cleaned up value formatting of subtype objects
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([cd16f02](https://github.com/RokuCommunity/roku-debug/commit/cd16f02)) -->




## Fixed displayed value before exaluation for deviceInfo videoMode
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([f1656e5](https://github.com/RokuCommunity/roku-debug/commit/f1656e5)) -->




## Added back count display for arrays when avalable
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([c1ab491](https://github.com/RokuCommunity/roku-debug/commit/c1ab491)) -->




## comments and value formatting for arrays and nodes
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([dfda1d6](https://github.com/RokuCommunity/roku-debug/commit/dfda1d6)) -->




## Fixed bug with Lists not being unfoldable
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([96240af](https://github.com/RokuCommunity/roku-debug/commit/96240af)) -->




## Fixed a bug where vars could be refetch from device overriding old results
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([e97881d](https://github.com/RokuCommunity/roku-debug/commit/e97881d)) -->




## fixed some default display values and types
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([ba4013c](https://github.com/RokuCommunity/roku-debug/commit/ba4013c)) -->




## Fixed a sorting issue
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([04ab463](https://github.com/RokuCommunity/roku-debug/commit/04ab463)) -->




## make $scene lazy
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([436686f](https://github.com/RokuCommunity/roku-debug/commit/436686f)) -->




## Standardized error display for all var lookup issues
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([bae26a0](https://github.com/RokuCommunity/roku-debug/commit/bae26a0)) -->




## Fix incorrect virtual display style for telnet vars
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([74993fe](https://github.com/RokuCommunity/roku-debug/commit/74993fe)) -->




## Fix failing test
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([a84d678](https://github.com/RokuCommunity/roku-debug/commit/a84d678)) -->




## Merge pull request #209 from rokucommunity/bugfix/issue-inspecting-non-container-variables
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([9877301](https://github.com/RokuCommunity/roku-debug/commit/9877301)) -->




## Merge pull request #213 from rokucommunity/bugfix/fix-file-path-links-with-spaces
<!-- 2025-01-31 (for v0.21.17 released on 2025-01-31), ([7abbc93](https://github.com/RokuCommunity/roku-debug/commit/7abbc93)) -->




## Fix session-ending crash when ecp mode is not open enough.
<!-- 2025-01-31 (for v0.21.18 released on 2025-01-31), ([e02c14c](https://github.com/RokuCommunity/roku-debug/commit/e02c14c)) -->




## Merge remote-tracking branch 'origin' into fix-ecp-limited-crash
<!-- 2025-01-31 (for v0.21.18 released on 2025-01-31), ([c9df598](https://github.com/RokuCommunity/roku-debug/commit/c9df598)) -->




## Fix ecp limited crash
<!-- 2025-01-31 (for v0.21.18 released on 2025-01-31), https://github.com/RokuCommunity/roku-debug/pull/215 -->

Fixes a crash related to the new "limited" modes of the ECP features of Roku. The bug was related to rendezvous tracking not being safe enough to sanitize the http responses when enabling/disabling the feature, and the crash would bring down the entire debug session. Now we sanitize better, and also try/catch the whole flow so it's safer.



# BrighterScript

## Adds Parser error when custom type encountered in `brs` file
<!-- 2024-10-24 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1336 -->

This PR changes the parser so any custom type (eg. Class names, interfaces, built in types, etc) will result in a diagnostic:

`BrighterScript feature 'custom types' is not supported in standard BrightScript files`

Fixes: #1335


## Fix `Vector2DFieldInterpolator.keyValue` type
<!-- 2024-10-29 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1339 -->

Fix Vector2DFieldInterpolator.keyValue type. Also rescraped docs, and fixed places where 'int' was used instead of 'integer' and `bool` was used instead of `boolean`


## Allows more missing tokens in Transpile
<!-- 2024-10-30 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1340 -->

For some expressions and statements, we can do a better job of assuming what some missing tokens will be.

This is useful for constructing AST nodes via code, so we don't need to specify tokens for open and close parens in a function call, for example.

Includes fixes for `CallExpression`, `PrintStatement` and `FunctionExpression`

Basically, anywhere there is a token where it HAS to be a certain character or string, we might as well put in a default for transpile time, so you don't need to include EVERY token in a constructor.




## Optimize ternary transpilation for assignments
<!-- 2024-11-01 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1341 -->

Whenever a ternary expression is on the right-hand-side of an assignment, dottedSet, or indexedSet statement, we can transpile the entire thing to an `if` statement instead which improves performance significantly (should be identical to handwritten non-ternary code). 

This PR adds this `if` statement transpiling for all of the following situations:
- assignments: `a = true ? 1 : 2`
- dotted set: `m.a = true ? 1 : 2`
- indexed set: `m["a"] = true ? 1 : 2`
- complex assignment operators (i.e. `+=`, `-=`, etc...) `size += true ? 1 : 2`
- grouped ternaries: `a = (((true ? 1 : 2)))`
- nested ternaries `a = true ? (false ? 1 : 2) : 3`

These are explicit cases, so any situation other than these will be transpiled according to the existing rules ([basic](https://github.com/rokucommunity/brighterscript/blob/master/docs/ternary-operator.md#basic-usage) and [scope safe](https://github.com/rokucommunity/brighterscript/blob/master/docs/ternary-operator.md#scope-protection))

**Simple example:**
```brighterscript
a = true ? 1 : 2
```

becomes this:
```brighterscript
if true then
    a = 1
else
    a = 2
end if
```

**Nested example:**
```brighterscript
result = true ? (false ? "one" : "two") : "three"
```

becomes this:
```brighterscript
if true then
    if false then
        result = "one"
    else
        result = "two"
    end if
else
    result = "three"
end if
```

[This benchmark](https://github.com/rokucommunity/bsbench/blob/master/src/source/benchmarks/TernaryPerformance.bs) shows a significant improvement in performace

![image](https://github.com/user-attachments/assets/ffbffc08-6b49-4729-a434-cb08f66a11d0)




## Fix issues with the ast walkArray function
<!-- 2024-11-21 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1347 -->

Fix a bug that doesn't properly recover when the array being walked changes.

The core change in logic is as follows:
 - during an AST walk, if the visitor returns a new node, we will not walk the original node's children, and instead walk the new node's children
 - if a visitor changes an array (like `statements`), we will do a simple change detection method: `array[i] !== valuePassedToVisitor`. If we detect that it has changed, we'll restart the walk over that array (but skip any nodes we've already visited). This _can_ result in elements being visited out of order, but the use case for this is to help during transpile, so the order typically matters less.


## Enhance lexer to support long numeric literals with type designators
<!-- 2024-11-21 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1351 -->

Fix lexer to support long numeric literals with type designators.

Fixes #1350 


## [Proposal] Add Namespace Source Literals
<!-- 2024-11-25 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1354 -->

I'd like to add two source literals: `SOURCE_NAMESPACE` and `SOURCE_NAMESPACE_ROOT`

- These are complimentary to the existing `SOURCE_FUNCTION_NAME` literal 
- These are very useful for trace logging
- for developers that use a logger with filtering, enables filtering logs based on the namespace they originate from
  - alternative right now is to use `PKG_PATH`, but that changes every file, whereas a namespace can span multiple files

<details><summary><h2>Live Transpile Preview (pulled from VSCode)</h2></summary>
<p>

### Brighterscript:
```
Sub ComponentScope ()
    ' Component Scope
    sourceFunction = source_function_name
    sourceNamespace = source_namespace
    sourceNamespaceRoot = source_namespace_root
End Sub

Namespace NamespaceA

    ' Namespace Scope
    Sub ScopeA ()
        sourceFunction = source_function_name
        sourceNamespace = source_namespace
        sourceNamespaceRoot = source_namespace_root
    End Sub

    ' Nested Namespace Scope
    Namespace NamespaceB.NamespaceC

        Sub ScopeB ()
            sourceFunction = source_function_name
            sourceNamespace = source_namespace
            sourceNamespaceRoot = source_namespace_root
        End Sub

    End Namespace
End Namespace
```

### Transpiled
```
Sub ComponentScope()
    ' Component Scope
    sourceFunction = "ComponentScope"
    sourceNamespace = ""
    sourceNamespaceRoot = ""
End Sub
' Namespace Scope
Sub NamespaceA_ScopeA()
    sourceFunction = "NamespaceA.ScopeA"
    sourceNamespace = "NamespaceA"
    sourceNamespaceRoot = "NamespaceA"
End Sub
' Nested Namespace Scope
Sub NamespaceA_NamespaceB_NamespaceC_ScopeB()
    sourceFunction = "NamespaceA.NamespaceB.NamespaceC.ScopeB"
    sourceNamespace = "NamespaceA.NamespaceB.NamespaceC"
    sourceNamespaceRoot = "NamespaceA"
End Sub
```

</p>
</details> 

## Example Use Case
for debugging & log filtering

```
Namespace SpaceA
    Sub MyFunction ()
        LoggerUtil.Trace(SOURCE_FUNCTION_NAME, [SOURCE_NAMESPACE_ROOT]) 
    End Sub

    Namespace PrivateA
        Sub PrivateFunc ()
            LoggerUtil.Trace(SOURCE_FUNCTION_NAME, [SOURCE_NAMESPACE_ROOT])
        End Sub
    End Namespace
End Namespace

' Trace(text, filters)
' for filtering logs based on namespace, which may span multiple files
```

```
Namespace SpaceA
    Sub MyFunction ()
        LoggerUtil.Trace("MyFunction", ["SpaceA"]) 
    End Sub

    Namespace PrivateA
        Sub PrivateFunc ()
            LoggerUtil.Trace("PrivateFunc", ["SpaceA"])
        End Sub
    End Namespace
End Namespace
```


## Language Server Crash Fix
<!-- 2024-11-25 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1353 -->

First, apparently this property is deprecated now
![image](https://github.com/user-attachments/assets/11fa668a-d8c5-4613-842c-e76ee9db44b0)

## Additional Work Remaining
Second, if you do something super dumb like:
```
<component name="MyNode" extends="MyNode">
```
2. ???
3. ~Profit~ crashes!

This causes an infinite loop and a lot of lang. server crashes. I'll look further at this later to see where we can maybe prevent this from crashing and flag the error to the user. Right now there's no feedback besides a ton of crashes


## Fix bug with ternary transpile for indexed set
<!-- 2024-11-26 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1357 -->

Fixes #1356 . 

The issue was that we were only checking if the parent of the ternaryExpression was an IndexedSet, but we currently only support lifting the VALUE of those expressions, not their indexes. So this now guards against matching on the indexes.


## Add more convenience exports from vscode-languageserver
<!-- 2024-12-03 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1359 -->

Adds a few additional exports from the vscode-languageserver package to eliminate the need for external projects to directly require that package.


## Fixed an issue with doc scraper and re-scraped docs
<!-- 2024-12-13 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1368 -->

Scraper was not finding fields tables with 
` field | type | default | description `

I also re-scraped the docs, so there was a lot of new RokuOS 14 stuff...



## Ensures diagnostic on using Variable from parent function in an inner function
<!-- 2024-12-13 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1369 -->


![image](https://github.com/user-attachments/assets/98c5282b-d7bc-4dbb-b494-b2db9fba9083)


Fixes #1331


## Refine Diagnostic Filters and adds human-readable diagnostic names
<!-- 2024-12-13 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1241 -->

Addresses #1060 

- Changes the structure of `bsconfig.json` `"diagnosticFilters"` option to look like this:

```
Array<string | number | { files?: string | Array<string | { src: string } | { dest: string }>; codes?: Array<number | string> }>;
```

In more detail:
```jsonc
{
"diagnosticFilters": [
    123,   // numbers are applied to diagnostic code or legacyCode against all files
    "some-diagnostic-name", // strings are applied to diagnostic code (or legacyCode) against all files
    { "codes": ["code-1", "code-2"]}, // an object is allowed with a list of codes to applied against all files
    { "files": "some/glob/**" }, // a file list will suppress all diagnostics in matched files
    { "files": "other/glob/**", "codes": ["some-code"]}, //suppress specific codes in matched files
    { "files": [              //files can be an array of globs
            "other/glob/**",
            "other2/glob/**"
       ],
       "codes": ["some-code"]
    },
    { "files": [{ "src": "yet/another/glob/**"}] }, //file listings in an array can be a object that references src path
    { "files": [{ "dest": "yet/another/glob/**"}] } //file listings in an array can be a object that references dest path
]}

```

Additionally, I went through all the diagnostics and assigned a human-readable `code` property to them, which can also be used for any diagnostic filtering. The previous (numerical) code property was renamed to `legacyCode`







## Changes `expectedReturnStatement` to `returnTypeCoercionMismatch` 
<!-- 2024-12-14 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1370 -->

For everything but `string`, a function with no return statement will be coerced into the specified type.


Fixes #1334


## Fixes type chain for looking up params with type defs from @param
<!-- 2024-12-15 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1374 -->

fixes #1328


<img width="489" alt="image" src="https://github.com/user-attachments/assets/5caa43e2-a6b5-4091-96fa-d4e4fefbdb59" />



## Properly types 'invalid' as InvalidType
<!-- 2024-12-17 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1378 -->

Previously, `invalid` was typed as `DynamicType`

This PR changes it so it is `InvalidType`

This fixes the BinaryOperator validation and fixes #1367

In addition:
- when the default value for function params and fields is set to `invalid`, then the type of the param/field is set to Dynamic.
- Changes `AllowableTypes` to NOT include 'invalid' because that is a compile error:

![image](https://github.com/user-attachments/assets/f1b98653-5d89-4357-bc30-f04d0c2eab30)



Now there is a parser error when using `as invalid` :

![image](https://github.com/user-attachments/assets/d2f4d165-5e49-4810-a07f-a56b70bcd50c)




## Eliminates unnecessary import and fractional hex diagnostics
<!-- 2024-12-19 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1377 -->

Addresses #1372
Addresses #1329 



## Fixes default type for ArrayLIteral with enum member inner types
<!-- 2024-12-29 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1373 -->

Fixes #1323 

- [x] Make it work for Namespaced Enums



Default values/initial values are much more stable, and support things like arrays of enum values:

  
![image](https://github.com/user-attachments/assets/21b91b69-1abe-4e28-b374-70ebaacf6ebf)



## Added more unit tests for namespace as variable
<!-- 2025-01-01 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1385 -->

Addresses #1366

There were already a few unit tests for this, but I added a couple more


## Refactors PrintStatement so that `.values` array is all expressions
<!-- 2025-01-03 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1296 -->

`;` and `,` are converted to `PrintSeparatorExpression`

Addresses #1280 


## Augments handling of void returns
<!-- 2025-01-03 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1380 -->

- Adds `isBuiltIn` ExtraSymbolData for symbols that are built in types/functions
- For Built in functions & methods that return  `as void`, return type is `void`
- for User defined functions that return `as void`, the return type is actually `invalid`
- Validates against using `void`-typed vars in Binary expressions and as arguments
- Changes Binary (and Unary) result type code to be more lenient - if one of the types is `dynamic`, then it assumes the actual type is something that provides a better result type... 

eg.

```
function test(foo)
   bar = foo + "Hello"
  ' bar is typed as `string`
end function
```


Addresses #1360


## Assign invalid types as dynamic
<!-- 2025-01-03 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1389 -->

Changes handling of `someVar = invalid` so that `someVar` is typed as `dynamic`


fixes #1383




## Export more items
<!-- 2025-01-08 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1394 -->

Adds more exports to improve experience of using brighterscript from plugins. 
- add exports for a few missing brighterscript files
- add source-map convenience exports 
- broke named exports onto their own lines to improve diffing in the future


## Fix class transpile issue with child class constructor not inherriting parent params
<!-- 2025-01-13 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1390 -->

When a child class extends a super class, but does not include its own `new` function, and the parent class has parameters, we are missing those parameters in the child class's factory. 

- [x] unit test
- [x] fix the bug


## Fix crash when unraveling complex BinaryReferenceType
<!-- 2025-01-14 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1398 -->

Fixes a crash related to BinaryReferenceType. 

![image](https://github.com/user-attachments/assets/d188665d-3a9f-494f-8eb2-81ba87ac6831)



## Fixes How BinaryOperators work on Unions
<!-- 2025-01-14 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1400 -->

New logic:
- the result of a binary op on unions depends on what types are in the union
- Basically, the "highest priority" type wins
- If two types are "equal priority", but not the same, treat it as Dynamic
-  `(float or integer) + (Integer) => Float`
- Treats "ObjectType" basically like "DynamicType"



## Adds Callfunc Completion and Validation
<!-- 2025-01-15 (for v1.0.0-alpha.42 released on 2025-01-17), https://github.com/RokuCommunity/brighterscript/pull/1352 -->

Gives `callFunc` a whole lotta love!


- Fixes an issue with completions on `@.` where ALL possible callfuncs would appear. This was a result of the parser having an exception on incomplete `@.` invocations
- Adds function documentation to hovers on `@.` callfunc invocations
- Stores all resolved types associated with callfuncs for a component in a symbolTable that is used a sibiling table when the callfunc is used in another scope
- Return type of `Callfunc` and `@.` invocations are used to set types in assignments 
- Validates arg counts and type mismatches for `callfunc` and `@.`

While I was it, I also added validation and return typing for `<component>.createChild()`

Additional validation enhancements:
- if a type depends on another type (eg, has a member of another type), and that member type changes, then all segments/ASTNodes that reference the wider type are also re-validated. This means that the type-safety flows down and things get appropriately re-validated when there are changes.
- Better handling of `typecast` statements when setting up file segments for revalidation
- Better handling of when component types change, and re-validation because of that.

TODO:
- [x] Make validation updates work better. Currently, you need to edit an XML file of the component for things to revalidate if the exported function type changes
- [x] Deal with how adding sibling tables messes up other validations. Like if the resolved version stay around when they actually should be unresolved
- [x] Do not have validation errors if the component type is the generic `roSGNode` 

To be honest, I think that if we properly re-build the Component type when a member file changes, that would fix both problems.


![image](https://github.com/user-attachments/assets/8c7ef6fe-aec5-4707-99a0-403ba8d9b1b1)

![image](https://github.com/user-attachments/assets/48efa484-ead6-4105-a53f-a2719f592c6e)


Also fixes #1309




# Community Tools

## bslint
## Actually add name property to plugin classes
<!-- 2024-11-18 (for v1.0.0-alpha.42 released on 2025-01-21), https://github.com/RokuCommunity/bslint/pull/137 -->

The "sub plugins" in BsLint don't actually have names .. this changes it so they are named. The only difference is that they show up in the logs better.

Before:

![image](https://github.com/user-attachments/assets/20e73d50-9152-4700-a323-f613ceb326b6)


After:

![image](https://github.com/user-attachments/assets/93811d46-e2c6-45d4-ad54-4d401530c2c9)
![image](https://github.com/user-attachments/assets/4806586a-2b76-4725-a7c5-0bd957d17394)


## Adds -allow-implicit for type annotations
<!-- 2025-01-21 (for v1.0.0-alpha.42 released on 2025-01-21), https://github.com/RokuCommunity/bslint/pull/133 -->

Modifies the `type-annotations` rule to add `all-allow-implicit` and `args-allow-implicit` so when an argument has a default value, it is not flagged by the rule:

Before:
![image](https://github.com/user-attachments/assets/2646254b-50d9-4e28-9eb4-d9b4c2688680)

After:
![image](https://github.com/user-attachments/assets/dc0451aa-86b6-43cb-87ed-a89efd6aa994)




## Updates to Brighterscript v1.0.0-Alpha.42
<!-- 2025-01-21 (for v1.0.0-alpha.42 released on 2025-01-21), https://github.com/RokuCommunity/bslint/pull/140 -->

Updated tests to match v1 Diagnostics.



## brs
## Fixed dot chaining error scenarios
<!-- 2025-01-03 (for v0.47.2 released on 2025-01-03), https://github.com/RokuCommunity/brs/pull/83 -->

Some error scenarios were not working properly with the implementation, this PR fixes those.


## Implemented `ObjFun()` and aligned behavior of `CreateObject()` with Roku
<!-- 2025-01-03 (for v0.47.2 released on 2025-01-03), https://github.com/RokuCommunity/brs/pull/84 -->

This PR closes #77, #80 


## Implemented function `toAssociativeArray()` to simplify creation of AA in TypeScript code
<!-- 2025-01-03 (for v0.47.2 released on 2025-01-03), https://github.com/RokuCommunity/brs/pull/85 -->

Leveraged a generic function that was in Json.ts to make a function to create AA easier in TypeScript code.


## SceneGraph Node files reorganization
<!-- 2025-01-20 (for v0.47.3 released on 2025-01-31), https://github.com/RokuCommunity/brs/pull/86 -->

- Organized the Node components in a separate folder
- Renamed `ComponentFactory` to `NodeFactory`
- Renamed the `roTimespan` component file to match the standard
- Renamed `coercion.ts` to `Coercion.ts`
- Updated documentation and unit tests


## Implemented several improvements to SceneGraph
<!-- 2025-01-27 (for v0.47.3 released on 2025-01-31), https://github.com/RokuCommunity/brs/pull/87 -->

- Added `roSGScreen` and `roSGScreenEvent`
- Added support to `scripts` to be embedded on XML files
- Added `roMessagePort` (still no support for control)
- Added global functions `Sleep()` and `Wait()`

With this PR `brs` now can run the [Roku Hello World](https://github.com/rokudev/hello-world/), on the root of the sample repository execute:

```console
brs source/source/Main.brs --root ./source
```
The app will not terminate automatically as it is waiting for an event, so terminate with `Ctrl+C`, you can add `print` statements on the Scene `init` function and see it working. 


## roku-deploy
## fixed an issue with 577 error codes
<!-- 2025-01-22 (for v3.12.4 released on 2025-01-22), https://github.com/RokuCommunity/roku-deploy/pull/182 -->

Improves upon https://github.com/rokucommunity/roku-deploy/pull/180 by handling when the initial "Replace" call fails. Some devices return 577 or "update check required" 200 response on the `replace` request, but then timeout on the `install` request. 

This fixes that by detecting that issue in the `Replace` request and then failing sooner rather than attempting the `Install` next.



# Community Libraries


# Formatting

## initial commit for issue 77
<!-- 2025-01-03 (for v1.7.9 released on 2025-01-31), ([fab3b89](https://github.com/RokuCommunity/brighterscript-formatter/commit/fab3b89)) -->




## Remove unused token kinds from OutdentSpacerTokenKinds
<!-- 2025-01-03 (for v1.7.9 released on 2025-01-31), ([64bcfe9](https://github.com/RokuCommunity/brighterscript-formatter/commit/64bcfe9)) -->




## Refactor IndentFormatter tests to uncomment and enable relevant code
<!-- 2025-01-03 (for v1.7.9 released on 2025-01-31), ([4a5704c](https://github.com/RokuCommunity/brighterscript-formatter/commit/4a5704c)) -->




## remove console.logs and tidy up code
<!-- 2025-01-05 (for v1.7.9 released on 2025-01-31), ([88272b2](https://github.com/RokuCommunity/brighterscript-formatter/commit/88272b2)) -->




## remove spacing
<!-- 2025-01-05 (for v1.7.9 released on 2025-01-31), ([c86ed13](https://github.com/RokuCommunity/brighterscript-formatter/commit/c86ed13)) -->




## add tests for function class and function enum
<!-- 2025-01-10 (for v1.7.9 released on 2025-01-31), ([7e8ae0c](https://github.com/RokuCommunity/brighterscript-formatter/commit/7e8ae0c)) -->




## Add failing test
<!-- 2025-01-22 (for v1.7.9 released on 2025-01-31), ([4794157](https://github.com/RokuCommunity/brighterscript-formatter/commit/4794157)) -->




## add tests and passing code for Try ... Catch blocks
<!-- 2025-01-28 (for v1.7.9 released on 2025-01-31), ([9d78b17](https://github.com/RokuCommunity/brighterscript-formatter/commit/9d78b17)) -->




## remove trailing space
<!-- 2025-01-28 (for v1.7.9 released on 2025-01-31), ([5c87e0f](https://github.com/RokuCommunity/brighterscript-formatter/commit/5c87e0f)) -->




## Merge pull request #96 from philanderson888/issue-77-formatter-with-keywords-in-function-name
<!-- 2025-01-29 (for v1.7.9 released on 2025-01-31), ([07e31fa](https://github.com/RokuCommunity/brighterscript-formatter/commit/07e31fa)) -->





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
    -   Retain original newlines in BrightScript Log output panel, and also strip ansii colors ([PR #609](https://github.com/RokuCommunity/vscode-brightscript-language/pull/609))
-   [@jtuckerfubo (justin tucker)](https://github.com/jtuckerfubo)
    -   Support multiple named automations ([PR #599](https://github.com/RokuCommunity/vscode-brightscript-language/pull/599))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fix release script to support the new merge style for PRs ([9e72786](https://github.com/RokuCommunity/vscode-brightscript-language/commit/9e72786))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):

-   [@addison-adler (Addison)](https://github.com/addison-adler)
    -   [Proposal] Add Namespace Source Literals ([PR #1354](https://github.com/RokuCommunity/brighterscript/pull/1354))
    -   Language Server Crash Fix ([PR #1353](https://github.com/RokuCommunity/brighterscript/pull/1353))
-   [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    -   Adds Parser error when custom type encountered in `brs` file ([PR #1336](https://github.com/RokuCommunity/brighterscript/pull/1336))
    -   Fix `Vector2DFieldInterpolator.keyValue` type ([PR #1339](https://github.com/RokuCommunity/brighterscript/pull/1339))
    -   Allows more missing tokens in Transpile ([PR #1340](https://github.com/RokuCommunity/brighterscript/pull/1340))
    -   Fixed an issue with doc scraper and re-scraped docs ([PR #1368](https://github.com/RokuCommunity/brighterscript/pull/1368))
    -   Ensures diagnostic on using Variable from parent function in an inner function ([PR #1369](https://github.com/RokuCommunity/brighterscript/pull/1369))
    -   Refine Diagnostic Filters and adds human-readable diagnostic names ([PR #1241](https://github.com/RokuCommunity/brighterscript/pull/1241))
    -   Changes `expectedReturnStatement` to `returnTypeCoercionMismatch`  ([PR #1370](https://github.com/RokuCommunity/brighterscript/pull/1370))
    -   Fixes type chain for looking up params with type defs from @param ([PR #1374](https://github.com/RokuCommunity/brighterscript/pull/1374))
    -   Properly types 'invalid' as InvalidType ([PR #1378](https://github.com/RokuCommunity/brighterscript/pull/1378))
    -   Eliminates unnecessary import and fractional hex diagnostics ([PR #1377](https://github.com/RokuCommunity/brighterscript/pull/1377))
    -   Fixes default type for ArrayLIteral with enum member inner types ([PR #1373](https://github.com/RokuCommunity/brighterscript/pull/1373))
    -   Added more unit tests for namespace as variable ([PR #1385](https://github.com/RokuCommunity/brighterscript/pull/1385))
    -   Refactors PrintStatement so that `.values` array is all expressions ([PR #1296](https://github.com/RokuCommunity/brighterscript/pull/1296))
    -   Augments handling of void returns ([PR #1380](https://github.com/RokuCommunity/brighterscript/pull/1380))
    -   Assign invalid types as dynamic ([PR #1389](https://github.com/RokuCommunity/brighterscript/pull/1389))
    -   Fixes How BinaryOperators work on Unions ([PR #1400](https://github.com/RokuCommunity/brighterscript/pull/1400))
    -   Adds Callfunc Completion and Validation ([PR #1352](https://github.com/RokuCommunity/brighterscript/pull/1352))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Optimize ternary transpilation for assignments ([PR #1341](https://github.com/RokuCommunity/brighterscript/pull/1341))
    -   Fix issues with the ast walkArray function ([PR #1347](https://github.com/RokuCommunity/brighterscript/pull/1347))
    -   Enhance lexer to support long numeric literals with type designators ([PR #1351](https://github.com/RokuCommunity/brighterscript/pull/1351))
    -   Fix bug with ternary transpile for indexed set ([PR #1357](https://github.com/RokuCommunity/brighterscript/pull/1357))
    -   Add more convenience exports from vscode-languageserver ([PR #1359](https://github.com/RokuCommunity/brighterscript/pull/1359))
    -   Export more items ([PR #1394](https://github.com/RokuCommunity/brighterscript/pull/1394))
    -   Fix class transpile issue with child class constructor not inherriting parent params ([PR #1390](https://github.com/RokuCommunity/brighterscript/pull/1390))
    -   Fix crash when unraveling complex BinaryReferenceType ([PR #1398](https://github.com/RokuCommunity/brighterscript/pull/1398))

Contributions to [roku-deploy](https://github.com/RokuCommunity/roku-deploy):

-   [@sethmaclean (Seth MacLean)](https://github.com/sethmaclean)
    -   fixed an issue with 577 error codes ([PR #182](https://github.com/RokuCommunity/roku-deploy/pull/182))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):

-   [@chrisdp (Christopher Dwyer-Perkins)](https://github.com/chrisdp)
    -   variables improvements ([PR #199](https://github.com/RokuCommunity/roku-debug/pull/199))
    -   Better handling of split log messages ([PR #206](https://github.com/RokuCommunity/roku-debug/pull/206))
    -   Sudo code ([526facc](https://github.com/RokuCommunity/roku-debug/commit/526facc))
    -   Added pkg path scraping to the sendLogOutput logic ([1a10c07](https://github.com/RokuCommunity/roku-debug/commit/1a10c07))
    -   Added some more caching logic to the SourceMapManager ([491829b](https://github.com/RokuCommunity/roku-debug/commit/491829b))
    -   ProjectManager getSourceLocation can now take column number ([6b115ff](https://github.com/RokuCommunity/roku-debug/commit/6b115ff))
    -   Tests and clean up to path scraping ([f370e1f](https://github.com/RokuCommunity/roku-debug/commit/f370e1f))
    -   Added launch config setting to turn off pkg path conversions ([8297918](https://github.com/RokuCommunity/roku-debug/commit/8297918))
    -   Fixed bug where no logs where being sent ([d92c036](https://github.com/RokuCommunity/roku-debug/commit/d92c036))
    -   Added path replasment support for backtrace objects ([97c63bd](https://github.com/RokuCommunity/roku-debug/commit/97c63bd))
    -   fixed linting error ([a372378](https://github.com/RokuCommunity/roku-debug/commit/a372378))
    -   Added an error log in shutdown to match other trys ([88f73f6](https://github.com/RokuCommunity/roku-debug/commit/88f73f6))
    -   Fixed a crash in the custom virtual variables ([53e14c1](https://github.com/RokuCommunity/roku-debug/commit/53e14c1))
    -   Added some customs for nodes for those running debugger less then v3.3.0 ([3ae2fab](https://github.com/RokuCommunity/roku-debug/commit/3ae2fab))
    -   Removed redundent assingment ([274074a](https://github.com/RokuCommunity/roku-debug/commit/274074a))
    -   inital lazy variable support ([b85463e](https://github.com/RokuCommunity/roku-debug/commit/b85463e))
    -   Fixed issue looking up primitive variables on hover ([3c05ea0](https://github.com/RokuCommunity/roku-debug/commit/3c05ea0))
    -   Fixed all objects looking expandable ([fa1b215](https://github.com/RokuCommunity/roku-debug/commit/fa1b215))
    -   Cleaned up the custom variables utils and EvaluateContainer interface ([5926ec4](https://github.com/RokuCommunity/roku-debug/commit/5926ec4))
    -   Added the ability to evaluate right away or lazy ([1f79734](https://github.com/RokuCommunity/roku-debug/commit/1f79734))
    -   Updated what we display as the type for Object variable types ([8b30253](https://github.com/RokuCommunity/roku-debug/commit/8b30253))
    -   Added a helper to force key types in some cases ([3444a6b](https://github.com/RokuCommunity/roku-debug/commit/3444a6b))
    -   Clean up on types and inital values for custom variables ([c12c852](https://github.com/RokuCommunity/roku-debug/commit/c12c852))
    -   moved variables for roUrlTransfer out of current debugger version checks ([d55e87a](https://github.com/RokuCommunity/roku-debug/commit/d55e87a))
    -   Cleaned up unessisary params in the custom variables utils ([06e8ebb](https://github.com/RokuCommunity/roku-debug/commit/06e8ebb))
    -   roDateTime virtual variables ([005a45b](https://github.com/RokuCommunity/roku-debug/commit/005a45b))
    -   Added roDeviceInfo virtual variables ([f6ebb82](https://github.com/RokuCommunity/roku-debug/commit/f6ebb82))
    -   Added roAppInfo and roAppManager virtual variables ([f555cc1](https://github.com/RokuCommunity/roku-debug/commit/f555cc1))
    -   Added roAudioMetadata virtual variables ([b38dd53](https://github.com/RokuCommunity/roku-debug/commit/b38dd53))
    -   Apply suggestions from code review ([d16be47](https://github.com/RokuCommunity/roku-debug/commit/d16be47))
    -   Update src/adapters/customVariableUtils.ts ([3c076ea](https://github.com/RokuCommunity/roku-debug/commit/3c076ea))
    -   Moved logic around and creted helper files for all the different interfaces and event objects ([419215f](https://github.com/RokuCommunity/roku-debug/commit/419215f))
    -   Fixed some links, typos, and missed export ([9e76e9b](https://github.com/RokuCommunity/roku-debug/commit/9e76e9b))
    -   Update to the debupping check in pushCustomVariableToContainer ([9621da1](https://github.com/RokuCommunity/roku-debug/commit/9621da1))
    -   Fixed missing export ([0b3044d](https://github.com/RokuCommunity/roku-debug/commit/0b3044d))
    -   Updated the variable type for SubtypedObject to always reflect the primary type as the subtime is listed in the value ([3225db7](https://github.com/RokuCommunity/roku-debug/commit/3225db7))
    -   added all the ro object lookup and interface variables ([7f406b4](https://github.com/RokuCommunity/roku-debug/commit/7f406b4))
    -   Fixed a bunch of issues with custom variable deffinitions ([de9f0a0](https://github.com/RokuCommunity/roku-debug/commit/de9f0a0))
    -   Expose the current thread ID from the addapters ([8c7fa2e](https://github.com/RokuCommunity/roku-debug/commit/8c7fa2e))
    -   Handle when a variable type changes better and if needed refresh the ui ([fd0e92c](https://github.com/RokuCommunity/roku-debug/commit/fd0e92c))
    -   Fixed issue looking up primitive variables on hover ([PR #210](https://github.com/RokuCommunity/roku-debug/pull/210))
    -   folder and file renames ([c09418c](https://github.com/RokuCommunity/roku-debug/commit/c09418c))
    -   Fixed some issues with hovers and dynamic lazy values ([a2bbc88](https://github.com/RokuCommunity/roku-debug/commit/a2bbc88))
    -   Updated naming of many custom vars ([adbe7b6](https://github.com/RokuCommunity/roku-debug/commit/adbe7b6))
    -   Fixed bug in hovers clearing variables ([6a0232a](https://github.com/RokuCommunity/roku-debug/commit/6a0232a))
    -   Updates to some types, lazy status, and missed list object type ([7218647](https://github.com/RokuCommunity/roku-debug/commit/7218647))
    -   Fixed some error handling ([80cc06a](https://github.com/RokuCommunity/roku-debug/commit/80cc06a))
    -   Fixed a display but with types vs value on keyed objects ([44c01f7](https://github.com/RokuCommunity/roku-debug/commit/44c01f7))
    -   More display tweeks ([fccbe44](https://github.com/RokuCommunity/roku-debug/commit/fccbe44))
    -   Fixed unit tests ([c337fb0](https://github.com/RokuCommunity/roku-debug/commit/c337fb0))
    -   Fixed a variable fetching recursion bug and made it so any custom var type can be resolved right away ([b64373e](https://github.com/RokuCommunity/roku-debug/commit/b64373e))
    -   Fixed a bug where some logs could get lost bt the debugger ([fadb476](https://github.com/RokuCommunity/roku-debug/commit/fadb476))
    -   Added another test ([c48602d](https://github.com/RokuCommunity/roku-debug/commit/c48602d))
    -   inlined regext for getPotentialPkgPaths ([44e757a](https://github.com/RokuCommunity/roku-debug/commit/44e757a))
    -   inlined regex and replace line_number in convertBacktracePaths ([01c07e7](https://github.com/RokuCommunity/roku-debug/commit/01c07e7))
    -   renamed new setting to retainDeploymentArchive and sets the defualt ([003820e](https://github.com/RokuCommunity/roku-debug/commit/003820e))
    -   Apply suggestions from code review ([bcfbe01](https://github.com/RokuCommunity/roku-debug/commit/bcfbe01))
    -   index var fixes and stuff ([2996304](https://github.com/RokuCommunity/roku-debug/commit/2996304))
    -   Fixed unit test ([d967389](https://github.com/RokuCommunity/roku-debug/commit/d967389))
    -   Fixes for pagination ([35b7d7a](https://github.com/RokuCommunity/roku-debug/commit/35b7d7a))
    -   Fixed an issue in telnet where non-containers where showing as such in variable panels ([7e29ef3](https://github.com/RokuCommunity/roku-debug/commit/7e29ef3))
    -   Fixed some issues with file paths with spaces and links not working on windows ([d23c39a](https://github.com/RokuCommunity/roku-debug/commit/d23c39a))
    -   Updated EvaluateContainer to impiment DebugProtocol.VariablePresentationHint ([754f7ca](https://github.com/RokuCommunity/roku-debug/commit/754f7ca))
    -   Fix for the auto evaluation always triggering on non-lavy variables ([1363c2f](https://github.com/RokuCommunity/roku-debug/commit/1363c2f))
    -   Added comment based on PR feedback ([3ea373b](https://github.com/RokuCommunity/roku-debug/commit/3ea373b))
    -   Combined two evaluate commands into one ([d766053](https://github.com/RokuCommunity/roku-debug/commit/d766053))
    -   Added setting for turning auto resolve on and off ([ab33e5f](https://github.com/RokuCommunity/roku-debug/commit/ab33e5f))
    -   Added bulk loading support ([568ca41](https://github.com/RokuCommunity/roku-debug/commit/568ca41))
    -   Some unit test fixes ([4284150](https://github.com/RokuCommunity/roku-debug/commit/4284150))
    -   Updated test ([4120b7c](https://github.com/RokuCommunity/roku-debug/commit/4120b7c))
    -   Updated doc block ([22e3fd7](https://github.com/RokuCommunity/roku-debug/commit/22e3fd7))
    -   Little bit of clean up ([c493cc2](https://github.com/RokuCommunity/roku-debug/commit/c493cc2))
    -   Cleaned up value formatting of subtype objects ([cd16f02](https://github.com/RokuCommunity/roku-debug/commit/cd16f02))
    -   Fixed displayed value before exaluation for deviceInfo videoMode ([f1656e5](https://github.com/RokuCommunity/roku-debug/commit/f1656e5))
    -   Added back count display for arrays when avalable ([c1ab491](https://github.com/RokuCommunity/roku-debug/commit/c1ab491))
    -   comments and value formatting for arrays and nodes ([dfda1d6](https://github.com/RokuCommunity/roku-debug/commit/dfda1d6))
    -   Fixed bug with Lists not being unfoldable ([96240af](https://github.com/RokuCommunity/roku-debug/commit/96240af))
    -   Fixed a bug where vars could be refetch from device overriding old results ([e97881d](https://github.com/RokuCommunity/roku-debug/commit/e97881d))
    -   fixed some default display values and types ([ba4013c](https://github.com/RokuCommunity/roku-debug/commit/ba4013c))
    -   Fixed a sorting issue ([04ab463](https://github.com/RokuCommunity/roku-debug/commit/04ab463))
-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Caught uncaught exceptions ([PR #198](https://github.com/RokuCommunity/roku-debug/pull/198))
    -   Uninitialize __brs_err__ when stepping or continuing ([PR #207](https://github.com/RokuCommunity/roku-debug/pull/207))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Merge pull request #212 from rokucommunity/bugfix/missing-device-logs ([11cc60a](https://github.com/RokuCommunity/roku-debug/commit/11cc60a))
    -   Merge pull request #208 from rokucommunity/feature/convert-pkg-path-to-file-system-path-in-logs ([99bac49](https://github.com/RokuCommunity/roku-debug/commit/99bac49))
    -   make $scene lazy ([436686f](https://github.com/RokuCommunity/roku-debug/commit/436686f))
    -   Standardized error display for all var lookup issues ([bae26a0](https://github.com/RokuCommunity/roku-debug/commit/bae26a0))
    -   Fix incorrect virtual display style for telnet vars ([74993fe](https://github.com/RokuCommunity/roku-debug/commit/74993fe))
    -   Fix failing test ([a84d678](https://github.com/RokuCommunity/roku-debug/commit/a84d678))
    -   Merge pull request #209 from rokucommunity/bugfix/issue-inspecting-non-container-variables ([9877301](https://github.com/RokuCommunity/roku-debug/commit/9877301))
    -   Merge pull request #213 from rokucommunity/bugfix/fix-file-path-links-with-spaces ([7abbc93](https://github.com/RokuCommunity/roku-debug/commit/7abbc93))
    -   Fix session-ending crash when ecp mode is not open enough. ([e02c14c](https://github.com/RokuCommunity/roku-debug/commit/e02c14c))
    -   Merge remote-tracking branch 'origin' into fix-ecp-limited-crash ([c9df598](https://github.com/RokuCommunity/roku-debug/commit/c9df598))
    -   Fix ecp limited crash ([PR #215](https://github.com/RokuCommunity/roku-debug/pull/215))

Contributions to [brighterscript-formatter](https://github.com/RokuCommunity/brighterscript-formatter):

-   [@philanderson888 (philanderson888)](https://github.com/philanderson888)
    -   initial commit for issue 77 ([fab3b89](https://github.com/RokuCommunity/brighterscript-formatter/commit/fab3b89))
    -   Remove unused token kinds from OutdentSpacerTokenKinds ([64bcfe9](https://github.com/RokuCommunity/brighterscript-formatter/commit/64bcfe9))
    -   Refactor IndentFormatter tests to uncomment and enable relevant code ([4a5704c](https://github.com/RokuCommunity/brighterscript-formatter/commit/4a5704c))
    -   remove console.logs and tidy up code ([88272b2](https://github.com/RokuCommunity/brighterscript-formatter/commit/88272b2))
    -   remove spacing ([c86ed13](https://github.com/RokuCommunity/brighterscript-formatter/commit/c86ed13))
    -   add tests for function class and function enum ([7e8ae0c](https://github.com/RokuCommunity/brighterscript-formatter/commit/7e8ae0c))
    -   add tests and passing code for Try ... Catch blocks ([9d78b17](https://github.com/RokuCommunity/brighterscript-formatter/commit/9d78b17))
    -   remove trailing space ([5c87e0f](https://github.com/RokuCommunity/brighterscript-formatter/commit/5c87e0f))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Add failing test ([4794157](https://github.com/RokuCommunity/brighterscript-formatter/commit/4794157))
    -   Merge pull request #96 from philanderson888/issue-77-formatter-with-keywords-in-function-name ([07e31fa](https://github.com/RokuCommunity/brighterscript-formatter/commit/07e31fa))

Contributions to [bslint](https://github.com/RokuCommunity/bslint):

-   [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    -   Actually add name property to plugin classes ([PR #137](https://github.com/RokuCommunity/bslint/pull/137))
    -   Adds -allow-implicit for type annotations ([PR #133](https://github.com/RokuCommunity/bslint/pull/133))
    -   Updates to Brighterscript v1.0.0-Alpha.42 ([PR #140](https://github.com/RokuCommunity/bslint/pull/140))

Contributions to [brs](https://github.com/RokuCommunity/brs):

-   [@lvcabral (Marcelo Lv Cabral)](https://github.com/lvcabral)
    -   Fixed dot chaining error scenarios ([PR #83](https://github.com/RokuCommunity/brs/pull/83))
    -   Implemented `ObjFun()` and aligned behavior of `CreateObject()` with Roku ([PR #84](https://github.com/RokuCommunity/brs/pull/84))
    -   Implemented function `toAssociativeArray()` to simplify creation of AA in TypeScript code ([PR #85](https://github.com/RokuCommunity/brs/pull/85))
    -   SceneGraph Node files reorganization ([PR #86](https://github.com/RokuCommunity/brs/pull/86))
    -   Implemented several improvements to SceneGraph ([PR #87](https://github.com/RokuCommunity/brs/pull/87))