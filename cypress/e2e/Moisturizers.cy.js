/// <reference types="Cypress" />


describe('Moisturizer Test', () => {
  it('Should shop for moisturizers based on weather conditions', () => {
    // Visit the weather shopper page
    cy.visit('https://weathershopper.pythonanywhere.com/');
    // Shop for sunscreens
    cy.contains('Buy moisturizers').click();

    const aloeProductsArray = [];
    const almondProductsArray = [];

    // Iterate through all elements on the page
    cy.get('.text-center > .font-weight-bold').each(($el) => {
      const productName = $el.text();

      // Check if the product name includes 'Aloe'
      if (productName.includes('Aloe')) {
        cy.get($el).next().then(($priceElement) => {
          const productPriceText = $priceElement.text();
          const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''), 10);

          aloeProductsArray.push({ name: productName, price: productPrice, button: $priceElement.next() });
        });
      }

      // Check if the product name includes 'Almond'
      if (productName.toLowerCase().includes('almond')) {
        cy.get($el).next().then(($priceElement) => {
          const productPriceText = $priceElement.text();
          const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''), 10);

          almondProductsArray.push({ name: productName, price: productPrice, button: $priceElement.next() });
        });
      }
    });

    
    cy.wrap(aloeProductsArray).then((aloeProducts) => {
      const cheapestProduct = aloeProducts.reduce((min, product) =>
        product.price < min.price ? product : min
      );
      
      cy.log('Cheapest Aloe Product:', cheapestProduct);
      
      cy.get(cheapestProduct.button).click();

      
      cy.wrap(almondProductsArray).then((almondProducts) => {
        const cheapestProduct = almondProducts.reduce((min, product) =>
          product.price < min.price ? product : min
        );
        
        cy.log('Cheapest Aloe Product:', cheapestProduct);
       
        cy.get(cheapestProduct.button).click();
      });
    });

    //Open Checkout - Cart
    cy.get('.thin-text').click();

    //Pay with Card Button
    cy.get('.stripe-button-el > span').click();

    const getIframeDocument = () => {
      return cy
        .get('iframe[class="stripe_checkout_app"]')
        .its('0.contentDocument').should('exist')
    }

    const getIframeBody = () => {
      return getIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
    };
    getIframeBody().find('#email').type('rafael@email.com');
    getIframeBody().find('#card_number').click();
    getIframeBody().find('#card_number').click();
    getIframeBody().find('#card_number').type('4377018875234386');
    getIframeBody().find('#cc-exp').type('5/2026');
    getIframeBody().find('#cc-csc').type('481');
    getIframeBody().find('span.iconTick:contains("Pay")').click();

    cy.contains('PAYMENT SUCCESS').should('exist');
    cy.contains('Your payment was successful. You should receive a follow-up call from our sales team.').should('exist');
  });

});