import endpoints from "../../../fixtures/endpoint.json";
import status from "../../../fixtures/status.json";
import userType from "../../../fixtures/userTypes.json";

class Balance {

    checkBalance(walletId) {
        cy.request('GET', Cypress.config('baseUrl') + endpoints.wallet + walletId + endpoints.balance)
            .then((response) => {
                switch (response.status) {
                    case status.code["200"]:
                        expect(response.status).to.eq(status.code["200"])
                        expect(response.body).not.null
                        cy.log("Balance check done")
                        cy.wrap(response.body).as('oldBalanceValue')
                        cy.log("Balance value equals to " + response.body)
                        break
                    case status.code["406"]:
                        expect(response.status).to.eq(status.code["406"])
                        expect(response.body).not.empty
                        cy.log(response.body)
                }
            })
    }

    checkBalanceNegativeCase(walletId) {
        cy.request({
            method: 'GET',
            url: Cypress.config('baseUrl') + endpoints.wallet + walletId.id + endpoints.balance,
            failOnStatusCode: false
        }).then((response) => {
                switch (response.status) {
                    case status.code["200"]:
                        expect(response.status).to.eq(status.code["200"])
                        expect(response.body).not.null
                        cy.log("Balance check done")
                        cy.wrap(response.body).as('oldBalanceValue')
                        cy.log("Balance value equals to " + response.body)
                        break
                    case status.code["406"]:
                        expect(response.status).to.eq(status.code["406"])
                        expect(response.body).not.empty
                        cy.log(response.body)
                }
            })
    }

    checkSenderBalance(walletId) {
        cy.request('GET', Cypress.config('baseUrl') + endpoints.wallet + walletId + endpoints.balance)
            .then((response) => {
                switch (response.status) {
                    case status.code["200"]:
                        expect(response.status).to.eq(status.code["200"])
                        expect(response.body).not.null
                        cy.log("Balance check done")
                        cy.wrap(response.body).as('oldSenderBalanceValue')
                        cy.log("Balance value equals to " + response.body)
                        break
                    case status.code["406"]:
                        expect(response.status).to.eq(status.code["406"])
                        expect(response.body).not.empty
                        cy.log(response.body)
                }
            })
    }

    checkReceiverBalance(walletId) {
        cy.request('GET', Cypress.config('baseUrl') + endpoints.wallet + walletId + endpoints.balance)
            .then((response) => {
                switch (response.status) {
                    case status.code["200"]:
                        expect(response.status).to.eq(status.code["200"])
                        expect(response.body).not.null
                        cy.log("Balance check done")
                        cy.wrap(response.body).as('oldReceiverBalanceValue')
                        cy.log("Balance value equals to " + response.body)
                        break
                    case status.code["406"]:
                        expect(response.status).to.eq(status.code["406"])
                        expect(response.body).not.empty
                        cy.log(response.body)
                }
            })
    }

    checkNewBalanceAfterWithdraw(walletId, type) {
        cy.request('GET', Cypress.config('baseUrl') + endpoints.wallet + walletId + endpoints.balance)
            .then((response) => {
                switch (response.status) {
                    case status.code["200"]:
                        expect(response.status).to.eq(status.code["200"])
                        expect(response.body).not.null
                        cy.log("Balance check done")
                        switch (type) {
                            case userType.type.standard:
                                cy.wrap(response.body).as('newBalanceValue')
                                cy.get('@oldBalanceValue').then((oldBalanceValue) => {
                                    cy.get('@operationStatusCode').then((operationStatusCode) => {
                                        if (operationStatusCode.toString() === status.code["200"].toString()) {
                                            cy.get('@newBalanceValue').should('be.lessThan', oldBalanceValue)
                                                .then((newBalanceValue) => {
                                                    cy.log("Balance value equals to " + newBalanceValue)
                                                })
                                        } else {
                                            cy.get('@newBalanceValue').should('equal', oldBalanceValue)
                                            cy.log("Balance value equals to " + oldBalanceValue)
                                        }
                                    })
                                })
                                break
                            case userType.type.sender:
                                cy.wrap(response.body).as('newSenderBalanceValue')
                                cy.get('@oldSenderBalanceValue').then((oldSenderBalanceValue) => {
                                    cy.get('@operationStatusCode').then((operationStatusCode) => {
                                        if (operationStatusCode.toString() === status.code["200"].toString()) {
                                            cy.get('@newSenderBalanceValue').should('be.lessThan', oldSenderBalanceValue)
                                                .then((newSenderBalanceValue) => {
                                                    cy.log("Sender new balance value equals to " + newSenderBalanceValue)
                                                })
                                        } else {
                                            cy.get('@newSenderBalanceValue').should('equal', oldSenderBalanceValue)
                                            cy.log("Sender balance value equals to " + oldSenderBalanceValue)
                                        }
                                    })
                                })
                                break
                            case userType.type.receiver:
                                cy.wrap(response.body).as('newReceiverBalanceValue')
                                cy.get('@oldReceiverBalanceValue').then((oldReceiverBalanceValue) => {
                                    cy.get('@operationStatusCode').then((operationStatusCode) => {
                                        if (operationStatusCode.toString() === status.code["200"].toString()) {
                                            cy.get('@newReceiverBalanceValue').should('be.greaterThan', oldReceiverBalanceValue)
                                                .then((newReceiverBalanceValue) => {
                                                    cy.log("Receiver new balance value equals to " + newReceiverBalanceValue)
                                                })
                                        } else {
                                            cy.get('@newReceiverBalanceValue').should('equal', oldReceiverBalanceValue)
                                            cy.log("Receiver balance value equals to " + oldReceiverBalanceValue)
                                        }
                                    })
                                })
                        }
                        break
                    case status.code["406"]:
                        expect(response.status).to.eq(status.code["406"])
                        expect(response.body).not.empty
                        cy.log(response.body)
                }
            })
    }
}

export const balance = new Balance()