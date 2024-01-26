---
date: November 2023
summary: Changes to vscode-brightscript-language, brighterscript, roku-deploy, roku-debug, brs
layout: ../../layouts/WhatsNewPost.astro
---
# Overview

# Editor
## Enable `noUnusedLocals` tsconfig flag https://github.com/RokuCommunity/vscode-brightscript-language/pull/515
<!-- 2023-11-03 (for v2.45.0 released on 2023-11-06), https://github.com/RokuCommunity/vscode-brightscript-language/pull/515 -->

Enable the `noUnusedLocals` flag in the tsconfig, and cleaned up all those warnings.


## Telemetry tracking for roku OS version https://github.com/RokuCommunity/vscode-brightscript-language/pull/516
<!-- 2023-11-05 (for v2.45.0 released on 2023-11-06), https://github.com/RokuCommunity/vscode-brightscript-language/pull/516 -->

Track Roku OS version during the `startDebugSession` telemetry event. 
Also warn if launching to a device that has dev mode disabled 

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/6572c97c-14a2-4d64-826f-238753b06b12)



## roku-deploy@0.20.9 ([23208f0](https://github.com/RokuCommunity/vscode-brightscript-language/commit/23208f0))
<!-- 2023-11-05 (for v2.45.0 released on 2023-11-06), ([23208f0](https://github.com/RokuCommunity/vscode-brightscript-language/commit/23208f0)) -->




## Auto-enable debug protocol on 12.5 devices https://github.com/RokuCommunity/vscode-brightscript-language/pull/517
<!-- 2023-11-06 (for v2.45.0 released on 2023-11-06), https://github.com/RokuCommunity/vscode-brightscript-language/pull/517 -->

Auto-enables the debug protocol for any launch to a 12.5 devices that doesn't explicitly have `enableDebugProtocol` defined. 

We intend on running this as a trial period for a week to see what issues are uncovered. If the test goes smoothly, we'll leave this feature enabled indefinitely. If issues are discovered, we'll disable the protocol until we can fix the issues and then try again in the future. The goal of this is to tell the user we've enabled the protocol, but still give them an option for using telnet instead. However, it's in the user's best interest to give the debug protocol a thorough test, because it _will_ become the default debug mode in the near future. 


Users are presented with this popup:

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/846ed0f8-86bf-4edf-87f2-77aacd800f17)

Then after 2  clicks of the "Use telnet" button, we switch to this so the user can hide the popup for 12 hours.
![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/63fe6aa9-c079-426e-826e-2a734f95a253)

here's the "report issue" dialog:
![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/bd5447e0-e258-4684-95b2-f2dbdcaa3728)



## Fix extension crash in 2.45.0 https://github.com/RokuCommunity/vscode-brightscript-language/pull/520
<!-- 2023-11-06 (for v2.45.1 released on 2023-11-06), https://github.com/RokuCommunity/vscode-brightscript-language/pull/520 -->

Make undent a prod dependency to prevent the extension from crashing.


## upgrade roku-test-automation to 2.0.0-beta.22 to fix issue with RDB https://github.com/RokuCommunity/vscode-brightscript-language/pull/521
<!-- 2023-11-07 (for v2.45.2 released on 2023-11-08), https://github.com/RokuCommunity/vscode-brightscript-language/pull/521 -->




## Better messaging around debugProtocol popup https://github.com/RokuCommunity/vscode-brightscript-language/pull/522
<!-- 2023-11-08 (for v2.45.2 released on 2023-11-08), https://github.com/RokuCommunity/vscode-brightscript-language/pull/522 -->

- Always show the "ask less often" option for telnet.
- change the debug protocol "ask less often" choice to 12 hours (was 2 weeks)
- add slight explanation about what debug protocol is

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/e275e500-9fc4-471a-976e-3aaa6c140e94)




