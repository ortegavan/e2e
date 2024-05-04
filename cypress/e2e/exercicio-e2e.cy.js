/// <reference types="cypress" />

import produtoPage from '../support/page_objects/produto.page';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/');
    });

    afterEach(() => {
        cy.screenshot();
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        // Mantive tudo dentro da promise de fixture para ter certeza de que ao tentar finalizar a compra os produtos já estarão no carrinho
        // Carrega a lista de produtos do arquivo produtos.json
        cy.fixture('produtos').then((produtos) => {
            // Itera pela lista de produtos; navega para cada um e adiciona ao carrinho
            produtos.forEach((produto) => {
                produtoPage.visitarProduto(produto.nome);
                produtoPage.adicionarProdutoAoCarrinho(
                    produto.tamanho,
                    produto.cor,
                    produto.quantidade,
                );
            });
            // Navega para o carrinho
            cy.verCarrinho();
            // Navega para a conclusão da compra
            cy.irParaCheckout();
            // Efetua o login
            cy.fixture('perfil').then((perfil) => {
                cy.login(perfil.usuario, perfil.senha);
            });
            // Finaliza a compra
            cy.finalizarCompra();
            // Espera o loading para validar o teste
            cy.wait(5000);
            cy.get('.page-title').should('contain', 'Pedido recebido');
        });
    });
});
