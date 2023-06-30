import {user} from "./createUser/userStepDef.js";
import {deposit} from "./deposit/depositStepDef";
import {balance} from "./getBalance/getBalanceStepDef";
import {withdraw} from "./withdraw/withdrawStepDef";
import {send} from "./send/sendStepDef";
import dataTest from '../../fixtures/dataTest.json'
import value from '../../fixtures/value.json'
import userType from '../../fixtures/userTypes.json'

describe("HTTP Requests", () => {

    beforeEach(() => {
        const requestBody = dataTest.dummyUser;
        user.createUser(requestBody)
    })

    it("Make a deposit using create user", () => {
        cy.get('@walletId').then((walletId) => {
            deposit.depositValue(value.validValue, walletId)
            cy.log("Checking wallet id " + walletId + " balance after deposit")
            balance.checkBalance(walletId)
            cy.get('@oldBalanceValue').then((balanceValue) => {
                expect(balanceValue.toString()).to.eq(value.validValue.value)
                cy.log("Balance value equals to " + balanceValue.toString())
            })
        })
    })

    it("Withdraw a negative value using create user", () => {
        cy.log("Checking wallet id " + dataTest.userFour.id + " balance before withdraw operation")
        balance.checkBalance(dataTest.userFour.id)
        withdraw.withdrawValue(value.negativeValue, dataTest.userFour)
        cy.log("Checking wallet id " + dataTest.userFour.id + " balance after withdraw operation")
        balance.checkNewBalanceAfterWithdraw(dataTest.userFour.id, userType.type.standard)
    })

    it("Send a valid value from valid sender to valid receiver", () => {
        cy.log("Checking sender id " + dataTest.userFour.id + " balance before send operation")
        balance.checkSenderBalance(dataTest.userFour.id)
        cy.log("Checking receiver id " + dataTest.userFive.id + " balance before send operation")
        balance.checkReceiverBalance(dataTest.userFive.id)
        send.sendValue(value.validValue, dataTest.userFour, dataTest.userFive)
        cy.log("Checking sender id " + dataTest.userFour.id + " balance after send operation")
        balance.checkNewBalanceAfterWithdraw(dataTest.userFour.id, userType.type.sender)
        cy.log("Checking receiver id " + dataTest.userFive.id + " balance after send operation")
        balance.checkNewBalanceAfterWithdraw(dataTest.userFive.id, userType.type.receiver)
    })

    it("Send a valid value from valid sender to invalid receiver", () => {
        cy.log("Checking sender id " + dataTest.userFour.id + " balance before send operation")
        balance.checkSenderBalance(dataTest.userFour.id)
        cy.log("Checking receiver id " + dataTest.invalidUser.id + " balance before send operation")
        balance.checkBalanceNegativeCase(dataTest.invalidUser.id)
        send.sendValueNegativeCase(value.validValue, dataTest.userFour.id, dataTest.invalidUser.id)
        cy.log("Checking sender id " + dataTest.userFour.id + " balance after send operation")
        balance.checkNewBalanceAfterWithdraw(dataTest.userFour.id, userType.type.sender)
    })
})