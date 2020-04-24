Feature: User should be able see various types of business cards
  As a Moo user
  I should be view different types of Business Cards

  Background:
    Given I am on Moo homepage
    When I navigate to "Business Cards"

    Scenario: User is able to see different types of business cards
      Then I should see the following "Business Cards"
      """
      Original Business Cards
      Cotton Business Cards
      Super Business Cards
      Luxe Business Cards
      """

    Scenario: User should be able to see the price for business card
      And I navigate to "Original Business Cards"
      Then I should be able to view the price details
