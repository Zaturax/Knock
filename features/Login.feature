Feature: Login


    Background:
        Given I go to the 'homepage'
        Then I should see the 'homepageButton' element

     Scenario: login with valid and non locked users
        Given I click the 'homepageButton' element
        And I fill the 'usernameInput' element with 'emailUser'
        And I fill the 'passwordInput' element with 'password'
        And I click the 'loginButton' element
        Then I should see the 'newTriage' element
        And I should see the 'newRequest' element
        And I should see the 'triageTable' element


