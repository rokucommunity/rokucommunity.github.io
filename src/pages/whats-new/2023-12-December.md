---
date: December 2023
summary: Changes to vscode-brightscript-language, brighterscript, roku-deploy, roku-debug, brs, promises
layout: ../../layouts/WhatsNewPost.astro
---
# Overview

# Editor
## Fix spelling mistake in lsp message
<!-- 2023-11-27 (for v2.45.9 released on 2023-12-07), https://github.com/RokuCommunity/vscode-brightscript-language/pull/531 -->

Fix a spelling mistake in the "Can't find language server" error message. 

Thanks @triwav for finding this!


## Use getDeviceInfo from roku-deploy
<!-- 2023-11-28 (for v2.45.9 released on 2023-12-07), https://github.com/RokuCommunity/vscode-brightscript-language/pull/532 -->

- remove the custom fetching of device-info in favor of the `rokuDeploy.getDeviceInfo()` function. 
- fixes a few typescript and npm dependency issues



## Support a configurable port for SceneGraphDebugCommandController
<!-- 2023-12-07 (for v2.45.9 released on 2023-12-07), https://github.com/RokuCommunity/vscode-brightscript-language/pull/534 -->

Adds support for overriding the scenegraph debug server port (normally 8080). This is mostly useful for port-forwarding or emulator/simulator situations, because Roku devices do not support overriding this port. 

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/8ea98b1c-60cc-4129-a615-b5d4e2893558)



## Add a few missing brightscript.debug settings
<!-- 2023-12-07 (for v2.45.9 released on 2023-12-07), https://github.com/RokuCommunity/vscode-brightscript-language/pull/535 -->

Adds a few missing `brightscript.debug` settings to user/workspace settings. 


