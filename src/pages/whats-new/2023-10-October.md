---
date: October 2023
summary: better names in device picker, improve host picker, significant debugger fixes, native brs interface types in brighterscript
layout: ../../layouts/WhatsNewPost.astro
---

# Overview
Welcome to the October 2023 edition of "What's New in RokuCommunity." Please consider <a target="_blank" href="https://rokucommunity.substack.com/">subscribing</a> to stay up to date with what's happening in RokuCommunity.

This month has seen some very significant improvements to the brighterscript type tracking initiative, and a complete overhaul of the internals of the debug session logic, as well as many other smaller changes to bslint, the formatter, and the vscode extension. Many thanks to all who have worked so hard and contributed this month!

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

In this section, we highlight a specific issue where we could benefit from the community's assistance in finding a solution. These problems are generally straightforward to address, and serve as an excellent opportunity to become acquainted with the RokuCommunity codebases. Thanks to [@iBicha (Brahim Hadriche)](https://github.com/iBicha) for the awesome job solving the [June 2023 issue of the month](https://rokucommunity.github.io/whats-new/2023-06-June/#issue-of-the-month)!

This month, we'd like to draw attention to [vscode-brightscript-language#470](https://github.com/rokucommunity/vscode-brightscript-language/issues/470). BrighterScript has support for regular expressions, so we added some syntax highlighting to help make those stand out more. However, there's a bug in the syntax logic, and it's incorrectly treating valid math expressions like they're regex expressions.

