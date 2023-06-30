|QA Challange - ExBanking test assignment|
-----------------------------------------------------------------------
|* All files can be found inside the zip folder attached to the e-mail.
-----------------------------------------------------------------------
|* For functional and non-functional test cases please look at the API_Test_Cases.xlsx file
-----------------------------------------------------------------------
|* Functional test automation was done using Cypress,
| To check Automate API testing using Cypress please follow these steps:
|** Prerequisites:
|1 - Install the latest LTS version of node.js
|1.1 - Run after installation -> node --version and npm --version
|2 - Choose an IDE (the automation was made using WebStorm IDE)
|3 - Install Cypress -> npm install cypress --save-dev
|4 - Open the project in folder *\qaChallengeYolo
|5 - Install Java JDK 17
|6 - Run jar file test-0.0.1-SNAPSHOT.jar -> java -jar test-0.0.1-SNAPSHOT.jar
|6.1 - This jar has the REST API that we need for the testing
|** Running the tests:
|1 - For browser mode -> npx cypress open
|1.1 - Select E2E Testing
|1.2 - Select browser (i.e. Chrome) then click on Start E2E Testing
|1.3 - Click in httpRequests.cy.js spec file
|2 - For headless mode -> npx cypress run --spec **/APITesting/*.cy.js
|3 - See the results
-----------------------------------------------------------------------
|** Accessing Swagger for API calls:
|1 - Run jar file test-0.0.1-SNAPSHOT.jar -> java -jar test-0.0.1-SNAPSHOT.jar
|2 - Use this link -> http://localhost:8080/swagger-ui/index.html#/
-----------------------------------------------------------------------
|* Non-functional test automation was done using Jmeter
| To check Performance testing automation using Jmeter please follow these steps:
|** Prerequisites:
|1 - Run jar file test-0.0.1-SNAPSHOT.jar -> java -jar test-0.0.1-SNAPSHOT.jar
|2 - Access folder \erick-puls (Yolo)\apache-jmeter-5.6\bin
|3 - Run the jmeter.bat file
|4 - In File > Open > \examples\CreateUser.jmx
|5 - Start the test
|6 - See the results
-----------------------------------------------------------------------
|* Postman collection,
| I have also created a Postman collection to help with the API testing,
| To access it, please follow these steps:
|1 - Install Postman
|2 - Import the following collection file -> Erick's Test.postman_collection.json
|3 - Use calls
|4 - See the results

Erick Puls
