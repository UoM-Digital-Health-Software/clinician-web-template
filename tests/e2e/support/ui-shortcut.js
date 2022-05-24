Cypress.Commands.add('urlContains', (uri) => {
  cy.url().should('contains', uri)
})

Cypress.Commands.add('clickButton', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

Cypress.Commands.add('clickDiv', (divContent) => {
  cy.get('div').contains(divContent).click()
})

Cypress.Commands.add('clickSpan', (spanContent) => {
  cy.get('span').contains(spanContent).click()
})

Cypress.Commands.add('checkButtonVisible', (buttonName) => {
  cy.get('button').contains(buttonName).should('be.visible')
})

Cypress.Commands.add('checkInputVisibleByLabel', (labelName) => {
  cy.contains('label', labelName)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get('#' + id)
    }).should('be.visible')
})

Cypress.Commands.add('checkLabelVisible', (labelName) => {
  cy.get('label').filter(':visible').contains(labelName).parent()
  .should('be.visible')
})

Cypress.Commands.add('checkSpanMessage', (message) => {
  cy.contains('span', message)
})

Cypress.Commands.add('clickOutside', function () {
  return cy.get('body').click(0, 0);
});

Cypress.Commands.add('containsLink', function (indiction) {
  cy.get('a').contains(indiction).should('be.visible')
});

Cypress.Commands.add('clickLink', function (route) {
  cy.get('a').contains(route).click()
});