![image](https://user-images.githubusercontent.com/2544493/226361636-1078820c-9b26-4a1f-b5fd-377508ac5796.png)

We'd like to get that fixed so math looks right again!

If you're interested in working on this feature, please comment on the [github issue](https://github.com/rokucommunity/vscode-brightscript-language/issues/470) or reach out to us on [Slack](https://join.slack.com/t/rokudevelopers/shared_invite/zt-4vw7rg6v-NH46oY7hTktpRIBM_zGvwA)


# Editor

## Align device picker name with name from the devices tab

We standardized the device names in the device picker to match the names from the devices tree view panel. We now use the user-defined name when available.

Before:

![image](https://user-images.githubusercontent.com/2544493/274648905-fd473bd8-957d-42dc-aa34-eeecb61a14ab.png)

After:

![image](https://user-images.githubusercontent.com/2544493/274648768-ad97a8c3-507a-411d-bb4f-d5fae360b582.png)

## Enhance host picker during launch

We've significantly improved the experience interacting with the device picker dropdown that is shown when using the `"${promptForHost}"` option when launching a debug session:

-   add "last used" separator for the last used device
-   add "devices/other devices" separator for devices not last used
-   add separator line to separate the "enter manually" option
-   refresh the list any time a new device is discovered, instead of a blanket "wait 5 seconds" that was there previously
-   show a loader when we think there are more devices to be discovered

Here's a preview of the feature:

![image](https://user-images.githubusercontent.com/2544493/279407208-4fa3ce2e-5005-4919-8a16-645fa3b4a6f9.gif)

We've started dreaming up some fairly significant enhancements to the concept of "active devices". You can read about them [here](https://github.com/rokucommunity/vscode-brightscript-language/issues/506). We'd appreciate any feedback or insight you might have into the design of the feature.

## Add link for ECP registry

A new "View Registry" entry has been added to the devices panel that will open the dev channel's registry in a web browser (if your device supports it).

Next month we'll be adding the ability to pick what channel you want to view the registry for (instead of always defaulting to the dev channel), so stay tuned.

![image](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/9c2f7ef4-666f-4bf9-b994-dfadd5d7cc26)

# Debugging

## Enable remote control on launch

A new launch setting called `remoteControlMode` has been added. This will allow you to automate the [remote control mode](https://rokucommunity.github.io/vscode-brightscript-language/Debugging/remote-control-mode.html). You can configure `activateOnSessionStart` and `deactivateOnSessionEnd` independently to fully customize how you want the feature to work. Check it out!

We'd like to give kudos to [@iBicha (Brahim Hadriche)](https://github.com/iBicha) for the awesome work on this feature, as it was highlighted in our [June 2023](http://localhost:3000/whats-new/2023-06-June) edition as the [Issue of the month](http://localhost:3000/whats-new/2023-06-June#issue-of-the-month).

![remoteControlMode](https://github.com/rokucommunity/vscode-brightscript-language/assets/2544493/da1d55c5-a9bf-44c2-8c74-ab2436244eb3)

## Fix automation view crash when no config found

We fixed a bug in the automation view panel where it would crash if there was no config defined. Users could easily encounter this bug if they had never set any custom automation values.

Before the fix:

![image](https://user-images.githubusercontent.com/2544493/271679563-f23df431-938b-4a55-a30f-7d1747eb015f.png)

After the fix: ....it just works. 😀

## Fix that pesky "local variables" spinner in telnet

A common issue lately with the telnet debugger is that it gets in these strange "stuck" states, where the local variables panel seems to load infinitely. Like this:

![local-spin](https://github.com/rokucommunity/logger/assets/2544493/4d6e299f-52c0-435c-b511-884b957513b4)

The telnet debugger is extremely brittle. This is because we essentially wrote a [regular expression](https://en.wikipedia.org/wiki/Regular_expression) output log scraping state machine. Roku changing even a single character of their telnet output logs puts us at risk of falling into an unstable state.

We've [fixed a few issues](https://github.com/RokuCommunity/roku-debug/pull/163) related to this, so the telnet debugger should be a bit more stable now. Please [raise an issue](https://github.com/rokucommunity/roku-debug/issues) if you encounter any more of these unstable situations.

## Debug Protocol Enhancements

We've finally landed a significant refactor of our debugger after working on it for over a year (it wasn't nonstop, but still took a while...).

Code that interacts with a Roku device directly is typically very difficult to unit test. To mitigate that, we created a debug protocol server which emulates the server-side of Roku's binary debug protocol. This vastly simplifies the unit test experience, as we can now control both the client side and the server side, mocking both if necessary.

The one caveat is that these are not on-device tests, but the majority of our logic can be tested in this fashion. This `DebugProtocolServer` can also be used to provide actual debugging experiences in a brs emulator (if someone ever gets around to implementing that...).

Each ProtocolRequest and ProtocolResponse class will support loading from json, loading from a buffer, and serializing to a buffer. This makes the binary structures for client and server first-class citizens of the project, and simplifies the unit test experience as well. For the average user, this should result in a much more consistent debugging experience, and less frequent breaking changes as we release updates.

You can check out the [roku-debug#107](https://github.com/RokuCommunity/roku-debug/pull/107) if you're interested in reviewing the 17,000 lines of added/changed/removed code.

## Better compile error handling

Our compile error handling broke sometime in the last year or two. We used to highlight the line that had the error, but lately it just silently fails and only sometimes shows the error in the output logs.

This month we released some significant improvements to that experience. Now when a debug session detects a compile error, we will highlight the failed line in a similar style to runtime exceptions. We also keep the debug session alive, so you will need to click "stop" to terminate the session. This more closely aligns us with other debuggers like Node and dotnet. This works for both telnet _and_ the debug protocol.

![compile-error](https://github.com/rokucommunity/roku-debug/assets/2544493/c1c144e8-f6ca-48bd-beb3-13c409795853)

## Better debug session process cleanup

Some of our users have been experiencing some high CPU usage after a debug session has ended. This seems to be caused by the roku-debug process not properly shutting down. This month we squashed several bugs related to that. We do a much better job cleaning up opened sockets, event listeners, telnet connections, etc.

There's not much to show here, but hopefully we found all the areas that were blocking the process shutdown. Please [raise an issue](https://github.com/rokucommunity/roku-debug/issues) if you encounter any more of these unstable situations.

# Formatting

## new `color-format` bslint rule to enforce specific color formats

We've added several new bslint rules to enforce specific color formats in your code. Here are some of the details:

-   `color-format`: ensures that all the color values follow the same prefix formatting. Can also use to prevent any colors values from being defined in the code-base (brs or bs files), except for values in a stand-alone file (ie. theme file).

    -   `hash-hex`: enforces all color values are type string or template string and use a `#` prefix
    -   `quoted-numeric-hex`: enforces all color values are type string or template string and use a `0x` prefix
    -   `never`: enforces that no color values can be defined in the code-base (brs or bs files). Useful if you define colors in a separate stand-alone file. To use this option you would list your stand-alone file in the `ignore` list or `diagnosticFilters`.
    -   `off`: do not validate (**default**)

You can also specify some other settings such as `color-case` to enforce upper-case or lower-case characters, `color-alpha` to require alpha to be defined (or not defined), and `color-cert` to enforce Roku's [broadcast safe color 6.4 certification requirement](https://developer.roku.com/en-gb/docs/developer-program/certification/certification.md)

# BrighterScript

# BrighterScript Preview features

This month we're giving the brighterscript v0.66 branch its own entire section again, because there has been a _LOT_ of significant progress made. Almost all of this work has been implemented by [@markwpearce (Mark Pearce)](https://github.com/markwpearce), who is doing an incredible job moving us closer to the finish line.

You can try most of these out by installing the latest v0.66 alphas:

```bash
npm install brighterscript@next
```

## File api

At long last, the file api has been merged! (into the upcoming v0.66 release branch). We had hoped to land this in mainline back in the spring, but there were a few breaking changes that we had to work through. Since v0.66 will bring several other breaking changes, it made more sense to go ahead and group the file API changes in with that release. We won't get into too much detail on the file api, but here are some highlights:

-   all files matched by the `files` array are now loaded into the program. Known files (like `xml` and `brs`/`bs` will be handled by BrighterScript, and all other files will be passed through as-is.
-   plugins can now intercept the `provideFile` plugin hook and contribute their own enriched files (like json validation, non-scenegraph xml support, etc).

You can review pull request at [brighterscript#408](https://github.com/RokuCommunity/brighterscript/pull/408), or read the file api docs [here](https://github.com/rokucommunity/brighterscript/blob/release-0.66.0/docs/plugins.md#file-api)

Also note that this feature is still in preview. We may still need to make some changes to the API as developers start to more heavily leverage the file API, so just keep that in mind.

## Support overloaded methods in BrightScript interfaces

In order to keep the native scenegraph/brightscript data up-to-date, we regularly maintain a JSON file of all the various built-in types provided by the Roku platform. We have added support for BrightScript interface method overloads so that there is now a single definition of the method that can be added to the type system. We also fixed some incorrect function signatures like `array.sort()` `flags` param being optional.

![image](https://user-images.githubusercontent.com/810290/275030780-0d37c1a2-c39b-47b2-80c9-404563f8371a.png)

<br />

![image](https://user-images.githubusercontent.com/810290/275031209-cbd8802a-1552-44d4-b693-8ff7ba12484a.png)

## Adds `callFunc` as member method to Custom Components

The type system now supports adding callfunc members to custom components. This will allow us to detect when an unknown function is callfunc'd.

## Semantic Tokes for Native Components and Type completion in Type Expressions

We added support for better semantic token highlighting for component types and interfaces:

![image](https://user-images.githubusercontent.com/810290/272982938-c2b0fa22-e5f5-4360-b874-add0c71c0b15.png)

## Code completion in Type Cast/Type Expression:

We've updated the code completions to now show all of the native interfaces.

![image](https://user-images.githubusercontent.com/810290/272983536-547db5d2-1d6c-41b7-9aaf-a55d07d64213.png)

## Fixes compatibility of built in types (roArray -> typed arrays)

[brighterscript#925](https://github.com/RokuCommunity/brighterscript/pull/925) fixes some bugs in the type tracking related to assignability between `string` and `roString` and also when comparing typed arrays

## Fixes enum validation

Fixed a bug in enum validation where returning an integer-based enum value should not cause an error, as the value should be convertible. We also fixed a few issues where enums were not being properly treated as their underlying types when passed to functions.

![image](https://github.com/rokucommunity/brighterscript/assets/2544493/1d260ab8-6c21-4abb-86a7-63eb44798698)

## Allow classes and native components in Typed Arrays

We [fixed](https://github.com/RokuCommunity/brighterscript/pull/919) a bug When you declare a type of native component array, (eg. roAssociativeArray[] or roBitmap[]) there is a validation error. The following issue should no longer be a problem:

![image](https://user-images.githubusercontent.com/810290/269942800-689f5aad-b7e9-4779-976a-ad5283ccdbae.png)

## Improve type compatibility diagnostic messages

We've improved some of the "type a is not compatible with type b" messages. One change is that we now truncate the list of items with a `...and x more` message.

Similar to typescript, this will show exclusively the "missing members" message if there are any missing members. Then, if there are no missing members, it'll show the "members are incompatible" message if there are any incompatible members. This helps reduce the size of these large errors in some codebases. You've got to address the missing members and the incompatible types, so it doesn't hurt to just show one at a time.

combined error message before:

![image](https://user-images.githubusercontent.com/2544493/269929286-eca96374-514b-4e33-91f0-13aeee469cad.png)

Missing members after:

![image](https://user-images.githubusercontent.com/2544493/269929455-f895e734-10a5-4e12-84fa-ed4bf1c185bb.png)1

Incompatible members after:

![image](https://user-images.githubusercontent.com/2544493/269929522-edecc769-3c18-4e16-8e05-74cd7be44ce0.png)

## Better multi scope messages

We improved the multi-scope diagnostic messaging for related infos more relevant (and concise). Also truncate that list since seeing 95 related infos is just noise...

Here's how it looks now:

![image](https://user-images.githubusercontent.com/2544493/269661562-1e216018-5607-4e53-bb71-8d0c5a322ada.png)

## Fixed some bugs in hovers

Adds more incomplete expressions to the AST, so they can be used for completions.

Fixes:

-   Union type completions are only symbols available in all types Completion on union type should only show shared properties
-   Array toString() uses default type Reduce like types for hovers
-   Fixes Enum completions and hovers Completions for enum is wrong

You can read more about it here: [brighterscript#874](https://github.com/RokuCommunity/brighterscript/pull/874)

## Wider support for `as object`

We've fixed some type validation issues related to `as object` variable types. They are permitted to be passed to any function type (just like dynamic), so we've fixed a bug that was marking those as errors.

## Various other type validation enhancements

-   BinaryExpressions and UnaryExpressions should be able to infer resultant types (eg. Integer \* Integer => Integer, String + String => String, etc.)

-   Change Hover & Completion to use SymbolTable instead of variableDeclarations/callables

This will complete the refactor to move away from using these lookup tables to unify how a symbol can be discovered/known. When this is done, the concept of VariableDeclarations can be removed from the code.

-   Validate function calls for argument type validity

Function argument equality

```vb
sub main()
    printMessage(1)
    '            ~ Argument of type 'number' is not assignable to parameter of type 'string'
end sub

function printMessage(message as string)
    print message
end function
```

## Better diagnostic ranges for unknown dotted get expressions

We've tightened the range for the "can't find this property" diagnostics so it only highlights the property instead of the entire starting expression.

Before:

![image](https://user-images.githubusercontent.com/2544493/244416322-846b23f8-83a0-47ce-a52d-9da0983c2301.png)

After:

![image](https://user-images.githubusercontent.com/2544493/244416204-8d7d046a-56c0-4da4-8cea-9dbb89559431.png)

## Adds .kind prop to AstNode.

The `is<SomeAstNodeType>` functions from `reflections.ts` are used _heavily_ across brighterscript. As such, we found that this expression `thing?.constructor?.name === 'Whatever'` was fairly slow. To speed it up, we added a `.kind` property to `AstNode`, an `AstNodeKind` enum., and then converted the reflection methods to check for `.kind` instead of the `thing?.constructor?.name === 'Whatever'` logic. Raw benchmarks show this as a fairly significant boost:

![image](https://user-images.githubusercontent.com/2544493/234745941-ecf12cfd-cb6b-4755-8497-ac03817fb38c.png)

What that means in practice is validation speeds improve by 10-12 percent.

![image](https://user-images.githubusercontent.com/2544493/234746091-cacae55f-a825-4007-91da-23b26a4e0c7f.png)

Downsides:

This is a breaking change, as all plugins that produce AST would need to be upgraded to the latest version of brighterscript in order to work with the version of brighterscript shipped with the vscode extension. Or, for example, latest version of brighterscript being used with a plugin that depends on an older version of brighterscript.

## Breaking changes

We've introduced some additional breaking changes to brighterscript as we move closer to the release of v0.66.0.

-   all plugin event handler parameters have been converted single event objects. ([brighterscript#824](https://github.com/RokuCommunity/brighterscript/pull/824))
-   several plugin event names have changed as a result of the file api. We've added warnings if your plugins use them, but plugins will need to update to the new names.
-   the XML AST has been refactored to better support being modified by plugins during transpile. ([brighterscript#818](https://github.com/RokuCommunity/brighterscript/pull/818))
-   the `.kind` property on AstNode has been added, and all the reflection methods exclusively check for that now ([#799](https://github.com/RokuCommunity/brighterscript/pull/799))

# Thank you

Last but certainly not least, a big **_Thank You_** to the following people who contributed this month:

Contributions to [vscode-brightscript-language](https://github.com/RokuCommunity/vscode-brightscript-language):

-   [@fumer-fubotv (fumer-fubotv)](https://github.com/fumer-fubotv)
    -   Add ability to capture device screenshots ([PR #505](https://github.com/RokuCommunity/vscode-brightscript-language/pull/505))
-   [@iBicha (Brahim Hadriche)](https://github.com/iBicha)
    -   Enable remote control on launch ([PR #503](https://github.com/RokuCommunity/vscode-brightscript-language/pull/503))
-   [@MilapNaik (Milap Naik)](https://github.com/MilapNaik)
    -   Add link for ECP registry ([PR #511](https://github.com/RokuCommunity/vscode-brightscript-language/pull/511))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fix error when generating the docs ([12dfb27](https://github.com/RokuCommunity/vscode-brightscript-language/commit/12dfb27))
    -   Fix automation view crash when no config found ([PR #504](https://github.com/RokuCommunity/vscode-brightscript-language/pull/504))
    -   Diagnostic manager ([PR #502](https://github.com/RokuCommunity/vscode-brightscript-language/pull/502))
    -   Make device picker name same as tree view item ([PR #508](https://github.com/RokuCommunity/vscode-brightscript-language/pull/508))
    -   Add brs to releases script ([5c6622b](https://github.com/RokuCommunity/vscode-brightscript-language/commit/5c6622b))
    -   Enhance host picker during launch ([PR #512](https://github.com/RokuCommunity/vscode-brightscript-language/pull/512))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):

-   [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    -   Allow classes and native components in Typed Arrays ([PR #919](https://github.com/RokuCommunity/brighterscript/pull/919))
    -   Fixes some enum validation stuff ([PR #920](https://github.com/RokuCommunity/brighterscript/pull/920))
    -   Fixes compatibility of built in types (roArray -> typed arrays) ([PR #925](https://github.com/RokuCommunity/brighterscript/pull/925))
    -   Semantic Tokes for Native Components and Type completion in Type Expressions ([PR #927](https://github.com/RokuCommunity/brighterscript/pull/927))
    -   Adds `callFunc` as member method to Custom Components ([PR #929](https://github.com/RokuCommunity/brighterscript/pull/929))
    -   Allows `scrape-roku-docs` to consolidate overloaded methods ([PR #930](https://github.com/RokuCommunity/brighterscript/pull/930))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Better multi scope messages ([PR #904](https://github.com/RokuCommunity/brighterscript/pull/904))
    -   Refine type compat message ([PR #908](https://github.com/RokuCommunity/brighterscript/pull/908))
    -   Better typing for `Deferred` ([PR #923](https://github.com/RokuCommunity/brighterscript/pull/923))
    -   Add interface parameter support ([PR #924](https://github.com/RokuCommunity/brighterscript/pull/924))
    -   ci: Don't run `test-related-projects` on release since it already ran on build ([157fc2e](https://github.com/RokuCommunity/brighterscript/commit/157fc2e))
    -   File api ([PR #408](https://github.com/RokuCommunity/brighterscript/pull/408))
    -   Fix stagingDir issue in transpiler test ([8a31693](https://github.com/RokuCommunity/brighterscript/commit/8a31693))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):

-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fix bug with telnet getting stuck ([PR #163](https://github.com/RokuCommunity/roku-debug/pull/163))
    -   Debug Protocol Enhancements ([PR #107](https://github.com/RokuCommunity/roku-debug/pull/107))
    -   Clean up control socket when it's closed ([PR #166](https://github.com/RokuCommunity/roku-debug/pull/166))

Contributions to [bslint](https://github.com/RokuCommunity/bslint):

-   [@disc7 (Charlie Abbott)](https://github.com/disc7)
    -   [WIP] Color format checking for bslint ([PR #94](https://github.com/RokuCommunity/bslint/pull/94))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   copy expectDiagnostics from brighterscript for tests ([PR #95](https://github.com/RokuCommunity/bslint/pull/95))
    -   Fixing issues before release 0.8.11 ([051fd4c](https://github.com/RokuCommunity/bslint/commit/051fd4c))
