import status from "../../../fixtures/status.json";

class User {

    createUser({requestBody}) {
        cy.log("Creating user")
        cy.request('POST', Cypress.config('baseUrl'), {requestBody})
            .then((response) => {
                expect(response.status).to.eq(status.code["201"])
                cy.log("wallet id " + response.body.id + " created")
                    .wrap(response.body.id).as('walletId')
                expect(response.body).not.empty
            })
    }
}

export const user = new User()