import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('the researcher is not signed in', () => {
  cy.clearStorage();
});

And('the researcher has opened the application', () => {
  cy.server();
  cy.visit('/');
});

Then('the sign in page is visible', () => {
  cy.location('pathname').should('eq', '/signin');
  cy.contains('Log in');
});