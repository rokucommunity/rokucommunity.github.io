---
date: January 2024
summary: Changes to vscode-brightscript-language, brighterscript, roku-debug, brighterscript-formatter, bslint, brs
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
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

This month, we'd like to draw attention to [bslint#41](https://github.com/rokucommunity/bslint/issues/41). Many linters support enforcing that all files have a trailing newline which encourages consistency across your project. @rokucommunity/bslint does not currently have a rule for this, which is something we'd love to see added. Here's how the error looks in a typescript project using eslint:

![image](https://github.com/rokucommunity/bslint/assets/2544493/e5458612-4667-4a03-a1af-21f7c6536a3e)

If you're interested in working on this feature, please comment on the [github issue](https://github.com/rokucommunity/bslint/issues/41) or reach out to us on [Slack](https://join.slack.com/t/rokudevelopers/shared_invite/zt-4vw7rg6v-NH46oY7hTktpRIBM_zGvwA)
# Editor
## Always request screenshot on initial load, add ability to copy screenshot
<!-- 2023-12-20 (for v2.45.10 released on 2024-01-10), https://github.com/RokuCommunity/vscode-brightscript-language/pull/536 -->

We fixed a few bugs in the "Device View" panel related to downloading a screenshot. Previously, if you didn't have the continuous screenshot capture enabled, it would not request any on its own unless you clicked refresh. Now it requests an initial screenshot which mitigates the issue.

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/2d45bf7c-ce14-4f4f-a5cc-e15b69687f97)



## Pass the modal property from the PopupMessageEvent
<!-- 2024-01-08 (for v2.45.10 released on 2024-01-10), https://github.com/RokuCommunity/vscode-brightscript-language/pull/537 -->

This change utilizes the modal property that was added to the `PopupMessageEvent`. The modal property is being added to make any errors more visible when VSCode fails to launch a channel. The most common example of this is a bad password.

Here's a screen shot of the modal.
<img width="1100" alt="Screenshot 2024-01-08 091210" src="https://github.com/rokucommunity/vscode-brightscript-language/assets/118202694/c6d95683-7c9d-4fff-afa8-c89b93bf09f8">



## Fix create-vsix
<!-- 2024-01-19 (for v2.45.12 released on 2024-01-26), https://github.com/RokuCommunity/vscode-brightscript-language/pull/540 -->

Overhauls the `create-vsix` github action, it should be much better at building vsix that depend on changes that span multiple projects all having the same branch name.


## Fix the install-local and watch-all scripts
<!-- 2024-01-24 (for v2.45.12 released on 2024-01-26), https://github.com/RokuCommunity/vscode-brightscript-language/pull/541 -->

The install-local script currently only links the sibling projects into vscode-brightscript-language. However, some of the other projects depend on each other as well, so they should all be inter-linked.

Updates the watch-all script to run the projects in order as well so we ensure the dependent projects are built before spinning up the next watcher.


## Sets `stagingDir` properly in DebugConfigurationProvider
<!-- 2024-01-28 (for v2.45.13 released on 2024-01-28), https://github.com/RokuCommunity/vscode-brightscript-language/pull/543 -->

Fixes a bug related to stagingDir and stagingFolderPath when `stagingDir` is also present in a root-level `bsconfig.json`



# Debugging

## Display a modal message when the we fail to upload a package to the device
<!-- 2024-01-02 (for v0.20.15 released on 2024-01-08), https://github.com/RokuCommunity/roku-debug/pull/178 -->




## Expose debug protocol port
<!-- 2024-01-10 (for v0.21.0 released on 2024-01-10), https://github.com/RokuCommunity/roku-debug/pull/182 -->

Adds `controlPort` launch setting to allow overriding the port used for the debug protocol control port.

Also adds a little bit of normalization to the config related to these ports.


## Add cli flag to run dap as standalone process
<!-- 2024-01-10 (for v0.21.0 released on 2024-01-10), https://github.com/RokuCommunity/roku-debug/pull/173 -->

Adds support for running roku-debug in "debug adapter protocol" (i.e. "DAP") mode for use in IDEs.


