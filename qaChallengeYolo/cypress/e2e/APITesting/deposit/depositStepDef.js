import endpoints from "../../../fixtures/endpoint.json";
import status from "../../../fixtures/status.json";

class Deposit {

    depositValue(body, walletId) {
        cy.log("Depositing " + body.value + " for wallet id " + walletId)
        cy.request('POST', Cypress.config('baseUrl') + endpoints.wallet + walletId + endpoints.deposit, body)
            .then((response) => {
                switch (response.status) {
                    case status.code["200"]:
                        expect(response.status).to.eq(status.code["200"])
                        expect(response.body).not.null
                        cy.log("Deposit done")
                        break
                    case status.code["400"]:
                        expect(response.status).to.eq(status.code["400"])
                        expect(response.body).not.empty
                        cy.log(response.body)
                        break
                    case status.code["406"]:
                        expect(response.status).to.eq(status.code["406"])
                        expect(response.body).not.empty
                        cy.log(response.body)
                }
            })
    }
}

export const deposit = new Deposit()