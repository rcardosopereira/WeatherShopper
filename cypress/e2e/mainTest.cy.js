/*
UI TASK
The candidate should use Weather Shopper, a simple web application that
mimics an eCommerce application. The application has just about enough
business logic and UI elements to cover a lot of what a tester writing
automation scripts can expect to encounter.
How to use Weather Shopper?
Visit http://weathershopper.pythonanywhere.com/. Each page will have a
tooltip( ‘i’ icon) in the header title that allows you to click and read the task(s)
you need to complete. This exercise covers most of what somebody writing
GUI automation for a web application will encounter in their work.
The average time to complete the task is ~ 3 - 4 hrs

STEPS
Shop for moisturizers if the weather is below 19 degrees. Shop for suncreens if the weather is above 34 degrees.
Add two moisturizers to your cart. First, select the least expensive mositurizer that contains Aloe. For your second moisturizer, select the least expensive moisturizer that contains almond. Click on cart when you are done.
Add two sunscreens to your cart. First, select the least expensive sunscreen that is SPF-50. For your second sunscreen, select the least expensive sunscreen that is SPF-30. Click on the cart when you are done.
Verify if the payment was successful. The app is setup so there is a 5% chance that your payment failed.

How to share the results:
Please, create GitHub repository and invite beyonnex-qa account as
collaborator in the repo. Also notify your HR via email about completing
the tasks. It is mandatory to use Docker in your solution.
*/

/// <reference types="Cypress" />

describe('Weather-based Shopping', () => {
    it('should shop for moisturizers or sunscreens based on weather conditions', () => {
      // Visit the weather shopper page
      cy.visit('https://weathershopper.pythonanywhere.com/');
  
     //Get the current temperature
     cy.get('#temperature').then(($temperature) => {
      const temperature = parseInt($temperature.text());
        // Check the weather condition and shop accordingly
        
        if (temperature < 19) {
          // Shop for moisturizers
          cy.contains('Buy moisturizers').click();
          cy.shopAndPayWithCheapestMoisturizers();
          cy.typePaymentInfoInIframe();
          cy.contains('PAYMENT SUCCESS').should('exist');
          cy.contains('Your payment was successful. You should receive a follow-up call from our sales team.').should('exist');

        } else if (temperature > 34) {
          // Shop for sunscreens
          cy.contains('Buy sunscreens').click();
          cy.shopAndPayWithCheapestSunscreens();
          cy.typePaymentInfoInIframe();
          cy.contains('PAYMENT SUCCESS').should('exist');
          cy.contains('Your payment was successful. You should receive a follow-up call from our sales team.').should('exist');

        } else {
          // Handle other temperature ranges or conditions if needed
          cy.log('The weather is moderate. No specific shopping action needed.');
        }
      });
    });
  });
  