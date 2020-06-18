# EasyRESTToGQL &middot; ![Tests](https://github.com/ramiromachado/easyRESTToGQL/workflows/Tests/badge.svg?branch=master&event=push) [![GitHub release](https://img.shields.io/github/release/ramiromachado/easyRESTToGQL.svg)](https://GitHub.com/ramiromachado/easyRESTToGQL/releases/) [![GitHub license](https://img.shields.io/github/license/ramiromachado/easyRESTToGQL.svg)](https://github.com/ramiromachado/easyRESTToGQL/blob/master/LICENSE) [![npm version](https://badge.fury.io/js/easyresttogql.svg)](https://badge.fury.io/js/easyresttogql) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ramiromachado/easyRESTToGQL/blob/master/CONTRIBUTING.md#proposing-a-change)
A package to simple convert your REST API into a GQL API

# Installation
Using npm:
```shell
$ npm i easyRESTToGQL
```

In Node.js:
```js
// Load the full build.
const { Server, Fields, Entities} = require('easyRESTToGQL');
const { StringField, IntField } = Fields;
const { Entity } = Entities;

const nameField = new StringField("name");
const ageField = new IntField("age");

const clientEntity = new Entity("Client", "localhost:3000/clients",[nameField, ageField]);

const server = new Server("4000",[clientEntity]);

server.start();
```

For more examples visit the [example folder](./examples)
## Versioning
## Semantic Versioning
EasyRESTToGQL follows [semantic versioning](https://semver.org/). We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance.

Every significant change is documented in the [changelog file](./CHANGELOG.md).

## Releases
Every two weeks there is a release. If you want to know what are the features we are working, [here are](https://github.com/ramiromachado/easyRESTToGQL/projects/1) the current sprint tasks. 

## Contributing
### Code of Conduct
EasyRESTToGQL has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its [Code of Conduct](https://github.com/ramiromachado/easyRESTToGQL/blob/master/CODE_OF_CONDUCT.md), and we expect project participants to adhere to it. Please read the full text so that you can understand what actions will and will not be tolerated.

### Contributing Guide

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to EasyRESTToGQL.

### Contributors
Special thanks to contributors

### License

EasyRESTToGQL is [MIT licensed](./LICENSE)