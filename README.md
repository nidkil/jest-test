## jest-test
> Test repository to test jest mocking and some other tips & tricks. I'm documenting for myself that might be of use to others.

IMPORTANT
If you are using node v10 and npm then this repository will probably not work for you. For more information please refer to this jest [issue](https://github.com/facebook/jest/issues/7395) on GitHub.

It also shows a couple of other tricks:
1) Separate config files
2) Setting aliases
3) Webstorm tips & tricks

## 1. Separate config files

To keep the configuration clear it is advisable to not put the jest and babel in package.json. You can use the following files to setup there respective configuration.

- jest: jest.config.js
- babel: babel.config.js 

## 2. Setting aliases

With the babel 'module_resolver' plugin you can set aliases for directories, so that you do not have to use complicated import paths, i.e. ../../src/<module-name>.

    // babel.config.js
    ...
    "plugins": [
     ["module-resolver", {
       root: ["./src"],
         alias: { 
           "@": path.resolve(__dirname ,"./src")
       }
     }]
    ]
    ... 

For the aliases to work with jest you need to set the 'moduleNameMapper' option. The aliases must match the aliases defined in the babel.config.js file.

    // jest.config.js
    ...
    moduleNameMapper: {
      "@/(.*)$": "<rootDir>/src/$1"
    }
    ...

## 3. Webstorm tips & tricks

If you are using Webstorm as IDE the following ensures Webstorm plays nicely with jest and babel.

### Get ride of annoying unresolved jest variables

Execute the following steps:

1) Go to File > Settings... > Language & Frameworks > JavaScript > Libraries
2) Click 'Download...'
3) From the list select 'jest'
4) Click 'Download and Install'
5) CLick 'OK'

### Transpile files on the fly

Using Webstorm's file watch option you can have your files transpiled on the fly.

Execute the following steps.

1) Go to File > Settings... > Language & Frameworks > JavaScript
2) Make sure 'ECMAScript 6' is set as 'JavaScript language version'
3) Go to File > Settings... > Tools > File watchers
4) Click '+'
5) Select 'babel'
6) Select the babel executable [1] (Program) it is located in '<project-dir>/node_modules/.bin' and it is called 'Babel'
7) Remove '--presets env' from the Arguments [2] or alternatively change it to '--presets @babel/env'

[1] The executable is part of '@babel/cli'.
[2] If you remove '--presets env' the following must be set in babel.config.js.

    // babel.config.js
    ...
    env: {
      test: {
        presets: [["@babel/env"]]
      }
    }
    ...

See this [blog post](https://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/) for more information.
