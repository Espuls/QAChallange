import endpoints from "../../../fixtures/endpoint.json";
import value from "../../../fixtures/value.json";
import status from "../../../fixtures/status.json";

class Withdraw {

    withdrawValue(body, walletId) {
        cy.log("Withdrawing " + body.value + " for wallet id " + walletId.id)
        switch (body.value) {
            case value.validValue.value:
                break
            case value.negativeValue.value:
                cy.request({
                    method: 'PUT',
                    url: Cypress.config('baseUrl') + endpoints.wallet + walletId.id + endpoints.withdraw,
                    body: {value: body.value},
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(status.code["406"])
                    cy.wrap(response.status).as('operationStatusCode')
                }).then(() => {
                    cy.log("Can not withdraw negative values")
                })
                break
            case value.emptyValue.value:
                cy.request({
                    method: 'PUT',
                    url: Cypress.config('baseUrl') + endpoints.wallet + walletId.id + endpoints.withdraw,
                    body: {value: body.value},
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(status.code["406"])
                    cy.wrap(response.status).as('operationStatusCode')
                }).then(() => {
                    cy.log("Can not withdraw empty values")
                })
                break
            case value.invalidValue.value:
                cy.request({
                    method: 'PUT',
                    url: Cypress.config('baseUrl') + endpoints.wallet + walletId.id + endpoints.withdraw,
                    body: {value: body.value},
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(status.code["400"])
                    cy.wrap(response.status).as('operationStatusCode')
                }).then(() => {
                    cy.log("Invalid value")
                })
        }
    }
}

export const withdraw = new Withdraw()