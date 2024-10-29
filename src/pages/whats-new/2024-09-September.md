---
date: September 2024
summary: Changes to vscode-brightscript-language, brighterscript, bslint
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
Welcome to the September 2024 edition of "What's New in RokuCommunity." Please consider <a target="_blank" href="https://rokucommunity.substack.com/">subscribing</a> to stay up to date with what's happening in RokuCommunity.

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
## Sort imports setting
<!-- 2024-07-25 (for v2.49.0 released on 2024-09-06), https://github.com/RokuCommunity/vscode-brightscript-language/pull/582 -->

I saw this option missing - is this all it takes to make it available?


## Add `@rokucommunity/promises` to releases flow
<!-- 2024-08-23 (for v2.49.0 released on 2024-09-06), ([1e0495d](https://github.com/RokuCommunity/vscode-brightscript-language/commit/1e0495d)) -->




## Add syntax highlighting support for bsdoc tags
<!-- 2024-09-06 (for v2.49.0 released on 2024-09-06), https://github.com/RokuCommunity/vscode-brightscript-language/pull/586 -->

Adds support for syntax highlighting of bsdoc tags and types.

![image](https://github.com/user-attachments/assets/279bd2db-4e4d-4eb8-a250-025d29ef0887)



## Fix Roku Device View by upgrading to RTA with patch to use postman-request for screenshot triggering
<!-- 2024-09-19 (for v2.49.1 released on 2024-09-19), https://github.com/RokuCommunity/vscode-brightscript-language/pull/589 -->




## Fix create-vsix
<!-- 2024-09-23 (for v2.50.0 released on 2024-09-23), https://github.com/RokuCommunity/vscode-brightscript-language/pull/590 -->

Fix create-vsix by upgrading to upload-artifact@v4


## Adds ability to install a missing bsc version
<!-- 2024-09-23 (for v2.50.0 released on 2024-09-23), https://github.com/RokuCommunity/vscode-brightscript-language/pull/583 -->

Adds the ability to install brighterscript versions automatically without requiring it to exist in `${workspaceFolder}/node_modules`.

1. After this PR, the bsdk value can support the following values:

    - an absolute path to a preinstalled version of brighterscript (i.e. `C:/roku/brighterscript`)
    - a relative path to a preinstalled version of brighterscript (i.e. `./node_modules/brighterscript`)
    - an exact version of brighterscript from the npm registry (i.e. `0.67.6`, `1.0.0-alpha.36`)
    - an absolute path to a `.tgz` file (i.e. `C:/downloads/brighterscript-0.67.6.tgz`)
    - a relative path to a `.tgz` file (i.e. `./packages/brighterscript-0.67.6.tgz`)
    - a URL to a .tar file (i.e. `npm install https://github.com/rokucommunity/brighterscript/releases/download/v0.67.6/brighterscript-0.67.6.tgzz`)

2. We've added a new setting called `npmCacheRetentionDays` which determines how long to wait before deleting unused brighterscript versions from the local cache. 
3. Added a new command called `clearNpmPackageCache` which will clear all downloaded brighterscript packages
4. Added a new series of menu options for downloading brighterscript versions, and also a few maintenance items like opening the install directory or clearing the downloaded files
    ![image](https://github.com/user-attachments/assets/5374f524-0917-45bf-9c0e-c036f17a373d)

Here's a demo of the feature in action:

https://github.com/user-attachments/assets/95b09ad5-a5a0-46f3-b960-81f296d962db




TODO:

- [x] add menu item/command to clear all cached versions
- [x] delete bsc versions that are older than 45 days (make this configurable)
- [x] add `vscode.window.onDidChangeWindowState` event to mark a bsc version's "last used date"
- [x] show all npm versions in the dropdown
- [x] show mainline and prerelease versions in separate menus
- [x] verify the extension storage gets cleaned up on extension uninstall (there's no way to do this, it's probably fine?)


## Fix crashes where workspaceFolders was undefined
<!-- 2024-09-26 (for v2.50.2 released on 2024-09-27), https://github.com/RokuCommunity/vscode-brightscript-language/pull/593 -->

Fix several spots where workspaceFolders was not being safely accessed, since it can sometimes be `undefined`.

Originally reported in #588 


## Fix lsp missing crash
<!-- 2024-09-26 (for v2.50.2 released on 2024-09-27), https://github.com/RokuCommunity/vscode-brightscript-language/pull/594 -->

Fix crash when the local node_modules language server couldn't be loaded. It works again.

Also updated the error message to be more concise, helping to remind people to run `npm install` and moving the path to the end of the message (since most people don't read the path anyway...)


## Merge pull request #595 from rokucommunity/master2
<!-- 2024-09-27 (for v2.50.2 released on 2024-09-27), ([310f19f](https://github.com/RokuCommunity/vscode-brightscript-language/commit/310f19f)) -->




## Consistent device list sorting and formatting.
<!-- 2024-09-27 (for v2.50.3 released on 2024-09-27), https://github.com/RokuCommunity/vscode-brightscript-language/pull/596 -->

- Ensure the device lists are sorted in a deterministic way.
- unify the formatting of the device list to provide more useful information

**Before:**
![image](https://github.com/user-attachments/assets/a59499fe-fde8-4267-9b87-c99d58ab68ea)

**After:**
![image](https://github.com/user-attachments/assets/dc1f0611-6265-4978-a4b2-ae8ff8d46d18)




# Debugging


# BrighterScript

## Include missing transpiled comments
<!-- 2024-08-13 (for v1.0.0-alpha.37 released on 2024-09-25), https://github.com/RokuCommunity/brighterscript/pull/1278 -->

Fixes several issues where comments were being missed when transpiling. Specifically around annotations above statements, and namespaced function calls.

Fixes #1274


## Add plugin naming convention
<!-- 2024-08-15 (for v1.0.0-alpha.37 released on 2024-09-25), https://github.com/RokuCommunity/brighterscript/pull/1284 -->

Adds docs outlining our plugin naming conventions


## Added tests and fixes around transpiling variables that shadow stuff
<!-- 2024-08-15 (for v1.0.0-alpha.37 released on 2024-09-25), https://github.com/RokuCommunity/brighterscript/pull/1282 -->

Addresses #1277 

Fixes transpilation issues with variables that shadow things in namespaces.

Basically, "closest thing wins"

If a variable or function param shadows a const, enum, etc. then it does not do any special transpilation, but instead uses it as-is.

However, there are still diagnostics for when a variable shadows a non-namespaced function or class, because using those still lead to un-defined behaviour.

eg:

```
sub foo()
end sub

sub bar()
  foo = 1 ' this shadows the function above
  print foo ' this could lead to un-defined behaviour
end sub
```


however, if the function or class IS in a namespace, then it’s okay, because the transpilation will change the name:
```
namespace alpha
  sub foo()
  end sub

  sub bar()
    foo = 1 
    print foo
  end sub
end namespace
```
transpiles to:

```
sub alpha_foo()
end sub

sub alpha_bar()
  foo = 1  
  print foo
end sub
```

because of transpilation of the namespace, `foo` no longer shadows the function, so it is OK


## Handles diagnostic with invalid location, and semantic tokens for unscoped file
<!-- 2024-08-19 (for v1.0.0-alpha.37 released on 2024-09-25), https://github.com/RokuCommunity/brighterscript/pull/1286 -->

Fixes #1275

Also, if there was a BrsFile that was unscoped, like in `/components` but not included in a component, the Language server would crash in the semantic tokens parser when trying to link a scope




## Eliminate FunctionExpression.functionStatement
<!-- 2024-08-20 (for v1.0.0-alpha.37 released on 2024-09-25), https://github.com/RokuCommunity/brighterscript/pull/1287 -->

Addresses #1283 




## Merges `ExitForStatement` and `ExitWhileStatement`
<!-- 2024-08-21 (for v1.0.0-alpha.37 released on 2024-09-25), https://github.com/RokuCommunity/brighterscript/pull/1289 -->

There's a bit of weirdness here because `exitwhile` is an accepted statement, but `exitfor` is not.

Addresses #1285


## Add support for roIntrinsicDouble
<!-- 2024-08-23 (for v1.0.0-alpha.37 released on 2024-09-25), https://github.com/RokuCommunity/brighterscript/pull/1291 -->

Fixes bug for missing known datatype `roIntrinsicDouble`.

![image](https://github.com/user-attachments/assets/d9e41643-2318-417e-82d1-076cdcc65a5b)



## Add support for resolving sourceRoot at time of config load
<!-- 2024-08-23 (for v1.0.0-alpha.37 released on 2024-09-25), https://github.com/RokuCommunity/brighterscript/pull/1290 -->

Add bsconfig value for resolving the `sourceRoot` at time of loading the config. 


## Adds support for types declared in comments
<!-- 2024-09-23 (for v1.0.0-alpha.37 released on 2024-09-25), https://github.com/RokuCommunity/brighterscript/pull/1293 -->

Adds ability to define variable types in comments:
 - `@param {type}` for function params
 - `@return {type}` for function return type
 - `@type {type}` and `@type {type} varName` for variables in functions


## Fix some null crashes
<!-- 2024-09-23 (for v1.0.0-alpha.37 released on 2024-09-25), https://github.com/RokuCommunity/brighterscript/pull/1304 -->

Fix a few crashes related to diagnostics having null location or uri properties. No idea how these happen, but it's still better to not crash.


## Lock in github action versions
<!-- 2024-09-25 (for v1.0.0-alpha.37 released on 2024-09-25), ([95eba693](https://github.com/RokuCommunity/brighterscript/commit/95eba693)) -->




## Ast node clone
<!-- 2024-09-25 (for v0.67.7 released on 2024-09-25), https://github.com/RokuCommunity/brighterscript/pull/1281 -->

Add `.clone()` method to AstNode and BscType objects. This will make for much easier duplication of template code for plugins. 

- [x] add `.clone()` method to `Statement`s
- [x] add `.clone()` method to `Expression`s
- [x] add `.clone()` method to `BscType`s
- [x] add unit tests



# Community Tools

## bslint
## Conditional compile code flow - var tracking
<!-- 2024-09-16 (for v1.0.0-alpha.37 released on 2024-09-25), https://github.com/RokuCommunity/bslint/pull/132 -->

fixes #127 

Valid error:

![image](https://github.com/user-attachments/assets/d95114cb-5bae-4fca-ad1f-c4e0dbfc61dc)

No error with valid code:

![image](https://github.com/user-attachments/assets/2bc9a86d-c2fc-4c9b-8140-fc646c66c392)




## upgrade to bsc 1.0.0-alpha.37
<!-- 2024-09-25 (for v1.0.0-alpha.37 released on 2024-09-25), ([5af5184](https://github.com/RokuCommunity/bslint/commit/5af5184)) -->





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

-   [@iBicha (Brahim Hadriche)](https://github.com/iBicha)
    -   Sort imports setting ([PR #582](https://github.com/RokuCommunity/vscode-brightscript-language/pull/582))
-   [@triwav (Brian Leighty)](https://github.com/triwav)
    -   Fix Roku Device View by upgrading to RTA with patch to use postman-request for screenshot triggering ([PR #589](https://github.com/RokuCommunity/vscode-brightscript-language/pull/589))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Add `@rokucommunity/promises` to releases flow ([1e0495d](https://github.com/RokuCommunity/vscode-brightscript-language/commit/1e0495d))
    -   Add syntax highlighting support for bsdoc tags ([PR #586](https://github.com/RokuCommunity/vscode-brightscript-language/pull/586))
    -   Fix create-vsix ([PR #590](https://github.com/RokuCommunity/vscode-brightscript-language/pull/590))
    -   Adds ability to install a missing bsc version ([PR #583](https://github.com/RokuCommunity/vscode-brightscript-language/pull/583))
    -   Fix crashes where workspaceFolders was undefined ([PR #593](https://github.com/RokuCommunity/vscode-brightscript-language/pull/593))
    -   Fix lsp missing crash ([PR #594](https://github.com/RokuCommunity/vscode-brightscript-language/pull/594))
    -   Merge pull request #595 from rokucommunity/master2 ([310f19f](https://github.com/RokuCommunity/vscode-brightscript-language/commit/310f19f))
    -   Consistent device list sorting and formatting. ([PR #596](https://github.com/RokuCommunity/vscode-brightscript-language/pull/596))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):

-   [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    -   Added tests and fixes around transpiling variables that shadow stuff ([PR #1282](https://github.com/RokuCommunity/brighterscript/pull/1282))
    -   Handles diagnostic with invalid location, and semantic tokens for unscoped file ([PR #1286](https://github.com/RokuCommunity/brighterscript/pull/1286))
    -   Eliminate FunctionExpression.functionStatement ([PR #1287](https://github.com/RokuCommunity/brighterscript/pull/1287))
    -   Merges `ExitForStatement` and `ExitWhileStatement` ([PR #1289](https://github.com/RokuCommunity/brighterscript/pull/1289))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Include missing transpiled comments ([PR #1278](https://github.com/RokuCommunity/brighterscript/pull/1278))
    -   Add plugin naming convention ([PR #1284](https://github.com/RokuCommunity/brighterscript/pull/1284))
    -   Add support for roIntrinsicDouble ([PR #1291](https://github.com/RokuCommunity/brighterscript/pull/1291))
    -   Add support for resolving sourceRoot at time of config load ([PR #1290](https://github.com/RokuCommunity/brighterscript/pull/1290))
    -   Adds support for types declared in comments ([PR #1293](https://github.com/RokuCommunity/brighterscript/pull/1293))
    -   Fix some null crashes ([PR #1304](https://github.com/RokuCommunity/brighterscript/pull/1304))
    -   Lock in github action versions ([95eba693](https://github.com/RokuCommunity/brighterscript/commit/95eba693))
    -   Ast node clone ([PR #1281](https://github.com/RokuCommunity/brighterscript/pull/1281))

Contributions to [bslint](https://github.com/RokuCommunity/bslint):

-   [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    -   Conditional compile code flow - var tracking ([PR #132](https://github.com/RokuCommunity/bslint/pull/132))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   upgrade to bsc 1.0.0-alpha.37 ([5af5184](https://github.com/RokuCommunity/bslint/commit/5af5184))