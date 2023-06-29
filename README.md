# QAChallange
Automate API testing using Cypress

Swagger:
pre-requisites: run the jar file (API) -> java -jar test-0.0.1-SNAPSHOT.jar
-> http://localhost:8080/swagger-ui/index.html#/

Functional: Cypress
pre-requisites: run the jar file (API) -> java -jar test-0.0.1-SNAPSHOT.jar
how to run: run the spec file (tests) httpRequests.cy.js
browser mode -> npx cypress open
headless mode -> npx cypress run --spec **/APITesting/*.cy.js

Non-functional: Jmeter
pre-requisites: run the jar file (API) -> java -Xmx16m -jar test-0.0.1-SNAPSHOT.jar
how to run: 
-> apache-jmeter-5.6/bin/jmeter.bat
-> run the test precofigured
