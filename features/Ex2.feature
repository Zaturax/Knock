@Only
Feature: Ex2


    Background:
        Given I go to the 'homepage'
        Then I should see the 'homepageButton' element
        Given I click the 'homepageButton' element
        And I fill the 'usernameInput' element with 'emailUser'
        And I fill the 'passwordInput' element with 'password'
        And I click the 'loginButton' element
        Then I should see the 'newTriage' element
        And I should see the 'newRequest' element
        And I should see the 'triageTable' element

     Scenario: Exercise 2
        Given I click the 'newTriage' element
        And I fill the 'patientName' element with 'patientNameExercise'
        And I click the 'patientNameResult' element
        And I click the "continueButton" element
        Then I validate that I can see 7 instances of the 'triageReasons' element
        Given I click the 'backButton' element
        Then I validate that I can see 2 instances of the 'patientNameResult' element

