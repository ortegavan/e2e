Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('.showlogin').click();
    cy.get('#username').type(usuario);
    cy.get('#password').type(senha, { log: false });
    cy.get('.woocommerce-button').click();
});

Cypress.Commands.add('verCarrinho', () => {
    cy.get('#cart > .dropdown-toggle').click();
    cy.get('#cart .view-cart').click();
});

Cypress.Commands.add('irParaCheckout', () => {
    cy.get('.checkout-button').click();
});

Cypress.Commands.add('finalizarCompra', () => {
    cy.get('#terms').check();
    cy.get('#place_order').click();
});
