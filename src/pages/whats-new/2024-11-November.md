---
date: November 2024
summary: Changes to vscode-brightscript-language, brighterscript, promises
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
Welcome to the November 2024 edition of "What's New in RokuCommunity." Please consider <a target="_blank" href="https://rokucommunity.substack.com/">subscribing</a> to stay up to date with what's happening in RokuCommunity.

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
## Show multi-line lsp progress details
<!-- 2024-10-28 (for v2.50.5 released on 2024-11-06), https://github.com/RokuCommunity/vscode-brightscript-language/pull/600 -->

Shows progress from the lsp busy status in the tooltip multi-line. This _should_ be backwards compatible with the existing status, but it also supports the `scope` property (mostly used to include project name). 

Looks like this:

![image](https://github.com/user-attachments/assets/07fe5dc3-fbea-432a-83b7-e1c2a345a1d6)



## Fix bug with m.top colorization
<!-- 2024-11-06 (for v2.50.5 released on 2024-11-06), https://github.com/RokuCommunity/vscode-brightscript-language/pull/601 -->

Fixes syntax highlighting bug related to `.top`

Before:
![image](https://github.com/user-attachments/assets/3d050870-ddea-4fd9-a5a4-7cad73562f00)

After:
![image](https://github.com/user-attachments/assets/2bc8ceac-3484-4bdc-b63c-0b2c28dc628a)




# Debugging


# BrighterScript

## Optimize ternary transpilation for assignments
<!-- 2024-11-01 (for v0.68.0 released on 2024-11-21), https://github.com/RokuCommunity/brighterscript/pull/1341 -->

Whenever a ternary expression is on the right-hand-side of an assignment, dottedSet, or indexedSet statement, we can transpile the entire thing to an `if` statement instead which improves performance significantly (should be identical to handwritten non-ternary code). 

This PR adds this `if` statement transpiling for all of the following situations:
- assignments: `a = true ? 1 : 2`
- dotted set: `m.a = true ? 1 : 2`
- indexed set: `m["a"] = true ? 1 : 2`
- complex assignment operators (i.e. `+=`, `-=`, etc...) `size += true ? 1 : 2`
- grouped ternaries: `a = (((true ? 1 : 2)))`
- nested ternaries `a = true ? (false ? 1 : 2) : 3`

These are explicit cases, so any situation other than these will be transpiled according to the existing rules ([basic](https://github.com/rokucommunity/brighterscript/blob/master/docs/ternary-operator.md#basic-usage) and [scope safe](https://github.com/rokucommunity/brighterscript/blob/master/docs/ternary-operator.md#scope-protection))

**Simple example:**
```brighterscript
a = true ? 1 : 2
```

becomes this:
```brighterscript
if true then
    a = 1
else
    a = 2
end if
```

**Nested example:**
```brighterscript
result = true ? (false ? "one" : "two") : "three"
```

becomes this:
```brighterscript
if true then
    if false then
        result = "one"
    else
        result = "two"
    end if
else
    result = "three"
end if
```

[This benchmark](https://github.com/rokucommunity/bsbench/blob/master/src/source/benchmarks/TernaryPerformance.bs) shows a significant improvement in performace

![image](https://github.com/user-attachments/assets/ffbffc08-6b49-4729-a434-cb08f66a11d0)




## Fix issues with the ast walkArray function
<!-- 2024-11-21 (for v0.68.0 released on 2024-11-21), https://github.com/RokuCommunity/brighterscript/pull/1347 -->

Fix a bug that doesn't properly recover when the array being walked changes.

The core change in logic is as follows:
 - during an AST walk, if the visitor returns a new node, we will not walk the original node's children, and instead walk the new node's children
 - if a visitor changes an array (like `statements`), we will do a simple change detection method: `array[i] !== valuePassedToVisitor`. If we detect that it has changed, we'll restart the walk over that array (but skip any nodes we've already visited). This _can_ result in elements being visited out of order, but the use case for this is to help during transpile, so the order typically matters less.


## Enhance lexer to support long numeric literals with type designators
<!-- 2024-11-21 (for v0.68.1 released on 2024-11-26), https://github.com/RokuCommunity/brighterscript/pull/1351 -->

Fix lexer to support long numeric literals with type designators.

Fixes #1350 


## [Proposal] Add Namespace Source Literals
<!-- 2024-11-25 (for v0.68.1 released on 2024-11-26), https://github.com/RokuCommunity/brighterscript/pull/1354 -->

I'd like to add two source literals: `SOURCE_NAMESPACE` and `SOURCE_NAMESPACE_ROOT`

- These are complimentary to the existing `SOURCE_FUNCTION_NAME` literal 
- These are very useful for trace logging
- for developers that use a logger with filtering, enables filtering logs based on the namespace they originate from
  - alternative right now is to use `PKG_PATH`, but that changes every file, whereas a namespace can span multiple files

<details><summary><h2>Live Transpile Preview (pulled from VSCode)</h2></summary>
<p>

### Brighterscript:
```
Sub ComponentScope ()
    ' Component Scope
    sourceFunction = source_function_name
    sourceNamespace = source_namespace
    sourceNamespaceRoot = source_namespace_root
End Sub

Namespace NamespaceA

    ' Namespace Scope
    Sub ScopeA ()
        sourceFunction = source_function_name
        sourceNamespace = source_namespace
        sourceNamespaceRoot = source_namespace_root
    End Sub

    ' Nested Namespace Scope
    Namespace NamespaceB.NamespaceC

        Sub ScopeB ()
            sourceFunction = source_function_name
            sourceNamespace = source_namespace
            sourceNamespaceRoot = source_namespace_root
        End Sub

    End Namespace
End Namespace
```

### Transpiled
```
Sub ComponentScope()
    ' Component Scope
    sourceFunction = "ComponentScope"
    sourceNamespace = ""
    sourceNamespaceRoot = ""
End Sub
' Namespace Scope
Sub NamespaceA_ScopeA()
    sourceFunction = "NamespaceA.ScopeA"
    sourceNamespace = "NamespaceA"
    sourceNamespaceRoot = "NamespaceA"
End Sub
' Nested Namespace Scope
Sub NamespaceA_NamespaceB_NamespaceC_ScopeB()
    sourceFunction = "NamespaceA.NamespaceB.NamespaceC.ScopeB"
    sourceNamespace = "NamespaceA.NamespaceB.NamespaceC"
    sourceNamespaceRoot = "NamespaceA"
End Sub
```

</p>
</details> 

## Example Use Case
for debugging & log filtering

```
Namespace SpaceA
    Sub MyFunction ()
        LoggerUtil.Trace(SOURCE_FUNCTION_NAME, [SOURCE_NAMESPACE_ROOT]) 
    End Sub

    Namespace PrivateA
        Sub PrivateFunc ()
            LoggerUtil.Trace(SOURCE_FUNCTION_NAME, [SOURCE_NAMESPACE_ROOT])
        End Sub
    End Namespace
End Namespace

' Trace(text, filters)
' for filtering logs based on namespace, which may span multiple files
```

```
Namespace SpaceA
    Sub MyFunction ()
        LoggerUtil.Trace("MyFunction", ["SpaceA"]) 
    End Sub

    Namespace PrivateA
        Sub PrivateFunc ()
            LoggerUtil.Trace("PrivateFunc", ["SpaceA"])
        End Sub
    End Namespace
End Namespace
```


## Language Server Crash Fix
<!-- 2024-11-25 (for v0.68.1 released on 2024-11-26), https://github.com/RokuCommunity/brighterscript/pull/1353 -->

First, apparently this property is deprecated now
![image](https://github.com/user-attachments/assets/11fa668a-d8c5-4613-842c-e76ee9db44b0)

## Additional Work Remaining
Second, if you do something super dumb like:
```
<component name="MyNode" extends="MyNode">
```
2. ???
3. ~Profit~ crashes!

This causes an infinite loop and a lot of lang. server crashes. I'll look further at this later to see where we can maybe prevent this from crashing and flag the error to the user. Right now there's no feedback besides a ton of crashes


## Fix bug with ternary transpile for indexed set
<!-- 2024-11-26 (for v0.68.1 released on 2024-11-26), https://github.com/RokuCommunity/brighterscript/pull/1357 -->

Fixes #1356 . 

The issue was that we were only checking if the parent of the ternaryExpression was an IndexedSet, but we currently only support lifting the VALUE of those expressions, not their indexes. So this now guards against matching on the indexes.



# Community Tools


# Community Libraries

## promises
## Feature/allSettled(), any(), race()
<!-- 2024-11-14 (for v0.5.0 released on 2024-11-18), https://github.com/RokuCommunity/promises/pull/25 -->





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
    -   Show multi-line lsp progress details ([PR #600](https://github.com/RokuCommunity/vscode-brightscript-language/pull/600))
    -   Fix bug with m.top colorization ([PR #601](https://github.com/RokuCommunity/vscode-brightscript-language/pull/601))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):

-   [@addison-adler (Addison)](https://github.com/addison-adler)
    -   [Proposal] Add Namespace Source Literals ([PR #1354](https://github.com/RokuCommunity/brighterscript/pull/1354))
    -   Language Server Crash Fix ([PR #1353](https://github.com/RokuCommunity/brighterscript/pull/1353))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Optimize ternary transpilation for assignments ([PR #1341](https://github.com/RokuCommunity/brighterscript/pull/1341))
    -   Fix issues with the ast walkArray function ([PR #1347](https://github.com/RokuCommunity/brighterscript/pull/1347))
    -   Enhance lexer to support long numeric literals with type designators ([PR #1351](https://github.com/RokuCommunity/brighterscript/pull/1351))
    -   Fix bug with ternary transpile for indexed set ([PR #1357](https://github.com/RokuCommunity/brighterscript/pull/1357))

Contributions to [promises](https://github.com/RokuCommunity/promises):

-   [@chrisdp (Christopher Dwyer-Perkins)](https://github.com/chrisdp)
    -   Feature/allSettled(), any(), race() ([PR #25](https://github.com/RokuCommunity/promises/pull/25))