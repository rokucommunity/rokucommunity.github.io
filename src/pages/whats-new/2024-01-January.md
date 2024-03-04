---
date: January 2024
summary: Changes to vscode-brightscript-language, brighterscript, roku-debug, brighterscript-formatter, bslint, brs
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
Welcome to the January 2024 edition of "What's New in RokuCommunity". Please consider <a target="_blank" href="https://rokucommunity.substack.com/">subscribing</a> to stay up to date with what's happening in RokuCommunity.


## We need your help
The RokuCommunity projects are maintained by a relatively small group of developers (mostly volunteers), and we have a growing list of of unresolved issues. We need your help! There are many different ways you can contribute. Whether it's addressing bugs, improving documentation, introducing new features, or simply helping us manage our expanding list of GitHub issues, your involvement would be greatly appreciated. We are more than happy to guide you in finding the most suitable contribution method that aligns with your interests. To learn more about how you can contribute, feel free to reach out to us on [Slack](https://join.slack.com/t/rokudevelopers/shared_invite/zt-4vw7rg6v-NH46oY7hTktpRIBM_zGvwA), or explore the existing GitHub issues:

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

This month, we'd like to draw attention to [bslint#41](https://github.com/rokucommunity/bslint/issues/41). Many linters support enforcing that all files have a trailing newline, which ensures consistency across your project. @rokucommunity/bslint does not currently have a rule for this, which is something we'd love to see added. Here's how the error looks in a typescript project using eslint:

![image](https://github.com/rokucommunity/bslint/assets/2544493/e5458612-4667-4a03-a1af-21f7c6536a3e)

If you're interested in working on this feature, please comment on the [github issue](https://github.com/rokucommunity/bslint/issues/41) or reach out to us on [Slack](https://join.slack.com/t/rokudevelopers/shared_invite/zt-4vw7rg6v-NH46oY7hTktpRIBM_zGvwA)



# Editor
## Always request screenshot on initial load, add ability to copy screenshot
<!-- 2023-12-20 (for v2.45.10 released on 2024-01-10), https://github.com/RokuCommunity/vscode-brightscript-language/pull/536 -->

We fixed a few bugs in the "Device View" panel related to downloading a screenshot. Previously, if you didn't have the continuous screenshot capture enabled, it wouldn't have downloaded the very first screenshot, requiring you to click "refresh" in order for this functionality to work. Now it requests an initial screenshot which mitigates the issue.

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/2d45bf7c-ce14-4f4f-a5cc-e15b69687f97)



## Pass the modal property from the PopupMessageEvent
<!-- 2024-01-08 (for v2.45.10 released on 2024-01-10), https://github.com/RokuCommunity/vscode-brightscript-language/pull/537 -->

We've improved the way certain errors are presented in vscode by showing them in a modal dialog box. Previously many of these errors were shown in a little toast popup at the bottom right of vscode which can easily be missed. Users were regularly frustrated when vscode would fail to launch a debug session, so hopefully this will help draw more visibility to certain types of errors. The most common error is a bad password.

Here's a screenshot of the new popup:
<img width="1100" alt="Screenshot 2024-01-08 091210" src="https://github.com/rokucommunity/vscode-brightscript-language/assets/118202694/c6d95683-7c9d-4fff-afa8-c89b93bf09f8">


## Sets `stagingDir` properly in DebugConfigurationProvider
<!-- 2024-01-28 (for v2.45.13 released on 2024-01-28), https://github.com/RokuCommunity/vscode-brightscript-language/pull/543 -->
<!-- 2024-01-19 (for v0.21.2 released on 2024-01-25), https://github.com/RokuCommunity/roku-debug/pull/185 -->

We've deprecated the `stagingFolderPath` launch.json option in favor of the more standard `stagingDir` property. Both will still work for a while, but we recommend you move to `stagingDir` so you don't see those pesky "deprecated" messages in your launch.json. `stagingDir` wins, and if not set, check for `stagingFolderPath`.

