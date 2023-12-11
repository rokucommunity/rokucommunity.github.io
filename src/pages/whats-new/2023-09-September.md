---
date: September 2023
summary: brs adopted by RokuCommunity, new vscode automation panel, lots of brighterscript type validations
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
-   [@rokucommunity/promises](https://github.com/rokucommunity/promises/issues)

## Issue of the month

In this section, we highlight a specific issue where we could benefit from the community's assistance in finding a solution. These problems are generally straightforward to address, and serve as an excellent opportunity to become acquainted with the RokuCommunity codebases.

This month, we'd like to draw attention to [bslint#46: declutter multi-scope diagnostics](https://github.com/rokucommunity/bslint/issues/46). If you've been using bslint, you may have noticed many duplicate diagnostics whenever a lint issue is discovered across multiple components.

![image](https://github.com/rokucommunity/bslint/assets/2544493/4c984883-2369-43d1-aca7-9f677d2c9133)

We'd like to improve this by emitting a _single_ diagnostic that has `relatedInformation`, which can be collapsed in vscode and generally is much easier for developers to interact with.
![image](https://github.com/rokucommunity/bslint/assets/2544493/8c798f7e-b8c6-4789-b5ba-ee98e9165421)

If you're interested in working on this feature, please comment on the [github issue](https://github.com/rokucommunity/bslint/issues/46) or reach out to us on [Slack](https://join.slack.com/t/rokudevelopers/shared_invite/zt-4vw7rg6v-NH46oY7hTktpRIBM_zGvwA)


# New projects

## We adopted brs!

We adopted the brs project! [brs](https://github.com/sjbarag/brs) was a BrightScript simulator that allowed for running brightscript (and some simple scenegraph) logic on Windows, Mac, and Linux. It ran on NodeJS, and was primarily developed to support the [roca](https://github.com/hulu/roca) project for off-device testing.

Development on the original project stalled in September of 2021. We at RokuCommunity believe in the vision of [brs](https://github.com/sjbarag/brs), so after [some discussions with the original author](https://github.com/sjbarag/brs/issues/681), we decided to [fork](https://github.com/rokucommunity/brs) the project in order to ensure its continued development.

Many thanks to [@sjbarag (Sean Barag)](https://github.com/sjbarag) for the incredible work building and guiding brs to what it is today, and to [@lvcabral (Marcelo Cabral)](https://github.com/lvcabral) for agreeing to pick up and maintain [@rokucommunity/brs](https://github.com/rokucommunity/brs) under the umbrella of RokuCommunity!



## @rokucommunity/promises
We are proud to announce the release of the [@rokucommunity/promises](https://github.com/rokucommunity/promises) library!

Much of this design is based on JavaScript Promises. However, there are some differences:

- BrightScript does not have closures, so we couldn't implement the standard then function on the Promise SGNode because it would strip out the callback function and lose all context.
- Our promises are also deferred objects. Due to the nature of scenegraph nodes, we have no way of separating the promise instance from its resolution. In practice this isn't a big deal, but just keep in mind, there's no way to prevent a consumer of your promise instance from resolving it themselves, even though they shouldn't do that.

If you've been around the community for a while, you may have seen [roku-promise](https://github.com/rokucommunity/roku-promise) which is a popular promise-like library that was created by [@briandunnington](https://github.com/briandunnington) back in 2018. [@rokucommunity/promises](https://github.com/rokucommunity/promises) is fundamentally different than [roku-promise](https://github.com/rokucommunity/roku-promise). [roku-promise](https://github.com/rokucommunity/roku-promise) creates tasks for you, executes the work, then returns some type of response to your code in the form of a callback.

The big difference is, [@rokucommunity/promises](https://github.com/rokucommunity/promises) does not manage tasks at all. The puropose of a promise is to create an object that represents the future completion of an asynchronous operation. It's not supposed to initiate or execute that operation, just represent its status.

So by using [@rokucommunity/promises](https://github.com/rokucommunity/promises), you'll need to create `Task` nodes yourself (or timer, or observer), create the promises yourself (using our helper library), then mark the promise as "completed" when the task has finished its work.

Here's a quick example of some of the awesome things you can do with promises. Assume you want to run the following logical flow:

- (async) fetch the username from the registry
- (async) fetch an auth token from the server using the username
- (async) fetch the user's profileImageUrl using the authToken
- we have all the user data. set it on scene and move on
- if anything fails in this flow, print an error message

Here's an example of how you can do that using promises:

```vb
function logIn()
    context = {
        username: invalid,
        authToken: invalid,
        profileImageUrl: invalid
    }
    ' assume this function returns a promise
    usernamePromise = getUsernameFromRegistryAsync()
    promises.chain(usernamePromise, context).then(function(response, context)
        context.username = response.username
        'return a promise that forces the next callback to wait for it
        return getAuthToken(context.username)

    end function).then(function(response, context)
        context.authToken = response.authToken
        return getProfileImageUrl(context.authToken)

    end function).then(function(response, context)
        context.profileImageUrl = response.profileImageUrl

        'yay, we signed in. Set the user data on our scene so we can start watching stuff!
        m.top.userData = context

        'this catch function is called if any runtime exception or promise rejection happened during the async flows above
    end function).catch(function(error, context)
        print "Something went wrong logging the user in", error, context
    end function)
end function

```

# Editor

## Improvements to SceneGraph Node Inspector

This month we improved the look of the node details page in SceneGraph inspector. It should feel a lot cleaner now with a proper table layout. Here's a quick demo of the new layout:

![device-view](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/e8e974be-6151-4e46-bfbc-754daef17e76)

Which is a nice upgrade from the old layout:
![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/a7871d14-2113-4711-9d8b-a9f17766267d)

## New Roku Test Automation panel

We've added a new panel called the Roku Test Automation panel. This enables you to create a series of remote or text input commands that can be run against a Roku device. It supports running automatically on launch, or can also be run manually.

Here are some highlights:

-   use the record <img src="https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/e8140095-9b46-4321-87f6-b14f9863bfc6" style="display: inline"/> button to start an input recording session. you can use the built-in [remote control mode](https://rokucommunity.github.io/vscode-brightscript-language/Debugging/remote-control-mode.html) to capture a series of remote or character inputs rather than building the input sequence manually
-   run the automation on startup or manually
-   there's currently only support for a single sequence, but we hope to eventually add the ability to store many named sequences.

In the screenshot below, you can see an automation sequence that will run wait for 8 seconds, then press `down`, `down`, `right`, `ok` on the remote in order:

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/44b31a6c-b37b-41ec-bdad-9d1141ea0bb2)

# Formatting

## Sort imports

If you're using the brighterscript [import](https://github.com/rokucommunity/brighterscript/blob/master/docs/imports.md) feature, the VSCode extension and brighterscript-formatter are now able to sort imports alphabetically. Just be sure to set `"sortImports": true` in your `bsfmt.json` or set `"brightscript.format.sortImports": true` in your vscode settings. ([#75](https://github.com/RokuCommunity/brighterscript-formatter/pull/75))

Here's the feature in action:

![format-imports](https://github.com/rokucommunity/brighterscript-formatter/assets/2544493/2b4b179c-a76d-498d-815f-8673201956d1)

# BrighterScript

## Fix tab issue when printing diagnostics

If your development team prefers to use tabs in your source code (instead of spaces), you may have noticed that sometimes the diagnostics printed in the console by bsc are not properly formatted. [#f616265](https://github.com/RokuCommunity/brighterscript/commit/f616265) fixes that now so everything should now line up properly!

Before:

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/ecc9de19-1d94-469c-94f2-3eaef228de45)

After (fixed!):

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/4541d735-6f5b-4098-b002-5f0c640527b2)

## Print diagnostic related information

Many BrighterScript diagnostics include related information (such as the path to a scope or file). These were showing in the vscode problems panel, but were surprisingly absent from `bsc` command-line interface. As of [brighterscript v0.65.5](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#0655---2023-09-06), the `bsc` cli will now print related information as well.

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/bd59ed7d-2054-4886-94dd-d25266fa548f)

## Don't crash on null ranges

This may not apply to most BrighterScript _users_, but for brighterScript plugin authors, we now more gracefully handle when brighterscript plugins inject AST that is missing `.range` properties. (yay, no more crashes...we hope 🤞) ([#869](https://github.com/RokuCommunity/brighterscript/pull/869))

## Consistent insertion of bslib.brs

To reduce code duplication, brighterscript injects the `bslib.brs` script into most SceneGraph complent xml, which includes several common library functions used to support features like the [ternary operator](https://github.com/rokucommunity/brighterscript/blob/master/docs/ternary-operator.md) or [template strings](https://github.com/rokucommunity/brighterscript/blob/master/docs/template-strings.md). We discovered some issues where the script would randomly be injected into certain unexpected components. We've fixed the randomness, so the scripts are now inserted in a much more predictable manner. ([#870](https://github.com/RokuCommunity/brighterscript/pull/870))

## Allow specifying bslib destination directory

There's a new option in brighterscript called `bslibDestinationDir` which you can use to specify what directory you want `bslib.brs` to be written to. This can be useful when dealing with complex brighterscript library projects. ([#871](https://github.com/RokuCommunity/brighterscript/pull/871))

**bsconfig.json**

```jsonc
{
    "rootDir": "./src",
    "bslibDestinationDir": "./dist/roku_modules/bslib"
}
```

## new `noproject` cli flag

There are situations where you might want to run the brighterscript CLI without loading a `bsconfig.json` even though it's present. Historically, you had to do some hacky workarounds like specifying a path to a non-existent file:

```bash
npx bsc --project "not-there.json"
```

Thanks to [brighterscript#868](https://github.com/RokuCommunity/brighterscript/pull/868), you can now specify `--noproject` to explicitly disable `bsconfig.json` loading. This will also force any `--project` flag to be completely ignored. Here's how you use it:

```bash
npx bsc --noproject
```

## bs_const support in bsconfig.json

You can now add a `bs_const` property to your `bsconfig.json`. **NOTE:** these do not update the output manifest file, but they will impact the conditional compile items, allowing for a more consistent editing experience. ([#887](https://github.com/RokuCommunity/brighterscript/pull/887))

We hope to eventually have these values be included in the generated ouptput manifest, but that will need to wait until the [file api](https://github.com/rokucommunity/brighterscript/pull/408) lands in the mainline branch.

**bsconfig.json**

```jsonc
{
    "rootDir": "./src",
    "bs_const": {
        "DEBUG": true,
        "ENABLE_DEBUG_LOGGING": true
    }
}
```

## Add missing `emitDefinitions` to docs

BrighterScript has supported emitting type definitions (similar to [TypeScript's Type Declarations](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html#built-in-type-definitions)) for years now, but it was completely missing from the docs. We've fixed that! ([#893](https://github.com/RokuCommunity/brighterscript/pull/893))

Type definitions are super useful if you're writing a library in brighterscript, but then distributing your library as brightscript code. The type definitions will support describing the way your code was originally written so that other brighterscript projects will be able to get better type validation.

**someFile.d.bs**

```vb
namespace player
   enum PlayState
      playing
      paused
   end enum

   sub play(video as VideoMetadata)
   end sub

   sub pause(video as VideoMetadata)
   end sub

   interface VideoMetadata
      url as string
      subtitleUrl as string
   end interface
end namespace
```

## Fix template string position bug

We fixed a bug in the brighterscript [template string](https://github.com/rokucommunity/brighterscript/blob/master/docs/template-strings.md) transpiler that was incorrectly calculating line and column numbers, which caused poor debugging experiences because the source maps were then incorrect as well. This has been fixed, so template strings should no longer cause frustrating line offets while debugging! ([#921](https://github.com/RokuCommunity/brighterscript/pull/921))

```typescript
console.log(`
    yay, I don't mess up line numbers
    anymore
`);
```

## Update plugins docs

We've added new information to the BrighterScript plugins documentation related to modifying the bsconfig values after the project has loaded ([#913](https://github.com/RokuCommunity/brighterscript/pull/913))'

Here's an example brighterscript plugin example showing how to do exactly that:

```typescript
import { CompilerPlugin, ProgramBuilder } from 'brighterscript';

export default function plugin() {
    return {
        name: 'addFilesDynamically',
        beforeProgramCreate: (builder: ProgramBuilder) => {
            if (!builder.options.files) {
                builder.options.files = [];
            }

            builder.options.files.push({
                src: 'path/to/plugin/file.bs',
                dest: 'some/destination/path/goes/here'
            });
        }
    } as CompilerPlugin;
}
```

# BrighterScript Preview features

This month we're giving the brighterscript v0.66 branch its own entire section, because there has been a _LOT_ of significant progress made. Almost all of this work has been implemented by [@markwpearce (Mark Pearce)](https://github.com/markwpearce), who is doing an incredible job moving us closer to the finish line.

You can try most of these out by installing the latest v0.66 alphas:

```bash
npm install brighterscript@next
```

## bslint

We've started migrating bslint to the new BrighterScript v0.66 alphas. It's a work in progress, but hopefully here soon we'll have a version that is functional. In the mean time, you'll need to disable bslint in the `plugins` section of your `bsconfig.json` because it will cause runtime errors.

Here are few of the PRs that went into prepping the project:

-   bslint (2023-07-27): brighterscript@0.66.0-alpha.4 ([c495fb9](https://github.com/RokuCommunity/bslint/commit/c495fb9))
-   bslint (2023-09-21): Add bsc-0.66-alpha.6. Fix tests ([5a4de6f](https://github.com/RokuCommunity/bslint/commit/5a4de6f))

## Validate class and interface method calls

We now validate class method calls!

![image](https://user-images.githubusercontent.com/810290/256335937-ae33c514-f9ec-4e96-a8bc-d04e010f5293.png)

<br />

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/fd820dd5-0211-439b-b8d3-9bfa646e8ed3)

<br />

![image](https://user-images.githubusercontent.com/810290/256336719-11daba64-77c3-4f02-abfd-6f25a5edacdf.png)

## Type casts are not allowed in BrightScript

In some of the initial v0.66 alphas, we accidentally allowed users to write type cast expressions (`thing as SomeType`) in plain brightscript projects. We now properly warn that the feature is only supported in BrighterScript.

![image](https://user-images.githubusercontent.com/810290/256878508-7280d101-0214-4973-b961-fd727642b90a.png)

## Fixed a hover bug

We fixed a few bugs when hovering over certain types that was showing the wrong thing. Now we do a better job.

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/77498b0f-bc8b-460f-8a8e-9df8a720b88c)

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/3094917d-d741-47b6-85d0-2d47ca6bd406)

## Return type validation

We now validate the actual return type vs. the declared return type. Subs and void functions will have validation errors when an actual type is included, and this works in `.brs` _and_ `.bs` files!

<video src="https://user-images.githubusercontent.com/810290/264360339-d065c1ee-30f2-496f-ad4d-2e66182b166b.mov" data-canonical-src="https://user-images.githubusercontent.com/810290/264360339-d065c1ee-30f2-496f-ad4d-2e66182b166b.mov" controls="controls" muted="muted" class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px">
</video>

## Adds Typed Arrays

Arrays can now have a type by defining them like `<type>[]` (e.g. `string[]` or `SomeClass[]`). We also support multidimensional arrays (e.g. `integer[][]`), as well as support overrides for built in methods for arrays (eg. `push()`, `pop()`) so it is consistent with the type. We will infer types from array literals as well, which can be very helpful for reducing needless `as <someType>` code.

This feature is only available in BrighterScript.

<video src="https://user-images.githubusercontent.com/810290/264099979-a32c8a12-73a6-4d16-8d01-6a95f91c5006.mov" data-canonical-src="https://user-images.githubusercontent.com/810290/264099979-a32c8a12-73a6-4d16-8d01-6a95f91c5006.mov" controls="controls" muted="muted" class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px">
</video>

## Validates DottedSetStatements for type compatibility

We can now assign a specific type to classes, which then allow us to validate type mismatches for class members.

Line 3 should be an error because we're assigning an integer to a string.

![image](https://user-images.githubusercontent.com/2544493/265223561-19fa45fd-3021-4010-bea2-58024a6206cd.png)

## Adds Native Brightscript Component Types and Custom Components (Nodes) to Type System

In order to significantly improve the type validation experience, we have now integrated all of the native BrightScript component types, SGNode types, and custom components into the type system. This will allow you to declare variables as those types, and then get a much richer editor experience and better type safety when you interact with those items. Here are some highlights:

Additions:

-   All native Brightscript Components (eg. `roDeviceInfo`, `roBitmap`, `roDateTime`, etc.) as types usable in Brighterscript, including completions on methods and documentation
-   Same for native interfaces (`ifDraw2d`, `ifAppManager`, etc)
-   Same for native events (`roInputEvent`, `roSGNodeEvent`)
-   Adds `AssociativeArrayType` that can be built from an AA literal (eg. myAA = {name: "Mark", coolFactor: 100}), and will correctly be compatible with interface types that have declared the same members, eg:

```vb
interface Developer
   name as string
   coolFactor as integer
end interface

sub takesDeveloper(dev as Developer)
   print dev
end sub

sub foo()
   ' no validation error, because AA meets required interface
   takesDeveloper({name: "Mark", coolFactor: 100})
end sub
```

We have added SceneGraph nodes to type system. The type's name is the component's name prefixed with roSGNode ... so `roSGNodePoster`, `roSGNodeRowList`, `roSGNodeStdDlgTextItem` are all available as types (with completions, documentation, etc)

Custom components are also added (again, prefixed with `roSgNode`). Eg:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<component name="Widget" extends="Group">
    <interface>
        <field id="alpha" type="assocArray" />
        <field id="beta" type="float" />
        <field id="charlie" type="nodeArray" />
    </interface>
</component>
```

This will create a type in the type system with name `roSGNodeWidget`, with completions and type inferences for properties alpha, beta, charlie, as well as validation on methods like `getChildren()`, `subType()`, etc.

## Adds validation for binary operators

Adding string and number now gets flagged as a compile error. ([#896](https://github.com/RokuCommunity/brighterscript/pull/896))

![image](https://user-images.githubusercontent.com/810290/268829734-a6c8c704-2bfd-4739-90ed-cfb4d104f56d.png)

## Add interface parameter support

Somehow when we were implementing brighterscript `interfaces`, we forgot to support parameters in function declarations. That has now been fixed, so you can property define your functions parameters in interfaces.

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/e94251c8-61fd-47ab-8e6b-a2859ecb9056)

## Fixed issues with interface validations

We've fixed several issues around validation interface usage, as well as adding extra details about missing or mismatched members:

![image](https://github.com/rokucommunity/brighterscript/assets/810290/a34595d8-4702-41ac-9b7b-1c97e0ef68d4)

## BrighterScript 0.66 alpha changes for plugin authors

This section is still related to the 0.66 alphas, but focuses on BrighterScript plugin authors and how they interact with the BrighterScript lifecycle and AST.

### Add Leading Trivia to all tokens as a way to get comments from expressions

As plugin authors, you may sometimes want to know about leading/trailing comments for a given expression or token. [brighterscript#885](https://github.com/RokuCommunity/brighterscript/pull/885) introduces a concept of "leading trivia" which will currently just contain leading comments. Function, class, method, field, interface, namespace statements return valid data from getLeadingTrivia() function. This should work with annotations as well.

Here's an example showing how to get all comment statements for the first function in the file

```typescript
import { Parser, TokenKind } from 'brighterscript';
const parser = Parser.parse(`
   'writes a message to the console
   sub consoleLog(message)
      print message
   end sub
`);

const trivia = this.ast.findChild(isFunctionStatement).getLeadingTrivia();
const comments = trivia.filter((x) => x.kind === TokenKind.Comment);
```

## Fixed `isLiteralInvalid` reflection method and added other `isLiteral*` methods

BrighterScript plugin authors can leverage the `isLiteral*` methods to make certain decisions about the AST they are interacting with. As a result of adding the type system, several of these methods got broken. We've fixed them, and also added any missing methods for types. ([#902](https://github.com/RokuCommunity/brighterscript/pull/902))

## Use Symbol Tables for Completions

Historically the completions logic was fairly involved to write and maintain, because we were doing very specific lookups against specific AST items. With the new symbol table and type system, that can be significantly simplified, while also being far more accurate.

There's not really a screenshot or demo to show with this, but just know that the completions are now much more maintainable and should more easily adapt to the changing type system.

# Thank you

Last but certainly not least, a big **_Thank You_** to the following people who contributed this month:

Contributions to [vscode-brightscript-language](https://github.com/RokuCommunity/vscode-brightscript-language):

-   [@triwav (Brian Leighty)](https://github.com/triwav)
    -   Updated Node Detail Page in Scenegraph Node Inspector and Added Roku Test Automation Panel ([PR #499](https://github.com/RokuCommunity/vscode-brightscript-language/pull/499))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Update stopDebuggerOnAppExit description related to debug protocol. ([PR #497](https://github.com/RokuCommunity/vscode-brightscript-language/pull/497))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):

-   [@chrisdp (Christopher Dwyer-Perkins)](https://github.com/chrisdp)
    -   Task/support bs const in bsconfig ([PR #887](https://github.com/RokuCommunity/brighterscript/pull/887))
-   [@enthooz (Andrew Ashbacher)](https://github.com/enthooz)
    -   ensure consistent insertion of bslib.brs ([PR #870](https://github.com/RokuCommunity/brighterscript/pull/870))
    -   allow optionally specifying bslib destination directory ([PR #871](https://github.com/RokuCommunity/brighterscript/pull/871))
-   [@josephjunker (Joseph Junker)](https://github.com/josephjunker)
    -   Add some more details to the plugins docs ([PR #913](https://github.com/RokuCommunity/brighterscript/pull/913))
-   [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    -   Adds built in Interfaces to primitive types & Validates class method calls ([PR #856](https://github.com/RokuCommunity/brighterscript/pull/856))
    -   Type casts are not allowed in BrightScript ([PR #859](https://github.com/RokuCommunity/brighterscript/pull/859))
    -   Fixes small hover issues ([PR #860](https://github.com/RokuCommunity/brighterscript/pull/860))
    -   Fixes ReferenceTypes in Binary Operations & UnionTypes as args ([PR #858](https://github.com/RokuCommunity/brighterscript/pull/858))
    -   Refactor Completions logic to be centralized to CompletionsProcessor ([PR #864](https://github.com/RokuCommunity/brighterscript/pull/864))
    -   Fix built in methods parameter types ([PR #866](https://github.com/RokuCommunity/brighterscript/pull/866))
    -   Fixed lint error ([8926e60](https://github.com/RokuCommunity/brighterscript/commit/8926e60))
    -   Fixes types on call expression info class ([PR #877](https://github.com/RokuCommunity/brighterscript/pull/877))
    -   Narrows some types ([6429017](https://github.com/RokuCommunity/brighterscript/commit/6429017))
    -   Removed unneeded comment ([adfd5bd](https://github.com/RokuCommunity/brighterscript/commit/adfd5bd))
    -   Fixed getting xml attribute location in diagnostic printing ([68c7c23](https://github.com/RokuCommunity/brighterscript/commit/68c7c23))
    -   Adds Return type validation ([PR #876](https://github.com/RokuCommunity/brighterscript/pull/876))
    -   Adds Typed Arrays ([PR #875](https://github.com/RokuCommunity/brighterscript/pull/875))
    -   Adds Leading Trivia to all tokens, as a way to get comments from expressions ([PR #885](https://github.com/RokuCommunity/brighterscript/pull/885))
    -   Use Symbol Tables for Completions ([PR #874](https://github.com/RokuCommunity/brighterscript/pull/874))
    -   Validates DottedSetStatements for type compatibility ([PR #894](https://github.com/RokuCommunity/brighterscript/pull/894))
    -   Adds Native Brightscript Component Types and Custom Components (Nodes) to Type System ([PR #891](https://github.com/RokuCommunity/brighterscript/pull/891))
    -   Adds validation for binary operators ([PR #896](https://github.com/RokuCommunity/brighterscript/pull/896))
    -   Fix union type unary operations and Array.sort(by) optional params ([PR #897](https://github.com/RokuCommunity/brighterscript/pull/897))
    -   Fixes issues with Interface validations, and adds extra details about missing or mismatches members ([PR #901](https://github.com/RokuCommunity/brighterscript/pull/901))
-   [@philanderson888 (Phil Anderson)](https://github.com/philanderson888)
    -   add noProject flag to bsc so BSConfig.json not expected ([PR #868](https://github.com/RokuCommunity/brighterscript/pull/868))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fix tab issue when printing diagnostics ([f616265](https://github.com/RokuCommunity/brighterscript/commit/f616265))
    -   Add scopes to argumentTypeMismatch diagnostics ([8e0ff98](https://github.com/RokuCommunity/brighterscript/commit/8e0ff98))
    -   Fix tab issue when printing diagnostics ([PR #865](https://github.com/RokuCommunity/brighterscript/pull/865))
    -   Print diagnostic related information ([PR #867](https://github.com/RokuCommunity/brighterscript/pull/867))
    -   Fix crashes in util for null ranges ([PR #869](https://github.com/RokuCommunity/brighterscript/pull/869))
    -   Add missing emitDefinitions to docs and fix iface ([PR #893](https://github.com/RokuCommunity/brighterscript/pull/893))
    -   Support defining params in interfaces ([PR #900](https://github.com/RokuCommunity/brighterscript/pull/900))
    -   Fix isLiteralInvalid ([PR #902](https://github.com/RokuCommunity/brighterscript/pull/902))
    -   Fix UnaryExpression transpile for ns and const ([PR #914](https://github.com/RokuCommunity/brighterscript/pull/914))
    -   Fix incorrect quasi location in template string ([PR #921](https://github.com/RokuCommunity/brighterscript/pull/921))
    -   fix bug in --noproject flag logic ([PR #922](https://github.com/RokuCommunity/brighterscript/pull/922))

Contributions to [brighterscript-formatter](https://github.com/RokuCommunity/brighterscript-formatter):

-   [@iBicha (Brahim Hadriche)](https://github.com/iBicha)
    -   Sort imports ([PR #75](https://github.com/RokuCommunity/brighterscript-formatter/pull/75))

Contributions to [bslint](https://github.com/RokuCommunity/bslint):

-   [@elsassph (Philippe Elsass)](https://github.com/elsassph)
    -   Silence one bsc diagnostic ([8c49713](https://github.com/RokuCommunity/bslint/commit/8c49713))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fix event structure ([61481e1](https://github.com/RokuCommunity/bslint/commit/61481e1))
    -   Performance boost by lifting some global lookups ([81aa853](https://github.com/RokuCommunity/bslint/commit/81aa853))
    -   brighterscript@0.66.0-alpha.4 ([c495fb9](https://github.com/RokuCommunity/bslint/commit/c495fb9))
    -   Add bsc-0.66-alpha.6. Fix tests ([5a4de6f](https://github.com/RokuCommunity/bslint/commit/5a4de6f))

Contributions to [brs](https://github.com/RokuCommunity/brs):

-   [@lvcabral (Marcelo Cabral)](https://github.com/lvcabral)
    -   Fixed `val()` edge cases: hex without radix and `NaN` ([94304cd](https://github.com/RokuCommunity/brs/commit/94304cd))
    -   Fixed prettier and replaced deprecated `substr()` method ([a223c2a](https://github.com/RokuCommunity/brs/commit/a223c2a))
    -   Merge pull request #3 from rokucommunity/bugfix/string-val-function-not-compliant ([afca557](https://github.com/RokuCommunity/brs/commit/afca557))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   refactor in preparation for adoption the project ([d786413](https://github.com/RokuCommunity/brs/commit/d786413))
    -   fix build script name ([fbaaed7](https://github.com/RokuCommunity/brs/commit/fbaaed7))
    -   install node modules first ([2ccec94](https://github.com/RokuCommunity/brs/commit/2ccec94))
    -   break out tasks to view nicer failure spot ([53c1aeb](https://github.com/RokuCommunity/brs/commit/53c1aeb))
    -   Add coverage reporting ([817c651](https://github.com/RokuCommunity/brs/commit/817c651))
    -   Actually add coverage reporting ([e31226b](https://github.com/RokuCommunity/brs/commit/e31226b))
    -   fix coverage reporting ([b2d223a](https://github.com/RokuCommunity/brs/commit/b2d223a))
    -   Merge pull request #1 from rokucommunity/adoption ([f1546e3](https://github.com/RokuCommunity/brs/commit/f1546e3))
    -   Update README.md ([ec82a06](https://github.com/RokuCommunity/brs/commit/ec82a06))
    -   Add changelog ([f72f2dc](https://github.com/RokuCommunity/brs/commit/f72f2dc))
    -   Add note about the project fork. ([af0c223](https://github.com/RokuCommunity/brs/commit/af0c223))
    -   Make tests import relative path to lib/index.js ([202cc9f](https://github.com/RokuCommunity/brs/commit/202cc9f))
