---
date: December 2023
summary: Changes to vscode-brightscript-language, brighterscript, roku-deploy, roku-debug, brs, promises
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
We had another solid month full of great improvements to the RokuCommunity tools, even though many of us were off for part of the month to celebrate the holidays. I think that goes to show just how dedicated some of our community contributors are, and we are so grateful for their help and support!

There are many updates in this version that we hope you'll like, some of the key highlights include:

- [Editor](#editor)
    - [Add check for onChange function](#add-check-for-onchange-function)
- [BrighterScript](#brighterscript)
    - [Add `optional` modifier for interface and class members](#add-optional-modifier-for-interface-and-class-members)
    - [Correct RANGE in template string when dealing with quotes in annotations](#correct-range-in-template-string-when-dealing-with-quotes-in-annotations)
    - Transpile fixes [here](#fix-transpile-for-non-namespaced-enums-in-namespaced-functions) and [here](#fix-multi-namespace-class-inheritance-transpile-bug)
    - [Load `manifest` from files array instead of root of project](#load-manifest-from-files-array-instead-of-root-of-project)
- [brs](#brs)
    - [Fix optional chaining implementation side effect](#fix-optional-chaining-implementation-side-effect)
    - [Implemented missing `ifEnum` methods in `roArray` and `roAssociativeArray`](#implemented-missing-ifenum-methods-in-roarray-and-roassociativearray)
    - [Add stub try/catch implementation](#add-stub-trycatch-implementation)
- [BrighterScript Preview features](#preview-features)
    - [Classes do not include AA members](#classes-do-not-include-aa-members)
    - [General purpose name collision diagnostic](#general-purpose-name-collision-diagnostic)
    - [Make `roSGNode` and `roSGNodeNode` the same](#make-rosgnode-and-rosgnodenode-the-same)
- [For Contributors](#for-contributors)
    - [fix the create-package script](#fix-the-create-package-script)


# Editor

## Add check for onChange function
<!-- 2023-12-18 (for v0.65.14 released on 2023-12-20), https://github.com/RokuCommunity/brighterscript/pull/941 -->
We've added a new XML validation that warns about missing functions referenced by `onChange` XML handlers.

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/6dfd9d70-e6f6-4d4c-8c04-d24a56be6515)



## Fix spelling mistake in lsp message
<!-- 2023-11-27 (for v2.45.9 released on 2023-12-07), https://github.com/RokuCommunity/vscode-brightscript-language/pull/531 -->
We fixed a small spelling mistake in the "Can't find language server" error message.

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/3cf9624c-38d1-4e77-9444-e89e4a0c7c64)


## Add a few missing brightscript.debug settings
<!-- 2023-12-07 (for v2.45.9 released on 2023-12-07), https://github.com/RokuCommunity/vscode-brightscript-language/pull/535 -->
We noticed a few `brightscript.debug` settings were missing from the schema, meaning you would get warnings when trying to use them in user/workspace settings. We've added the missing items so now you should have better intellisense when editing the settings, and no more warnings.


# Debugging

## Support a configurable port for SceneGraphDebugCommandController
<!-- 2023-12-07 (for v2.45.9 released on 2023-12-07), https://github.com/RokuCommunity/vscode-brightscript-language/pull/534 -->

We have added the ability to override SceneGraph debug server port (normally 8080). This is mostly useful for port-forwarding or emulator/simulator situations, because Roku devices do not support overriding this port.

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/8ea98b1c-60cc-4129-a615-b5d4e2893558)


# BrighterScript

## Add `optional` modifier for interface and class members
<!-- 2023-12-07 (for v0.65.12 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/955 -->

We've _finally_ added support for `optional` class and interface members. We don't really do anything with them right now, but this is in preparation for the upcoming type tracking features, and it enables developers to better document their interfaces and classes.

You can read more about it in the [class](https://github.com/rokucommunity/brighterscript/blob/master/docs/classes.md#optional-fields) or [interface](https://github.com/rokucommunity/brighterscript/blob/master/docs/interfaces.md#optional-members) docs, but here's a quick sample:

```vb
class Video
    url as string
    length as float
    optional subtitleUrl as string
    optional rating as string
    optional genre as string
end class
```


## Correct RANGE in template string when dealing with quotes in annotations
<!-- 2023-12-04 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/975 -->

We fixed a bug where `"` characters in [template strings](https://github.com/rokucommunity/brighterscript/blob/master/docs/template-strings.md) would mistakenly increment the line number of future tokens, causing incorrect token positions for the remainder of the file. This didn't cause problems with the transpiled code, but makes for a very poor debugging (sourcemap) and editing (diagnostic position) experience.

Before the fix:
![template-string-position-fix](https://github.com/rokucommunity/brighterscript/assets/2544493/19f1490d-d002-47af-9f68-4c53f7a6787b)

After the fix:
![template-string-position-fix-fixed](https://github.com/rokucommunity/brighterscript/assets/2544493/00f2e933-8d03-45d2-82f0-29871deea06e)



## Fix transpile for non-namespaced enums in namespaced functions
<!-- 2023-12-08 (for v0.65.13 released on 2023-12-08), https://github.com/RokuCommunity/brighterscript/pull/985 -->

We fixed a critical transpile bug in brighterscript where non-namespaced enums used in namespaced function blocks would be left un-transpiled! This should be fixed now in brighterscript v0.65.13 or above

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/5d47b4ad-5285-4548-9212-a0c5be5926ef)


## Fix multi-namespace class inheritance transpile bug
<!-- 2023-12-20 (for v0.65.14 released on 2023-12-20), https://github.com/RokuCommunity/brighterscript/pull/990 -->

Fixes a bug with class inheritance where an ancestor 2+ levels higher would get the wrong super index, but only when that ancestor was a namespace-relative reference from a different namespace than the originating class.

Consider this code example
```vb
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

This resulted in the wrong super index, causing a stack overflow at runtime. We fixed it, so now this code should transpile correctly.


## Prevent errors when using enums in a file that's not included in any scopes
<!-- 2023-12-24 (for v0.65.15 released on 2023-12-26), https://github.com/RokuCommunity/brighterscript/pull/995 -->

We've fixed a bug in the brighterscript transpiler that occurred when a file which uses enums is not found in any scope. We have a _large_ unit test suite, but somehow the relevant unit test wasn't testing enums and was suppressing errors. We fixed the error and this situation should no longer crash the transpiler.

Here's the error:
```
Error when calling plugin BscPlugin.beforeFileTranspile: TypeError: Cannot read properties of undefined (reading 'getEnumMemberFileLink')
    at BrsFilePreTranspileProcessor.getEnumInfo (../node_modules/brighterscript/dist/bscPlugin/transpile/BrsFilePreTranspileProcessor.js:38:32)
    <long stack trace here>
```


## Load `manifest` from files array instead of root of project
<!-- 2023-12-04 (for v0.65.12 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/942 -->

The program is currently set to load the `manifest` file from the project's root. This isn't very flexible, and it causes some issues for projects which generate their manifests in a pre-compile step, (i.e., `bs_const` values not getting read and causing code blocks to be removed erroneously).

We've modified BrighterScript to find and load the `manifest` file _first_ (rather than loading it on-demand like was previously implemented). This should mitigate most of the issues related to this.


# Community Tools

## brs
## Replace npm package `luxon` with `day.js` for `roDateTime` and `roTimespan`
<!-- 2023-11-21 (for v0.45.3 released on 2023-12-01), https://github.com/RokuCommunity/brs/pull/29 -->
In the BRS emulator project we updated the internal NodeJS date library from `luxon` to `day.js`. This gives us more control of the specific formats Roku supports when parsing ISO dates, also this package is smaller than `luxon`. This allowed us to fix a few bugs related to printing dates so they more accurately align with actual Roku devices.


## Fix optional chaining implementation side effect
<!-- 2023-12-01 (for v0.45.3 released on 2023-12-01), https://github.com/RokuCommunity/brs/pull/31 -->
We fixed the optional chaining implementation in the BRS emulator. There was a bug that affected the parsing of inline `if` with the `?` (print) statement.

Code like this should now run correctly in the emulator:

```brighterscript
function test_issue_30()
    testA = ["apple", 2, "banana", "orange", 5, "grape", "pear"]
    for fruit = 0 to testA.count()-1
        ' this was the line causing issues
        if type(testA[fruit]).inStr(0,"String") = -1 ? testA[fruit]
    next
end function
```


## Implemented missing `ifEnum` methods in `roArray` and `roAssociativeArray`
<!-- 2023-12-01 (for v0.45.3 released on 2023-12-01), https://github.com/RokuCommunity/brs/pull/33 -->
We added several missing interface methods to the BRS emulator:
- Methods from `ifEnum`: `isNext()`, `next()`, `reset()` (array and AA)
- Methods from `ifArrayGet/Set`: `getEntry()`, `setEntry()` (array)

We also now properly sort AA items when printing the object (same behavior as Roku)


## Add stub try/catch implementation
<!-- 2023-12-01 (for v0.45.3 released on 2023-12-01), https://github.com/RokuCommunity/brs/pull/34 -->
We've added partial support for `try/catch`. Implementing try/catch/throw takes a good bit of work in the interpreter, so it has been split into two parts. This initial implementation includes parsing try/catch/end try (without throw), and always executes only the try block to maintain backwards compatibility.

It's a weird partial state, but the alternative is a massive pull request that can't be reasonably reviewed or understood.

Here's the feature working in action:

![brs-try](https://github.com/rokucommunity/brs/assets/2544493/df644194-f8b0-4924-8369-229fc169fb99)


## Component XML path parsing was failing on edge case
<!-- 2023-12-01 (for v0.45.3 released on 2023-12-01), https://github.com/RokuCommunity/brs/pull/37 -->
We fixed a bug in the brs interpreter where, when parsing an empty list of additional directories, the code was finding invalid XML files under `node_modules` when the package was installed in posix OS (Mac, Linux).


# Preview features
<!-- any alpha/beta changes across all projects should be documented here and not in their primary area above-->
We've made more improvements to the BrighterScript v0.66 alphas, specific around type tracking and stability. Here are some of the highlights:


## Fixed bug when extending `roSGNodeNode`
<!-- 2023-12-21 (for v0.66.0-alpha.11 released on 2023-12-21), https://github.com/RokuCommunity/brighterscript/pull/991 -->
We fixed a crash when an interface extends the `roSGNodeNode` interface. You can now successfully create interfaces like this:

```vb
namespace myApp
    interface CommandManager extends roSGNodeNode
        commandName as string
    end interface
    function doesItWork(thing as myApp.CommandManager)
        ? thing.commandName
    end function
end namespace
```


## Namespace validation fix
<!-- 2023-12-19 (for v0.66.0-alpha.11 released on 2023-12-21), https://github.com/RokuCommunity/brighterscript/pull/989 -->

We fixed a bug that was incorrectly showing diagnostics when there was a class with the same partial name as a similar namespace.

```vb
namespace some.nameSpace
    function anything()
    end function
end namespace
namespace some
        'this was causing issues, but we fixed it!
        class name
        end class
end namespace
```



## Fixes Class Constructor used as `function` transpilation and validation
<!-- 2023-11-30 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/972 -->

The type system now correctly identifies that class constructors are also functions. So things like this will no longer show diagnostics:

```vb
sub callSomeFunc(someFunc as function)
    someFunc()
end sub
class MyKlass
end class
sub doStuff()
    'this is okay now!
    callSomeFunc(MyKlass)
end sub
```

## Classes do not include AA members
<!-- 2023-11-30 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/970 -->

When defining a class, you would expect the class to contain _only_ the members you've explicitly defined. However, we found that all of the `ifAssociativeArray` fields were present, which were allowing classes to be treated like AAs by default. While classes are implemented as AAs under the hood, we felt that this was too permissive and counter to the goal of classes.

To mitigate this, we have removed all of the `ifAssociativeArray` methods from classes by default. If you want to treat your class like an "anything goes" AA, you can simply implement that interface. Like this:

```vb
class Person
    name as string
    sub setAge(age as number)
        m.age = age
        ' ~~~ this is not allowed anymore
    end sub
end class

class PersonAA implements ifAssociativeArray
    name as string
    sub setAge(age as number)
        'this is totally fine because we have extended ifAssociativeArray
        m.age = age
    end sub
end class
```

## Use regex for faster manifest/typedef detection
<!-- 2023-12-04 (for v0.65.12 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/976 -->

Adds slightly faster performance to the logic updated in [#942](#load-manifest-from-files-array-instead-of-root-of-project) when dealing with large file lists. This probably doesn't make much difference in practice, but hey, free cycles are free cycles!

The javascript engine will compile and cache regex expressions, so we can use them inline. We also avoid calling `.toLowerCase() because it's fairly expensive.

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/84645bda-1f73-48da-8fb9-d8ab3eb1d358)

The end result is _slightly_ faster initial brighterscript build times.


## Remove post-transpiled symbols from .bs code completion
<!-- 2023-12-06 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/979 -->

We fixed a bug that was incorrectly showing transpiled versions of symbols when editing brighterscript files.

Like this:
```vb
namespace Alpha
    sub beta()
        print "hello"
    end sub
    sub gamma()
        ' completions here should NOT have Alpha_beta or Alpha_gamma
    end sub
end namespace
```


## Fix out-of-date transpile blocks in docs
<!-- 2023-12-07 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/956 -->

Fixes a few docs "view transpiled code" blocks that were out of date from their sample code.


## General purpose name collision diagnostic
<!-- 2023-12-07 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/982 -->

We've added some great new diagnostics focused on detecting name collisions. Here are some examples:

![image](https://github.com/rokucommunity/brighterscript/assets/810290/1948e7bb-ac37-46ac-98a3-ca44857d45ae)

![image](https://github.com/rokucommunity/brighterscript/assets/810290/14a4e790-d74b-46dd-bdeb-67c1442e38e4)


![image](https://github.com/rokucommunity/brighterscript/assets/810290/373d401d-2d92-406f-9403-2f7825c1d6b5)


## Make `roSGNode` and `roSGNodeNode` the same
<!-- 2023-12-08 (for v0.66.0-alpha.11 released on 2023-12-21), https://github.com/RokuCommunity/brighterscript/pull/984 -->

When we first introduced the native types (like `Node`, `roSGNode`, `roSGNodeLabel`, etc...), we thought it made sense for `Node` and `roSGNode` to be different, so we made interfaces called `roSGNode` and `roSGNodeNode` respectively. However, in practice we found that it was just more confusing than helpful. So starting in `v0.66.0-alpha.11` `roSGNode` and `roSGNodeNode` have been merged into a single interface called `roSGNode`. In almost every situation, you can just use `roSGNode`. Let us know if you have some practical use case for needing to mark something as `Node` instead.


# For Contributors

## Use getDeviceInfo from roku-deploy
<!-- 2023-11-28 (for v2.45.9 released on 2023-12-07), https://github.com/RokuCommunity/vscode-brightscript-language/pull/532 -->

Last month we improved the `rokuDeploy.getDeviceInfo()` method to be more library friendly to our NodeJS projects. This month we removed our custom fetching of `device-info` in favor of the `rokuDeploy.getDeviceInfo()` function. This shouldn't have any visual impacts, but just know that under the hood we've unified our `device-info` access so that bug fixes are more easily shared across all the RokuCommunity projects.



## fix the create-package script
<!-- 2023-12-04 (for v0.66.0-alpha.10 released on 2023-12-07), https://github.com/RokuCommunity/brighterscript/pull/974 -->
Last month we introduced the [create-package](https://rokucommunity.github.io/whats-new/2023-11-November/#add-create-package-label-build-script) github action support. However, we found a few bugs. So this month we added a few fixes:
- builds proper urls to packages by excluding @ and _ symbols.
- specify the `--title` so the release doesn't accidentally use the current branch name.


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
