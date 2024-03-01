@Only
Feature: Ex3


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
    
    Scenario: Exercise 3
        Given I count the instances of the 'patientNameResult' element into 'pacientList1'
        And I click the 'resumeTriageButton' element
        And I click the 'triageReasons' element
        And I click the 'continueButton' element
        And I click the 'skipButton' element
        And I click the 'callAmbulanceOption' element
        And I click the 'yesOption' element
        And I click the 'backToRequestListButton' element
        And I count the instances of the 'patientNameResult' element into 'pacientList2'
        Then 'pacientList2' is 1 less than 'pacientList1'