## Merge tag 'v2.45.8' of https://github.com/rokucommunity/vscode-brightscript-language
<!-- 2023-12-07 (for v2.45.9 released on 2023-12-07), ([7a90e96](https://github.com/RokuCommunity/vscode-brightscript-language/commit/7a90e96)) -->





# Debugging

## Make the connection port for SceneGraphDebugCommandController configurable
<!-- 2023-12-07 (for v0.20.14 released on 2023-12-07), https://github.com/RokuCommunity/roku-debug/pull/177 -->

…rable


## Fixing issues before release 0.20.14
<!-- 2023-12-07 (for v0.20.14 released on 2023-12-07), ([01fba07](https://github.com/RokuCommunity/roku-debug/commit/01fba07)) -->





# BrighterScript

## Fixes Class Constructor used as `function` transpilation and validation
<!-- 2023-11-30 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/972 -->

Fixes #965 


## Classes do not include AA members
<!-- 2023-11-30 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/970 -->

Fixes #968


## Add manifest loading from files
<!-- 2023-12-04 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/942 -->

The program is currently set to load a manifest from the project's root. This isn't very flexible, and it causes some issues for projects which generate their manifests in a pre-compile step, i.e., `bs_const` values not getting read and causing code blocks to be removed erroneously.

This PR tweaks `ProgramBuilder.loadAllFilesAST`'s logic, to group/filter files and find a manifest in a first pass, then load the manifest into the program, and finally setting typedefs and code files. I've also adjusted the manifest loading to accept a file object, with some slight code refactoring in the mix.


## Correct RANGE in template string when dealing with quotes in annotations
<!-- 2023-12-04 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/975 -->

Fixes a bug where `"` characters in template strings would mistakenly increment the line number of future tokens, causing incorrect token positions for the remainder of the file. This didn't cause problems with the transpiled code, but makes for a very poor debugging (sourcemap) and editing (diagnostic position) experience. 

Before the fix:
![template-string-position-fix](https://github.com/rokucommunity/brighterscript/assets/2544493/19f1490d-d002-47af-9f68-4c53f7a6787b)

After the fix:
![template-string-position-fix-fixed](https://github.com/rokucommunity/brighterscript/assets/2544493/00f2e933-8d03-45d2-82f0-29871deea06e)



## fix the create-package script
<!-- 2023-12-04 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/974 -->

- Fix the create-package script so that it builds proper urls to packages by excluding @ and _ symbols.
- specify the `--title` so the release doesn't accidentally use the current branch name.


## Use regex for faster manifest/typedef detection
<!-- 2023-12-04 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/976 -->

Adds slightly faster performance to the logic updated in #942 when dealing with large file lists. This probably doesn't make much difference in practice, but hey, free cycles are free cycles!

The javascript engine will compile and cache regex expressions, so we can use them inline. We also avoid calling `.toLowerCase() because it's fairly expensive. 

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/84645bda-1f73-48da-8fb9-d8ab3eb1d358)




## Remove post-transpiled symbols from .bs code completion
<!-- 2023-12-06 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/979 -->

Solves #978


## Add `optional` modifier for interface and class members
<!-- 2023-12-07 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/955 -->

Adds the ability to mark interface fields, interface methods, and class fields as `optional`. We don't really do anything with them right now, but this is in preparation for the upcoming type tracking features. 


## Fix out-of-date transpile blocks in docs
<!-- 2023-12-07 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/956 -->

Fixes a few docs "view transpiled code" blocks that were out of date from their sample code.


## General purpose name collision diagnostic
<!-- 2023-12-07 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/982 -->

![image](https://github.com/rokucommunity/brighterscript/assets/810290/1948e7bb-ac37-46ac-98a3-ca44857d45ae)

![image](https://github.com/rokucommunity/brighterscript/assets/810290/14a4e790-d74b-46dd-bdeb-67c1442e38e4)


![image](https://github.com/rokucommunity/brighterscript/assets/810290/373d401d-2d92-406f-9403-2f7825c1d6b5)



## Fix crash in type system when an incoming type is `undefined`
<!-- 2023-12-07 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/983 -->

Fix a few crashes in the type system when an incoming type is `undefined`


## Make `roSGNode` and `roSGNodeNode` the same
<!-- 2023-12-08 (for v0.66.0-alpha.11 released on 2023-12-21), https://github.com/RokuCommunity/brighterscript/pull/984 -->

- `roSGNode` is added to the global symbol table as a copy of `roSGNodeNode`
- re-scraped Roku docs
- Fixed completion type for ComponentType



## Fix transpile for non-namespaced enums in namespaced functions
<!-- 2023-12-08 (for v0.65.13 released on 2023-12-08), https://github.com/RokuCommunity/brighterscript/pull/985 -->

Fixes a critical transpile bug where non-namespaced enums used in namespaced function blocks would be left untranspiled!

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/5d47b4ad-5285-4548-9212-a0c5be5926ef)



## Add check for onChange function
<!-- 2023-12-18 (for v0.65.14 released on 2023-12-20), https://github.com/RokuCommunity/brighterscript/pull/941 -->

Issue: https://github.com/rokucommunity/brighterscript/issues/939

Add check for onChange functions in xml files


## Namespace validation fix
<!-- 2023-12-19 (for v0.66.0-alpha.11 released on 2023-12-21), https://github.com/RokuCommunity/brighterscript/pull/989 -->

Fixes false diagnostics pertaining to interface and class statements for names that are a substring of a sub-part of a namespace.


## Fix multi-namespace class inheritance transpile bug
<!-- 2023-12-20 (for v0.65.14 released on 2023-12-20), https://github.com/RokuCommunity/brighterscript/pull/990 -->

Fixes a bug with class inheritance where an ancestor 2+ levels higher would get the wrong super index, but only when that ancestor was a namespace-relative reference from a different namespace than the originating class. 

Consider this code example
```brighterscript
namespace alpha
    class One
    end class
end namespace

namespace beta
    class Two extends alpha.One
    end class

    class Three extends Two
    end class
end namespace

namespace charlie
    class Four extends beta.Three
    end class
end namespace
```

The inheritance chain for `Four` is: `Four` -> `beta.Three` -> `Two` -> `alpha.One`. 
The bug occurs when trying to find `Two` because it's a namespace-relative lookup. BrighterScript was trying to find `charlie.Two` instead of `beta.Two`. 

This resulted in the wrong super index, causing a stackoverflow at runtime.



## Scope validation crash
<!-- 2023-12-21 (for v0.66.0-alpha.11 released on 2023-12-21), https://github.com/RokuCommunity/brighterscript/pull/991 -->




## Prevent errors when using enums in a file that's not included in any scopes
<!-- 2023-12-24 (for v0.65.15 released on 2023-12-26), https://github.com/RokuCommunity/brighterscript/pull/995 -->

When running compilation on one of our projects I encountered this error:

```
Error when calling plugin BscPlugin.beforeFileTranspile: TypeError: Cannot read properties of undefined (reading 'getEnumMemberFileLink')
    at BrsFilePreTranspileProcessor.getEnumInfo (/Users/jjunker/code/my-application/common/temp/node_modules/.pnpm/brighterscript@0.65.14/node_modules/brighterscript/dist/bscPlugin/transpile/BrsFilePreTranspileProcessor.js:38:32)
    <long stack trace here>
```

This occurs when a file which uses enums is not found in any scope. The relevant unit test wasn't testing enums and was suppressing errors, so I expanded the functionality of the unit test. The actual fix is the added null coalescing operator on line 44 of `src/bscPlugin/transpile/BrsFilePreTranspileProcessor.ts`.

There are some changes here that are not directly tied to the bug fix at hand. This is because I traced through other usages of `Program.getFirstScopeForFile` to check whether any other locations might have the same error. Doing so lead me to `src/bscPlugin/CallExpressionInfo.ts`. This file correctly checks for nullishness and so contains no errors, but the type signatures weren't fully specific and I changed them while debugging. I can back out these changes if so desired.

I also added `| undefined` to a few signatures for cases where a value may be undefined. I find this to be helpful even with strict null checks turned off, but I also can tell that it's unidiomatic for this codebase so I can remove these additional annotations if you'd prefer the change without them.



# Community Tools

## brs
## fix(components): Replacing package luxon by day.js on `roDateTime` and `roTimespan` #28
<!-- 2023-11-21 (for v0.45.3 released on 2023-12-01), https://github.com/RokuCommunity/brs/pull/29 -->

Changed package to have more control of the specific formats Roku supports when parsing ISO dates, also this package is smaller than `luxon`


## fix(parser,lexer) Optional chaining implementation side effect #30
<!-- 2023-12-01 (for v0.45.3 released on 2023-12-01), https://github.com/RokuCommunity/brs/pull/31 -->

The optional chaining implementation was not done correctly, it affected the parsing of in-line `if` with the `?` (print) statement.


## feat(components): Implemented missing `ifEnum` methods in `roArray` and `roAssociativeArray`
<!-- 2023-12-01 (for v0.45.3 released on 2023-12-01), https://github.com/RokuCommunity/brs/pull/33 -->

This PR implements:
- Methods from `ifEnum`: `isNext()`, `next()`, `reset()` (array and AA)
- Methods from `ifArrayGet/Set`: `getEntry()`, `setEntry()` (array)
- Sort AA items when printing the object (same behavior as Roku)
- Unit Tests


## feat(lex,parse): Add stub try/catch implementation
<!-- 2023-12-01 (for v0.45.3 released on 2023-12-01), https://github.com/RokuCommunity/brs/pull/34 -->

From sjbarag/brs#611

> Implementing try/catch/throw takes a good bit of work in the interpreter, so I'm splitting that into two pull requests. This one includes parsing try/catch/end try (without throw), and always executes only the try block to maintain backwards compatibility. It's a weird partial state, but the alternative is a massive pull request that can't be reasonably reviewed or understood.
> 
> see sjbarag/brs#554


## Adds create-package CI build for quicker iteration
<!-- 2023-12-01 (for v0.45.3 released on 2023-12-01), https://github.com/RokuCommunity/brs/pull/36 -->

Adds a `create-package` label ci build support for faster package testing before publishing.
also adds a vscode test task and stops excluding the .vscode folder


## fix(lib): Component XML path parsing was failing on edge case
<!-- 2023-12-01 (for v0.45.3 released on 2023-12-01), https://github.com/RokuCommunity/brs/pull/37 -->

When parsing an empty list of additional directories, the code was finding invalid XML files under `node_modules` when the package was installed in posix OS (Mac, Linux).


## roku-deploy
## Update wrong host password error message
<!-- 2023-12-13 (for v3.11.2 released on 2023-12-20), https://github.com/RokuCommunity/roku-deploy/pull/134 -->

Improves the "wrong password" error message.



# Community Libraries

## promises
## Add ropm rootDir note
<!-- 2023-10-05 (for v0.2.0 released on 2023-12-14), ([91749ff](https://github.com/RokuCommunity/promises/commit/91749ff)) -->




## Merge pull request #9 from rokucommunity/ropm.rootDir-note
<!-- 2023-10-05 (for v0.2.0 released on 2023-12-14), ([3f75e79](https://github.com/RokuCommunity/promises/commit/3f75e79)) -->




## Fixed an unused variable warning
<!-- 2023-11-29 (for v0.2.0 released on 2023-12-14), ([3e1c0c1](https://github.com/RokuCommunity/promises/commit/3e1c0c1)) -->




## Merge pull request #11 from rokucommunity/unused-variable-warning
<!-- 2023-11-29 (for v0.2.0 released on 2023-12-14), ([674aa38](https://github.com/RokuCommunity/promises/commit/674aa38)) -->




## Fixed an issue with notifications and recursive promises
<!-- 2023-12-13 (for v0.2.0 released on 2023-12-14), ([80c1c14](https://github.com/RokuCommunity/promises/commit/80c1c14)) -->




## Formatting
<!-- 2023-12-13 (for v0.2.0 released on 2023-12-14), ([651f4ff](https://github.com/RokuCommunity/promises/commit/651f4ff)) -->




## Add self-hosted runner logic and dummy test
<!-- 2023-12-13 (for v0.2.0 released on 2023-12-14), ([3bcf769](https://github.com/RokuCommunity/promises/commit/3bcf769)) -->




## more tests
<!-- 2023-12-13 (for v0.2.0 released on 2023-12-14), ([5d4c602](https://github.com/RokuCommunity/promises/commit/5d4c602)) -->




## test node version environment variable
<!-- 2023-12-13 (for v0.2.0 released on 2023-12-14), ([6954c6e](https://github.com/RokuCommunity/promises/commit/6954c6e)) -->




## test local cache
<!-- 2023-12-13 (for v0.2.0 released on 2023-12-14), ([b61bf89](https://github.com/RokuCommunity/promises/commit/b61bf89)) -->




## try caching again
<!-- 2023-12-13 (for v0.2.0 released on 2023-12-14), ([9083fbe](https://github.com/RokuCommunity/promises/commit/9083fbe)) -->




## test cache
<!-- 2023-12-13 (for v0.2.0 released on 2023-12-14), ([2525fe5](https://github.com/RokuCommunity/promises/commit/2525fe5)) -->




## Merge pull request #14 from rokucommunity/unit-tests
<!-- 2023-12-13 (for v0.2.0 released on 2023-12-14), ([5a5a2a4](https://github.com/RokuCommunity/promises/commit/5a5a2a4)) -->




## Merge pull request #13 from rokucommunity/bugfix/recursive-promises-fail-to-notify
<!-- 2023-12-14 (for v0.2.0 released on 2023-12-14), ([39745ac](https://github.com/RokuCommunity/promises/commit/39745ac)) -->





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

-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Support a configurable port for SceneGraphDebugCommandController ([PR #534](https://github.com/RokuCommunity/vscode-brightscript-language/pull/534))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fix spelling mistake in lsp message ([PR #531](https://github.com/RokuCommunity/vscode-brightscript-language/pull/531))
    -   Use getDeviceInfo from roku-deploy ([PR #532](https://github.com/RokuCommunity/vscode-brightscript-language/pull/532))
    -   Add a few missing brightscript.debug settings ([PR #535](https://github.com/RokuCommunity/vscode-brightscript-language/pull/535))
    -   Merge tag 'v2.45.8' of https://github.com/rokucommunity/vscode-brightscript-language ([7a90e96](https://github.com/RokuCommunity/vscode-brightscript-language/commit/7a90e96))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):

-   [@georgejecook (George Cook)](https://github.com/georgejecook)
    -   Namespace validation fix ([PR #989](https://github.com/RokuCommunity/brighterscript/pull/989))
    -   Scope validation crash ([PR #991](https://github.com/RokuCommunity/brighterscript/pull/991))
-   [@iObject (Tyler Smith)](https://github.com/iObject)
    -   Correct RANGE in template string when dealing with quotes in annotations ([PR #975](https://github.com/RokuCommunity/brighterscript/pull/975))
-   [@josephjunker (Joseph Junker)](https://github.com/josephjunker)
    -   Prevent errors when using enums in a file that's not included in any scopes ([PR #995](https://github.com/RokuCommunity/brighterscript/pull/995))
-   [@luis-soares-sky (Luis Soares)](https://github.com/luis-soares-sky)
    -   Add manifest loading from files ([PR #942](https://github.com/RokuCommunity/brighterscript/pull/942))
    -   Fix multi-namespace class inheritance transpile bug ([PR #990](https://github.com/RokuCommunity/brighterscript/pull/990))
-   [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    -   Fixes Class Constructor used as `function` transpilation and validation ([PR #972](https://github.com/RokuCommunity/brighterscript/pull/972))
    -   Classes do not include AA members ([PR #970](https://github.com/RokuCommunity/brighterscript/pull/970))
    -   Remove post-transpiled symbols from .bs code completion ([PR #979](https://github.com/RokuCommunity/brighterscript/pull/979))
    -   General purpose name collision diagnostic ([PR #982](https://github.com/RokuCommunity/brighterscript/pull/982))
    -   Make `roSGNode` and `roSGNodeNode` the same ([PR #984](https://github.com/RokuCommunity/brighterscript/pull/984))
-   [@MilapNaik (Milap Naik)](https://github.com/MilapNaik)
    -   Add check for onChange function ([PR #941](https://github.com/RokuCommunity/brighterscript/pull/941))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   fix the create-package script ([PR #974](https://github.com/RokuCommunity/brighterscript/pull/974))
    -   Use regex for faster manifest/typedef detection ([PR #976](https://github.com/RokuCommunity/brighterscript/pull/976))
    -   Add `optional` modifier for interface and class members ([PR #955](https://github.com/RokuCommunity/brighterscript/pull/955))
    -   Fix out-of-date transpile blocks in docs ([PR #956](https://github.com/RokuCommunity/brighterscript/pull/956))
    -   Fix crash in type system when an incoming type is `undefined` ([PR #983](https://github.com/RokuCommunity/brighterscript/pull/983))
    -   Fix transpile for non-namespaced enums in namespaced functions ([PR #985](https://github.com/RokuCommunity/brighterscript/pull/985))

Contributions to [roku-deploy](https://github.com/RokuCommunity/roku-deploy):

-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Update wrong host password error message ([PR #134](https://github.com/RokuCommunity/roku-deploy/pull/134))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):

-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Make the connection port for SceneGraphDebugCommandController configurable ([PR #177](https://github.com/RokuCommunity/roku-debug/pull/177))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fixing issues before release 0.20.14 ([01fba07](https://github.com/RokuCommunity/roku-debug/commit/01fba07))

Contributions to [brs](https://github.com/RokuCommunity/brs):

-   [@lvcabral (Marcelo Lv Cabral)](https://github.com/lvcabral)
    -   fix(components): Replacing package luxon by day.js on `roDateTime` and `roTimespan` #28 ([PR #29](https://github.com/RokuCommunity/brs/pull/29))
    -   fix(parser,lexer) Optional chaining implementation side effect #30 ([PR #31](https://github.com/RokuCommunity/brs/pull/31))
    -   feat(components): Implemented missing `ifEnum` methods in `roArray` and `roAssociativeArray` ([PR #33](https://github.com/RokuCommunity/brs/pull/33))
    -   feat(lex,parse): Add stub try/catch implementation ([PR #34](https://github.com/RokuCommunity/brs/pull/34))
    -   fix(lib): Component XML path parsing was failing on edge case ([PR #37](https://github.com/RokuCommunity/brs/pull/37))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Adds create-package CI build for quicker iteration ([PR #36](https://github.com/RokuCommunity/brs/pull/36))

Contributions to [promises](https://github.com/RokuCommunity/promises):

-   [@chrisdp (Christopher Dwyer-Perkins)](https://github.com/chrisdp)
    -   Fixed an unused variable warning ([3e1c0c1](https://github.com/RokuCommunity/promises/commit/3e1c0c1))
    -   Fixed an issue with notifications and recursive promises ([80c1c14](https://github.com/RokuCommunity/promises/commit/80c1c14))
    -   Formatting ([651f4ff](https://github.com/RokuCommunity/promises/commit/651f4ff))
    -   Merge pull request #13 from rokucommunity/bugfix/recursive-promises-fail-to-notify ([39745ac](https://github.com/RokuCommunity/promises/commit/39745ac))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Add ropm rootDir note ([91749ff](https://github.com/RokuCommunity/promises/commit/91749ff))
    -   Merge pull request #9 from rokucommunity/ropm.rootDir-note ([3f75e79](https://github.com/RokuCommunity/promises/commit/3f75e79))
    -   Merge pull request #11 from rokucommunity/unused-variable-warning ([674aa38](https://github.com/RokuCommunity/promises/commit/674aa38))
    -   Add self-hosted runner logic and dummy test ([3bcf769](https://github.com/RokuCommunity/promises/commit/3bcf769))
    -   more tests ([5d4c602](https://github.com/RokuCommunity/promises/commit/5d4c602))
    -   test node version environment variable ([6954c6e](https://github.com/RokuCommunity/promises/commit/6954c6e))
    -   test local cache ([b61bf89](https://github.com/RokuCommunity/promises/commit/b61bf89))
    -   try caching again ([9083fbe](https://github.com/RokuCommunity/promises/commit/9083fbe))
    -   test cache ([2525fe5](https://github.com/RokuCommunity/promises/commit/2525fe5))
    -   Merge pull request #14 from rokucommunity/unit-tests ([5a5a2a4](https://github.com/RokuCommunity/promises/commit/5a5a2a4))