---
date: October 2023
summary: Changes to vscode-brightscript-language, brighterscript, roku-debug, brighterscript-formatter, bslint, ropm, roku-report-analyzer
layout: ../../layouts/WhatsNewPost.astro
---
# Overview


This month has seen some very valuable and ongoing improvements to many aspects of brightscript, linting, debugging and brighterscript.  Many thanks to all who have worked so hard and contributed this month.



# Debugging


## Fix automation view crash when no config found 

Before fix

![image](https://user-images.githubusercontent.com/2544493/271679563-f23df431-938b-4a55-a30f-7d1747eb015f.png)

[#504](https://github.com/RokuCommunity/vscode-brightscript-language/pull/504)


## Fix bug with telnet getting stuck 

Fixes an issue with the telnet debugger getting stuck on the "local variables" window just constantly spinning.

Also makes the system recover more gracefully when a single command stops responding.

[#163](https://github.com/RokuCommunity/roku-debug/pull/163)



## Refine diagnostics handling during debug sessions

[#502](https://github.com/RokuCommunity/vscode-brightscript-language/pull/502)


## Debug Protocol Enhancements

Adds significant debug protocol enhancements/improvements/stability.

Created a debug protocol server, which emulates the server-side of Roku's binary debug protocol. This vastly simplifies the unit test experience, as we can now control both the client and the server side, mocking both.

The downside is that these are not on-device tests, but the majority of our logic can be tested in this fashion.

Each ProtocolRequest and ProtocolResponse class will support loading from json, loading from a buffer, and serializing to a buffer. This makes the binary structures for client and server first-class citizens of the project, and simplifies the unit test experience as well.

This server can also be used to provide actual debugging experiences in a brs emulator (if someone ever gets around to implementing that...).

Fix several performance and stability issues in the debug protocol

Add compile error support from the debug protocol and improve the general compile error UI flow.

Fix several issues where the debug session doesn't cleanly clean itself up, resulting in the vscode extension wasting many CPU cycles

[#107](https://github.com/RokuCommunity/roku-debug/pull/107)



## Clean up control socket when it's closed 

The issue was that even if the control socket closed, we were still trying to send the "Exit channel" request, which would never go through because ..... the control socket is already closed. 

So now we bypass that call if the control socket is already closed.

[#166](https://github.com/RokuCommunity/roku-debug/pull/166)




# Formatting

## Color format checking for bslint

checking for color formatting in brs and bs files.

[#94](https://github.com/RokuCommunity/bslint/pull/94)



## copy expectDiagnostics from brighterscript for tests 

Copies the expectDiagnostics test utility functions from brighterscript to help simplify some of the diagnostics testing code in bslint.

De-dupe the fmtDiagnostics and pad functions by moving them to testUtils.spec.ts as well

[#95](https://github.com/RokuCommunity/bslint/pull/95)



## Performance boost by lifting some global lookups 

[81aa853](https://github.com/RokuCommunity/bslint/commit/81aa853)




## Tweak build.yml to support prerelease publishing 

[78f1c71](https://github.com/RokuCommunity/bslint/commit/78f1c71)



## Fixes for Brighterscript Typing-Phase-1 breaking changes 

[53f8f9c](https://github.com/RokuCommunity/bslint/commit/53f8f9c)





# Language Features


## Enable remote control on launch 


[#503](https://github.com/RokuCommunity/vscode-brightscript-language/pull/503)


## Make device picker name same as tree view item 

Aligns the name of the device in the device picker with the name from the devices tree view panel by adding in the user-defined name.

Before:

![image](https://user-images.githubusercontent.com/2544493/274648905-fd473bd8-957d-42dc-aa34-eeecb61a14ab.png)

After:

![image](https://user-images.githubusercontent.com/2544493/274648768-ad97a8c3-507a-411d-bb4f-d5fae360b582.png)

[#508](https://github.com/RokuCommunity/vscode-brightscript-language/pull/508)




## Enhance host picker during launch 

Adds several improvements to the "${promptForHost}" option when launching:

- add last used separator for the last used device
- add devices/other devices for devices not last used
- add separator line to separate the enter manually option
- refresh the list any time a new device is discovered, instead of a blanket "wait 5 seconds" that was there previously
- show a loader when we think there are more devices to be discovered


Here's a preview of the feature:

![image](https://user-images.githubusercontent.com/2544493/279407208-4fa3ce2e-5005-4919-8a16-645fa3b4a6f9.gif)



[#512](https://github.com/RokuCommunity/vscode-brightscript-language/pull/512)




## Add link for ECP registry 

This adds the ability to open the ECP registry with just a click. 

There will be another addition following up to allow the user to pick which channel they want to choose.

[#511](https://github.com/RokuCommunity/vscode-brightscript-language/pull/511)







 
# BrighterScript

## Add interface parameter support 

Adds support for function parameters in interface declarations. 

[#924](https://github.com/RokuCommunity/brighterscript/pull/924)



## Better typing for `Deferred` 

Fix the reject() typing for the Deferred class.

[#923](https://github.com/RokuCommunity/brighterscript/pull/923)




## Fix stagingDir issue in transpiler test 

[8a31693](https://github.com/RokuCommunity/brighterscript/commit/8a31693)




## File api 

Moves file handling into plugin-land so plugins can contribute custom file types.

Notable changes:

- added plugin event onProvideFile (and beforeProvideFile/afterProvideFile events too). 
- Plugins can add files to the .files array of the event.
- All files found in the files array that exist on disk will be included in the program. Files not handled by plugins and bsc will be loaded as AssetFile instances, and are copied as-is. (this will help support the custom tree view we wanted to add in vscode but couldn't because non xml and brs files were missing)
- Defined a new interface called File that desribes the important parts of a file. This makes most file properties optional, so plugin-contributed files only add what they actually implement.
- add beforeFileRemove and afterFileRemove events, deprecate beforeFileDispose and afterFileDispose events.
- add beforeFileAdd and afterFileAdd events that are triggered after the provide events for every file that plugins create.

[#408](https://github.com/RokuCommunity/brighterscript/pull/408)



## Allows `scrape-roku-docs` to consolidate overloaded methods 

If there are multiple overloads of a method in a BrightScript interface, it can be overriden in code so that there is a single definition of the method that can be added to the type system.

![image](https://user-images.githubusercontent.com/810290/275030780-0d37c1a2-c39b-47b2-80c9-404563f8371a.png)

<br />

![image](https://user-images.githubusercontent.com/810290/275031209-cbd8802a-1552-44d4-b693-8ff7ba12484a.png)

[#930](https://github.com/RokuCommunity/brighterscript/pull/930)





## Adds `callFunc` as member method to Custom Components 

- Custom Components have callFunc member
- Adds isVariadic flag to TypedFunctionType, because CallFunc() may have any number of arguments
- CallFunc is handled in a custom way in the code, because it does not exist in a built-in interface.

[#929](https://github.com/RokuCommunity/brighterscript/pull/929)




## Semantic Tokes for Native Components and Type completion in Type Expressions 

Semantic tokens for Components Types/Interfaces:

![image](https://user-images.githubusercontent.com/810290/272982938-c2b0fa22-e5f5-4360-b874-add0c71c0b15.png)

Code completion in Type Cast/Type Expression:

![image](https://user-images.githubusercontent.com/810290/272983536-547db5d2-1d6c-41b7-9aaf-a55d07d64213.png)

[#927](https://github.com/RokuCommunity/brighterscript/pull/927)



## Fixes compatibility of built in types (roArray -> typed arrays) 

Also fixes type compatibility for string -> roString, etc.

roArray is basically the same as dynamic[]

[#925](https://github.com/RokuCommunity/brighterscript/pull/925)





## Fixes enum validation

For primitive types, allows returning a compatible enum member.

[#920](https://github.com/RokuCommunity/brighterscript/pull/920)




## Allow classes and native components in Typed Arrays 

When you declare a type of native component array, (eg. roAssociativeArray[] or roBitmap[]) there is a validation error

Problem:

![image](https://user-images.githubusercontent.com/810290/269942800-689f5aad-b7e9-4779-976a-ad5283ccdbae.png)



[#919](https://github.com/RokuCommunity/brighterscript/pull/919)





## Refine type compat message 

- Tightens up some of the "type a is not compatible with type b" messages.

- Truncates the list of items with a "...and x more" message.

Similar to typescript, this will show exclusively the "missing members" message if there are any missing members. Then, if no missing members, it'll show the "members are incompatible" message if there are any incompatible members. This helps reduce the size of these large errors in some codebases. You've got to address the missing members and the incompatible types, so it doesn't hurt to just show one at a time.

combined error message before:

![image](https://user-images.githubusercontent.com/2544493/269929286-eca96374-514b-4e33-91f0-13aeee469cad.png)

Missing members after:

![image](https://user-images.githubusercontent.com/2544493/269929455-f895e734-10a5-4e12-84fa-ed4bf1c185bb.png)1

Incompatible members after:

![image](https://user-images.githubusercontent.com/2544493/269929522-edecc769-3c18-4e16-8e05-74cd7be44ce0.png)


[#908](https://github.com/RokuCommunity/brighterscript/pull/908)





## Better multi scope messages 

Make the multi-scope diagnostic messaging for related infos more relevant (and concise). Also truncate that list since seeing 95 related infos is just noise...

Here's how it looks now:

![image](https://user-images.githubusercontent.com/2544493/269661562-1e216018-5607-4e53-bb71-8d0c5a322ada.png)



[#904](https://github.com/RokuCommunity/brighterscript/pull/904)





## Fix isLiteralInvalid 

- Fix isLiteralInvalid method to properly detect the true case.
- Add other isLiteral* methods.
- Add unit tests for these methods.



[#902](https://github.com/RokuCommunity/brighterscript/pull/902)




## Fixes issues with Interface validations, and adds extra details about missing or mismatches members 

Also adds extra details about missing or mismatches members:

![image](https://user-images.githubusercontent.com/810290/269069966-a34595d8-4702-41ac-9b7b-1c97e0ef68d4.png)

[#901](https://github.com/RokuCommunity/brighterscript/pull/901)







## Support defining params in interfaces 

Adds support for defining method parameters on interfaces.


[#900](https://github.com/RokuCommunity/brighterscript/pull/900)








## Fix union type unary operations and Array.sort(by) optional params 

- Fix unary operator validation on union types
- fixed array.sort flags as being optional
- added test for array.sort optional types

[#897](https://github.com/RokuCommunity/brighterscript/pull/897)





## Adds validation for binary operators 

Adding string and number should be compile error 

With the new type validations in v0.66.0, this should be a compile error because you can't add a string and an int.

Fixes this issue

![image](https://user-images.githubusercontent.com/810290/268829734-a6c8c704-2bfd-4739-90ed-cfb4d104f56d.png)


[#896](https://github.com/RokuCommunity/brighterscript/pull/896)





## Adds Native Brightscript Component Types and Custom Components (Nodes) to Type System 

Additions:

- All native Brightscript Components (eg. roDeviceInfo, roBitmap, roDateTime, etc.) as types usable in Brighterscript, including completions on methods and documentation
- Same for native interfaces (ifDraw2d, ifAppManager, etc)
- Same for native events (roInputEvent, roSGNodeEvent)
- Adds AssociativeArrayType that can be built from an AA literal (eg. myAA = {name: "Mark", coolFactor: 100}, and will correctly be compatible with interface types that have declared the same members, eg:

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


Adds Scenegraph nodes to type system. The type's name is the component's name prefixed with roSGNode ... so roSGNodePoster, roSGNodeRowList, roSGNodeStdDlgTextItem are all available as types (with completions, documentation, etc)

Custom components are also added (again, prefixed with roSgNode). Eg:

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

will create a type in the type system with name roSGNodeWidget, with completions and type inferences for properties alpha, beta, charlie, as well as validation on methods like 'getChildren(), subType(), etc.

NOTE: More work needs to be done to fully support callFuncs with validation and return type inference



[#891](https://github.com/RokuCommunity/brighterscript/pull/891)







## Validates DottedSetStatements for type compatibility 

With the new type validations in v0.66.0 alphas, we should be able to assign a specific type to classes, and therefore validate type mismatches for class members. 

Line 3 should be an error because we're assigning an integer to a string.

![image](https://user-images.githubusercontent.com/2544493/265223561-19fa45fd-3021-4010-bea2-58024a6206cd.png)

[#894](https://github.com/RokuCommunity/brighterscript/pull/894)





## Use Symbol Tables for Completions 

Changes all completion logic to use symbol tables.

### Other changes:

- Moved more completions tests to CompletionsProcessor.spec
- Updates Symbols in SymbolTables to have a data field to store:
  - the node/expression that defines this symbol
  - a string description (from a comment if it is available)
  - completion priority (built in interfaces have lower priority than explicitly defined members)
- Able to easily get documentation for an ASTNode (through leadingTrivia)
- HoverProcessor takes advantage of comments as well
- fixes possibility that the same namespaceAggregate symbol table is add as sibling more than once


### Other small fixes to hovers

Adds more incomplete expressions to the AST, so they can be used for completions.

Fixes:

- Union type completions are only symbols available in all types Completion on union type should only show shared properties
- Array toString() uses default type Reduce like types for hovers
- Fixes Enum completions and hovers Completions for enum is wrong


[#874](https://github.com/RokuCommunity/brighterscript/pull/874)





## Adds Leading Trivia to all tokens, as a way to get comments from expressions 

Usefully as a way to get comments from expressions/statements

- Function, class, method, field, interface, namespace statements return valid data from getLeadingTrivia() function
- works with annotations as well


[#885](https://github.com/RokuCommunity/brighterscript/pull/885)





## Adds Typed Arrays 

- Typed arrays can be defined as <type>[] ... eg string[] or SomeClass[]
- Supports multidimensional arrays (eg. integer[][])
- Overrides built in methods for arrays (eg. push(), pop()) so it is consistent with the type
- Infers types from array literals
- Only available in brighterscript
- Fixes Union types being available in ParseMode.BrightScript


<video src="https://user-images.githubusercontent.com/810290/264099979-a32c8a12-73a6-4d16-8d01-6a95f91c5006.mov" data-canonical-src="https://user-images.githubusercontent.com/810290/264099979-a32c8a12-73a6-4d16-8d01-6a95f91c5006.mov" controls="controls" muted="muted" class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px">
</video>


[#875](https://github.com/RokuCommunity/brighterscript/pull/875)





## Adds Return type validation 

- Validates actual return type vs. the declared return type
- Subs and void functions will have validation errors when an actual type is included
- works in Brs and Bs files

<video src="https://user-images.githubusercontent.com/810290/264360339-d065c1ee-30f2-496f-ad4d-2e66182b166b.mov" data-canonical-src="https://user-images.githubusercontent.com/810290/264360339-d065c1ee-30f2-496f-ad4d-2e66182b166b.mov" controls="controls" muted="muted" class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px">
</video>

[#876](https://github.com/RokuCommunity/brighterscript/pull/876)












## Fixed getting xml attribute location in diagnostic printing


[68c7c23](https://github.com/RokuCommunity/brighterscript/commit/68c7c23)











## Narrows some types 

[6429017](https://github.com/RokuCommunity/brighterscript/commit/6429017)







## Fixes types on call expression info class 

The call expression could be be a callfunc, so the types reflect this

[#877](https://github.com/RokuCommunity/brighterscript/pull/877)








## Fixed lint error 

[8926e60](https://github.com/RokuCommunity/brighterscript/commit/8926e60)







## Fix built in methods parameter types 

[#866](https://github.com/RokuCommunity/brighterscript/pull/866)





## Add scopes to argumentTypeMismatch diagnostics 

[8e0ff98](https://github.com/RokuCommunity/brighterscript/commit/8e0ff98)





## Fix tab issue when printing diagnostics 

[f616265](https://github.com/RokuCommunity/brighterscript/commit/f616265)








## Refactor Completions logic to be centralized to CompletionsProcessor 

Move all completion logic and tests to CompletionProcessor

[#864](https://github.com/RokuCommunity/brighterscript/pull/864)







## Fixes ReferenceTypes in Binary Operations & UnionTypes as args 

- Adds BinaryOperatorReferenceType for when there is a reference type in a Binary operation
- UnionTypes are allowed as arguments when all innerTypes are compatible with the param type

[#858](https://github.com/RokuCommunity/brighterscript/pull/858)







## Fixes small hover issues 

Hover on unresolved type:

```vb
sub doSomething(thing as UnknownType)
   ' hover on thing
   print thing  
end sub
```

=> thing as UnknownType

Hover with type chain including dynamic:

```vb
sub doSomething(thing )
   ' hover on property
   print thing.property  
end sub
```

=> property as dynamic

[#860](https://github.com/RokuCommunity/brighterscript/pull/860)








## Type casts are not allowed in BrightScript 

![image](https://user-images.githubusercontent.com/810290/256878508-7280d101-0214-4973-b961-fd727642b90a.png)


[#859](https://github.com/RokuCommunity/brighterscript/pull/859)








## Adds built in Interfaces to primitive types & Validates class method calls 


![image](https://user-images.githubusercontent.com/810290/256335937-ae33c514-f9ec-4e96-a8bc-d04e010f5293.png)

<br />

![image](https://user-images.githubusercontent.com/810290/256336032-b1e839fc-c28d-414f-a802-ced7fe3c4d43.png)

<br />

![image](https://user-images.githubusercontent.com/810290/256336719-11daba64-77c3-4f02-abfd-6f25a5edacdf.png)




[#856](https://github.com/RokuCommunity/brighterscript/pull/856)





## Functions as params 

- Fixes validations when a function is used as a parameter
- Validates non-functions passed as arguments
- Adds TypedFunctionType class for functions with known param types & return types



[#853](https://github.com/RokuCommunity/brighterscript/pull/853)





## Object type wider support 

Fixes issue with as object types of variables, they need to be allowed to be passed to any function type (just like dynamic).

[#850](https://github.com/RokuCommunity/brighterscript/pull/850)





## Support passing enums as their literal values 

Fixes issue with enums not being properly treated as their underlying types when passed to functions.

[#849](https://github.com/RokuCommunity/brighterscript/pull/849)





## Phase 2 of Typing Improvements 

A second phase of type improvements for Brighterscript

### Tasks

- BinaryExpressions and UnaryExpressions should be able to infer resultant types (eg. Integer * Integer => Integer, String + String => String, etc.)

- Change Hover & Completion to use SymbolTable instead of variableDeclarations/callables

This will complete the refactor to move away from using these lookup tables to unify how a symbol can be discovered/known. When this is done, the concept of VariableDeclarations can be removed from the code.

- Validate function calls for argument type validity

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




[#827](https://github.com/RokuCommunity/brighterscript/pull/827)





## Remove enable type validation option 

[#846](https://github.com/RokuCommunity/brighterscript/pull/846)





## Add missing vscode types 

[c2cdf6d](https://github.com/RokuCommunity/brighterscript/commit/c2cdf6d)





## Fixes some issues related to Classes as Properties and Consts validation 

- Fixes when a Class is a Property of another class, and being unable to resolve it
- Fixes issue with Consts value looking at a typetime value of the RHS
- Does a better job of caching symbol lookups on memberTables

[#826](https://github.com/RokuCommunity/brighterscript/pull/826)








## Fixes issue with multiple namespace symbol tables 

There was an issue with namespaces having multiple symbol tables for each time they were created. This fixes that by building a SINGLE namespacetype at the scope level and adding the aggregate namespace symbol table as a sibling.

[#825](https://github.com/RokuCommunity/brighterscript/pull/825)





## Convert plugin params to single event object 

Converts all plugin event parameters to be a single event object rather than ordered parameters.

[#824](https://github.com/RokuCommunity/brighterscript/pull/824)





## Fixes issue with Namespace Declaration order 

[#822](https://github.com/RokuCommunity/brighterscript/pull/822)





## Better prop diagnostic range. add ProgramBuilder.load func 

- adds a load method to ProgramBuilder to decouple loading from running (mostly for help during testing)
- Fixes the range in the "can't find this property" diagnostics so it only highlights the property instead of the entire starting expression.

Before:

![image](https://user-images.githubusercontent.com/2544493/244416322-846b23f8-83a0-47ce-a52d-9da0983c2301.png)

After:

![image](https://user-images.githubusercontent.com/2544493/244416204-8d7d046a-56c0-4da4-8cea-9dbb89559431.png)


[#821](https://github.com/RokuCommunity/brighterscript/pull/821)





## Rename enum SymbolTypeFlags to SymbolTypeFlag 

[#819](https://github.com/RokuCommunity/brighterscript/pull/819)





## Xml ast refactor 

Refactors the XML AST to enable plugins to manipulate during transpile.

There's no noticeable performance hit for most things, but you can see a large boost in transpile performance for xml files!

![image](https://user-images.githubusercontent.com/2544493/243781262-ae0f3326-5913-4365-9848-dedd578b7434.png)

[#818](https://github.com/RokuCommunity/brighterscript/pull/818)





## Adds .kind prop to AstNode. 

- Adds a .kind to AstNode, and an AstNodeKind enum.
- converts the reflection methods to check for .kind instead of the thing?.constructor?.name === 'Whatever' logic.

Raw benchmarks show this as a fairly significant boost:

![image](https://user-images.githubusercontent.com/2544493/234745941-ecf12cfd-cb6b-4755-8497-ac03817fb38c.png)

What that means in practice is validation speeds improve by 10-12 percent.

![image](https://user-images.githubusercontent.com/2544493/234746091-cacae55f-a825-4007-91da-23b26a4e0c7f.png)

Downsides:

This is a breaking change, as all plugins that produce AST would need to be upgraded to the latest version of brighterscript in order to work with the version of brighterscript shipped with the vscode extension. Or, for example, latest version of brighterscript being used with a plugin that depends on an older version of brighterscript.



[#799](https://github.com/RokuCommunity/brighterscript/pull/799)







## Type Tracking 

This is the first of several type tracking tickets.

### Tasks:

1. Add a new AstNode class called `TypeExpression`.

It will be the base AstNode for all future type expressions. The following existing code will be parsed in this way:

the `as` type in function paramenters

'the `string`, `integer`, and `SomeInterface` parts should be TypeExpression. The `as` belongs to the 
`FunctionParameterExpression`

```vb
sub doSomething(p1 as string, p2 as integer, p3 as SomeInterface)
end sub
```

as `ReturnType` for function return types

```vb
'the `boolean` should be a TypeExpression. the `as` belongs to the FunctionExpression
function doSomething() as boolean
```

as `MemberType` for class and interface types

```vb
class Video
    ' the `boolean` should be a TypeExpression, the `as` belongs to the FieldStatement
    public isPlaying as boolean
end class
interface Metadata
   ' the `string` should be a TypeExpression, the `as` belongs to the FieldStatement
    url as string
end interface
```

This is a breaking change to the AST. For example, `FunctionParameterExpression` will no longer have a `typeToken`, but will instead have a `typeExpression`.

Here's a rough idea of the structure of the TypeExpression class

```vb
class TypeExpression extends Expression
    constructor(
        public expression:Expression
    ){}

    public getType(){
        if (isVariableExpression(this.expression) ){
            return this.getSymbolTable().getType(this.expression.name.text);
        } else if (isDottedGetExpression(this.expression)) { 
            //look up the leftmost variable (i.e. `ns1.ns2.ns3.Iface` would get us `ns1`
            //then, use the BscType interfaces to dig down into the type to get the type
        } else {
            //maybe other stuff?
        }
    }
    ```

2. Update the parser to properly create subclasses that extend TypeExpression for (no longer necessary)

Since all AstNode instances are equipped with a .getSymbolTable() function and BrighterScript already links the symbol tables to the correct node level, the TypeExpression nodes will not need any type of linking phase. These will be automatically resolved and avaiable to the SymbolTable

3. Add a getType() method to the base AstNode, which can then be overridden by all AstNode descendents.

Moving forward, every AstNode will have the potential to have a type. To improve stability of the project, the nodes should return "DynamicType" when the type is not known.

```vb
abstract class AstNode
    public abstract getType(): BscType {
        //TODO implement for every node. 
   }
    //...all the other props
end class
```

4. Enhance the SymbolTable BscType logic


The current SymbolTable implementation only adds names, but no types (they're all added as dynamic). This needs to be enhanced to actually add symbol types.

Consider the following code example.

```vb
function main()
    name1 = "John" 
    name2 = name1 '
    name3 = name2 '
end function
```

The symbol table logic might look something like this:

```jsx
const table = new SymbolTable();
table.AddSymbol("name1", new StringType());
table.addSymbol("name2", new ReferenceType("name1"));
table.addSymbol("name3", new ReferenceType("name2"));
```

This would happen at the start of onProgramValidate for every file. Then, for every scope, the scope symbol tables would be linked to the file, and these Types would be able to derive their information from the parent symbol table accordingly.

We should probably cache the type lookups during every scope validation, and clear it at the end of each scope validation. Otherwise we'd spend many cycles reevaluating the same types.

5. Validate all TypeExpression AstNodes to ensure they reference valid types that can be found in the symbol table

6. 
   1. Modify SymbolTable to always return a single type. That means if there are multiple different symbol types represented, they should be merged into a UnionType.


   2. Add way to actually declare a Union Type in code:

   ```vb
   function intValue(num as string or integer) as integer
      if type(num) = "Integer"
      return num
      end if
      return Val(num, 10)
   end function 
   ```

   3. Make UnionType.getMemberTypes look at the intersection of member types of all the UnionTypes' types. And since this will require coding, I will probably also need to type it (with a keyboard!)

7. Type chains - For DottedGets, IndexedGets, etc. how do we let the developer know where the chain failed its understanding the current type.

8. Remove NamespacedVariableExpression in favour of TypeExpression except NamespaceStatement.name which should be DottedGetExpression

9. Add type caching, at the appropriate (scope?) level. We must make sure that non-resolved types don't get cached

10.  Simplify SymbolTable.getSymbolType to use type (if available), first from cache, then from table, otherwise create ReferenceType, if TableProvider is given, and cache result.




[#783](https://github.com/RokuCommunity/brighterscript/pull/783)







# Documentation



# Thank you

Last but certainly not least, a big ***Thank You*** to the following people who contributed this month:

Contributions to [vscode-brightscript-language](https://github.com/RokuCommunity/vscode-brightscript-language):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Fix automation view crash when no config found ([PR #504](https://github.com/RokuCommunity/vscode-brightscript-language/pull/504))
    - Fix error when generating the docs ([12dfb27](https://github.com/RokuCommunity/vscode-brightscript-language/commit/12dfb27))
    - Make device picker name same as tree view item ([PR #508](https://github.com/RokuCommunity/vscode-brightscript-language/pull/508))
    - Diagnostic manager ([PR #502](https://github.com/RokuCommunity/vscode-brightscript-language/pull/502))
    - Enhance host picker during launch ([PR #512](https://github.com/RokuCommunity/vscode-brightscript-language/pull/512))
    - Add brs to releases script ([5c6622b](https://github.com/RokuCommunity/vscode-brightscript-language/commit/5c6622b))
 - [@iBicha (Brahim Hadriche)](https://github.com/iBicha)
    - Enable remote control on launch ([PR #503](https://github.com/RokuCommunity/vscode-brightscript-language/pull/503))
 - [@fumer-fubotv (fumer-fubotv)](https://github.com/fumer-fubotv)
    - Add ability to capture device screenshots ([PR #505](https://github.com/RokuCommunity/vscode-brightscript-language/pull/505))
 - [@MilapNaik (Milap Naik)](https://github.com/MilapNaik)
    - Add link for ECP registry ([PR #511](https://github.com/RokuCommunity/vscode-brightscript-language/pull/511))

Contributions to [brighterscript](https://github.com/RokuCommunity/brighterscript):
 - [@dependabot[bot] (dependabot[bot])](https://github.com/apps/dependabot)
    - Bump postcss from 8.2.15 to 8.4.31 ([PR #928](https://github.com/RokuCommunity/brighterscript/pull/928))
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Add interface parameter support ([PR #924](https://github.com/RokuCommunity/brighterscript/pull/924))
    - Better typing for `Deferred` ([PR #923](https://github.com/RokuCommunity/brighterscript/pull/923))
    - Fix stagingDir issue in transpiler test ([8a31693](https://github.com/RokuCommunity/brighterscript/commit/8a31693))
    - File api ([PR #408](https://github.com/RokuCommunity/brighterscript/pull/408))
    - ci: Don't run `test-related-projects` on release since it already ran on build ([157fc2e](https://github.com/RokuCommunity/brighterscript/commit/157fc2e))
    - Refine type compat message ([PR #908](https://github.com/RokuCommunity/brighterscript/pull/908))
    - Better multi scope messages ([PR #904](https://github.com/RokuCommunity/brighterscript/pull/904))
    - Fix isLiteralInvalid ([PR #902](https://github.com/RokuCommunity/brighterscript/pull/902))
    - Support defining params in interfaces ([PR #900](https://github.com/RokuCommunity/brighterscript/pull/900))
    - Add scopes to argumentTypeMismatch diagnostics ([8e0ff98](https://github.com/RokuCommunity/brighterscript/commit/8e0ff98))
    - Fix tab issue when printing diagnostics ([f616265](https://github.com/RokuCommunity/brighterscript/commit/f616265))
    - Object type wider support ([PR #850](https://github.com/RokuCommunity/brighterscript/pull/850))
    - Support passing enums as their literal values ([PR #849](https://github.com/RokuCommunity/brighterscript/pull/849))
    - Release 0.66.0 performance fixes ([PR #834](https://github.com/RokuCommunity/brighterscript/pull/834))
    - Convert plugin params to single event object ([PR #824](https://github.com/RokuCommunity/brighterscript/pull/824))
    - Better prop diagnostic range. add ProgramBuilder.load func ([PR #821](https://github.com/RokuCommunity/brighterscript/pull/821))
    - Remove deprecated stuff ([PR #820](https://github.com/RokuCommunity/brighterscript/pull/820))
    - Rename SymbolTypeFlags to SymbolTypeFlag ([PR #819](https://github.com/RokuCommunity/brighterscript/pull/819))
    - Xml ast refactor ([PR #818](https://github.com/RokuCommunity/brighterscript/pull/818))
    - Adds .kind prop to AstNode. ([PR #799](https://github.com/RokuCommunity/brighterscript/pull/799))
    - Type Tracking ([PR #783](https://github.com/RokuCommunity/brighterscript/pull/783))
    - Add warning to top of readme ([c943bf2](https://github.com/RokuCommunity/brighterscript/commit/c943bf2))
 - [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    - Allows `scrape-roku-docs` to consolidate overloaded methods ([PR #930](https://github.com/RokuCommunity/brighterscript/pull/930))
    - Adds `callFunc` as member method to Custom Components ([PR #929](https://github.com/RokuCommunity/brighterscript/pull/929))
    - Semantic Tokes for Native Components and Type completion in Type Expressions ([PR #927](https://github.com/RokuCommunity/brighterscript/pull/927))
    - Fixes compatibility of built in types (roArray -> typed arrays) ([PR #925](https://github.com/RokuCommunity/brighterscript/pull/925))
    - Fixes some enum validation stuff ([PR #920](https://github.com/RokuCommunity/brighterscript/pull/920))
    - Allow classes and native components in Typed Arrays ([PR #919](https://github.com/RokuCommunity/brighterscript/pull/919))
    - Fixes issues with Interface validations, and adds extra details about missing or mismatches members ([PR #901](https://github.com/RokuCommunity/brighterscript/pull/901))
    - Fix union type unary operations and Array.sort(by) optional params ([PR #897](https://github.com/RokuCommunity/brighterscript/pull/897))
    - Adds validation for binary operators ([PR #896](https://github.com/RokuCommunity/brighterscript/pull/896))
    - Adds Native Brightscript Component Types and Custom Components (Nodes) to Type System ([PR #891](https://github.com/RokuCommunity/brighterscript/pull/891))
    - Validates DottedSetStatements for type compatibility ([PR #894](https://github.com/RokuCommunity/brighterscript/pull/894))
    - Use Symbol Tables for Completions ([PR #874](https://github.com/RokuCommunity/brighterscript/pull/874))
    - Adds Leading Trivia to all tokens, as a way to get comments from expressions ([PR #885](https://github.com/RokuCommunity/brighterscript/pull/885))
    - Adds Typed Arrays ([PR #875](https://github.com/RokuCommunity/brighterscript/pull/875))
    - Adds Return type validation ([PR #876](https://github.com/RokuCommunity/brighterscript/pull/876))
    - Fixed getting xml attribute location in diagnostic printing ([68c7c23](https://github.com/RokuCommunity/brighterscript/commit/68c7c23))
    - Removed unneeded comment ([adfd5bd](https://github.com/RokuCommunity/brighterscript/commit/adfd5bd))
    - Narrows some types ([6429017](https://github.com/RokuCommunity/brighterscript/commit/6429017))
    - Fixes types on call expression info class ([PR #877](https://github.com/RokuCommunity/brighterscript/pull/877))
    - Fixed lint error ([8926e60](https://github.com/RokuCommunity/brighterscript/commit/8926e60))
    - Fix built in methods parameter types ([PR #866](https://github.com/RokuCommunity/brighterscript/pull/866))
    - Refactor Completions logic to be centralized to CompletionsProcessor ([PR #864](https://github.com/RokuCommunity/brighterscript/pull/864))
    - Fixes ReferenceTypes in Binary Operations & UnionTypes as args ([PR #858](https://github.com/RokuCommunity/brighterscript/pull/858))
    - Fixes small hover issues ([PR #860](https://github.com/RokuCommunity/brighterscript/pull/860))
    - Type casts are not allowed in BrightScript ([PR #859](https://github.com/RokuCommunity/brighterscript/pull/859))
    - Adds built in Interfaces to primitive types & Validates class method calls ([PR #856](https://github.com/RokuCommunity/brighterscript/pull/856))
    - Bunch of small fixes ([PR #855](https://github.com/RokuCommunity/brighterscript/pull/855))
    - Functions as params ([PR #853](https://github.com/RokuCommunity/brighterscript/pull/853))
    - Phase 2 of Typing Improvements ([PR #827](https://github.com/RokuCommunity/brighterscript/pull/827))
    - Remove enable type validation option ([PR #846](https://github.com/RokuCommunity/brighterscript/pull/846))
    - Fixes some issues related to Classes as Properties and Consts validation ([PR #826](https://github.com/RokuCommunity/brighterscript/pull/826))
    - Fixes issue with multiple namespace symbol tables ([PR #825](https://github.com/RokuCommunity/brighterscript/pull/825))
    - Fixes issue with Namespace Declaration order ([PR #822](https://github.com/RokuCommunity/brighterscript/pull/822))

Contributions to [roku-debug](https://github.com/RokuCommunity/roku-debug):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Fix bug with telnet getting stuck ([PR #163](https://github.com/RokuCommunity/roku-debug/pull/163))
    - Debug Protocol Enhancements ([PR #107](https://github.com/RokuCommunity/roku-debug/pull/107))
    - Clean up control socket when it's closed ([PR #166](https://github.com/RokuCommunity/roku-debug/pull/166))

Contributions to [brighterscript-formatter](https://github.com/RokuCommunity/brighterscript-formatter):

Contributions to [bslint](https://github.com/RokuCommunity/bslint):
 - [@TwitchBronBron (Bronley Plumb)](https://github.com/TwitchBronBron)
    - Fixing issues before release 0.8.11 ([051fd4c](https://github.com/RokuCommunity/bslint/commit/051fd4c))
    - copy expectDiagnostics from brighterscript for tests ([PR #95](https://github.com/RokuCommunity/bslint/pull/95))
    - Add bsc-0.66-alpha.6. Fix tests ([5a4de6f](https://github.com/RokuCommunity/bslint/commit/5a4de6f))
    - brighterscript@0.66.0-alpha.4 ([c495fb9](https://github.com/RokuCommunity/bslint/commit/c495fb9))
    - Performance boost by lifting some global lookups ([81aa853](https://github.com/RokuCommunity/bslint/commit/81aa853))
    - Fix event structure ([61481e1](https://github.com/RokuCommunity/bslint/commit/61481e1))
    - fix missing types ([b623648](https://github.com/RokuCommunity/bslint/commit/b623648))
    - Tweak build.yml to support prerelease publishing ([78f1c71](https://github.com/RokuCommunity/bslint/commit/78f1c71))
 - [@disc7 (Charlie Abbott)](https://github.com/disc7)
    - [WIP] Color format checking for bslint ([PR #94](https://github.com/RokuCommunity/bslint/pull/94))
 - [@elsassph (Philippe Elsass)](https://github.com/elsassph)
    - Silence one bsc diagnostic ([8c49713](https://github.com/RokuCommunity/bslint/commit/8c49713))
 - [@markwpearce (Mark Pearce)](https://github.com/markwpearce)
    - Updated peerDependency ([722b98a](https://github.com/RokuCommunity/bslint/commit/722b98a))
    - Updated peerDependency ([3e54289](https://github.com/RokuCommunity/bslint/commit/3e54289))
    - Fixes for release v0.66.0-alpha1 ([cad6866](https://github.com/RokuCommunity/bslint/commit/cad6866))
    - Fixes for Brighterscript Typing-Phase-1 breaking changes ([53f8f9c](https://github.com/RokuCommunity/bslint/commit/53f8f9c))
