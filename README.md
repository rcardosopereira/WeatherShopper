[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

# Modern testing for modern stacks - Weather Shopper
This repository contains a technical challenge involving front-end automation. Using the Java Script language and the Cypress framework.
Visit http://weathershopper.pythonanywhere.com/

### Suggested IDEs by [Cypress documentation](https://docs.cypress.io/guides/tooling/IDE-integration.html#Extensions-amp-Plugins):
- VsCode (Best option to work with Cypress and it's free). 
- Intellij (Alternative solution, also free)

### Official framework links:
- [Cypress website](https://www.cypress.io/).
- The API documentation is available [here](https://docs.cypress.io/api/api/table-of-contents.html).
---

## Dependencies
### NodeJS setup:
You need to install the Node.js as the main dependency to use Cypress in this project.
You can click in [here](https://nodejs.org/en/) to download the latest stable Node version.

Open a terminal or command prompt.
Navigate to the root directory of your Node.js project (where your package.json file is located).
Run the following command:
> ```bash
>  npm install
> ```

This will read the package.json file and install all the dependencies specified in the dependencies and devDependencies sections.
Optionally, you can also run npm ci instead of npm install for a clean install using the exact versions specified in the package-lock.json file.
Wait for the command to complete. npm will download and install the dependencies into a node_modules folder in your project.
This command is crucial when setting up a new project or when someone else shares their project with you, as it installs all the necessary packages and dependencies specified in the project's package.json file.

After that, you can clone this repository in your local machine.
> ```bash
>  git clone git@github.com:rcardosopereira/WeatherShopper.git
> ```
Check your current version. The version of this project is:
-NPM Version 10.2.3
-NODE Version v21.2.0

---

## Running the tests

### Dependencies
Install the dependency cypress-iframe
> ```bash
> npm install cypress-iframe
> ```

or updated the dependency cypress-iframe
> ```bash
> npm update cypress-iframe
> ```

### Cypress run
Run the command below to  opening the Cypress test runner in interactive mode and configuring it to run in a Chrome browser with web security disabled.
> ```bash
> npm run cypress:open --config chromeWebSecurity=false
> ```

Cypress give us the ability to run all tests without a test runner interface.
To do this, just run the following command:
> ```bash
> npm run test
> ```

### Cypress test runner interface:
To open the Cypress and run the tests separately, run:
> ```bash
> npm run cypress:open 
> ```
click on E2E Testing
And run with Electron (v114) first.

If you want to run the tests in another one, just add browser and the name of the browser in the command. More info in [here](https://docs.cypress.io/guides/guides/launching-browsers#Browsers).

### Docker
To run the test in the Docker, please run the command below:
> ```bash
> docker run -it weathershopper
> ```

### This will install Cypress locally as a dev dependency for your project.
> ```bash
>  npm install cypress --save-dev
> ```

### References:
https://www.npmjs.com/package/cypress-iframe<br>
https://www.browserstack.com/guide/frames-and-iframes-in-cypress<br>
https://www.lambdatest.com/blog/how-to-handle-iframes-in-cypress/<br>
https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress<br>
https://docs.cypress.io/guides/guides/web-security#External-Navigation<br>
https://www.browserstack.com/guide/how-to-fill-and-submit-forms-in-cypress<br>
https://www.youtube.com/watch?v=LQCcwl6kuRU&ab_channel=Agilizei<br>
https://www.youtube.com/watch?v=3NjVUqiC2dI&ab_channel=Techbrothers99<br>
https://www.youtube.com/watch?v=K5ZKrnLIMJk&ab_channel=JoanMedia<br>

### Credit Card Fake Generator
https://www.duplichecker.com/pt/credit-card-generator.php<br>
https://stripe.com/docs/testing?locale=pt-BR<br>

### Support
Please, if you have some questions, feel free to write me. My e-mail is rcardosopereira@gmail.com
Thank you very much ;-)
