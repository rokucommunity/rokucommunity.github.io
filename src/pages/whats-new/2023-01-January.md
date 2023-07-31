---
date: January 2023
summary: Complex debug protocol REPL expressions, SceneGraph Inspector improvements, callfunc validations, syntax highlighting, and more.
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
This month we made some great improvements to the debugging experience, such as support for [executing complex expressions in the REPL and watch panels](#allow-relative-rale-tracker-task-path), fixing that frustrating [infinite spin](#fix-infinite-spin-for-unloaded-vars) issue in the variables panel, and some nice new features in [SceneGraph Inspector](#scenegraph-inspector-improvements).

When editing your projects, you will now see a new diagnostic whenever you use more than the [max callfunc arguments](#new-diagnostic-for-max-callfunc-arguments), and we've improved syntax highlighting for the [`continue for` and `continue while`](#syntax-highlighting-for-continue-for-and-continue-while) keywords.

We also made a few [non-user-facing](#misc) changes to help RokuCommunity contributors work on the projects.


# Debugging
## Allow relative RALE tracker task path
The RALE tracker task path can now be a relative path, and supports replacement variables like `${workspaceFolder}`
 ![image](https://user-images.githubusercontent.com/2544493/221651842-93754a1e-6bbd-4d5a-b75f-da72b0fcfe58.png)

## Execute complex REPL expressions in the Run & Debug panel
Now the Watch section of the Run & Debug panel supports complex REPL expressions when using Roku's new [debug protocol](https://developer.roku.com/en-ca/docs/developer-program/debugging/socket-based-debugger.md). This means you can now execute expressions like `doSomething()` or `"alpha" + chr(3)`.

![image](https://user-images.githubusercontent.com/29876959/223409615-49099453-cdad-4e9c-a8de-16e4030d78d2.png)

> Note that this already worked when using telnet, and is now functional when you have the Debug Protocol enabled.

![image](https://user-images.githubusercontent.com/29876959/223410841-e3b97783-2e34-4fef-b7d5-4cdc138a5a48.png)

## Fix infinite spin for unloaded vars
Fix a bug where the UI would spin forever when trying to load variables that no longer exist, and would then cause the rest of the debug session to become unresponsive. Now we show a useful error message instead.

Before:
![image](https://user-images.githubusercontent.com/2544493/210622158-175282bf-2113-4bc0-9e97-796d378d9967.png)

After:
![image](https://user-images.githubusercontent.com/2544493/210621741-2a9cc1cd-4b65-4358-8c43-e244cacd0b80.png)


## Hide certain prefixed variables in the Debug panel
Our debug adapters currently create variables like `vscodeLoopKey`, `vscodeLoopItem`, etc. These variables show up in the `Local variables` panel after the first step. We have established the prefix `__rokudebug__` for tool-generated variables and we will now filter variables that start with this prefix so they don't show in the the various Debug panels.

If for some reason you need to see these variables, you can set `"showHiddenVariables": true` in your `launch.json`.


## Fix off-by-1 bug with threads over protocol
We fixed a bug in the Debug Protocol where the wrong line numbers were being reported for the threads response. We had incorrectly assumed that the protocol reported 0-based line numbers, when in fact they are 1-based. This was largly not evident to the user because we had a few workarounds in place, but now we can directly trust the values coming from the device.

## Increased the timeout for debug protocol control
For larger apps it takes longer than 5 seconds to finish parsing and compiling the app, which would cause the debug protocol to time out and terminate the debug session. In the short term we just doubled our internal timeout to 10 seconds, but ideally this would be configurable so that may eventually be implemented in a future release.

## SceneGraph Inspector improvements
The SceneGraph Inspector has been enhanced with a new keypath syntax which should make it much easier to identify a specific node in the scene at a point in time. This is powered by some [better keypath logic](https://github.com/RokuCommunity/vscode-brightscript-language/pull/455) in RDB. You can see the new `keyPath` field in the screenshot below:

![image](https://user-images.githubusercontent.com/2544493/221642229-510a37ed-d37b-4c6c-ac6b-8d0380343a30.png)

We've also improved the reliability of the focus scrolling.

# BrighterScript
## New diagnostic for max callfunc arguments
An undocumented limitation of SceneGraph's `callfunc` functionality is that you cannot pass more than 5 arguments. Doing so would cause the call to silently fail, and sometimes even crash the application. [BrighterScript#765](https://github.com/RokuCommunity/brighterscript/pull/765) adds a diagnostic to flag these types of calls so you can detect them at compile time instead of at runtime.

![image](https://user-images.githubusercontent.com/29876959/223404690-cef9d4a3-884a-4088-a0b8-8bbc998b94cc.png)

## Syntax highlighting for `continue for` and `continue while`
Syntax highlighting for the new `continue while` and `continue for` keywords was fixed in [v2.38.7](https://github.com/rokucommunity/vscode-brightscript-language/blob/master/CHANGELOG.md#2387---2023-01-24)

**Before:**

![image](https://user-images.githubusercontent.com/2544493/213289463-b614a8cf-e84d-4cbe-b144-295bbbc63b93.png)

**After:**

![image](https://user-images.githubusercontent.com/2544493/213289592-a593fe99-51ab-4d32-82f4-df6770912a93.png)

## Fix process to test related projects

We want to make sure changes to BrighterScript don't break the main projects that depend on it. For a while now, our script to test the related `RokuCommunity` projects had problems with certain repositories that found ancestors inside `node_modules`. To fix that, now we use the system `tempdir` instead of a local `.tmp` folder.

We have also started running the test suites from the [rooibos](https://github.com/georgejecook/rooibos) and [maestro-roku-bsc-plugin](https://github.com/georgejecook/maestro-roku-bsc-plugin) projects.

# Misc
## Improved extension development experience
Historically, you'd need to manually launch watcher tasks for each RokuCommunity project that you were actively working on. As of [vscode-brightscript-language#456](https://github.com/RokuCommunity/vscode-brightscript-language/pull/456), we automatically find all RokuCommunity repositories cloned at the same level as vscode-brightscript-language, and launch a combined watcher task for all of them. This greatly simplifies the development experience, reducing confusion for community contributors.

## Fix Github action that creates .vsix files on PR changes

If you are a contributor to the [roku-debug](https://github.com/rokucommunity/roku-debug) repository, you might have notice that we have a commenter bot that creates `.vsix` files for you on each PR update.

![image](https://user-images.githubusercontent.com/29876959/223412230-2fb92db3-9f81-4bec-952e-7c5beffd3a44.png)

The link to the instalation instructions was broken. Now we have updated it to open the correct page in our new website: [rokucommunity.github.io](https://rokucommunity.github.io/).

# Thank you
Last but certainly not least, a big ***Thank You*** to the following people who contributed this month:

Contributions to [vscode-brightscript-language](https://github.com/RokuCommunity/vscode-brightscript-language):
 - [@triwav (Brian Leighty)](https://github.com/triwav)
    - Fix rdb keypaths and focus scrolling ([PR #455](https://github.com/RokuCommunity/vscode-brightscript-language/pull/455))
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - watch-all ([PR #456](https://github.com/RokuCommunity/vscode-brightscript-language/pull/456))
    - Use png instead of svg ([d1e3d29](https://github.com/RokuCommunity/vscode-brightscript-language/commit/d1e3d29))
    - Fix vsmarketplace badge ([b2153a3](https://github.com/RokuCommunity/vscode-brightscript-language/commit/b2153a3))
    - Fix dependency order in watch-all ([b7843a7](https://github.com/RokuCommunity/vscode-brightscript-language/commit/b7843a7))
    - fix: continue keyword colorization ([PR #459](https://github.com/RokuCommunity/vscode-brightscript-language/pull/459))
 - [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    - Watch all dependency and configuration updates ([PR #460](https://github.com/RokuCommunity/vscode-brightscript-language/pull/460))
 - [@iBicha (Brahim Hadriche)](https://github.com/iBicha)
    - Allow relative injectRaleTrackerTask ([PR #462](https://github.com/RokuCommunity/vscode-brightscript-language/pull/462))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Fixing issues before release 0.61.3 ([fd841a0](https://github.com/RokuCommunity/brighterscript/commit/fd841a0))
    - Fix test-related-projects. Reenable rooibos ([PR #761](https://github.com/RokuCommunity/brighterscript/pull/761))
 - [@iObject (Tyler Smith)](https://github.com/iObject)
    - Add diagnostic for passing more than 5 arguments to a callFunc ([PR #765](https://github.com/RokuCommunity/brighterscript/pull/765))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):
 - [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    - Execute command for repl expressions ([PR #119](https://github.com/RokuCommunity/roku-debug/pull/119))
    - Hiding prefixed variables in the debug variable panel ([PR #127](https://github.com/RokuCommunity/roku-debug/pull/127))
    - Fix isAssignableExpression to correctly support dotted and indexed statements ([PR #128](https://github.com/RokuCommunity/roku-debug/pull/128))
 - [@adellhk (adellhk)](https://github.com/adellhk)
    - Update create-vsix.yml ([PR #126](https://github.com/RokuCommunity/roku-debug/pull/126))
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Fix inifinite-spin for unloaded vars ([PR #120](https://github.com/RokuCommunity/roku-debug/pull/120))
    - Fix off-by-1 bug with threads over protocol ([PR #132](https://github.com/RokuCommunity/roku-debug/pull/132))
    - Increase the timeout for debug protocol control ([PR #134](https://github.com/RokuCommunity/roku-debug/pull/134))

Contributions to [bslint](https://github.com/RokuCommunity/bslint):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Fixing issues before release 0.8.1 ([5d84d9e](https://github.com/RokuCommunity/bslint/commit/5d84d9e))

Contributions to [roku-report-analyzer](https://github.com/RokuCommunity/roku-report-analyzer):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Fix audit issues ([925c9f8](https://github.com/RokuCommunity/roku-report-analyzer/commit/925c9f8))