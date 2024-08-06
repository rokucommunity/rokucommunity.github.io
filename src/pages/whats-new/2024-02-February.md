---
date: February 2024
summary: BrighterScript v1 syntax backported, fixed empty interface parsing, enhanced debug protocol stability, debug protocol auto-reconnect, and fixes for sourcemaps and empty interfaces.
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
Welcome to the February 2024 edition of "What's New in RokuCommunity." Please consider <a target="_blank" href="https://rokucommunity.substack.com/">subscribing</a> to stay up to date with what's happening in RokuCommunity.

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

This month, we'd like to highlight [brighterscript#1062](https://github.com/rokucommunity/brighterscript/issues/1062). A few years ago, Roku added the [optional chaining operator](https://developer.roku.com/docs/references/brightscript/language/expressions-variables-types.md#optional-chaining-operators). However, there's a limitation where you can't optionally call a function on its own with this operator. Here are some examples:

```brightscript
f = { g: function() print "hello world": end function }
print f?.g?() ' totally fine, prints "hello world"
f?.g?() ' Syntax Error
```

We'd love to add support for the `f?.g?()` example by transpiling it to an assignment instead: `_ = f?.g?()`. This would allow developers to safely optionally call their functions.

If you're interested in working on this feature, please comment on the [github issue](https://github.com/rokucommunity/brighterscript/issues/1062) or reach out to us on [Slack](https://join.slack.com/t/rokudevelopers/shared_invite/zt-4vw7rg6v-NH46oY7hTktpRIBM_zGvwA)

# Debugging

## Support relaunch debug protocol
<!-- 2024-01-31 (for v0.21.4 released on 2024-02-29), https://github.com/RokuCommunity/roku-debug/pull/181 -->

