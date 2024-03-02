---
date: February 2024
summary: Changes to vscode-brightscript-language, brighterscript, roku-deploy, roku-debug, bslint
layout: ../../layouts/WhatsNewPost.astro
---
# Overview

# Editor
## Remove duplicate 'clearLogOutput' command
<!-- 2024-02-06 (for v2.45.17 released on 2024-02-09), https://github.com/RokuCommunity/vscode-brightscript-language/pull/544 -->

Removes a duplicate command called `clearLogOutput` that was duplicated in the package.json for some reason. 



# Debugging

## Support relaunch debug protocol
<!-- 2024-01-31 (for v0.21.4 released on 2024-02-29), https://github.com/RokuCommunity/roku-debug/pull/181 -->

Persist the debug session for debug protocol. This is accomplished by parsing the telnet logs for the line "Waiting for debugging connection" and then creating the control port. When the application is closed, we continue to parse the telnet logs for that line. When that line is detected the control port will be created again.

A new signal `app-ready` is emitted to let `BrightScriptDebugSession` know the debug adapters are ready. Both adapters have to emit this signal.

When the app is closed via a home key press, reset the breakpoint managers state for the debug protocol.


## DebugProtocol fixes
<!-- 2024-02-26 (for v0.21.4 released on 2024-02-29), https://github.com/RokuCommunity/roku-debug/pull/186 -->

Reorder when the DebugProtocolClient connects.
Reorder when 'App-Ready' event is emitted.
Add retry logic and force pause when ThreadsRequest fails with error code 4



# BrighterScript

## Backport v1 syntax changes
<!-- 2024-01-30 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1034 -->

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




## Built-in Objects have their interfaces as members
<!-- 2024-01-30 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1039 -->

Adds all the interfaces a built-in object has as accessible members.


