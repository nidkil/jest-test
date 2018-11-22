
## jest-test
> Test repository to test jest mocking and some other tips & tricks I'm documenting for myself that might be of use to others.

I setup this repository to test jest mocking and other test principles. I will add to this repository as my projects require.

The tests in this repository cover the following:
1) Normal basic test to ensure everything is setup correctly (test/sum.spec.js)
2) Mocking modules (test/modules)
3) Mocking classes which is split up into classes as default exports (test/classes/default) and classes as named exports (test/classes/named)

> **WARNING:** If you are using jest version 23 with node version 10 and npm then this repository probably will not work for you. For more information please refer to this [jest issue](https://github.com/facebook/jest/issues/7395) on GitHub. You can either switch to yarn or downgrade node to version 8. This should be fixed in the next major release of jest (v24?) when the dependency on babel 6 is dropped.

In addition to testing mocking this repository demonstrates a couple of other things:
1) [Separate config files](#1-Separate-config-files)
2) [Setting aliases](#2-Setting-aliases)
3) [Running groups of tests](#3-Running-groups-of-tests)
4) [Webstorm tips & tricks](#4-Webstorm-tips--tricks)

## 1. Separate config files

To keep the configuration clear it is advisable to not put the jest and babel configuration in package.json. You can use the following files to setup there respective configuration in separate config files.

- jest: jest.config.js
- babel: babel.config.js 

## 2. Setting aliases

With the babel 'module_resolver' plugin you can set aliases for directories so that you do not have to use complicated import paths, i.e. ../../src/<module-name>.

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

For the aliases to work with jest you must set the same aliases with the 'moduleNameMapper' option. The aliases must match the aliases defined in the babel.config.js file.

    // jest.config.js
    ...
    moduleNameMapper: {
      "@/(.*)$": "<rootDir>/src/$1"
    }
    ...

**Pro tip:** If you are using webpack aliases, the above babel and jest aliases also have to be set for them to work correctly.

## 3. Running groups of tests

It can be useful to group tests together and run them independently. Groups could be smoke tests, unit tests and integration tests. This is easy to accomplish by using separate scripts, jest configuration files and naming convention for test files.

The tests in this repo have been grouped by class tests and module tests. This is how it is accomplished.

For each group of tests you create a separate configuration file. This configuration file inherits the default `jest.config.jest` configuration file and at least changes the `testRegex` option to select the test files that must be tested. The selection is accomplished by following a naming convention for test files. All test files in a group must end with a specific naming convention, i.e. the class tests end with: `.mock.classes.spec.js`.

Here is the configuration file for the class tests.

    // jest.config.mock.classes.js
    const config = require('./jest.config');
    // Overriding the testRegex option to select files that end with the specific naming
    // convention: <filename>.mock.classes.spec.js
    config.testRegex = ".mock.classes.spec\\.js$"
    console.log(' ---------- Running classes mock tests ----------')
    module.exports = config

To run a specific group of tests you have to call jest with the right configuration file. For convenience you can add the call to the scripts in the `package.json` file.

    // package.json
    ...
    "scripts": {
      ...
      "test:modules": "jest -c jest.config.mock.modules.js",
      "test:classes": "jest -c jest.config.mock.classes.js",
      ...
    },
    ...

Now all you need to do to run a specific group of tests is call the right script.

    npm run test:classes

That's it! Pretty cool, right?

## 4. Webstorm tips & tricks

If you are using the Webstorm IDE the following ensures Webstorm plays nicely with jest and babel.

### Getting Webstorm to recognize aliases

If you setup aliases for jest and babel Webstorm will not understand them by default. A trick to help Webstorm understand them is to define a webpack configuration file (webpack.config.js) that defines the same aliases.

    const path = require('path')
    
    module.exports = {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src')
        }
      }
    };

And voila like magic Webstorm now understands the aliases and you can navigate them with ctrl+b. 

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
6) Select the babel executable [1] it is located in '<project-dir>/node_modules/.bin' and it is called 'Babel'
7) Remove '--presets env' from the Arguments [2] or alternatively change it to '--presets @babel/env'

[1] The executable is part of '@babel/cli', so it needs to be installed.

[2] If you remove '--presets env' the following must be set in babel.config.js.

    // babel.config.js
    ...
    env: {
      test: {
        presets: [["@babel/env"]]
      }
    }
    ...

See this [blog post](https://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/) for more information about File Watchers.

### Tests run from commandline failing, tests run with Webstorm passing

It can happen that the tests in Webstorm all pass, but when you run from the commandline they fail. Somehow the dist directory is getting out of sync. This can be fixed easily by clearing the jest cache and deleting the dist directory. Run the following command to do this automatically.

    npm run test:clean

No run the tests again and they should pass.

    npm run test