One of the major issues we encountered during our [debug protocol testing](https://rokucommunity.github.io/whats-new/2023-11-November/#testing-auto-enabled-debug-protocol-on-125-devices) back in November was that the output logs would stop showing once you closed the app during a debug protocol session. This has now been fixed.

The underlying problem is that debug protocol sessions are terminated when you close the app, so we had no way of knowing when you re-launched the app since we had already disconnected. However, we discovered that Roku devices will print `"Waiting for debugging connection"` anytime you open a previously-sideloaded app using the debug protocol. That allowed us to scan the telnet logs for that entry, and auto-reconnect a new debug protocol session at that time.

While this is not the same as "remain connected", it does simulate that behavior, and should be seamless to the user.


## DebugProtocol fixes
<!-- 2024-02-26 (for v0.21.4 released on 2024-02-29), https://github.com/RokuCommunity/roku-debug/pull/186 -->

We fixed a bug in the debug protocol that whenever the ThreadsRequest fails with error code 4, we try to suspend again. This has added significant stability to debug protocol sessions. There's not much to show here, but just know debug sessions should crash and get into invalid states much less frequently


# BrighterScript

## Allow Additional v1 Syntax:
<!-- 2024-02-07 (for v0.65.22 released on 2024-02-09), https://github.com/RokuCommunity/brighterscript/pull/1059 -->

With the BrighterScript v1 alphas under heavy development, we found it was sometimes difficult to test new features while also maintaining existing codebases. To mitigate this, we have backported many of the new v1 syntax changes into the mainline v0 releases. This means you can write the new v1 syntax, which will transpile to normal code.

For example, one of the new features of v1 is that any assignment can support a type on the left-hand-side. So this syntax is now supported in the v0 releases (but without any validation support, you still need to use v1 for that).

```vb
class Foo
    node as roSGNode
end class

sub someFunc()
    myStr as string = "hello"
end sub
```

## Fix sourcemap comment and add `file` prop to map
<!-- 2024-02-08 (for v0.65.22 released on 2024-02-09), https://github.com/RokuCommunity/brighterscript/pull/1064 -->

We fixed some quirks in the sourcemaps generated by brighterscript. All of these should allow for more stable sourcemap usage across various sourcemap tooling (such as [source-map-visualization](https://twitchbronbron.github.io/source-map-visualization/)).

Here are the changes we made related to sourcemaps:

- Adds the `file` prop to sourcemaps to better align with the spec.
- fixes the filename in the sourceMappingUrl comment at the bottom of every file
- moves the sourceMappingUrl entry to a new line to make the file more clean


## Add support for `provideReferences` in plugins
<!-- 2024-02-09 (for v0.65.22 released on 2024-02-09), https://github.com/RokuCommunity/brighterscript/pull/1066 -->

Add support for plugins to contribute `references` when running as part of a language server. References are used by the "Get all references" option in the editor:

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/4b0d1c8e-be31-4f1b-9da8-bec63bd0496d)


## Empty interfaces break the parser
<!-- 2024-02-28 (for v0.65.23 released on 2024-02-29), https://github.com/RokuCommunity/brighterscript/pull/1082 -->
We fixed a bug where empty interfaces would cause exceptions in the brighterscript parser.

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/c288363d-6cdd-48f5-aa98-15a4e7928ce5)

# Community Tools

## bslint
### Support for latest BrighterScript alphas
<!-- 2024-02-01 (for v1.0.0-alpha.25 released on 2024-02-01), https://github.com/RokuCommunity/bslint/pull/97 -->
<!-- 2024-02-01 (for v1.0.0-alpha.26 released on 2024-02-01), ([04f98a9](https://github.com/RokuCommunity/bslint/commit/04f98a9)) -->

This month we updated the bslint v1 alphas to support brighterscript `v1.0.0-alpha.25` and  `v1.0.0-alpha.26`. Please be sure to keep the bslint and brighterscript alpha versions in sync (i.e. when using bslint `v1.0.0-alpha.26`, be sure to install the same version of brighterscript).

## roku-deploy
### Retry the convertToSquashfs request given the HPE_INVALID_CONSTANT error
<!-- 2024-02-26 (for v3.11.3 released on 2024-02-29), https://github.com/RokuCommunity/roku-deploy/pull/145 -->

We occasionally see the `convertToSquashfs` request fail in RokuDeploy. It seems to be caused by some specific set of zip sizes and filename length. The squashfs conversion appears to be successful, but for some reason the Roku returns a truncated response, preventing us from recognizing a successful operation.

To work around this, we send a second squashfs request any time we see the `HPE_INVALID_CONSTANT` error. If that response includes `'fileType': 'squashfs'` then we return the result saying it succeeded.



# Preview features
<!-- any alpha/beta changes across all projects should be documented here and not in their primary area above-->
## BrighterScript v1
We made a lot of progress on the brighterscript v1 alphas again this month. Here are some of the highlights:

### Built-in Objects have their interfaces as members
<!-- 2024-01-30 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1039 -->

Adds all the interfaces a built-in object has as accessible members.


![image](https://github.com/rokucommunity/brighterscript/assets/810290/128301d7-b8e6-4346-a9d2-f8ec2794acbd)


### Do not do validation on dotted sets of AAs
<!-- 2024-01-31 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1040 -->

Since AAs can change and have their properties overwritten, there will be no validation on invalid types for dotted-set's and dotted-gets of AAs

![image](https://github.com/rokucommunity/brighterscript/assets/810290/97b37225-8181-477d-a72a-a5b96ad6e6b0)


### Changed adding invalid as arg to empty callfunc invocations by default
<!-- 2024-01-31 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1043 -->

New `bsconfig.json` option:

```json
"legacyCallfuncHandling": {
    "description": "Legacy RokuOS versions required at least a single argument in callfunc()
        invocations. Previous brighterscript versions handled this by inserting invalid as an argument when
        no other args are present. This is not necessary in modern RokuOS versions.",
    "type": "boolean",
    "default": false
}
```

### Standardize AST Constructors
<!-- 2024-01-31 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1025 -->
As part of the v1 release initiative, we needed to make some breaking changes that have been bugging us for a while. One such breaking change is related to the AstNode structure. Here are the changes:

- take a single `options` object in the constructor
- constructor options keys end in `token` if it is a token or an identifier
- all tokens are accessible via a `.tokens` member on the node
- optional and/or mandatory keyword tokens do not need to be included in the constructor
- transpiles will just fill in a missing keyword if not included.

This was a fairly significant change, and plugins will absolutely be affected by this. So it is worth looking over [brighterscript#1025](https://github.com/RokuCommunity/brighterscript/pull/1025) if you're interested in knowing exactly what changed.


### Indexed get set multi index
<!-- 2024-02-01 (for v1.0.0-alpha.26 released on 2024-02-01), https://github.com/RokuCommunity/brighterscript/pull/1054 -->

The mainline brighterscript branch received a fix in [#1054](https://github.com/RokuCommunity/brighterscript/pull/1054) which added support for multi-indexed arrays (i.e. `multiArray[[["hello"]]]`). However, we did it in a backwards compatible way (see the new `additionalIndexes` property) but it wasn't our preferred implementation. In order to conform to the new v1 AST Structure, we needed to refactor that again in a breaking way. So that has been merged into a single property called `.indexes`. This should only impacts plugin authors.

### Simplify the plugin method signatures.
<!-- 2024-02-09 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1067 -->

For plugin authors, we've improved the plugin signatures in our typescript type definition files. This should provide much better autocomplete support when writing brighterscript plugins.

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

### Add rsgpalette to scraped docs
<!-- 2024-02-09 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1065 -->

We added rsgpalette to the standard library, which should fix the following type of error:

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/f59f926c-8e5a-4684-8e9a-152ae214d204)


### Fix member hovers for classes, interfaces and enums
<!-- 2024-02-12 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1071 -->

We fixed bugs in the hover results that would show the incorrect variable name when showing the type.

**Before:**
![image](https://github.com/rokucommunity/brighterscript/assets/2544493/d0d69e82-06b4-4ffe-ac61-ef0ff1b9dbb9)

**After:**

Enums members
![image](https://github.com/rokucommunity/brighterscript/assets/810290/f810b8e3-2915-4015-a382-31a4db47d864)


Class Members (looks same as interfaces):

![image](https://github.com/rokucommunity/brighterscript/assets/810290/fcdc5147-f6cf-4e27-9be3-21c7944c71cb)


### Adds validation when trying to access a class member directly on a class name
<!-- 2024-02-14 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1073 -->

We've added a new diagnostic that prevents you from referencing class properties and methods on the class _constructor_. This would have always resulted in `invalid` anyway, and is probably not what you intended to do. These members are also now excluded from the completions on the constructor.

![image](https://github.com/rokucommunity/brighterscript/assets/810290/d30f609e-d781-47df-b77b-25ff60638faf)


### Adds validation for calling `new` on a non-class constructor
<!-- 2024-02-14 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1075 -->

We added several new validations related to the `new` operator. You should see diagnostics anytime you call `new` on something that's _not_ a class.

![image](https://github.com/rokucommunity/brighterscript/assets/810290/f66e7003-0a4f-48c4-a8e3-b4d7e5fbbef0)

![image](https://github.com/rokucommunity/brighterscript/assets/810290/4c034a3f-d882-4450-97f8-39ff207fee9b)


### Make All AST Props Readonly
<!-- 2024-02-14 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1069 -->

In efforts to make plugin authorship easier, we've marked many AST properties as `readonly`, as they need to be manipulated by the `AstEditor` and not modified directly. Here are some of the changes

- Makes all the AST Props `readonly` - both tokens and any expressions referenced.
- Removes `get BrsFile.functionCalls()` - was not used... also removed tests associated with it
- Re-worked some parsing code so it gathers all tokens/expressions before building the node -- this has the consequence that there may be more diagnostics in some situations, because it doesn't end parsing as early as before (eg. try catch blocks)
- A few more small AST tweaks (like renaming `ImportStatement.tokens.filePath` - > `ImportStatement.tokens.path`)



### Modifies all SG AST constructors to use named properties in objects
<!-- 2024-02-14 (for v1.0.0-alpha.27 released on 2024-02-27), https://github.com/RokuCommunity/brighterscript/pull/1070 -->

For plugin authors, we've modified all of the SceneGraph AST nodes to accept named properties in their constructors to align with the BrighterScript AST design.

Plugin authors will need to modify their SceneGraph node creation to things like this:

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/541221bc-5995-4460-a508-0edecf5be3af)


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
    -   Move `coveralls-next` to a devDependency since it's not needed at runtime ([PR #1051](https://github.com/RokuCommunity/brighterscript/pull/1051))
    -   Indexed get set multi index ([PR #1054](https://github.com/RokuCommunity/brighterscript/pull/1054))
    -   Remove unnecessary logging ([6f7f863e](https://github.com/RokuCommunity/brighterscript/commit/6f7f863e))
    -   Fix sourcemap comment and add `file` prop to map ([PR #1064](https://github.com/RokuCommunity/brighterscript/pull/1064))
    -   Add support for `provideReferences` in plugins ([PR #1066](https://github.com/RokuCommunity/brighterscript/pull/1066))
    -   Simplify the plugin method signatures. ([PR #1067](https://github.com/RokuCommunity/brighterscript/pull/1067))

Contributions to [roku-deploy](https://github.com/RokuCommunity/roku-deploy):

-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Retry the convertToSquashfs request given the HPE_INVALID_CONSTANT error ([PR #145](https://github.com/RokuCommunity/roku-deploy/pull/145))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):

-   [@Christian-Holbrook (Christian-Holbrook)](https://github.com/Christian-Holbrook)
    -   Support relaunch debug protocol ([PR #181](https://github.com/RokuCommunity/roku-debug/pull/181))
    -   DebugProtocol fixes ([PR #186](https://github.com/RokuCommunity/roku-debug/pull/186))

Contributions to [bslint](https://github.com/RokuCommunity/bslint):

-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   upgrade to 1.0.0 alpha.25 ([PR #97](https://github.com/RokuCommunity/bslint/pull/97))
    -   upgrade to brighterscript@1.0.0-alpha.26 ([04f98a9](https://github.com/RokuCommunity/bslint/commit/04f98a9))