## chore: fix watch-all for alternate cloned dir name ([d816cce](https://github.com/RokuCommunity/vscode-brightscript-language/commit/d816cce))
<!-- 2023-11-08 (for v2.45.3 released on 2023-11-15), ([d816cce](https://github.com/RokuCommunity/vscode-brightscript-language/commit/d816cce)) -->




## Shorten the timeout for device-info query https://github.com/RokuCommunity/vscode-brightscript-language/pull/525
<!-- 2023-11-13 (for v2.45.3 released on 2023-11-15), https://github.com/RokuCommunity/vscode-brightscript-language/pull/525 -->

- Sets a shorter timeout for the device-info query so the user isn't just stuck waiting forever wondering what's happening. 
- show a spinning statusbar item when device-info is being requested.

![loading-picker](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/ef64921e-fe2e-40f2-9858-980d46fb0e46)



## Move common user input into a dedicated manager https://github.com/RokuCommunity/vscode-brightscript-language/pull/523
<!-- 2023-11-16 (for v2.45.5 released on 2023-11-16), https://github.com/RokuCommunity/vscode-brightscript-language/pull/523 -->

Moves the `promptForHost` command into a `UserInputManager` class so we can start centralizing our user input flows and sharing them to unify the experience across the extension. 


## Add app dropdown menu for ECP registry link https://github.com/RokuCommunity/vscode-brightscript-language/pull/514
<!-- 2023-11-16 (for v2.45.5 released on 2023-11-16), https://github.com/RokuCommunity/vscode-brightscript-language/pull/514 -->

Issue: https://github.com/rokucommunity/vscode-brightscript-language/issues/510

Added a quickpick dropdown menu that shows the apps list on a device (seen below) so a user can pick an app that they are possibly keyed for before opening the ECP registry

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/9dbf8044-add4-4920-8213-8284d7d250ea)

Here's an example of this in action:
![registry-link](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/5f48ff61-3860-4554-b732-1b21616afd53)



## backtick support in surrounding & autoClosing pairs https://github.com/RokuCommunity/vscode-brightscript-language/pull/528
<!-- 2023-11-17 (for v2.45.6 released on 2023-11-20), https://github.com/RokuCommunity/vscode-brightscript-language/pull/528 -->

Adds language/editor support for backticks (templatestrings) for autoClosingPairs and autoSurroundingPairs. So you can do things like this for template strings:

![surround-backtick](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/f5caa735-e455-445b-9651-5abf10eeb1a3)

Fixes #526 


## Fix watch-all problem matcher and output https://github.com/RokuCommunity/vscode-brightscript-language/pull/529
<!-- 2023-11-17 (for v2.45.6 released on 2023-11-20), https://github.com/RokuCommunity/vscode-brightscript-language/pull/529 -->

Fix the problem matcher in the `watch-all` task when running the workspace. This is fixed by emitting absolute paths instead of relative paths, which then work for both the workspace and individual folders


## Hide the debug protocol popup, telnet by default https://github.com/RokuCommunity/vscode-brightscript-language/pull/530
<!-- 2023-11-27 (for v2.45.7 released on 2023-11-27), https://github.com/RokuCommunity/vscode-brightscript-language/pull/530 -->

Sets telnet as the default debug session type, and disables the debug protocol picker popup. There are several issues that need to be resolved in the debug protocol before we can enable it by default again, so we'll work on those and try another initiative in a month or two. 



# Debugging

## Upgrade to new deviceInfo api from roku-deploy https://github.com/RokuCommunity/roku-debug/pull/167
<!-- 2023-11-05 (for v0.20.9 released on 2023-11-05), https://github.com/RokuCommunity/roku-debug/pull/167 -->

Upgrades to the new deviceInfo call from roku-deploy to eliminated code duplication in this project.


## Fix sideload crash when failed to delete sideloaded channel https://github.com/RokuCommunity/roku-debug/pull/168
<!-- 2023-11-07 (for v0.20.10 released on 2023-11-08), https://github.com/RokuCommunity/roku-debug/pull/168 -->

Sometimes calling "delete channel" fails from roku-deploy. Not sure why, but we should just try/catch it and move on. 


## Fix small typo in debug protocol message https://github.com/RokuCommunity/roku-debug/pull/169
<!-- 2023-11-09 (for v0.20.11 released on 2023-11-11), https://github.com/RokuCommunity/roku-debug/pull/169 -->




## Update DebugProtocolClient supported version range https://github.com/RokuCommunity/roku-debug/pull/170
<!-- 2023-11-10 (for v0.20.11 released on 2023-11-11), https://github.com/RokuCommunity/roku-debug/pull/170 -->

Updates the supported version range to consider 3.2.0 as supported. 


## Add timeout for deviceinfo query so we don't wait too long https://github.com/RokuCommunity/roku-debug/pull/171
<!-- 2023-11-13 (for v0.20.13 released on 2023-11-16), https://github.com/RokuCommunity/roku-debug/pull/171 -->

Add a shorter timeout to the device-info query so we can more quickly cancel the debug session if something is going wrong.


## Fix bug with compile error reporting https://github.com/RokuCommunity/roku-debug/pull/174
<!-- 2023-11-16 (for v0.20.13 released on 2023-11-16), https://github.com/RokuCommunity/roku-debug/pull/174 -->

Fix an issue where compile errors would be encountered, but we don't have a connection to the debug protocol so they were never reported. This fixes it in two ways:
 - always scrape telnet output for compile errors (even when debug protocol is enabled)
 - when showing the compile error "exception" hack, don't wait for the adapter to resolve (because it might ever resolve)



# BrighterScript

## ci: Don't run `test-related-projects` on release since it already ran on build ([157fc2ee](https://github.com/RokuCommunity/brighterscript/commit/157fc2ee))
<!-- 2023-10-16 (for v0.65.9 released on 2023-11-06), ([157fc2ee](https://github.com/RokuCommunity/brighterscript/commit/157fc2ee)) -->




## Fixes operator order for `not` keyword https://github.com/RokuCommunity/brighterscript/pull/932
<!-- 2023-10-17 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/932 -->

Before:

`not myString = ""` -> `BinaryExpression<=>(UnaryExpression<not>(myString), "")` 

Now:

`not myString = ""` -> `UnaryExpression<not>(BinaryExpression<=>(myString, ""))` 


Fixes #898 




## Fix class fields using constructors not transpiling correctly https://github.com/RokuCommunity/brighterscript/pull/933
<!-- 2023-10-18 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/933 -->

if there was a class field that used a constructor, the constructor was not namespaced correctly in the transpilation. This fixes that issue.




## Fix issue with unary expression parsing https://github.com/RokuCommunity/brighterscript/pull/938
<!-- 2023-11-01 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/938 -->

Fixes precedence in UnaryExpression parsing. 

ported from brs fix: https://github.com/rokucommunity/brs/pull/24


## Cache range and position https://github.com/RokuCommunity/brighterscript/pull/940
<!-- 2023-11-09 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/940 -->

Cache the range and position objects since they're immutable. This helps reduce memory footprint and garbage collection church. Also after a range has been created at least once, it should theoretically cost less CPU cycles since we just look it up from the cache instead of building a new one. 

For a large private project:
```
location cache: DISABLED 
build: (8s191.958ms) (7s967.413ms) (8s222.454ms) (8s035.043ms) | (avg: 8.104217seconds)
watch: (8s103.313ms) (8s104.476ms) (8s200.875ms) (8s100.466ms) | (avg: 8.127283seconds)

location cache: ENABLED
build:  (7s965.510ms) (7s977.796ms) (8s167.780ms) (7s960.608ms) (avg: 7.7679235seconds)
watch:  (7s873.529ms) (7s967.520ms) (8s018.557ms) (8s091.832ms) (avg: 7.9878595seconds)
```

For the same project, we end up caching a _ton_ of ranges and positions. As the app lives in watch mode for a while, I would expect more and more of those locations to get recycled:

```
cold boot:
Ranges:    254,551 cached 193,085 not cached
Positions: 418,227 cached   10,588 not cached

after 4 watch validations:
Ranges:    392,111 cached 163,335 not cached
Positions: 418,227 cached  10,588 not cached
```


## More performance fixes https://github.com/RokuCommunity/brighterscript/pull/936
<!-- 2023-11-15 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/936 -->

A bunch of improvements and fixes:

- ~Per-scope symbol caching that only invalidates a single scope when that scope changes~
- Smarter validation, so that only statements in a file that require re-validation for each scope get re-validated
- A few small ReferenceType bug fixes
- Fixes `ifDraw2d,DrawScaledObject` overload
- Rewrote `ScopeValidator.iterateFileExpressions` to do work on an AST Walk
- Uses better caching of Namespace data when linking scopes


`npm run benchmark -- --targets validate` :

Current release-0.66:
```
validate@local  ----------- 8.252 ops/sec
validate@0.65.8 --------- 104.338 ops/sec
```
Implementing algorithm above:
```
validate@local  ---------- 21.253 ops/sec
validate@0.65.8 --------- 105.035 ops/sec
```




## Add create-package label build script https://github.com/RokuCommunity/brighterscript/pull/945
<!-- 2023-11-16 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/945 -->

Adds support for adding `create-package` labels to pull requests, at which point github actions will auto-build a temporary .tgz npm package. 


## Validation Performance: File level `providedSymbols` and `requiredSymbols` https://github.com/RokuCommunity/brighterscript/pull/944
<!-- 2023-11-20 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/944 -->

```
benchmark: Running benchmarks:

    validate@local   --------- 271.514 ops/sec
    validate@0.65.10 --------- 101.219 ops/sec
```

⚡ Huge improvement to validation times! ⚡ 

How it works:

- When a file changes:
  - the file is broken down into individually-validatable segments (eg. each function statement, etc.)
  - each segment is indexed for symbols it requires to compile
  - all the symbols that are available externally to the file are indexed.
  - all the symbols that file requires are indexed (this is a Set of all the required symbols for all its segments)
  - all the symbols that have incompatible types to the previously-known types are marked especially.
- When there's a program validation
  - for the files that changed, check to see:
    - if there are any "duplicate symbols" in the same scope 
    - if the required symbols are are compatible for each scope the file is in
    - if there's a required symbol that is not in any scope
  - do a scope validation, but also pass along a reference to files that have changed, and what the changes are
- When validating a scope:
  - Mark each diagnostic if it was generated for a full scope validation vs. a validation based on an AST segment
  - clear any previously generated diagnostics if they were on a full scope validation
  - for each file in the scope
     -  validate the entire file if it's changed - but only once!
     - if it hasn't changed, and it does not require any symbols that have changed since last validation, do not validate!
     - if it does require something that has changed, than only for the segments in the file that require that symbol, validate the segment.
     - do appropriate clearing of diagnostics attached to the scope based on file and segment re-validations.
 

Known issues:
~The language server still weirdly re-validates for all open files, and there seems to be a race condition somewhere. I see it most notably on Brighterscript files, and when using classes/types defined in namespaces~** these are fixed!**



## Better go to definition support https://github.com/RokuCommunity/brighterscript/pull/948
<!-- 2023-11-21 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/948 -->

Add fixes for the "go to definition" logic so that it finds classes and interfaces. 

Here's it working in action!
![goto-definition](https://github.com/rokucommunity/brighterscript/assets/2544493/bb7b10c7-85c6-4a09-af30-2bc212ae642c)



## Fixes Transpilation bug - enums as class initial values https://github.com/RokuCommunity/brighterscript/pull/949
<!-- 2023-11-21 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/949 -->

Previously, there was a transpilation bug when using enums directly (eg. with no namespace prefix) inside a namespace... I was seeing it especially in classes.

```
                namespace MyNS
                    class HasEnumKlass
                        enumValue = MyEnum.A
                    end class

                    enum MyEnum
                        A = "A"
                        B = "B"
                    end enum
                end namespace
```
was being transpiled to (notice the MyEnum.A):
```
            function __MyNS_HasEnumKlass_builder()
                    instance = {}
                    instance.new = sub()
                        m.enumValue = MyEnum.A
                    end sub
                    return instance
                end function
                function MyNS_HasEnumKlass()
                    instance = __MyNS_HasEnumKlass_builder()
                    instance.new()
                    return instance
                end function
```


## Enums as class initial values https://github.com/RokuCommunity/brighterscript/pull/950
<!-- 2023-11-21 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/950 -->

Same as https://github.com/rokucommunity/brighterscript/pull/949 , but for `master`


## Interface optional properties https://github.com/RokuCommunity/brighterscript/pull/946
<!-- 2023-11-21 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/946 -->

![image](https://github.com/rokucommunity/brighterscript/assets/810290/439853a7-e0da-44c4-a4c2-08967088bd6a)



## Fix for the bad fix https://github.com/RokuCommunity/brighterscript/pull/952
<!-- 2023-11-21 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/952 -->




## Fix for the fix (master version) https://github.com/RokuCommunity/brighterscript/pull/953
<!-- 2023-11-21 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/953 -->




## Completion performance https://github.com/RokuCommunity/brighterscript/pull/958
<!-- 2023-11-22 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/958 -->

Previously:
```
for each scope file is in
    on file text completion,
        for each scope the file is in
             get all symbols from entire symbol table
```        

Now:
```
on file text completion,
    get symbols local to the completion position
    for each scope the file was in
         get symbols available at scope level
         get symbols based on namespace inclusion
   get the symbols from global scope

remove duplicates of same completion across different projects
``` 



## Fix param order for AST class constructors for interface/class members  https://github.com/RokuCommunity/brighterscript/pull/954
<!-- 2023-11-22 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/954 -->

In order to maintain a little bit of backwards compatibility, moves the `optional` token to the end for `InterfaceMethodStatement`, `InterfaceFieldStatement`, and `FieldStatement`. 


## Reverse compatibility fixes https://github.com/RokuCommunity/brighterscript/pull/959
<!-- 2023-11-23 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/959 -->




## Added ifDraw2d to reRegion interface https://github.com/RokuCommunity/brighterscript/pull/960
<!-- 2023-11-24 (for v0.66.0-alpha.8 released on 2023-11-27), https://github.com/RokuCommunity/brighterscript/pull/960 -->




## Remove v8-profiler from dependencies ([1287a5d7](https://github.com/RokuCommunity/brighterscript/commit/1287a5d7))
<!-- 2023-11-28 (for v0.66.0-alpha.9 released on 2023-11-28), ([1287a5d7](https://github.com/RokuCommunity/brighterscript/commit/1287a5d7)) -->





# Community Tools

## brs
## add logic for optional chaining https://github.com/RokuCommunity/brs/pull/21
<!-- 2023-10-25 (for v0.45.2 released on 2023-11-08), https://github.com/RokuCommunity/brs/pull/21 -->

Added logic for optional Chaining

- added tests as well
- now any warnings do not appear

Addressing #20 


## fix(interp): Preventing multiple calls for dot-chained methods https://github.com/RokuCommunity/brs/pull/22
<!-- 2023-10-31 (for v0.45.2 released on 2023-11-08), https://github.com/RokuCommunity/brs/pull/22 -->

Addressing #9 and fixing unit tests for conditional chaining.


## fix(parser): Wrong negative sign precedence was causing math errors (#6) https://github.com/RokuCommunity/brs/pull/24
<!-- 2023-11-01 (for v0.45.2 released on 2023-11-08), https://github.com/RokuCommunity/brs/pull/24 -->

There was a change done to fix another issue that caused this side effect (see bug for details)


## roku-deploy
## Enhance getDeviceInfo() method https://github.com/RokuCommunity/roku-deploy/pull/120
<!-- 2023-11-03 (for v3.10.4 released on 2023-11-03), https://github.com/RokuCommunity/roku-deploy/pull/120 -->

Enhances the `getDeviceInfo()` method:
- add `enhance` option to get an object back in `camelCase` instead of the standard `kebab-case`, and to convert boolean strings to booleans and number strings to numbers
- retains backwards compatibility by adding an overloaded signature that is not the default


## Added some more message grabbing logic https://github.com/RokuCommunity/roku-deploy/pull/127
<!-- 2023-11-13 (for v3.10.5 released on 2023-11-14), https://github.com/RokuCommunity/roku-deploy/pull/127 -->

Found that it is possible to get errors in a json object within the response. This adds checks for that. 


## Add better device-info jsdoc block https://github.com/RokuCommunity/roku-deploy/pull/128
<!-- 2023-11-13 (for v3.10.5 released on 2023-11-14), https://github.com/RokuCommunity/roku-deploy/pull/128 -->

Adds better jsdoc descriptions for the `GetDeviceInfoOptions` interface properties.


## Add public function to normalize device-info field values https://github.com/RokuCommunity/roku-deploy/pull/129
<!-- 2023-11-20 (for v3.11.1 released on 2023-11-30), https://github.com/RokuCommunity/roku-deploy/pull/129 -->

Exposes a new function that will normalize the device-info field values. This way external consumers can leverage the non-enhanced device-info result, but still normalize their values if desired. 


## Wait for file stream to close before resolving promise https://github.com/RokuCommunity/roku-deploy/pull/133
<!-- 2023-11-30 (for v3.11.1 released on 2023-11-30), https://github.com/RokuCommunity/roku-deploy/pull/133 -->

Fixes a bug where we weren't waiting for the downloaded file stream to close before resolving the file path promise. 



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

-   [@MilapNaik (Milap Naik)](https://github.com/MilapNaik)
    -   Add app dropdown menu for ECP registry link ([PR #514](https://github.com/RokuCommunity/vscode-brightscript-language/pull/514))
-   [@triwav (Brian Leighty)](https://github.com/triwav)
    -   upgrade roku-test-automation to 2.0.0-beta.22 to fix issue with RDB ([PR #521](https://github.com/RokuCommunity/vscode-brightscript-language/pull/521))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Enable `noUnusedLocals` tsconfig flag ([PR #515](https://github.com/RokuCommunity/vscode-brightscript-language/pull/515))
    -   Telemetry tracking for roku OS version ([PR #516](https://github.com/RokuCommunity/vscode-brightscript-language/pull/516))
    -   roku-deploy@0.20.9 ([23208f0](https://github.com/RokuCommunity/vscode-brightscript-language/commit/23208f0))
    -   Auto-enable debug protocol on 12.5 devices ([PR #517](https://github.com/RokuCommunity/vscode-brightscript-language/pull/517))
    -   Fix extension crash in 2.45.0 ([PR #520](https://github.com/RokuCommunity/vscode-brightscript-language/pull/520))
    -   Better messaging around debugProtocol popup ([PR #522](https://github.com/RokuCommunity/vscode-brightscript-language/pull/522))
    -   chore: fix watch-all for alternate cloned dir name ([d816cce](https://github.com/RokuCommunity/vscode-brightscript-language/commit/d816cce))
    -   Shorten the timeout for device-info query ([PR #525](https://github.com/RokuCommunity/vscode-brightscript-language/pull/525))
    -   Move common user input into a dedicated manager ([PR #523](https://github.com/RokuCommunity/vscode-brightscript-language/pull/523))
    -   backtick support in surrounding & autoClosing pairs ([PR #528](https://github.com/RokuCommunity/vscode-brightscript-language/pull/528))
    -   Fix watch-all problem matcher and output ([PR #529](https://github.com/RokuCommunity/vscode-brightscript-language/pull/529))
    -   Hide the debug protocol popup, telnet by default ([PR #530](https://github.com/RokuCommunity/vscode-brightscript-language/pull/530))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):

-   [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    -   Fixes operator order for `not` keyword ([PR #932](https://github.com/RokuCommunity/brighterscript/pull/932))
    -   Fix class fields using constructors not transpiling correctly ([PR #933](https://github.com/RokuCommunity/brighterscript/pull/933))
    -   More performance fixes ([PR #936](https://github.com/RokuCommunity/brighterscript/pull/936))
    -   Validation Performance: File level `providedSymbols` and `requiredSymbols` ([PR #944](https://github.com/RokuCommunity/brighterscript/pull/944))
    -   Fixes Transpilation bug - enums as class initial values ([PR #949](https://github.com/RokuCommunity/brighterscript/pull/949))
    -   Enums as class initial values ([PR #950](https://github.com/RokuCommunity/brighterscript/pull/950))
    -   Interface optional properties ([PR #946](https://github.com/RokuCommunity/brighterscript/pull/946))
    -   Fix for the bad fix ([PR #952](https://github.com/RokuCommunity/brighterscript/pull/952))
    -   Fix for the fix (master version) ([PR #953](https://github.com/RokuCommunity/brighterscript/pull/953))
    -   Completion performance ([PR #958](https://github.com/RokuCommunity/brighterscript/pull/958))
    -   Reverse compatibility fixes ([PR #959](https://github.com/RokuCommunity/brighterscript/pull/959))
    -   Added ifDraw2d to reRegion interface ([PR #960](https://github.com/RokuCommunity/brighterscript/pull/960))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   ci: Don't run `test-related-projects` on release since it already ran on build ([157fc2ee](https://github.com/RokuCommunity/brighterscript/commit/157fc2ee))
    -   Fix issue with unary expression parsing ([PR #938](https://github.com/RokuCommunity/brighterscript/pull/938))
    -   Cache range and position ([PR #940](https://github.com/RokuCommunity/brighterscript/pull/940))
    -   Add create-package label build script ([PR #945](https://github.com/RokuCommunity/brighterscript/pull/945))
    -   Better go to definition support ([PR #948](https://github.com/RokuCommunity/brighterscript/pull/948))
    -   Fix param order for AST class constructors for interface/class members  ([PR #954](https://github.com/RokuCommunity/brighterscript/pull/954))
    -   Remove v8-profiler from dependencies ([1287a5d7](https://github.com/RokuCommunity/brighterscript/commit/1287a5d7))

Contributions to [roku-deploy](https://github.com/RokuCommunity/roku-deploy):

-   [@chrisdp (Christopher Dwyer-Perkins)](https://github.com/chrisdp)
    -   Added some more message grabbing logic ([PR #127](https://github.com/RokuCommunity/roku-deploy/pull/127))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Enhance getDeviceInfo() method ([PR #120](https://github.com/RokuCommunity/roku-deploy/pull/120))
    -   Add better device-info jsdoc block ([PR #128](https://github.com/RokuCommunity/roku-deploy/pull/128))
    -   Add public function to normalize device-info field values ([PR #129](https://github.com/RokuCommunity/roku-deploy/pull/129))
    -   Wait for file stream to close before resolving promise ([PR #133](https://github.com/RokuCommunity/roku-deploy/pull/133))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):

-   [@chrisdp (Christopher Dwyer-Perkins)](https://github.com/chrisdp)
    -   Update DebugProtocolClient supported version range ([PR #170](https://github.com/RokuCommunity/roku-debug/pull/170))
-   [@jeanbenitezu (Jean Benitez)](https://github.com/jeanbenitezu)
    -   Fix small typo in debug protocol message ([PR #169](https://github.com/RokuCommunity/roku-debug/pull/169))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Upgrade to new deviceInfo api from roku-deploy ([PR #167](https://github.com/RokuCommunity/roku-debug/pull/167))
    -   Fix sideload crash when failed to delete sideloaded channel ([PR #168](https://github.com/RokuCommunity/roku-debug/pull/168))
    -   Add timeout for deviceinfo query so we don't wait too long ([PR #171](https://github.com/RokuCommunity/roku-debug/pull/171))
    -   Fix bug with compile error reporting ([PR #174](https://github.com/RokuCommunity/roku-debug/pull/174))

Contributions to [brs](https://github.com/RokuCommunity/brs):

-   [@lvcabral (Marcelo Lv Cabral)](https://github.com/lvcabral)
    -   fix(interp): Preventing multiple calls for dot-chained methods ([PR #22](https://github.com/RokuCommunity/brs/pull/22))
    -   fix(parser): Wrong negative sign precedence was causing math errors (#6) ([PR #24](https://github.com/RokuCommunity/brs/pull/24))
-   [@nadiapadalka (Nadiia Padalka)](https://github.com/nadiapadalka)
    -   add logic for optional chaining ([PR #21](https://github.com/RokuCommunity/brs/pull/21))