## Add some DAP info to the readme
<!-- 2024-01-10 (for v0.21.0 released on 2024-01-10), ([2d06b10](https://github.com/RokuCommunity/roku-debug/commit/2d06b10)) -->




## Fixing issues before release 0.21.0
<!-- 2024-01-10 (for v0.21.0 released on 2024-01-10), ([5f459fc](https://github.com/RokuCommunity/roku-debug/commit/5f459fc)) -->




## Use `stagingDir` instead of stagingFolderPath
<!-- 2024-01-19 (for v0.21.2 released on 2024-01-25), https://github.com/RokuCommunity/roku-debug/pull/185 -->

Convert all internal usage of `stagingFolderPath` to `stagingDir`. Still support `stagingFolderPath` as a launch option, but we immediately set stagingDir to stagingFolderPath.

`stagingDir` wins, and if not set, check for `stagingFolderPath`.



# BrighterScript

## Improve null safety
<!-- 2024-01-03 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/996 -->

This adds a second tsconfig which can be used to view null safety errors, and fixes a handful of them. Nothing here should change runtime behavior and I've aimed to make the changes as noninvasive as possible.

- I've been loose with test files, preferring unsafe assertions to code changes in them
- When possible, I've added annotations rather than modify runtime code

I've added explicit type annotations and intermediate interfaces for the return types of some functions and methods which were previously implicit. In some cases this helps inference go through without changes and in other cases it just made it easier for me to determine what exactly was undefined in a nested object.

I've skipped a couple of the harder errors. Most notably, there seems to be an implicit distinction between an "input BsConfig" and an "initialized BsConfig", in that many fields in the BsConfig class are optional but assumed to be present during actual processing. The potentially pedantic way to address this would be to make a second `InitializedBsConfig` type which is used internally and is produced by parsing a BsConfig, but this would be significantly more invasive than what I am aiming for here.

Please let me know if you would prefer any modifications to my approach.


## Prevent publishing of empty files
<!-- 2024-01-08 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/997 -->

This PR seeks to fix Issue #981.

The PR adds a config variable `pruneEmptyCodeFiles` which defaults to `false`. When set to `true`, brightscript files that are considered empty won't be published during transpilation. It also adds a `canBePruned` property to the Brs and XML files.

Currently Brs files are considered empty if they don't contain a `FunctionStatement`, `MethodStatement`, or a `ClassStatement`. I might have missed something here.

I can't really think of any reason why an xml file would be considered empty so I've defaulted the value to true for now. One thing I have implemented here for XML files is, imports of empty scripts are removed. If a brightscript file that an xml files references has their `canBePruned` field return false, the associated import will be removed too.

On a large internal project, this resulted in significant compile-time speedups.

- **ultra 4800x (12.5):**
    - pruning off: 7250ms
    - pruning on:  4965ms

- **stick4k 3800x (12.5):**
    - pruning off: 5789ms
    - pruning on:  4342ms

- **express 3960x (11.5):**
    - pruning off: 8232ms
    - pruning on:  6111ms



## Fixes transpiles of Typecasts wrapped in parens
<!-- 2024-01-08 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/998 -->

Fixes #986

Roku doesn't like when parens are used just to wrap a variable, for example, this will cause a run-time error:

```brs
sub addSomeProperty(obj)
      (obj).append({key: "value"})
end sub
```

this causes a problem when we want to typecast a single variable in order to code completion, for example:
```brs
sub addSomeProperty(obj)
      (obj as roAssociativeArray).append({key: "value"})
end sub
```


This PR changes `GroupedExpression` so that if the expression that is grouped is a typecast, it does not include the parens.



## Adds Diagnostics for Member Accessibility
<!-- 2024-01-09 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1004 -->

- Adds diagnostics for setting unknown fields of classes

![image](https://github.com/rokucommunity/brighterscript/assets/810290/957f8878-8f81-46e8-8343-f80bea0b1bf8)
![image](https://github.com/rokucommunity/brighterscript/assets/810290/79191afa-93e3-423e-b290-15a8b7d2fa11)


- Adds diagnostics for accessing `private` or `protected` class members when you shouldn't have access to them.

Private members are available in the class that defined them
Protected members are available in the class that defined them, and all sub classes.


https://github.com/rokucommunity/brighterscript/assets/810290/bcb37181-ea2f-4f7f-8892-47e4105ca37a

Solves #966
Solves #967
Solves #918



## Adds a `findChildren` function on AstNode
<!-- 2024-01-11 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1010 -->

Adds a `.findChildren()` method on `AstNode` to help look for all nodes of a specific type (like namespaces, classes, consts, etc). The matcher is just a function, so the evaluation can work for anything.


## Assign `.program` to the builder BEFORE emitting `afterProgramCreate` event
<!-- 2024-01-11 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1011 -->

There's a small bug where the ProgramBuilder doesn't have a reference to .program when the afterProgramCreate. This solves that by assigning `.program` before emitting the event.


## Adds missing Completion Items
<!-- 2024-01-11 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1009 -->

- Adds `true` `false` and `invalid` when appropriate
- Ensures function parameters are included in completion results, even if you're at the end of the function block
- `private` and `protected` class members only are included in completion results when they are accessible


![image](https://github.com/rokucommunity/brighterscript/assets/810290/352c9685-43e6-4b99-94db-9cd28395c9cd)


solves #988




## add documentation on pruneEmptyCodeFiles to the README
<!-- 2024-01-12 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1012 -->

Adds documentation on the new `pruneEmptyCodeFiles` bsconfig option to the README.

The bsconfig section of the README is a little long. Would you prefer that it get moved under the docs folder, maybe just leaving the shell of the most minimal `bsconfig.json` file on the main README?


## Updates the Member types for Component Fields
<!-- 2024-01-13 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1014 -->

Includes all the fields types as defined here: https://developer.roku.com/en-ca/docs/references/scenegraph/xml-elements/interface.md#attributes

Fixes (in particular) the `type="array"` isse @georgejecook has.




## adds support for libpkg prefix
<!-- 2024-01-16 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1017 -->

We found that component libraries that use libpkg:/path/file.brs in the script imports would result in files not being found.

This pr adds support for both pkg types.


## XML fields of type color can accept strings or integers
<!-- 2024-01-18 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1016 -->

![image](https://github.com/rokucommunity/brighterscript/assets/810290/43f5bbc0-9d6c-4089-82cc-a5c806d37883)



## Fix cross namespace collision detection
<!-- 2024-01-19 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1008 -->

Fixes a bug where a const and a function are not allowed to have the same name across different namespaces.


## Renamed `File` interface to `BscFile`
<!-- 2024-01-19 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1013 -->

Resolves #1005

Renames `File` interface to `BscFile` and removes the `BscFile` type. This is so this project does not clash with the Javascript `File` type.





## Fixes Compatibility checks for types defined recursively.
<!-- 2024-01-19 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1015 -->

This PR just makes the assumption that if something is the same name (and it's deeply nested) that it's probably the same type.

I think that's a fair assumption.

We can't make that assumption at the top level, because we have to do checks at the top level for differences in the same file... in that case, types with the same name *might* be different.



## Remove `Parser.references`
<!-- 2024-01-22 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1021 -->

Basically, removes all the hard-coded/static lists in `Parser.references` and instead uses cached AST walks, that are invalidated during BRS File Validation time... At that point in time, all changes from plugins should be done, and we can trust the walk for finding quick lookups for various types of expressions/statements.




## Improving null safety: Add FinalizedBsConfig and tweak plugin events
<!-- 2024-01-22 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1000 -->

This only reduces the total number of null check errors by 30, but it pushes the errors a little farther towards the edges. I've resolved most of the errors in `Program` and `ProgramBuilder`. I believe this may be a breaking change, if plugins are allowed to call `new Program()`, because the interface to `Program`'s constructor is now more strict.

I'm a little unsure of what to do about `FinalizedBsConfig.rootDir` and `FinalizedBsConfig.stagingDir`. I'd like to make them required, because a number of places assume that they exist. AFAICT their default values come from roku-deploy though, rather than anywhere in `bsc`, and if I add the default values from roku-deploy to `normalizeConfig`, tons of tests break. I'm figuring that it's better to make incremental progress by making the other fields required than it is to risk breakage by making a more significant change to runtime behavior.

I've added a unit test that asserts that the return value of `normalizeConfig` deeply matches an exact object. I added this test and confirmed that it was passing before making any changes to `normalizeConfig`. This is to give some level of confidence that behavior is unchanged, even though I've had to update the configs in a lot of other tests to satisfy the more strict types.

The changes to the plugin interface are as I mentioned in Slack, and shouldn't be more restrictive than what already exists. I made the name a little prettier than what I originally used in the Slack thread.


## Prevent overwriting the Program._manifest if already set on startup
<!-- 2024-01-24 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1027 -->

Some plugins might want to load the manifest and preprocess it before the program gets to it. However, sometimes there are timing issues, so now we don't replace the manifest on startup if a plugin has already overwritten it.


## Refactor bsconfig documentation
<!-- 2024-01-24 (for v1.0.0-alpha.25 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript/pull/1024 -->

The current README feels a little intimidating to me because of how long it is, so this PR pulls some of the details from it out into their own pages.

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
- Remove self-effacing statement about project being likely to contain bugs in "bs ignore" documentation :)

Other than these changes, the text is solely rearranged from the current version with no modifications. If desired I can undo some of these changes, such as not alphabetizing the documentation.

I've manually tested all of the links within the bsconfig documentation page but the use of absolute hyperlinks prevents me from manually testing the links from the error suppression documentation page to the bsconfig documentation page.


## Backport v1 syntax changes
<!-- 2024-01-30 (for v0.65.19 released on 2024-01-30), https://github.com/RokuCommunity/brighterscript/pull/1034 -->

Allows:
- typed array syntax
- union type syntax
- using built-in component/object/interface/event types
- type cast syntax

This does NO additional validation. Use this syntax at your own risk.

In transpiled code:
- Typed Arrays are converted to `dynamic`
- Union types are converted to `dynamic`
- Built in types are converted to `object` (just like Classes/interfaces)
- Type casts are completely ignored and removed




## Add plugin hooks for getDefinition
<!-- 2024-01-30 (for v0.65.20 released on 2024-01-30), https://github.com/RokuCommunity/brighterscript/pull/1045 -->

Allow plugins to contribute to `go to definition` results in the language server


## Fix parsing issues with multi-index IndexedSet and IndexedGet
<!-- 2024-01-31 (for v0.65.21 released on 2024-01-31), https://github.com/RokuCommunity/brighterscript/pull/1050 -->

Fixes parsing and transpile issues with mutli-index `IndexedGetExpression` and `IndexedSetStatement`.

The solution is a little "icky", because we can't break backwards compatability, so I had to add `additionalIndexes` to the two AST node types. In v1, we should merge those into a single `.indexes` prop on the nodes instead.

Fixes #1048

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/b3051453-1374-4599-8232-ffb07345e8a7)




# Community Tools

## bslint
## Add `create-package` github action support
<!-- 2024-01-26 (for v0.8.17 released on 2024-01-30), ([ebea19b](https://github.com/RokuCommunity/bslint/commit/ebea19b)) -->




## brs
## Fixed #16 Print leading space before positive numbers
<!-- 2023-12-11 (for v0.45.4 released on 2024-01-18), https://github.com/RokuCommunity/brs/pull/39 -->

Updated 3 things:

- Fixed the printing of positive number to show a leading space before positive numbers, just like Roku.
- Fixed the comparison involving Long numbers
- Updated all affected test cases.


## Fixed #38 - Improved context handling for Callables
<!-- 2023-12-11 (for v0.45.4 released on 2024-01-18), https://github.com/RokuCommunity/brs/pull/40 -->

The original solution to identify the context (m object) for Callables was relying on re-evaluating the source on a dot chained call, that had performance issues, and caused the side effect of issue #9, the solution I implemented for it was partial, and did not solved the performance issue fully.

Now I saved a reference for the context for each callable, eliminating the need of re-evaluation, and fixed all side effects.

I added a couple of. new scenarios to the e2e test cases.


## Fixed #41 - Global functions `GetInterface()` and `FindMemberFunction()` are not properly boxing parameters
<!-- 2024-01-18 (for v0.45.4 released on 2024-01-18), https://github.com/RokuCommunity/brs/pull/42 -->

Both of the methods `GetInterface()` and `FindMemberFunction()` were not properly boxing parameters to behave like a Roku device.



# Community Libraries


# Formatting

## Add create-package script
<!-- 2024-01-17 (for v1.6.39 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript-formatter/pull/84 -->

Add support for the `create-package` github action.


## allow spacing on dotted get paths
<!-- 2024-01-17 (for v1.6.39 released on 2024-01-25), https://github.com/RokuCommunity/brighterscript-formatter/pull/83 -->





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
