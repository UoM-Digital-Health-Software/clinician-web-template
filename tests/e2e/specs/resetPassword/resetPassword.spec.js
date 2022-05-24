import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
const EMAIL_ADDRESS='user@localhost'
const STRONG_PASSWORD = "UoMDHS2006!"
const NOT_EXIST_RESET_KEY = "12345"
const EXIST_RESET_KEY = "11111111111111111111"

And('the research will see a link to reset password' , ()=>{
  cy.containsLink('Did you forget your password?')
})

When('the researcher click the reset password link', ()=>{
  cy.clickLink('Did you forget your password?')
})

Then('the researcher will go to the reset password page', ()=>{
  cy.urlContains('/account-reset-init')
})

And('the researcher can input their email', ()=>{
  cy.checkInputVisibleByLabel('Your Email Address')
  cy.checkLabelVisible('Your Email Address')
})

And('the researcher has entered a registered email address', ()=>{
  cy.get('input').first().type(EMAIL_ADDRESS);
})

And('the researcher has entered a nonregistered email address', ()=>{
  cy.get('input').first().type('non-registerd@localhost')
})

And('the researcher clicks the {string} button', (buttonName)=>{
  cy.clickButton(buttonName)
})

And('the research will see a message said that {string}', (message)=>{
  cy.checkSpanMessage(message)
})

And('the research will see is a link to sign in', ()=>{
  cy.containsLink('Sign in')
})

When('the researcher entered password and confirmation password that didn not match', ()=>{
  cy.get('input').first().type('Mpassword!1');
  cy.get('input').eq(1).type('Mpassword!2');
})

When('the researcher entered password and confirmation password that match', ()=>{
  cy.get('input').first().type(STRONG_PASSWORD);
  cy.get('input').eq(1).type(STRONG_PASSWORD);
})

Given('the researcher open the password reset finish url', ()=>{
  cy.updateAccountResetKey(EMAIL_ADDRESS, EXIST_RESET_KEY)
  cy.server()
  cy.visit('/account-reset-finish?key='+EXIST_RESET_KEY)
}) 

Given('the researcher open the password reset finish url with not exit key', ()=>{
  cy.server()
  cy.visit('/account-reset-finish?key='+NOT_EXIST_RESET_KEY)
})



