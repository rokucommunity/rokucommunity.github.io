---
date: December 2022
summary: SceneGraph Inspector enhancements, BrighterScript bug fixes, new bslint rules and more
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
Welcome to the December 22 RokuCommunity update. Here are some of the key highlights:
- [SceneGraph Inspector properly orders ArrayGrid children](#scenegraph-inspector-properly-orders-arraygrid-children)
- [Focus ArrayGrid child in Scenegraph Inspector's "Show Focused Node" action](#focus-arraygrid-child-in-scenegraph-inspectors-show-focused-node-action)
- [Improved Roku Registry panel functionality](#improved-roku-registry-panel-functionality)
- [Fix `continue` repeat bug for debug protocol](#fix-continue-repeat-bug-for-debug-protocol)
- [Better component library postfixing](#better-component-library-postfixing)
- [Better `continue` indentation formatting](#better-continue-indentation)
- [More stable BrighterScript watch mode](#more-stable-watch-mode)
- [Discard function parameter types when transpiling BrighterScript](#discard-function-parameter-types)
- [Preventing incorrectly nested statements in BrighterScript](#preventing-incorrectly-nested-statements)
- [Fix bslint false positive for missing `return`](#fix-false-positive-for-missing-return)
- [Add new bslint `aa-comma-style` option `all-except-single-line`](#add-new-aa-comma-style-option-all-except-single-line)


# Debugging

## SceneGraph Inspector properly orders ArrayGrid children
The VSCode extension has a built-in node viewer (similar to [RALE](https://developer.roku.com/docs/developer-program/dev-tools/rale-tutorial.md)) called SceneGraph Inspector. In past releases, SceneGraph Inspector was able to show the children of [ArrayGrid](https://developer.roku.com/docs/references/scenegraph/abstract-nodes/arraygrid.md) nodes (MarkupList, RowList, etc...), but these child nodes were loaded in seemingly random order. As of v2.38.4, these children are now ordered properly.

![scenegraph inspector children](https://user-images.githubusercontent.com/2544493/213292185-80290666-d766-48a3-a91c-fb81889c0522.png)

## Focus ArrayGrid child in Scenegraph Inspector's "Show Focused Node" action
Historically the "Show Focused Node" logic in the Scenegraph Inspector would focus the ArrayGrid itself. As part of v2.38.4, that action will now dig deeper into the ArrayGrid child and focus the actual focused node.

![focus node](https://user-images.githubusercontent.com/2544493/213462276-e06b8e04-43e3-42ca-ab06-2de7b07b20c1.gif)


## Improved Roku Registry panel functionality
We've added "refresh" and "clear" buttons to the **Roku Registry** panel. The import/export functionalty has also been fixed.

![refresh and clear Roku Registry buttons](https://user-images.githubusercontent.com/2544493/213294070-5c973443-bfbd-42cc-9896-b999ac0e4c9e.png)


## Fix `continue` repeat bug for debug protocol
We've fixed a [debug session bug](https://github.com/RokuCommunity/roku-debug/pull/114) where a breakpoint would be replayed several times. This was only present when `enableDebugProtocol` was set to `true` and the developer issued a `continue` command. This was mostly caused by an underlying bug in the Roku OS when using the ADD_CONDITIONAL_BREAKPOINTS command, so to mitigate the problem we now *only* use that command when a user has actually defined a conditional breakpoint.

![breakpoint-stepping](https://user-images.githubusercontent.com/2544493/213468140-9703c7fd-6c72-42ba-8fa4-ff9854e0485e.gif)


## Better component library postfixing
A popular feature of the BrightScript Language extension for VSCode is the ability to host/sideload component libraries directly through the editor instead of needing to manually run an http server. (you can read more about component library support [here](https://rokucommunity.github.io/vscode-brightscript-language/Debugging/component-libraries.html)). The telnet debugger truncates file paths after a certain length (i.e. `...ource/main.brs`), which means there are situations where we can't tell if the path references a file in the main app or a component library. To work around this, all .brs files in the comonent library are renamed with a suffix. (i.e. `pkg:/source/networking.brs` -> `pkg:/source/networking__lib1.brs`). Then, when we receive a path from the server, we unravel that path and do an `.endsWith()` check to find the referenced path.

However, this rewrite logic was a little too aggressive, and would rewrite every script import regardless of whether it actually existed in the project, including things like: `common:/LibCore/v30/bslCore.brs`. [#112](https://github.com/RokuCommunity/roku-debug/pull/112) fixes this issue by restricting that rewrite logic to only relative, `pkg:/`, and `libpkg:/` paths.

![image](https://user-images.githubusercontent.com/2544493/213481236-cf21b4cd-c894-4a0d-93f5-df3edf091d12.png)


# Formatting
## Better `continue` indentation
The [brighterscript-formatter]() has been [enhanced](https://github.com/RokuCommunity/brighterscript-formatter/pull/65) to properly handle the new `continue while` and `continue for` keywords that were added in [11.5](https://developer.roku.com/docs/references/brightscript/language/program-statements.md#continue-for--continue-while)

![format-continue](https://user-images.githubusercontent.com/2544493/213262603-1aec826a-60bd-49db-9b4f-a464cda28c91.gif)


# BrighterScript

## More stable watch mode
We've [fixed](https://github.com/RokuCommunity/brighterscript/pull/755) an issue that would crash brighterscript when running in [watch mode](). This was happening because we weren't guarding the `transpile` flow, so if a 5 second transpile kicked off, and then a file changed, it would try to run another transpile. Since brighterscript modifies the AST during transpile, this could cause very strange behaviour. We fixed the issue by queueing transpile requests and running them one at a time instead of in parallel.

## Discard function parameter types
We've added a new performace-focused flag to BrighterScript that will remove all types from function parameters when transpiling the project. This should give your app a small performance boost since there *is* a runtime cost to running those checks.

![image](https://user-images.githubusercontent.com/2544493/212156958-27fb51c6-db31-42ad-a9cf-895945777098.png)

## Preventing incorrectly nested statements
We've added a new diagnostic that flags top-level statements (like namespaces, classes, etc...) whenever they are incorrectly defined inside of nested blocks (like function bodies, if statements, etc).
![image](https://user-images.githubusercontent.com/2544493/204573003-807c0064-76f1-43d8-bb29-349cb339409d.png)

## Miscellaneous BrighterScript fixes
 - We fixed a crash caused when validating `continue` statements ([#752](https://github.com/RokuCommunity/brighterscript/pull/752))
 - For plugin authors, we've added missing visitor params for `DottedSetStatement` ([#748](https://github.com/RokuCommunity/brighterscript/pull/748))
 - Ensure enums and interfaces are included in type definition files ([#757](https://github.com/RokuCommunity/brighterscript/pull/757))

# bslint
## Fix false positive for missing `return`
Bslint 0.7.6 includes a fix to account for `throw` statements when detecting missing `return` statements

**Before:**

![image](https://user-images.githubusercontent.com/2544493/213278382-c616ea38-a0d5-46dc-96e3-b19a944d8fa1.png)

**After:**

![image](https://user-images.githubusercontent.com/2544493/213279270-21a7f779-451a-4304-a44b-dea6801e685e.png)


## Add new `aa-comma-style` option `all-except-single-line`
bslint's `aa-comma-style` rule has been given a new option, `all-except-single-line`, which will enforce that every line in an associative array, _except_ for single-line statements.

![image](https://user-images.githubusercontent.com/2544493/213277615-aa653f6d-ae1e-4991-a7fc-cb5a4d4de6f0.png)


# Notable bug fixes
 - vscode-brightscript-language: Make vsix smaller by excluding unneeded files ([#454](https://github.com/RokuCommunity/vscode-brightscript-language/pull/454))
 - roku-debug: stability around breakpoint verification ([#117](https://github.com/RokuCommunity/roku-debug/pull/117))


# Thank you
Last but certainly not least, a big ***Thank You*** to the following people who contributed this month:

Contributions to [vscode-brightscript-language](https://github.com/RokuCommunity/vscode-brightscript-language):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Make vsix smaller by excluding unneeded files ([PR #454](https://github.com/RokuCommunity/vscode-brightscript-language/pull/454))
    - Fix some DebugConfigProvider tests ([PR #453](https://github.com/RokuCommunity/vscode-brightscript-language/pull/453))
    - Add syntax highlighting test for strings ([PR #442](https://github.com/RokuCommunity/vscode-brightscript-language/pull/442))
    - Fix eslint issues after upgrade. ([PR #452](https://github.com/RokuCommunity/vscode-brightscript-language/pull/452))
    - Upgrade webview build system ([PR #450](https://github.com/RokuCommunity/vscode-brightscript-language/pull/450))
    - Test and retry for release script ([PR #451](https://github.com/RokuCommunity/vscode-brightscript-language/pull/451))
 - [@triwav (Brian Leighty)](https://github.com/triwav)
    - upgrade roku-test-automation module and update code accordingly ([PR #440](https://github.com/RokuCommunity/vscode-brightscript-language/pull/440))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Throttle transpiling to prevent crashes ([PR #755](https://github.com/RokuCommunity/brighterscript/pull/755))
    - Fix exception while validating continue statement ([PR #752](https://github.com/RokuCommunity/brighterscript/pull/752))
    - Add missing visitor params for DottedSetStatement ([PR #748](https://github.com/RokuCommunity/brighterscript/pull/748))
    - Flag incorrectly nested statements ([PR #747](https://github.com/RokuCommunity/brighterscript/pull/747))
    - Ensure enums and interfaces persist in typedefs ([PR #757](https://github.com/RokuCommunity/brighterscript/pull/757))
 - [@xgouchet (Xavier F. Gouchet)](https://github.com/xgouchet)
    - Let users use or discard explicit types ([PR #744](https://github.com/RokuCommunity/brighterscript/pull/744))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - disable code coverage in CI (temporarily) ([e0982ae](https://github.com/RokuCommunity/roku-debug/commit/e0982ae))
    - Fix npm audit issues. ([e1857c7](https://github.com/RokuCommunity/roku-debug/commit/e1857c7))
    - Fix "continue" repeat bug in protocol adapter ([PR #114](https://github.com/RokuCommunity/roku-debug/pull/114))
    - Fix issue with truncated debugger paths ([PR #113](https://github.com/RokuCommunity/roku-debug/pull/113))
    - Debug protocol breakpoint verification ([PR #117](https://github.com/RokuCommunity/roku-debug/pull/117))
 - [@philanderson888 (Phil Anderson)](https://github.com/philanderson888)
    - Bugfix/do not alter out file path for libraries ([PR #112](https://github.com/RokuCommunity/roku-debug/pull/112))

Contributions to [brighterscript-formatter](https://github.com/RokuCommunity/brighterscript-formatter):
 - [@iBicha (Brahim Hadriche)](https://github.com/iBicha)
    - Fix continue for ([PR #65](https://github.com/RokuCommunity/brighterscript-formatter/pull/65))

Contributions to [bslint](https://github.com/RokuCommunity/bslint):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Fix build issues ([c60c1d5](https://github.com/RokuCommunity/bslint/commit/c60c1d5))
 - [@justinMBullard (Justin Bullard)](https://github.com/justinMBullard)
    - Add new aa-comma-style all-except-single-line. ([PR #80](https://github.com/RokuCommunity/bslint/pull/80))
 - [@xgouchet (Xavier F. Gouchet)](https://github.com/xgouchet)
    - Avoid false positive for missing return ([PR #78](https://github.com/RokuCommunity/bslint/pull/78))
    - Add documentaton for bslint usage with VSCode ([PR #77](https://github.com/RokuCommunity/bslint/pull/77))