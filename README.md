
## jest-test
> Test repository to test jest mocking and some other tips & tricks I'm documenting for myself that might be of use to others.

**IMPORTANT:** If you are using node v10 and npm then this repository will probably not work for you. For more information please refer to this [jest issue](https://github.com/facebook/jest/issues/7395) on GitHub.

In addition to testing mocking this repository demonstrates a couple of other things:
1) [Separate config files](#1.-Separate-config-files)
2) [Setting aliases](#2.-Setting-aliases)
3) [Running tests independently](#3.-Running-tests-independently)
4) [Webstorm tips & tricks](#4.-Webstorm-tips-&-tricks)

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

## 3. Running tests independently

It can be useful to group tests together and be able to run them independently. Groups could be smoke tests, unit tests and integration tests. This is easy to accomplish by using separate scripts and jest configuration files.

The tests in this repo have been grouped by class mock tests and module mock tests. This is how it is accomplished.

For each group of tests you create a separate configuration file. This configuration file inherits the default `jest.config.jest` configuration file and at least needs to change the `testRegex` option to select the test files that must be tested. The selection is accomplished by following a specific naming convention for test files. All test files in a group must end with this specific naming convention, i.e. the class mock tests end with: `.mock.classes.spec.js`.

Here is the configuration file for the class mock tests.

    // jest.config.mock.classes.js
    const config = require('./jest.config');
    // Overriding the testRegex option to select files that end with the specific naming
    // convention: <filename>.mock.classes.spec.js
    config.testRegex = ".mock.classes.spec\\.js$"
    console.log(' ---------- Running classes mock tests ----------')
    module.exports = config

To run a specifc group of tests you have to call jest with the right configuration file. For convience you can add the call to the scripts in the `package.json` file.

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