Along with that, we also fixed a bug with debug sessions and `launch.json` files related to `stagingDir` and `stagingFolderPath` when `stagingDir` is also present in a root-level `bsconfig.json`. Now it should properly load the `stagingDir` and (deprecated) `stagingFolderPath` properly when specified by launch.json.


# Debugging

## Display a modal message when the we fail to upload a package to the device
<!-- 2024-01-02 (for v0.20.15 released on 2024-01-08), https://github.com/RokuCommunity/roku-debug/pull/178 -->

We've added better error detection around certain debug session failures, specifically when uploading the zip fails. You should now see a nice popup with a better error message.

![image](https://github.com/rokucommunity/roku-debug/assets/2544493/0f12267d-9053-4593-a95c-2324842de769)

## Expose debug protocol port
<!-- 2024-01-10 (for v0.21.0 released on 2024-01-10), https://github.com/RokuCommunity/roku-debug/pull/182 -->

There's a new `launch.json` setting called `controlPort` which is used to interact with the [debug protocol](https://developer.roku.com/en-ca/docs/developer-program/debugging/socket-based-debugger.md).

Most developers won't need to change this, but if you're debugging through port forwarding, using an emulator, or some other nonstandard means, this should enable you to properly configure your launch settings.

![image](https://github.com/rokucommunity/roku-debug/assets/2544493/db3100cc-162a-400f-b3c9-c83d06b2a076)

## Add cli flag to run dap as standalone process
<!-- 2024-01-10 (for v0.21.0 released on 2024-01-10), https://github.com/RokuCommunity/roku-debug/pull/173 -->

We added support for running roku-debug in "debug adapter protocol" (i.e. "DAP") mode for use in IDEs.

`roku-debug` is the library that powers the debug session within vscode. However, with this setting, you can now use `roku-debug` to power debug sessions in other IDEs (like eclipse, vim/neovim, emacs, etc.). This should work with any editor that supports the [debug adapter protocol](https://microsoft.github.io/debug-adapter-protocol/implementors/adapters/).

You can activate this mode like this:

```
npx roku-debug --dap
```

You'll typically need to configure your IDE to call the above command. If you've integrated this functionality into an IDE, please let us know so we can update our documentation to show how to configure it! [Here's](https://github.com/mfussenegger/nvim-dap/wiki/Debug-Adapter-installation#brightscript) an example of how to configure DAP mode in neovim.


# BrighterScript

## Prevent publishing of empty files
<!-- 2024-01-08 (for v0.65.16 released on 2024-01-08), https://github.com/RokuCommunity/brighterscript/pull/997 -->

We've added a new BrighterScript config property called `pruneEmptyCodeFiles` which defaults to `false`. When set to `true`, brightscript files that are considered empty won't be published during transpilation. It also adds a `canBePruned` property to the Brs and XML files.

Currently Brs files are considered empty if they don't contain a `FunctionStatement`, `MethodStatement`, or a `ClassStatement`. I might have missed something here.

This also will remove imports of empty scripts. If a brightscript file that an xml files references has their `canBePruned` field return false, the associated import will be removed too.

On a large internal project, this resulted in significant compile-time speedups.

- **ultra 4800x (OS 12.5):**
    - pruning off: 7250ms
    - pruning on:  4965ms

- **stick4k 3800x (OS 12.5):**
    - pruning off: 5789ms
    - pruning on:  4342ms

- **express 3960x (OS 11.5):**
    - pruning off: 8232ms
    - pruning on:  6111ms

## Assign `.program` to the builder BEFORE emitting `afterProgramCreate` event
<!-- 2024-01-11 (for v0.65.17 released on 2024-01-16), https://github.com/RokuCommunity/brighterscript/pull/1011 -->

We fixed a small BrighterScript plugin bug where where the `ProgramBuilder` doesn't have a reference to `.program` when the `afterProgramCreate` event fires. We solved this by assigning `.program` _before_ emitting the event.


## adds support for libpkg prefix
<!-- 2024-01-16 (for v0.65.17 released on 2024-01-16), https://github.com/RokuCommunity/brighterscript/pull/1017 -->

BrighterScript has fixed a bug where component libraries that use `libpkg:/path/file.brs` in the script imports would result in files not being found.

You can now use `libpkg:/` in xml script imports as well as brighterscript import statements.

These both work now!

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/8c271506-bfe0-48cc-b610-2e0ad5ae93e3)


![image](https://github.com/rokucommunity/brighterscript/assets/2544493/b34f6414-18eb-4891-a1a1-4dd26381399d)


## Prevent overwriting the Program._manifest if already set on startup
<!-- 2024-01-24 (for v0.65.18 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1027 -->

BrighterScript has added some safeguards around manifest loading to improve the way plugins can interact with it. There's a hidden `_manifest` file on the `Program` class in BrighterScript. Some plugins use/abuse this to modify manifest values (to apply some preprocessing or sanitization).

However, there have historically been some strange timing issues around this process. To mitigate those issues, BrighterScript will now _avoid_ replacing the manifest on startup if a plugin has already overwritten it.

## Backport v1 syntax changes
<!-- 2024-01-30 (for v0.65.19 released on 2024-01-30), https://github.com/RokuCommunity/brighterscript/pull/1034 -->

If you weren't aware, we're working on a major revision of BrighterScript that includes type tracking, much better type safety, and many other improvements.

Some of the new features are things like:
- typed array syntax
- union type syntax
- using built-in component/object/interface/event types
- type cast syntax

To make it easier to test out brighterscript v1 and then switch back to the v0 line, we've backported the above syntaxes into the v0 release line. This means you can write newer syntax and commit that code without needing to undo it.

Now keep in mind, these new syntax features provide _NO_ additional validation in the v0 release line.

In transpiled code:
- Typed Arrays are converted to `dynamic`
- Union types are converted to `dynamic`
- Built in types are converted to `object` (just like Classes/interfaces)
- Type casts are completely ignored and removed

Even if you're not using/testing the v1 alphas, it might be worth using some of this new syntax just to more cleanly document your code. You can view all of the supported syntax in [this unit test](https://github.com/rokucommunity/brighterscript/blob/d3465c2d686758fd41a3fcf2445e4fd031f365b6/src/files/BrsFile.spec.ts#L3641), but here are some examples:

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/cc13fff0-71fc-4742-9cb8-98319e8e6aeb)

## Add plugin hooks for getDefinition
<!-- 2024-01-30 (for v0.65.20 released on 2024-01-30), https://github.com/RokuCommunity/brighterscript/pull/1045 -->

We've added a new BrighterScript plugin hook for `go to definition`. Plugins can define `beforeProvideDefinition`, `provideDefinition`, or `afterProvideDefinition` to add more entries into the results of that operation.

We converted the internal brighterscript `go to definition` to leverage these same plugin hooks. You can check that out in [BscPlugin.ts](https://github.com/rokucommunity/brighterscript/blob/c92a2697b1fcc1ab6b50ff657be300a3d348b3b8/src/bscPlugin/BscPlugin.ts#L32), but here's a sample:

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/99f4c105-8fe5-4aad-aedc-cba67f7ab61a)


## Fix parsing issues with multi-index IndexedSet and IndexedGet
<!-- 2024-01-31 (for v0.65.21 released on 2024-01-31), https://github.com/RokuCommunity/brighterscript/pull/1050 -->

We've fixed parsing and transpile issues with mutli-index `IndexedGetExpression` and `IndexedSetStatement`.

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/b3051453-1374-4599-8232-ffb07345e8a7)


# Community Tools

## brs
## Fixed #16 Print leading space before positive numbers
<!-- 2023-12-11 (for v0.45.4 released on 2024-01-18), https://github.com/RokuCommunity/brs/pull/39 -->
We've made a few improvements to the brs emulator:
- fixed the printing of positive number to show a leading space before positive numbers, just like Roku.
- Fixed the comparison involving Long numbers
- Updated all affected test cases.

You can check out the [@rokucommunity/brs#39](https://github.com/RokuCommunity/brs/pull/39) for more information.


## Fixed #38 - Improved context handling for Callables
<!-- 2023-12-11 (for v0.45.4 released on 2024-01-18), https://github.com/RokuCommunity/brs/pull/40 -->

The original solution to identify the context (`m` object) for Callables was relying on re-evaluating the source on a dot chained call, that had performance issues, and caused the side effect of issue [#9](https://github.com/rokucommunity/brs/issues/9). That solution did not solved the performance issue fully.

So this new solution saves a reference for the context for each callable, eliminating the need of re-evaluation, and fixed all side effects.

The end result is that there should no longer be a performance issue for calling dot chained calls.

## Fixed #41 - Global functions `GetInterface()` and `FindMemberFunction()` are not properly boxing parameters
<!-- 2024-01-18 (for v0.45.4 released on 2024-01-18), https://github.com/RokuCommunity/brs/pull/42 -->

Both of the methods `GetInterface()` and `FindMemberFunction()` were not properly boxing parameters to behave like a Roku device. These have been fixed as of @rokucommunity/brs v0.45.4



## allow spacing on dotted get paths
<!-- 2024-01-17 (for v1.6.39 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript-formatter/pull/83 -->

We've improved how the brightscript and brighterscript formatter handles spaces between objects. It should now properly remove whitespace between anything separated by a dot. Here are some examples:

![format](https://github.com/rokucommunity/brighterscript-formatter/assets/2544493/35b360d3-40b0-4844-94fc-331a858b916a)



# BrighterScript Preview features
<!-- any alpha/beta changes across all projects should be documented here and not in their primary area above-->

## Renaming brighterscript v0.66 alphas to v1
We've decided to transition BrighterScript towards a v1.0.0 release!

As we've been working on the BrighterScript v0.66 alphas, we noticed that there were more and more breaking changes that we wanted to implement. It became clear that we were actually implementing a full major version change.

BrighterScript was introduced as an experiment, that slowly grew into a product that is relied on by many production applications on a daily basis. At this point, we owe it to the community to signal that we have confidence in the project. We can think of no better way to do that than to move to a v1 release.

We're _hopeful_ that the v1 release will be ready by this summer, but we can't guarantee a release date at this time (we're very busy here at RokuCommunity). You can track our progress in the [v1.0.0 milestone](https://github.com/rokucommunity/brighterscript/milestone/1).

At the time of this publication, the latest brighterscript v1 alpha is `v1.0.0-alpha.27`. You can try out the latest version of brighterscript v1 alphas by running:
```bash
npm install brighterscript@next
```


## Fixes transpiles of Typecasts wrapped in parens
<!-- 2024-01-08 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/998 -->

Fixes #986

The BrightScript runtime doesn't like when parentheses are used exclusively to wrap a variable. For example, this will cause a run-time error:

```brs
sub addSomeProperty(obj)
      (obj).append({key: "value"})
end sub
```

This was causing issues when transpiling a typecast expression like this::
```brs
sub addSomeProperty(obj)
      (obj as roAssociativeArray).append({key: "value"})
end sub
```

So to mitigate that, we've fixed the transpiler to so that if an expression that is grouped is a typecast, it does not include the parentheses.


## Adds Diagnostics for Member Accessibility
<!-- 2024-01-09 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1004 -->

We've added diagnostics for setting unknown fields of classes

![image](https://github.com/rokucommunity/brighterscript/assets/810290/957f8878-8f81-46e8-8343-f80bea0b1bf8)

![image](https://github.com/rokucommunity/brighterscript/assets/810290/79191afa-93e3-423e-b290-15a8b7d2fa11)



## Diagnostics for accessing `private` or `protected` class members externally
<!-- 2024-01-09 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1004 -->

We've added diagnostics for accessing `private` or `protected` class members when you shouldn't have access to them.

Private members are available in the class that defined them.
Protected members are available in the class that defined them, and all sub classes.


https://github.com/rokucommunity/brighterscript/assets/810290/bcb37181-ea2f-4f7f-8892-47e4105ca37a


## Adds missing Completion Items
<!-- 2024-01-11 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1009 -->

We've added Adds `true` `false` and `invalid` to completion items when appropriate. We also ensure that function parameters are included in completion results, even if you're at the end of the function block. `private` and `protected` class members only are included in completion results when they are accessible


![image](https://github.com/rokucommunity/brighterscript/assets/810290/352c9685-43e6-4b99-94db-9cd28395c9cd)


## Remove `Parser.references`
<!-- 2024-01-22 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1021 -->

We've completely removed the `Parser.references` collection from BrighterScript. Historically, this was used to improve performance for plugins. However, the AST walking logic is significantly faster now, and we have much better patterns and AST detection mechanisms, so we have decided to eliminate `Parser.references`.

We've removed it because it causes confusion for plugins when trying to figure out how to properly make AST edits. Often an AST edit wouldn't update the `Parser.references` collection and thus making future plugin modifications complicated or out of sync.

If you're using this in your plugin, please consider switching to an AST walk function.



## Renamed `File` interface to `BscFile`
<!-- 2024-01-19 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1013 -->

When the file API first landed, we had been using the interface name `File`. However, there's already a global interface with that name in TypeScript, which caused lots of confusion when writing plugins. To mitigate this, we have renamed our interface `BscFile`. TypeScript will correctly prompt for imports when using this interface, and it no longer collides with the global interface.


## Fix cross namespace collision detection
<!-- 2024-01-19 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1008 -->

We fixed a bug where a `const` and a function are not allowed to have the same name across different namespaces. This is now supported (as expected).

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/4798873b-14d8-48ed-85f8-73c7d57b5b1e)


## XML fields of type color can accept strings or integers
<!-- 2024-01-18 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1016 -->

XML fields with `type="color"` can now accept strings _or_ integers.

![image](https://github.com/rokucommunity/brighterscript/assets/810290/43f5bbc0-9d6c-4089-82cc-a5c806d37883)



## Updates the Member types for Component Fields
<!-- 2024-01-13 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1014 -->

We updated BrighterScript's internal understanding of `<interface>` function and field entries as defined here: https://developer.roku.com/docs/references/scenegraph/xml-elements/interface.md#attributes

We also fixed a bug with the way `type="array"` was handled, so that should no longer be causing diagnostics when used correctly.


## Adds a `findChildren` function on AstNode
<!-- 2024-01-11 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1010 -->

We've added a new method on `AstNode` called `.findChildren()` to support finding all nodes of a specific type (like namespaces, classes, consts, etc). The matcher is just a function, so the evaluation can work for anything.


# Documentation

## Refactor bsconfig documentation
<!-- 2024-01-24 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1024 -->

We've made some large changes to the structure of the BrighterScript readme:

List of changes:

- Add minimal `bsconfig.json` example, copied from the `brighterscript-template` project
- Make a new page for bsconfig documentation
- Make a new page for documentation on suppressing error messages
- Edit "extends" and "optional extends" sections to reduce duplication
- Alphabetize bsconfig documentation
- Add table of contents for bsconfig documentation
- Add cross-links to bsconfig documentation, connecting sections together
- A few tweaks to markdown formatting which do not affect the rendered page, such as adding or removing some extra newlines for consistency
- Remove reference to `ignoreErrorCodes` flag in "bs ignore" documentation
- Remove self-effacing statement about project being likely to contain bugs in "bs ignore" documentation



# For Contributors

## BrighterScript null safety improvements
<!-- 2024-01-08 (for v0.65.16 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/996 -->

We've started the process of converting the entire BrighterScript codebase to be null safe (by enabling the `strictNullChecks` tsconfig.json setting). This month we've made some great progress. There's not much user-facing to discuss, but feel free to look through [#996](https://github.com/RokuCommunity/brighterscript/pull/996) and [#1000](https://github.com/RokuCommunity/brighterscript/pull/1000).


## Fix create-vsix
<!-- 2024-01-19 (for v2.45.12 released on 2024-01-26), https://github.com/RokuCommunity/vscode-brightscript-language/pull/540 -->

We've overhauled the `create-vsix` github action to improve inter-project linking when building custom vsix. It should be much better at building vsix that depend on changes that span multiple projects all having the same branch name.

For contributors, all you really need to know is:
 - add the `create-vsix` tag to a PR
 - make sure inter-dependent projects all have the same branch name(like vscode-brightscript-language, roku-deploy, brighterscript, etc...)

GitHub Actions will auto-generate a new vsix every time you push code to the PR, and a bot will comment with instructions on how to install that vsix.

You can see an example on [this PR](https://github.com/rokucommunity/vscode-brightscript-language/pull/538#issuecomment-1973953167), but here's a screenshot:

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/d51ce6b3-030f-4d45-835a-5d005b27d64e)


## Fix the install-local and watch-all scripts
<!-- 2024-01-24 (for v2.45.12 released on 2024-01-26), https://github.com/RokuCommunity/vscode-brightscript-language/pull/541 -->

The install-local script was only creating links between sibling projects into vscode-brightscript-language. However, some of the other projects depend on each other as well, so they should all be inter-linked.

So we updated the watch-all script to run the projects in order as well so we ensure the dependent projects are built before spinning up the next watcher. This _does_ have the downside of showing all package.json and package-lock.json files as modified, but you can just undo the changes and run `npm install local` again when you need to get changes.


# Thank you

Last but certainly not least, a big **_Thank You_** to the following people who contributed this month:

Contributions to [vscode-brightscript-language](https://github.com/RokuCommunity/vscode-brightscript-language):

-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Pass the modal property from the PopupMessageEvent ([PR #537](https://github.com/RokuCommunity/vscode-brightscript-language/pull/537))
-   [@triwav (Brian Leighty)](https://github.com/triwav)
    -   Always request screenshot on initial load, add ability to copy screenshot ([PR #536](https://github.com/RokuCommunity/vscode-brightscript-language/pull/536))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fix create-vsix ([PR #540](https://github.com/RokuCommunity/vscode-brightscript-language/pull/540))
    -   Fix the install-local and watch-all scripts ([PR #541](https://github.com/RokuCommunity/vscode-brightscript-language/pull/541))
    -   Sets `stagingDir` properly in DebugConfigurationProvider ([PR #543](https://github.com/RokuCommunity/vscode-brightscript-language/pull/543))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):

-   [@georgejecook (George Cook)](https://github.com/georgejecook)
    -   adds support for libpkg prefix ([PR #1017](https://github.com/RokuCommunity/brighterscript/pull/1017))
-   [@josephjunker (Joseph Junker)](https://github.com/josephjunker)
    -   Improve null safety ([PR #996](https://github.com/RokuCommunity/brighterscript/pull/996))
    -   add documentation on pruneEmptyCodeFiles to the README ([PR #1012](https://github.com/RokuCommunity/brighterscript/pull/1012))
    -   Improving null safety: Add FinalizedBsConfig and tweak plugin events ([PR #1000](https://github.com/RokuCommunity/brighterscript/pull/1000))
    -   Refactor bsconfig documentation ([PR #1024](https://github.com/RokuCommunity/brighterscript/pull/1024))
-   [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    -   Fixes transpiles of Typecasts wrapped in parens ([PR #998](https://github.com/RokuCommunity/brighterscript/pull/998))
    -   Adds Diagnostics for Member Accessibility  ([PR #1004](https://github.com/RokuCommunity/brighterscript/pull/1004))
    -   Adds missing Completion Items ([PR #1009](https://github.com/RokuCommunity/brighterscript/pull/1009))
    -   Updates the Member types for Component Fields ([PR #1014](https://github.com/RokuCommunity/brighterscript/pull/1014))
    -   XML fields of type color can accept strings or integers ([PR #1016](https://github.com/RokuCommunity/brighterscript/pull/1016))
    -   Renamed `File` interface to `BscFile` ([PR #1013](https://github.com/RokuCommunity/brighterscript/pull/1013))
    -   Fixes Compatibility checks for types defined recursively. ([PR #1015](https://github.com/RokuCommunity/brighterscript/pull/1015))
    -   Remove `Parser.references` ([PR #1021](https://github.com/RokuCommunity/brighterscript/pull/1021))
    -   Backport v1 syntax changes ([PR #1034](https://github.com/RokuCommunity/brighterscript/pull/1034))
-   [@MikeAlMartinez (Michael Martinez)](https://github.com/MikeAlMartinez)
    -   Prevent publishing of empty files ([PR #997](https://github.com/RokuCommunity/brighterscript/pull/997))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Adds a `findChildren` function on AstNode ([PR #1010](https://github.com/RokuCommunity/brighterscript/pull/1010))
    -   Assign `.program` to the builder BEFORE emitting `afterProgramCreate` event ([PR #1011](https://github.com/RokuCommunity/brighterscript/pull/1011))
    -   Fix cross namespace collision detection ([PR #1008](https://github.com/RokuCommunity/brighterscript/pull/1008))
    -   Prevent overwriting the Program._manifest if already set on startup ([PR #1027](https://github.com/RokuCommunity/brighterscript/pull/1027))
    -   Add plugin hooks for getDefinition ([PR #1045](https://github.com/RokuCommunity/brighterscript/pull/1045))
    -   Fix parsing issues with multi-index IndexedSet and IndexedGet ([PR #1050](https://github.com/RokuCommunity/brighterscript/pull/1050))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):

-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Display a modal message when the we fail to upload a package to the device ([PR #178](https://github.com/RokuCommunity/roku-debug/pull/178))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Expose debug protocol port ([PR #182](https://github.com/RokuCommunity/roku-debug/pull/182))
    -   Add cli flag to run dap as standalone process ([PR #173](https://github.com/RokuCommunity/roku-debug/pull/173))
    -   Add some DAP info to the readme ([2d06b10](https://github.com/RokuCommunity/roku-debug/commit/2d06b10))
    -   Fixing issues before release 0.21.0 ([5f459fc](https://github.com/RokuCommunity/roku-debug/commit/5f459fc))
    -   Use `stagingDir` instead of stagingFolderPath ([PR #185](https://github.com/RokuCommunity/roku-debug/pull/185))

Contributions to [brighterscript-formatter](https://github.com/RokuCommunity/brighterscript-formatter):

-   [@philanderson888 (Phil Anderson)](https://github.com/philanderson888)
    -   allow spacing on dotted get paths ([PR #83](https://github.com/RokuCommunity/brighterscript-formatter/pull/83))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Add create-package script ([PR #84](https://github.com/RokuCommunity/brighterscript-formatter/pull/84))

Contributions to [bslint](https://github.com/RokuCommunity/bslint):

-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Add `create-package` github action support ([ebea19b](https://github.com/RokuCommunity/bslint/commit/ebea19b))

Contributions to [brs](https://github.com/RokuCommunity/brs):

-   [@lvcabral (Marcelo Lv Cabral)](https://github.com/lvcabral)
    -   Fixed #16 Print leading space before positive numbers ([PR #39](https://github.com/RokuCommunity/brs/pull/39))
    -   Fixed #38 - Improved context handling for Callables ([PR #40](https://github.com/RokuCommunity/brs/pull/40))
    -   Fixed #41 - Global functions `GetInterface()` and `FindMemberFunction()` are not properly boxing parameters ([PR #42](https://github.com/RokuCommunity/brs/pull/42))
