Feature: Test Login Function of a webshop

    Scenario:Login using valid credentials
        Given I access sauce demo website
        When I enter username standard_user
        And I enter password secret_sauce
        And I click on login button
        Then I should be redirected to products page and logo should be visible

    # Scenario:Login using invalid username
    #     Given I access sauce demo website
    #     When I enter username test_user
    #     And I enter password secret_sauce
    #     And I click on login button
    #     Then I should receive error message "Epic sadface: Username and password do not match any user in this service"

    # Scenario:Login using invalid password
    #     Given I access sauce demo website
    #     When I enter username standard_user
    #     And I enter password test123
    #     And I click on login button
    #     Then I should receive error message "Epic sadface: Username and password do not match any user in this service"

    # Scenario:Login using invalid username and password
    #     Given I access sauce demo website
    #     When I enter username test_user
    #     And I enter password test123
    #     And I click on login button
    #     Then I should receive error message "Epic sadface: Username and password do not match any user in this service"

    # Scenario:Login without entering username
    #     Given I access sauce demo website
    #     When I enter password secret_sauce
    #     And I click on login button
    #     Then I should receive error message "Epic sadface: Username is required"

    # Scenario:Login without entering password
    #     Given I access sauce demo website
    #     When I enter username standard_user
    #     And I click on login button
    #     Then I should receive error message "Epic sadface: Password is required"

    # Scenario:Login without entering username and password
    #     Given I access sauce demo website
    #     When  I click on login button
    #     Then I should receive error message "Epic sadface: Username is required"

    Scenario Outline: Test Login On a Webshop
        Given I access sauce demo website
        When I enter username <username>
        And I enter password <password>
        And I click on login button
        Then I should receive error message <errorMessage>
        Examples:
            | username      | password     | errorMessage                                                                |
            | test_user     | secret_sauce | "Epic sadface: Username and password do not match any user in this service" |
            | standard_user | test123      | "Epic sadface: Username and password do not match any user in this service" |
            | test_user     | test123      | "Epic sadface: Username and password do not match any user in this service" |
            | {backspace}   | secret_sauce | "Epic sadface: Username is required"                                        |
            | standard_user | {backspace}  | "Epic sadface: Password is required"                                        |
            | {backspace}   | {backspace}  | "Epic sadface: Username is required"                                        |
