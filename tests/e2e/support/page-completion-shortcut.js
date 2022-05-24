Cypress.Commands.add('signIn', (username, password) => {
  cy.server();
  cy.clearStorage();
  cy.visit('./signin');
  cy.get('input').first().type(username);
  cy.get('input').eq(1).type(password);
  cy.clickButton('Log in');
})

Cypress.Commands.add('setUpParticipant', (uniqueCode, participantID, status) =>{
  cy.signIn('admin','admin')
  cy.urlContains('participant')
  cy.clickButton('Add Participant')
  cy.get('input').filter(':visible').first().type(uniqueCode)
  cy.get('input').filter(':visible').eq(1).type(participantID)
  cy.clickButton('Save') 
  cy.checkSpanMessage('Setup completed successfully')
  cy.clickSpan('OK')
  cy.updateParticipantStatus(participantID, status)
})

Cypress.Commands.add('signOut', () =>{
  cy.clickDiv('Log out')
})