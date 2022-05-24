Feature: Reset Password

    Scenario: Opening the sign in page
        Given the researcher is not signed in
        And the researcher has opened the application
        Then the sign in page is visible
        And the research will see a link to reset password

    Scenario: Go to reset password page
        Given the researcher is not signed in
        And the researcher has opened the application
        When the researcher click the reset password link
        Then the researcher will go to the reset password page  
        And the researcher can input their email

    Scenario: Reset password for non register email
        Given the researcher is not signed in
        And the researcher has opened the application
        When the researcher click the reset password link
        And the researcher has entered a nonregistered email address
        And the researcher clicks the "reset" button
        Then the research will see a message said that 'Check your emails for details on how to reset your password.'

    Scenario: Reset password
        Given the researcher is not signed in
        And the researcher has opened the application
        When the researcher click the reset password link
        And the researcher has entered a registered email address
        And the researcher clicks the "reset" button
        Then the research will see a message said that 'Check your emails for details on how to reset your password.'

    Scenario: Reset password fail when confirmation password did not match
        Given the researcher open the password reset finish url
        When the researcher entered password and confirmation password that didn not match
        And the researcher clicks the "reset password" button
        Then the research will see a message said that 'The password and its confirmation do not match!'
    
    Scenario: Reset password fail when the reset password key not exist
        Given the researcher open the password reset finish url with not exit key
        When the researcher entered password and confirmation password that match
        And the researcher clicks the "reset password" button
        Then the research will see a message said that 'No user was found for this reset key'

    Scenario: Reset password success
        Given the researcher open the password reset finish url
        When the researcher entered password and confirmation password that match
        And the researcher clicks the "reset password" button
        Then the research will see a message said that 'Your password has been reset. Please'
        And the research will see is a link to sign in