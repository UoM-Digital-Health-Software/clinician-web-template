Feature: Sign In

    Scenario: Opening the sign in page
        Given the researcher is not signed in
        And the researcher has opened the application
        Then the sign in page is visible
        And the researcher is prompted to enter their user name
        And the researcher is prompted to enter their password
        And there is a button to sign in
        And there is no option to sign out

    Scenario: Signing in with the wrong user name
        Given the researcher is not signed in
        And the researcher has opened the application
        And the researcher has entered an unregistered user name
        And the researcher has entered a correct password
        When the researcher clicks the sign in button
        And there is a suggestion to try again

    Scenario: Signing in with the wrong password
        Given the researcher is not signed in
        And the researcher has opened the application
        And the researcher has entered a registered user name
        And the researcher has entered an incorrect password
        When the researcher clicks the sign in button
        And there is a suggestion to try again

    Scenario: Signing in with the correct details
        Given the researcher is not signed in
        And the researcher has opened the application
        And the researcher has entered a registered user name
        And the researcher has entered a correct password
        And the researcher clicks the sign in button
        And there is an option to sign out

    Scenario: Signing out of the application
        Given the researcher has signed in
        When the researcher clicks to sign out
        Then they are taken to the sign in page
        And there is no option to sign out
