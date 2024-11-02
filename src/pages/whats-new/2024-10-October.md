---
date: October 2024
summary: Changes to vscode-brightscript-language, brighterscript, roku-deploy, roku-debug, bslint, promises
layout: ../../layouts/WhatsNewPost.astro
---
# Overview
Welcome to the October 2024 edition of "What's New in RokuCommunity." Please consider <a target="_blank" href="https://rokucommunity.substack.com/">subscribing</a> to stay up to date with what's happening in RokuCommunity.

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
## Highlight `m.top` like `m`.
<!-- 2024-10-02 (for v2.50.4 released on 2024-10-18), https://github.com/RokuCommunity/vscode-brightscript-language/pull/598 -->

Color the `m.top` and `m.global` objects like `m` (darker blue in the default dark vscode theme). 

**Before:**
![image](https://github.com/user-attachments/assets/b9e7a769-0601-4fea-b8a0-b19636783902)

**After:**
![image](https://github.com/user-attachments/assets/8cf4c95d-2ce5-471e-b28e-b074541482a2)



## Add feature to be able to set a device as the current active device via the Device tree view. Also added command to clear the active device.
<!-- 2024-10-02 (for v2.50.4 released on 2024-10-18), https://github.com/RokuCommunity/vscode-brightscript-language/pull/597 -->

Add feature to be able to set a device as the current active device via the Device tree view.
Also added command to clear the active device.



# Debugging

## Fixing issues before release 0.21.12
<!-- 2024-10-18 (for v0.21.12 released on 2024-10-18), ([ac736be](https://github.com/RokuCommunity/roku-debug/commit/ac736be)) -->





# BrighterScript

## Ast node clone
<!-- 2024-09-25 (for v1.0.0-alpha.38 released on 2024-10-01), https://github.com/RokuCommunity/brighterscript/pull/1281 -->

Add `.clone()` method to AstNode and BscType objects. This will make for much easier duplication of template code for plugins. 

- [x] add `.clone()` method to `Statement`s
- [x] add `.clone()` method to `Expression`s
- [x] add `.clone()` method to `BscType`s
- [x] add unit tests


## Support omitting exception variable in bs files and convert exception var to an Expression
<!-- 2024-09-26 (for v1.0.0-alpha.38 released on 2024-10-01), https://github.com/RokuCommunity/brighterscript/pull/1305 -->

Our current `CatchStatement` stores the exception variable as a `Token`. This PR converts the `CatchStatement.exceptionVariable` property to an `Expression`, which supports `VariableExpression` and `TypeCastExpression`. This should more closely align with how TypeScript supports `catch(e as <any type you want here>)`. This was a breaking change to the AST, so it needed to be done as part of v1.0.0

Also supports completely omitting the exception variable when you don't need to use it. 

```BrighterScript
function init()
    try
        somethingDangerous()
    catch
        print "I live on the edge"
    end try
end function
```

transpiles to

```BrighterScript
function init()
    try
        somethingDangerous()
    catch e ' or __bsc_error if there's a local variable conflict
        print "I live on the edge"
    end try
end function
```


## Prevent crash for missing classtype name
<!-- 2024-09-30 (for v1.0.0-alpha.38 released on 2024-10-01), https://github.com/RokuCommunity/brighterscript/pull/1312 -->

Prevent a runtime exception in the validator whenever `ClassType.name` is missing. I'm not sure how to reproduce this, but it's good enough to harden this code so it doesn't happen.


## Fix semantic tokens for components and interfaces, and m
<!-- 2024-10-01 (for v1.0.0-alpha.38 released on 2024-10-01), https://github.com/RokuCommunity/brighterscript/pull/1313 -->

Fix incorrect semantic token colorization for instances of components and interfaces. Since they're _instances_, they should be normal variable colors. 

Also fixes incorrect `m` colorization

**Before:**
![image](https://github.com/user-attachments/assets/dcbd80e2-290c-4288-abc4-7f6497397c58)


**After (fixed):**
![image](https://github.com/user-attachments/assets/86a51e22-c07c-43ca-b3d7-1bf9a8f2ee28)


Fixes #1308 


## Fixes transpile issue with global functions
<!-- 2024-10-01 (for v1.0.0-alpha.38 released on 2024-10-01), https://github.com/RokuCommunity/brighterscript/pull/1314 -->

Fixes issue where use of global functions in a namespace would cause tranpilier to prefix the functions
fixes #1307 

Given:

```
                  namespace is
                        function node(thing) as boolean
                            return invalid <> getInterface(thing, "ifSgNodeChildren")
                        end function
                    end namespace
```


before would transpile to:
```
                        function is_node(thing) as boolean
                            return invalid <> is_getInterface(thing, "ifSgNodeChildren")
                        end function
```

now transpiles to:

```
                        function is_node(thing) as boolean
                            return invalid <> getInterface(thing, "ifSgNodeChildren")
                        end function
```


## Prevent crash when ProgramBuilder.run called with no options
<!-- 2024-10-02 (for v1.0.0-alpha.40 released on 2024-10-19), https://github.com/RokuCommunity/brighterscript/pull/1316 -->

Fixes a crash when calling ProgramBuilder.run with undefined options.


## Fix bslib prefix transpile
<!-- 2024-10-03 (for v1.0.0-alpha.39 released on 2024-10-03), https://github.com/RokuCommunity/brighterscript/pull/1317 -->

Fixes a bug with transpiling the bslib prefix in certain situations (specifically when using rokucommunity_bslib). This somehow broke in v1.0.0-alpha.37 and remained broken in v1.0.0-alpha.38.


## Fixes using upper namespaced function indirectly
<!-- 2024-10-09 (for v1.0.0-alpha.40 released on 2024-10-19), https://github.com/RokuCommunity/brighterscript/pull/1319 -->

Fixes:

```brighterscript
namespace alpha
    sub foo()
    end sub

    namespace beta
        sub bar()
            foo()  ' this SHOULD be a an error -- no function foo() at file scope.
        end sub
    end namespace
end namespace
```

From this slack conversation: https://rokudevelopers.slack.com/archives/CKF1QQGTY/p1728307032364379




## Adds diagnostic if no return statement found in function
<!-- 2024-10-09 (for v1.0.0-alpha.40 released on 2024-10-19), https://github.com/RokuCommunity/brighterscript/pull/1299 -->

![image](https://github.com/user-attachments/assets/8f2c95ff-d395-4cef-8c6a-b35fe29216dc)

If a function explicitly says it will return something, ensure there is a return statement.

This could be improved by checking all branches.

I know there's a BSLint option that basically checks the same thing, but if you don't have a return statement when you say you're going to return a string or an integer, it will crash.




## Update README.md with "help" items
<!-- 2024-10-09 (for v1.0.0-alpha.40 released on 2024-10-19), ([3abcdaf3](https://github.com/RokuCommunity/brighterscript/commit/3abcdaf3)) -->




## Fix namespace-relative transpile bug for standalone file
<!-- 2024-10-11 (for v1.0.0-alpha.40 released on 2024-10-19), https://github.com/RokuCommunity/brighterscript/pull/1324 -->

Fixes a bug with namespace-relative function calls when the file is a member of no scopes.


## Quiet down grouping expressions in cached lookups
<!-- 2024-10-19 (for v1.0.0-alpha.40 released on 2024-10-19), https://github.com/RokuCommunity/brighterscript/pull/1332 -->

Code like this would cause a lot of logging:

```
  (1 + 2).toStr()
```

Because the grouping expression was not handled in the call handler in CachedLookups


Also added a test for a specific use case (editing file list through plugin) that was in the docs.


## Allow any node members in brs files
<!-- 2024-10-20 (for v1.0.0-alpha.41 released on 2024-10-20), https://github.com/RokuCommunity/brighterscript/pull/1333 -->

Because you can't put a finer type on Nodes in Brightscript mode, that is, stuff created by `createObject("roSgNode", ... )`, when validating a file in BrightScript mode, any members are allowed - they won't generate "cannot find name" errors.

Fixes #1301




# Community Tools

## bslint
## Fix validation crash when leadingTrivia is undefined
<!-- 2024-09-30 (for v1.0.0-alpha.38 released on 2024-10-01), https://github.com/RokuCommunity/bslint/pull/134 -->

Fixes a crash when validating a file where a comment has an undefined leadingTrivia array.


## upgrade to bsc@1.0.0-alpha.40
<!-- 2024-10-20 (for v1.0.0-alpha.40 released on 2024-10-20), ([77cae00](https://github.com/RokuCommunity/bslint/commit/77cae00)) -->




## upgrade to bsc@1.0.0-alpha.41 and update changelog
<!-- 2024-10-20 (for v1.0.0-alpha.41 released on 2024-10-20), ([4ad777a](https://github.com/RokuCommunity/bslint/commit/4ad777a)) -->




## roku-deploy
## fixes #175 - updated regex to find a signed package on `/plugin_package` page
<!-- 2024-10-09 (for v3.12.2 released on 2024-10-18), https://github.com/RokuCommunity/roku-deploy/pull/176 -->

fixes #175 

the current implementation tries to parse a package's remote path from  `<a .../>` on `/plugin_package`. that link is not always correct ( for example if you device has a sdcard installed )

`/plugin_package` page response always have `var params = JSON.parse('......')` line. And the actual link ( when you opens the page in the browser ) built from the following js 

```javascript
var pkgs = params.packages.filter(p => p.pkgPath !== "");
var hasPkgApp = pkgs.length > 0;
{
  var pkgDiv = document.createElement('div');
  if (hasPkgApp) {
    var package = pkgs[0];
    var pkgPath = package.pkgPath;
    var pkgName = package.pkgPath.substr(package.pkgPath.lastIndexOf('/') + 1);
    var size = package.size;

    pkgDiv.innerHTML = `<label>Currently Packaged Application:</label>
      <div>
        <font face="Courier">
          <a href="${pkgPath}">${pkgName}</a>
          <br> package file (${size} bytes)
        </font>
      </div>`;
  }
  else {
    pkgDiv.innerHTML = `<label>Currently Packaged Application:</label>
      <div>
        <font face="Courier">
          Application is not yet packaged
        </font>
      </div>`;
  }
}
```        
       



# Community Libraries

## promises
## Prevent stackoverflow
<!-- 2024-10-18 (for v0.4.0 released on 2024-10-18), https://github.com/RokuCommunity/promises/pull/23 -->

Fixes an issue where deeply nested promise chain could cause a stackoverflow. This seems to be caused by the observers all firing synchronously, so when the lowest promise unravels, it synchronously triggers observers the entire way back up. 

I added a test that proves we can now successfully unravel a promise chain 10,000 promises deep (but I suspect there is no limitation now in our implementation other than max memory usage). 



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

-   [@spoyser (spoyser)](https://github.com/spoyser)
    -   Add feature to be able to set a device as the current active device via the Device tree view. Also added command to clear the active device. ([PR #597](https://github.com/RokuCommunity/vscode-brightscript-language/pull/597))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Highlight `m.top` like `m`. ([PR #598](https://github.com/RokuCommunity/vscode-brightscript-language/pull/598))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):

-   [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    -   Fixes transpile issue with global functions ([PR #1314](https://github.com/RokuCommunity/brighterscript/pull/1314))
    -   Fixes using upper namespaced function indirectly ([PR #1319](https://github.com/RokuCommunity/brighterscript/pull/1319))
    -   Adds diagnostic if no return statement found in function ([PR #1299](https://github.com/RokuCommunity/brighterscript/pull/1299))
    -   Quiet down grouping expressions in cached lookups ([PR #1332](https://github.com/RokuCommunity/brighterscript/pull/1332))
    -   Allow any node members in brs files ([PR #1333](https://github.com/RokuCommunity/brighterscript/pull/1333))
-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Ast node clone ([PR #1281](https://github.com/RokuCommunity/brighterscript/pull/1281))
    -   Support omitting exception variable in bs files and convert exception var to an Expression ([PR #1305](https://github.com/RokuCommunity/brighterscript/pull/1305))
    -   Prevent crash for missing classtype name ([PR #1312](https://github.com/RokuCommunity/brighterscript/pull/1312))
    -   Fix semantic tokens for components and interfaces, and m ([PR #1313](https://github.com/RokuCommunity/brighterscript/pull/1313))
    -   Prevent crash when ProgramBuilder.run called with no options ([PR #1316](https://github.com/RokuCommunity/brighterscript/pull/1316))
    -   Fix bslib prefix transpile ([PR #1317](https://github.com/RokuCommunity/brighterscript/pull/1317))
    -   Update README.md with "help" items ([3abcdaf3](https://github.com/RokuCommunity/brighterscript/commit/3abcdaf3))
    -   Fix namespace-relative transpile bug for standalone file ([PR #1324](https://github.com/RokuCommunity/brighterscript/pull/1324))

Contributions to [roku-deploy](https://github.com/RokuCommunity/roku-deploy):

-   [@7thsky (Marat Atayev)](https://github.com/7thsky)
    -   fixes #175 - updated regex to find a signed package on `/plugin_package` page ([PR #176](https://github.com/RokuCommunity/roku-deploy/pull/176))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):

-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fixing issues before release 0.21.12 ([ac736be](https://github.com/RokuCommunity/roku-debug/commit/ac736be))

Contributions to [bslint](https://github.com/RokuCommunity/bslint):

-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Fix validation crash when leadingTrivia is undefined ([PR #134](https://github.com/RokuCommunity/bslint/pull/134))
    -   upgrade to bsc@1.0.0-alpha.40 ([77cae00](https://github.com/RokuCommunity/bslint/commit/77cae00))
    -   upgrade to bsc@1.0.0-alpha.41 and update changelog ([4ad777a](https://github.com/RokuCommunity/bslint/commit/4ad777a))

Contributions to [promises](https://github.com/RokuCommunity/promises):

-   [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    -   Prevent stackoverflow ([PR #23](https://github.com/RokuCommunity/promises/pull/23))