![image](https://github.com/rokucommunity/brighterscript/assets/810290/128301d7-b8e6-4346-a9d2-f8ec2794acbd)


addresses: #1038 


## Add plugin hooks for getDefinition
<!-- 2024-01-31 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1045 -->

Allow plugins to contribute to `go to definition` results in the language server


## Do not do validation on dotted sets of AAs
<!-- 2024-01-31 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1040 -->

![image](https://github.com/rokucommunity/brighterscript/assets/810290/97b37225-8181-477d-a72a-a5b96ad6e6b0)


We agreed that since AAs can change and have their properties overwritten, there will be no validation on invalid types on dotted-set's and dotted-gets of AAs

Addresses #1037 


## Changed adding invalid as arg to empty callfunc invocations by default
<!-- 2024-01-31 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1043 -->

New `bsconfig.json` option:

```
        "legacyCallfuncHandling": {
            "description": "Legacy RokuOS versions required at least a single argument in callfunc() invocations. Previous brighterscript versions handled this by inserting invalid as an argument when no other args are present. This is not necessary in modern RokuOS versions.",
            "type": "boolean",
            "default": false
        }
```

addresses #1018


## Fix parsing issues with multi-index IndexedSet and IndexedGet
<!-- 2024-01-31 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1050 -->

Fixes parsing and transpile issues with mutli-index `IndexedGetExpression` and `IndexedSetStatement`.

The solution is a little "icky", because we can't break backwards compatability, so I had to add `additionalIndexes` to the two AST node types. In v1, we should merge those into a single `.indexes` prop on the nodes instead. 

Fixes #1048 

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/b3051453-1374-4599-8232-ffb07345e8a7)



## Standardize AST Constructors
<!-- 2024-02-01 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1025 -->

Standardizes all AstNodes such that they:

- take a single `options` object in the constructor
- constructor options keys end in `token` if it is a token or an identifier
- all tokens are accessible via a `.tokens` member on the node
- optional and/or mandatory keyword tokens do not need to be included in the constructor
- transpiles will just fill in a missing keyword if not included.

Addresses: #1007


## Move `coveralls-next` to a devDependency since it's not needed at runtime
<!-- 2024-02-01 (for v0.65.22 released on 2024-02-09), https://github.com/RokuCommunity/brighterscript/pull/1051 -->

`coveralls-next` is only needed at development time to report coverage issues during CI builds. Not sure how it made its way into the prod dependencies...


## Indexed get set multi index
<!-- 2024-02-01 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1054 -->

#1050 fixed the indexedGet and indexedSet AST parsing in a backwards compatible way (`additionalIndexes`). But this PR refactors that in a breaking way for v1 into a single prop called `.indexes`. 


## Remove unnecessary logging
<!-- 2024-02-01 (for v1.0.0-alpha.26 released on 2024-02-01), ([6f7f863e](https://github.com/RokuCommunity/brighterscript/commit/6f7f863e)) -->




## Allow Additional v1 Syntax:
<!-- 2024-02-07 (for v0.65.22 released on 2024-02-09), https://github.com/RokuCommunity/brighterscript/pull/1059 -->

Allows without diagnostic, but no deeper validation:

- built-in types for class member types
- type declarations on LHS of assignments

eg. this is now ok:

```
class Foo
    node as roSGNode
end class

sub someFunc()
    myStr as string = "hello"
end sub
```


## If a namespace shadows a function, still allow processing to continue
<!-- 2024-02-08 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1063 -->

This fixes an issue in the JellyFin-roku project

The issue was that it was using the `roku-log` which declares the namespace `log`.
Previously, this was a problem because it shadows the native function `log`, and `Scope.linkSymbolTable()` panicked when the type of something that should have been a namespace wasn't a namespace, and quit processing the rest of the namespaces.

Anyway, that's fixed in this PR. More work needs to be done to handle *general* shadowing, but this fixes the specific issue for Jellyfin-roku



## Fix sourcemap comment and add `file` prop to map
<!-- 2024-02-08 (for v0.65.22 released on 2024-02-09), https://github.com/RokuCommunity/brighterscript/pull/1064 -->

- Adds the `file` prop to sourcemaps to better align with the spec.
- fixes the filename in the sourceMappingUrl comment at the bottom of every file
- moves the sourceMappingUrl entry to a new line to make the file more clean


## Add support for `provideReferences` in plugins
<!-- 2024-02-09 (for v0.65.22 released on 2024-02-09), https://github.com/RokuCommunity/brighterscript/pull/1066 -->

Add support for plugins to contribute `references` when running as part of a language server. 


## Simplify the plugin method signatures.
<!-- 2024-02-09 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1067 -->

Simplify the plugin method signatures so that plugins get better code help when autocompleting new plugin events. 

Before: 
```typescript
beforeProgramCreate?: PluginHandler<BeforeProgramCreateEvent>;
```
![event-signature](https://github.com/rokucommunity/brighterscript/assets/2544493/be46196d-23ed-4a76-ad64-9e1aa46e6625)


After:
```typescript
beforeProgramCreate?(event: BeforeProgramCreateEvent): any;
```

![event-signature-better](https://github.com/rokucommunity/brighterscript/assets/2544493/877910ce-76bc-4df3-a64e-7dc96d6d18eb)

Fixes #1022 


## Add rsgpalette to scraped docs
<!-- 2024-02-09 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1065 -->

With this change, the only errors in `Jellyfin-Roku` are VALID type errors - missing functions, or bad return values.

Big Change: Needed to move `SymbolTypeFlag` enum to its own file.



Addresses: #1057



## Fix maestro link on readme
<!-- 2024-02-11 (for v0.65.23 released on 2024-02-29), https://github.com/RokuCommunity/brighterscript/pull/1068 -->

Current link gives a 404


## Fix member hovers for classes, interfaces and enums
<!-- 2024-02-12 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1071 -->

Fixes: #907

Enums members
![image](https://github.com/rokucommunity/brighterscript/assets/810290/f810b8e3-2915-4015-a382-31a4db47d864)


Class Members (looks same as interfaces):

![image](https://github.com/rokucommunity/brighterscript/assets/810290/fcdc5147-f6cf-4e27-9be3-21c7944c71cb)




## Adds validation when trying to access a class member directly on a class name
<!-- 2024-02-14 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1073 -->

Solves: #987

![image](https://github.com/rokucommunity/brighterscript/assets/810290/d30f609e-d781-47df-b77b-25ff60638faf)



## Adds validation for calling `new` on a non-class constructor
<!-- 2024-02-14 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1075 -->

![image](https://github.com/rokucommunity/brighterscript/assets/810290/f66e7003-0a4f-48c4-a8e3-b4d7e5fbbef0)

![image](https://github.com/rokucommunity/brighterscript/assets/810290/4c034a3f-d882-4450-97f8-39ff207fee9b)


Previously, the check for this was in `ClassValidator` and only checked for `new` with callables. It was moved to `ScopeValidator`, and made more general, so it catches ALL uses of `new` on non-classes

As a result, `CachedLookups.newExpressions` was not used anymore, so it was removed.


## Make All AST Props Readonly
<!-- 2024-02-14 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1069 -->

- Makes all the AST Props `readonly` - both tokens and any expressions referenced.
- Removes `get BrsFile.functionCalls()` - was not used... also removed tests associated with it
- Re-worked some parsing code so it gathers all tokens/expressions before building the node -- this has the consequence that there may be more diagnostics in some situations, because it doesn't end parsing as early as before (eg. try catch blocks)
- A few more small AST tweaks (like renaming `ImportStatement.tokens.filePath` - > `ImportStatment.tokens.path`



## Modifies all SG AST constructors to use named properties in objects
<!-- 2024-02-14 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1070 -->

Addresses: #1046




## Fixes bad diagnostic on using class name as field name
<!-- 2024-02-14 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1076 -->




## Empty interfaces break the parser
<!-- 2024-02-28 (for v0.65.23 released on 2024-02-29), https://github.com/RokuCommunity/brighterscript/pull/1082 -->

Fixes a bug where empty interfaces would break the parser
Fixes #1081 

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/c288363d-6cdd-48f5-aa98-15a4e7928ce5)




# Community Tools

## bslint
## Add `create-package` github action support
<!-- 2024-01-26 (for v1.0.0-alpha.25 released on 2024-02-01), ([ebea19b](https://github.com/RokuCommunity/bslint/commit/ebea19b)) -->




## upgrade to 1.0.0 alpha.25
<!-- 2024-02-01 (for v1.0.0-alpha.25 released on 2024-02-01), https://github.com/RokuCommunity/bslint/pull/97 -->

Upgrades the latest v1 branch to bsc v1.0.0-alpha.25


## upgrade to brighterscript@1.0.0-alpha.26
<!-- 2024-02-01 (for v1.0.0-alpha.26 released on 2024-02-01), ([04f98a9](https://github.com/RokuCommunity/bslint/commit/04f98a9)) -->




## roku-deploy
## Retry the convertToSquahsfs request given the HPE_INVALID_CONSTANT error
<!-- 2024-02-26 (for v3.11.3 released on 2024-02-29), https://github.com/RokuCommunity/roku-deploy/pull/145 -->

We occasionally see the convertToSquashfs request fail. It seems determined by the size of the zip and the length of the file name. The Roku responds with half of the response body and roku-deploy cannot handle the bad data.

The squashfs conversion looks like it successfully created, the error is in the response.

The work around is to make a second request to squashfs when we see the 'HPE_INVALID_CONSTANT' error. If that response includes 'fileType': 'squashfs' then we return the result saying it succeeded.



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

-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Remove duplicate 'clearLogOutput' command ([PR #544](https://github.com/RokuCommunity/vscode-brightscript-language/pull/544))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):

-   [@cewert (Charles Ewert)](https://github.com/cewert)
    -   Fix maestro link on readme ([PR #1068](https://github.com/RokuCommunity/brighterscript/pull/1068))
-   [@fumer-fubotv (fumer-fubotv)](https://github.com/fumer-fubotv)
    -   Empty interfaces break the parser ([PR #1082](https://github.com/RokuCommunity/brighterscript/pull/1082))
-   [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    -   Backport v1 syntax changes ([PR #1034](https://github.com/RokuCommunity/brighterscript/pull/1034))
    -   Built-in Objects have their interfaces as members ([PR #1039](https://github.com/RokuCommunity/brighterscript/pull/1039))
    -   Do not do validation on dotted sets of AAs ([PR #1040](https://github.com/RokuCommunity/brighterscript/pull/1040))
    -   Changed adding invalid as arg to empty callfunc invocations by default ([PR #1043](https://github.com/RokuCommunity/brighterscript/pull/1043))
    -   Standardize AST Constructors ([PR #1025](https://github.com/RokuCommunity/brighterscript/pull/1025))
    -   Allow Additional v1 Syntax: ([PR #1059](https://github.com/RokuCommunity/brighterscript/pull/1059))
    -   If a namespace shadows a function, still allow processing to continue ([PR #1063](https://github.com/RokuCommunity/brighterscript/pull/1063))
    -   Add rsgpalette to scraped docs ([PR #1065](https://github.com/RokuCommunity/brighterscript/pull/1065))
    -   Fix member hovers for classes, interfaces and enums ([PR #1071](https://github.com/RokuCommunity/brighterscript/pull/1071))
    -   Adds validation when trying to access a class member directly on a class name ([PR #1073](https://github.com/RokuCommunity/brighterscript/pull/1073))
    -   Adds validation for calling `new` on a non-class constructor ([PR #1075](https://github.com/RokuCommunity/brighterscript/pull/1075))
    -   Make All AST Props Readonly ([PR #1069](https://github.com/RokuCommunity/brighterscript/pull/1069))
    -   Modifies all SG AST constructors to use named properties in objects ([PR #1070](https://github.com/RokuCommunity/brighterscript/pull/1070))
    -   Fixes bad diagnostic on using class name as field name ([PR #1076](https://github.com/RokuCommunity/brighterscript/pull/1076))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Add plugin hooks for getDefinition ([PR #1045](https://github.com/RokuCommunity/brighterscript/pull/1045))
    -   Fix parsing issues with multi-index IndexedSet and IndexedGet ([PR #1050](https://github.com/RokuCommunity/brighterscript/pull/1050))
    -   Move `coveralls-next` to a devDependency since it's not needed at runtime ([PR #1051](https://github.com/RokuCommunity/brighterscript/pull/1051))
    -   Indexed get set multi index ([PR #1054](https://github.com/RokuCommunity/brighterscript/pull/1054))
    -   Remove unnecessary logging ([6f7f863e](https://github.com/RokuCommunity/brighterscript/commit/6f7f863e))
    -   Fix sourcemap comment and add `file` prop to map ([PR #1064](https://github.com/RokuCommunity/brighterscript/pull/1064))
    -   Add support for `provideReferences` in plugins ([PR #1066](https://github.com/RokuCommunity/brighterscript/pull/1066))
    -   Simplify the plugin method signatures. ([PR #1067](https://github.com/RokuCommunity/brighterscript/pull/1067))

Contributions to [roku-deploy](https://github.com/RokuCommunity/roku-deploy):

-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Retry the convertToSquahsfs request given the HPE_INVALID_CONSTANT error ([PR #145](https://github.com/RokuCommunity/roku-deploy/pull/145))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):

-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Support relaunch debug protocol ([PR #181](https://github.com/RokuCommunity/roku-debug/pull/181))
    -   DebugProtocol fixes ([PR #186](https://github.com/RokuCommunity/roku-debug/pull/186))

Contributions to [bslint](https://github.com/RokuCommunity/bslint):

-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Add `create-package` github action support ([ebea19b](https://github.com/RokuCommunity/bslint/commit/ebea19b))
    -   upgrade to 1.0.0 alpha.25 ([PR #97](https://github.com/RokuCommunity/bslint/pull/97))
    -   upgrade to brighterscript@1.0.0-alpha.26 ([04f98a9](https://github.com/RokuCommunity/bslint/commit/04f98a9))