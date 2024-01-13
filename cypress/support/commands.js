/////////////////////////////////////////////////////////////////////////

//Iframe
Cypress.Commands.add('typePaymentInfoInIframe', () => {
  const getIframeDocument = () => {
    return cy
      .get('iframe[class="stripe_checkout_app"]')
      .its('0.contentDocument')
      .should('exist');
  };

  const getIframeBody = () => {
    return getIframeDocument()
      .its('body')
      .should('not.be.undefined')
      .then(cy.wrap);
  };

  getIframeBody().find('#email').type('rafael@email.com');
  getIframeBody().find('#card_number').click();
  getIframeBody().find('#card_number').click();
  getIframeBody().find('#card_number').type('4377018875234386');
  getIframeBody().find('#cc-exp').type('5/2026');
  getIframeBody().find('#cc-csc').type('481');
  getIframeBody().find('span.iconTick:contains("Pay")').click();
});

/////////////////////////////////////////////////////////////////////////

//Buy Moisturizers
Cypress.Commands.add('shopAndPayWithCheapestMoisturizers', () => {
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

        // Push information about Aloe product to the array
        aloeProductsArray.push({ name: productName, price: productPrice, button: $priceElement.next() });
      });
    }

    // Check if the product name includes 'Almond'
    if (productName.toLowerCase().includes('almond')) {
      cy.get($el).next().then(($priceElement) => {
        const productPriceText = $priceElement.text();
        const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''), 10);

        // Push information about Almond product to the array
        almondProductsArray.push({ name: productName, price: productPrice, button: $priceElement.next() });
      });
    }
  });

  // Find the cheapest Aloe product
  cy.wrap(aloeProductsArray).then((aloeProducts) => {
    const cheapestAloeProduct = aloeProducts.reduce((min, product) =>
      product.price < min.price ? product : min
    );
    // Log the information about the cheapest Aloe product
    cy.log('Cheapest Aloe Product:', cheapestAloeProduct);
    // Click the button of the cheapest Aloe product
    cy.get(cheapestAloeProduct.button).click();
  });

  // Find the cheapest Almond product
  cy.wrap(almondProductsArray).then((almondProducts) => {
    const cheapestAlmondProduct = almondProducts.reduce((min, product) =>
      product.price < min.price ? product : min
    );
    // Log the information about the cheapest Almond product
    cy.log('Cheapest Almond Product:', cheapestAlmondProduct);
    // Click the button of the cheapest Almond product
    cy.get(cheapestAlmondProduct.button).click();
  });

  // Open Checkout - Cart
  cy.get('.thin-text').click();

  // Pay with Card Button
  cy.get('.stripe-button-el > span').click();
});

/////////////////////////////////////////////////////////////////////////

//Sunscreens
Cypress.Commands.add('shopAndPayWithCheapestSunscreens', () => {
  const spf50ProductsArray = [];
  const spf30ProductsArray = [];

  // Iterate through all elements on the page
  cy.get('.text-center > .font-weight-bold').each(($el) => {
    const productName = $el.text();

    if (productName.toLowerCase().includes('spf-50')) {
      cy.get($el).next().then(($priceElement) => {
        const productPriceText = $priceElement.text();
        const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''), 10);
        // Push information about SPF-50 product to the array
        spf50ProductsArray.push({ name: productName, price: productPrice, button: $priceElement.next() });
      });
    }

    if (productName.toLowerCase().includes('spf-30')) {
      cy.get($el).next().then(($priceElement) => {
        const productPriceText = $priceElement.text();
        const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''), 10);
        // Push information about SPF-30 product to the array
        spf30ProductsArray.push({ name: productName, price: productPrice, button: $priceElement.next() });
      });
    }
  });

  // Find the cheapest SPF-30 product
  cy.wrap(spf30ProductsArray).then((spf30Products) => {
    const cheapestSPF30Product = spf30Products.reduce((min, product) =>
      product.price < min.price ? product : min
    );
    cy.get(cheapestSPF30Product.button).click();
  });

  // Find the cheapest SPF-50 product
  cy.wrap(spf50ProductsArray).then((spf50Products) => {
    const cheapestSPF50Product = spf50Products.reduce((min, product) =>
      product.price < min.price ? product : min
    );
    cy.get(cheapestSPF50Product.button).click();
  });

  // Open Checkout - Cart
  cy.get('.thin-text').click();

  // Pay with Card Button
  cy.get('.stripe-button-el > span').click();
});

/////////////////////////////////////////////////////////////////////////