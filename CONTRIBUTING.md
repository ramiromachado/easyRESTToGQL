# How to Contribute
Want to contribute to easyRESTToGQL? There are a few things you need to know.

## Code of Conduct
easyRESTToGQL has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its [Code of Conduct](https://github.com/ramiromachado/easyRESTToGQL/blob/master/CODE_OF_CONDUCT.md), and we expect project participants to adhere to it. Please read the full text so that you can understand what actions will and will not be tolerated.

## Open Development
All work on easyRESTToGQL happens directly on GitHub. Both core team members and external contributors send pull requests which go through the same review process.

## Semantic Versioning
easyRESTToGQL follows [semantic versioning](https://semver.org/). We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance.

Every significant change is documented in the [changelog file](https://github.com/ramiromachado/easyRESTToGQL/blob/master/CHANGELOG.md).

## Branch Organization
Submit all changes directly to the [master branch](https://github.com/ramiromachado/easyRESTToGQL/tree/master). We don’t use separate branches for development or for upcoming releases. We do our best to keep master in good shape, with all tests passing.

Code that lands in master must be compatible with the latest stable release. It may contain additional features, but no breaking changes. We should be able to release a new minor version from the tip of master at any time.

## Bugs
We are using [GitHub Issues](https://github.com/ramiromachado/easyRESTToGQL/issues) for our public bugs. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn’t already exist.

## Proposing a Change
If you intend to make any non-trivial changes to the implementation, we recommend [filing an issue](https://github.com/ramiromachado/easyRESTToGQL/issues/new). This lets us reach an agreement on your proposal before you put significant effort into it.

If you’re only fixing a bug, it’s fine to submit a pull request right away but we still recommend to file an issue detailing what you’re fixing. This is helpful in case we don’t accept that specific fix but want to keep track of the issue.

## Sending a Pull Request
Before submitting a pull request, please make sure the following is done:

1. Fork the repository and create your branch from master.
2. Run npm install in the repository root.
3. If you’ve fixed a bug or added code that should be tested, add tests!
4. Ensure the test suite passes (npm test).
5. Format your code with prettier (npm prettier).
6. Make sure your code lints (npm lint).

## License
By contributing to easyRESTToGQL, you agree that your contributions will be licensed under its MIT license.

