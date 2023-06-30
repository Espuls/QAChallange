import endpoints from "../../../fixtures/endpoint.json";
import status from "../../../fixtures/status.json";
import dataTest from "../../../fixtures/dataTest.json";
import value from "../../../fixtures/value.json";

class Send {

    sendValue(body, walletSenderId, walletReceiverId) {
        cy.log("Sending " + body.value + " from sender " + walletSenderId.id + " to receiver " + walletReceiverId.id)
        cy.request('POST', Cypress.config('baseUrl') + endpoints.send + walletSenderId.id + endpoints.slash + walletReceiverId.id, body)
            .then((response) => {
                expect(response.status).to.eq(status.code["200"])
                cy.wrap(response.status).as('operationStatusCode')
                expect(response.body).not.null
                cy.log("Send operation completed")
            })
    }

    sendValueNegativeCase(body, walletSenderId, walletReceiverId) {
        cy.log("Sending " + body.value + " from sender " + walletSenderId.id + " to receiver " + walletReceiverId.id)
        cy.request({
            method: 'POST',
            url: Cypress.config('baseUrl') + endpoints.send + dataTest.userFour.id + endpoints.slash + dataTest.invalidUser.id,
            body: {value: value.validValue.value},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(status.code["406"])
            cy.wrap(response.status).as('operationStatusCode')
            expect(response.body).not.null
            cy.log("Send operation not completed")
            cy.log("User id " + dataTest.invalidUser.id + " does not exist.")
        })
    }
}

export const send = new Send()