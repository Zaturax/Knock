# How to run the tests

Start by running "npm i" this will install the needed libs as wells as the PW browser binaries.

Just need to run "npm t". This will trigger all scenarios in all .feature files.

One of the tests is expected to fail since it is the performance_issue user login (The excpectation is that the login is sucessful under 5 seconds, which this user fails to do).

In the Order.feature file, we have a single scenario that covers the whole flow. For time saving purposes, that scenario covers all behaviors expected in the main flow. For a more BDD approach, each of the When-Then pairs that are currently separated by new lines should be individual test scenarios.


# Project structure

## Config => config/

There are some files that are frequently seen across different UI tests projects and should be created as needed

- paths.yml => contains selectors to the elements we are performing actions on
- hosts.yml => contains all the hosts for page navigation and endpoints for API requests
- inputs.yml => contains all the credentials and application inputs, usually ignored by the .gitignore
- env.json => used solely for local dev, replaced by an environment variable when running in pipelines, contains the environment that should be loaded and where the tests will run (e.g. qa, staging)

There are two main folders under the config folder

- common/ => contains all the configuration files that are common across all the environments

- environments/ => contains all different environnments and configuration files associated with it

Variables to be used across different step definitions should be stored on the variables object that also lives inside the global config

### config.js

The file that reads all the configurations. They are stored on the global config object `global.config`. Configs from the common and environment are merged so if there two files with the same name on the common and environment folders all the keys of those files will be added. If coliding keys exist, the one on the environment prevails.
e.g. The typical structure of the global config object

```
global.config = {
  paths: {
    button: ".button-selector"
  },
  scripts: {
    alert: "alert(1);"
  },
  hosts: {
    homepage: "https://example.com"
  },
  inputs: {
    username: "user1",
    password: "pA55Word"
  },
  env: "qa",

}
```

## Features => features/

All the feature files with gherking structure live here

## Step Definitions => step_definitions/

Step definitions for steps used in the .feature files

## Support => support/

Contains 2 main files

- hooks.js => all the hooks to the test execution BeforeAll, Before, After and AfterAll
- logger.js => initialization of the logger to be used across the development

## Others

- cucumber.js => cucumber configuration
- package.json => includes some important scripts
  - test => execute the tests with three retries upon failure
