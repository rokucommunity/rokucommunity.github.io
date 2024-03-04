---
date: November 2022
summary: Changes to vscode-brightscript-language, brighterscript, roku-debug
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
Welcome to the November 2022 edition of "What's New in RokuCommunity". Please consider <a target="_blank" href="https://rokucommunity.substack.com/">subscribing</a> to stay up to date with what's happening in RokuCommunity.

## Roku Dev Summit Presentation
[Bronley Plumb](https://github.com/TwitchBronBron) and [Christopher Dwyer-Perkins](https://github.com/chrisdp) had the priviledge to present at the Roku 2022 Developer Summit on November 2. It was a great opportunity to share an overview of the Language features and debugging experience in the VSCode extension, as well as an overview of the popular BrighterScript Language. You can watch the presentation in the link below:

Full video:
- [Roku 2022 Developer Summit: RokuCommunity tools panel](https://youtu.be/117g078_tXc)

Individual demos:
- [Real-time Roku project validation in VSCode](https://youtu.be/APdYBMoDTis)
- [Debugger](https://youtu.be/5I0FwT4-h-Q)
- [BrighterScript](https://youtu.be/1rjNGi9c-rA)


# Debugging
## Hide "unused variable" warnings
Starting in Roku OS 11.5, developers can now hide on-device compiler warnings, such as `BRIGHTSCRIPT: WARNING: unused varaible 'someVar'...`. The warnings can be disabled by sending `brightscript_warnings 0` as a [port 8080 command](https://developer.roku.com/en-gb/docs/developer-program/debugging/debugging-channels.md#scenegraph-debug-server-port-8080-commands).

The BrightScript VSCode extension supports auto-running this command before every debug session by adding `brightscript_warnings 0` to the `autoRunSgDebugCommands` in the `launch.json`.
![hide-unused-vars](https://user-images.githubusercontent.com/2544493/211400813-01ab14b5-13f5-4ceb-983c-611bc76fbe8a.gif)


# Language Features
## Faster project validation
In-editor project validation just got a whole lot faster! Thanks to some caching improvements in the BrighterScript language server, a large project that we often use for benchmarking saw validation times reduced from 5.8 seconds to 1.2 seconds. You can read more about it in [BrighterScript#739](https://github.com/RokuCommunity/brighterscript/pull/739).

# BrighterScript
## Prevent namespaces being used as variables
BrighterScript now warns you when you try to use a namespace as if it were a variable. Since namespaces don't actually exist at runtime, this would lead to some very strange errors. Thankfully, now you'll be able to catch these issues at compile-time!
![image](https://user-images.githubusercontent.com/2544493/199717757-6e284c3a-984e-4c9d-9c3c-67141e306e8c.png)

## Better AST parent handling for bsc plugins in v0.60.5
Historically, it's been tedious for BrighterScript plugins to determine parent-child relationships between AST nodes. Usually there was a lot of full tree walking which can waste quite a lot of cycles. [v0.55.0](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#0550---2022-08-03) attempted to solve this by auto-linking the children to their parents in the `onFileValidate` event, but this was also confusing to plugin authors because it was not obvious why _that_ event hook, and it was just one more magical thing devs had to remember.

So, to improve this even further, [v0.60.5](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#0605---2022-11-03) has introduced a [new feature](https://github.com/RokuCommunity/brighterscript/pull/732) that auto-links a child's `.parent` property every time the tree is walked. This means you no longer need to think about what part of the lifecycle. As long as plugin authors use the ast walk/visitor pattern, the linking will happen automatically. That's one less thing to think about.
![image](https://user-images.githubusercontent.com/2544493/211406128-f44ca079-3e45-4ab5-aaca-440909561bbd.png)

## Notable bsc fixes
 - Fix crash in `getDefinition` ([#734](https://github.com/RokuCommunity/brighterscript/pull/734))
 - Prevent a double `super` call in subclasses ([#740](https://github.com/RokuCommunity/brighterscript/pull/740))
 - Fixes issues with Roku doc scraper and adds missing components ([#736](https://github.com/RokuCommunity/brighterscript/pull/736))


# Thank you
Last but certainly not least, a big ***Thank You*** to the following people who contributed this month:

Contributions to [vscode-brightscript-language](https://github.com/RokuCommunity/vscode-brightscript-language):
 - [@chrisdp (christopher Dwyer-Perkins)](https://github.com/chrisdp)
    - Added the brightscript_warnings command ([PR #446](https://github.com/RokuCommunity/vscode-brightscript-language/pull/446))
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Add roku-promise to the releases list ([befb7ab](https://github.com/RokuCommunity/vscode-brightscript-language/commit/befb7ab))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Cache `getCallableByName` ([PR #739](https://github.com/RokuCommunity/brighterscript/pull/739))
    - Prevent namespaces being used as variables ([PR #738](https://github.com/RokuCommunity/brighterscript/pull/738))
    - Fix audit issues ([569fadc](https://github.com/RokuCommunity/brighterscript/commit/569fadc))
    - Refactor SymbolTable and AST parent logic ([PR #732](https://github.com/RokuCommunity/brighterscript/pull/732))
    - Fix crash in `getDefinition` ([PR #734](https://github.com/RokuCommunity/brighterscript/pull/734))
    - Prevent a double `super` call in subclasses ([PR #740](https://github.com/RokuCommunity/brighterscript/pull/740))
 - [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    - Fixes issues with Roku doc scraper and adds missing components ([PR #736](https://github.com/RokuCommunity/brighterscript/pull/736))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):
 - [@chrisdp (christopher Dwyer-Perkins)](https://github.com/chrisdp)
    - Added the brightscript_warnings command ([PR #110](https://github.com/RokuCommunity/roku-debug/pull/110))
