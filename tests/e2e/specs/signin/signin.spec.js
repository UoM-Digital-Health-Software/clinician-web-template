import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

// Scenario: Opening the sign in page

And('the researcher is prompted to enter their user name', () => {
  cy.contains('User Name');
});

And('the researcher is prompted to enter their password', () => {
  cy.contains('Password');
});

And('there is a button to sign in', () => {
  cy.clickButton('Log in');
});

And('there is no option to sign out', () => {
});

And('the researcher has entered an unregistered user name', () => {
  cy.get('input').first().type('unregistered@example.com');
});

And('the researcher has entered a correct password', () => {
  cy.get('input').eq(1).type('admin');
});

When('the researcher clicks the sign in button', () => {
  cy.clickButton('Log in');
});

And('there is a suggestion to try again', () => {
  cy.contains(/try again/).should('be.visible');
});

// Scenario: Signing in with the wrong password
And('the researcher has entered a registered user name', () => {
  cy.get('input').first().type('admin');
});

And('the researcher has entered an incorrect password', () => {
  cy.get('input').eq(1).type('incorrect123');
});

// Scenario: Signing in with the correct details
And('there is an option to sign out', () => {
  cy.contains('Log out').should('be.visible');
});

// Scenario: Signing out of the application
Then('the researcher clicks to sign out', () => {
  cy.clickDiv('Log out')
});

Then('they are taken to the sign in page', () => {
  cy.location('pathname').should('eq', '/signin');
  cy.contains('Log in');
});

And('the researcher tries to navigate away', () => {
  cy.server();
  cy.visit('/');
});
 
Given('the researcher has signed in', () => {
  cy.signIn('admin','admin')
});
