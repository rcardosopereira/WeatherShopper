/// <reference types="Cypress" />


describe('Sunscreens Test', () => {
  it('Should shop for sunscreens based on weather conditions', () => {
    // Visit the weather shopper page
    cy.visit('https://weathershopper.pythonanywhere.com/');
    // Shop for sunscreens
    cy.contains('Buy sunscreens').click();

    const spf50ProductsArray = [];
    const spf30ProductsArray = [];

    // Iterate through all elements on the page
    cy.get('.text-center > .font-weight-bold').each(($el) => {
      const productName = $el.text();

      if (productName.toLowerCase().includes('spf-50')) {
        cy.get($el).next().then(($priceElement) => {
          const productPriceText = $priceElement.text();
          const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''), 10);
          
          spf50ProductsArray.push({ name: productName, price: productPrice, button: $priceElement.next() });
        });
      }

      if (productName.toLowerCase().includes('spf-30')) {
        cy.get($el).next().then(($priceElement) => {
          const productPriceText = $priceElement.text();
          const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''), 10);
          
          spf30ProductsArray.push({ name: productName, price: productPrice, button: $priceElement.next() });
        });
      }
    });

    
    cy.wrap(spf30ProductsArray).then((spf30Products) => {
      const cheapestProduct = spf30Products.reduce((min, product) =>
        product.price < min.price ? product : min
      );
      cy.get(cheapestProduct.button).click();
    });

    
    cy.wrap(spf50ProductsArray).then((spf50Products) => {
      const cheapestProduct = spf50Products.reduce((min, product) =>
        product.price < min.price ? product : min
      );
      cy.get(cheapestProduct.button).click();
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
