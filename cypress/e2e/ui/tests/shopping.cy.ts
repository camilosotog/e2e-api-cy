import { BuyPage } from '../pages/buy.page';
import { cartModule, homeModule } from '../data/module.data';
import { Product } from '@interfaces/product.interface';
import { Bill } from '@interfaces/bill.interface';
import { loadCSV } from '@helpers/csv.helper';

const csvProducts = Cypress.env('PRODUCTS_CSV_PATH');
const csvBills = Cypress.env('BILLS_CSV_PATH');

describe('Validacion de funciones de compra en demoblaze', () => {
    const buyPage = new BuyPage();
    let productsData: Product[];
    let billsData: Bill[];

    before(() => {
        expect(csvProducts, 'PRODUCTS_CSV_PATH').to.be.a('string').and.not.be
            .empty;
        expect(csvBills, 'BILLS_CSV_PATH').to.be.a('string').and.not.be.empty;

        loadCSV<Product>(csvProducts).then((content) => {
            productsData = content;
            expect(productsData, 'productos cargados').to.have.length.greaterThan(
                1
            );
            cy.log(`Productos cargados: ${productsData.length}`);
        });

        loadCSV<Bill>(csvBills).then((content) => {
            billsData = content;
            expect(
                billsData,
                'datos de facturacion cargados'
            ).to.have.length.greaterThan(0);
            cy.log(`Datos de facturacion cargados: ${billsData.length}`);
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('Flujo de compra', () => {
        const product1 = productsData[0];
        const product2 = productsData[1];
        const billData = billsData[0];

        // Add primer producto al carrito
        cy.intercept('POST', '**/addtocart').as('addToCartProduct1');
        buyPage.addToCart({ name: product1.name, price: product1.price });
        cy.wait('@addToCartProduct1').its('response.statusCode').should('eq', 200);

        buyPage.goToModule(homeModule.name);

        // Add segundo producto al carrito
        cy.intercept('POST', '**/addtocart').as('addToCartProduct2');
        buyPage.addToCart({ name: product2.name, price: product2.price });
        cy.wait('@addToCartProduct2').its('response.statusCode').should('eq', 200);

        // Visualizar el carrito
        buyPage.goToModule(cartModule.name);
        cy.contains('h2', 'Products').should('be.visible');
        cy.contains('td', product1.name).should('be.visible');
        cy.contains('td', product2.name).should('be.visible');

        // Completar el formulario con datos del CSV
        buyPage.fillPurchaseForm({
            name: billData.name,
            country: billData.country,
            city: billData.city,
            creditCard: billData.creditCard,
            month: billData.month,
            year: billData.year,
        });

        cy.get('#name').should('have.value', billData.name);
        cy.get('#country').should('have.value', billData.country);
        cy.get('#city').should('have.value', billData.city);
        cy.get('#card').should('have.value', billData.creditCard);
        cy.get('#month').should('have.value', billData.month);
        cy.get('#year').should('have.value', billData.year);

        // Finalizar la compra
        cy.contains('button', 'Purchase').click();
        cy.contains('h2', 'Thank you for your purchase!').should('be.visible');
    });

    it('DATA-DRIVEN: Iterar sobre todos los datos de facturacion', () => {
        expect(productsData, 'productos disponibles').to.have.length.greaterThan(0);
        expect(billsData, 'facturaciones disponibles').to.have.length.greaterThan(0);

        // Iterar sobre los primeros 3 registros de bill
        billsData.slice(0, 3).forEach((billData, index) => {
            cy.log(`**ITERACION ${index + 1}: Compra para ${billData.name}**`);

            cy.visit('/');

            // Agregar un producto
            const product = productsData[index % productsData.length];
            cy.intercept('POST', '**/addtocart').as(`addToCart_${index}`);
            buyPage.addToCart({ name: product.name, price: product.price });
            cy.wait(`@addToCart_${index}`).its('response.statusCode').should('eq', 200);

            // Ir al carrito
            buyPage.goToModule(cartModule.name);
            cy.contains('h2', 'Products').should('be.visible');
            cy.contains('td', product.name).should('be.visible');

            // Llenar formulario con datos del CSV
            buyPage.fillPurchaseForm({
                name: billData.name,
                country: billData.country,
                city: billData.city,
                creditCard: billData.creditCard,
                month: billData.month,
                year: billData.year,
            });

            // Validar campos
            cy.get('#name').should('have.value', billData.name);
            cy.get('#country').should('have.value', billData.country);

            // Completar compra
            cy.contains('button', 'Purchase').click();
            cy.contains('h2', 'Thank you for your purchase!').should('be.visible');

            // Cerrar modal
            cy.get('.confirm').click();

            cy.log(`Compra ${index + 1} completada para ${billData.name}`);
        });
    });

    it('DATA-DRIVEN: Iterar sobre productos', () => {
        expect(productsData, 'productos disponibles').to.have.length.greaterThan(0);

        // Iterar sobre los primeros 3 productos
        productsData.slice(0, 3).forEach((product, index) => {
            cy.log(
                `**Agregando producto ${index + 1}: ${product.name} - $${product.price}**`
            );

            if (index > 0) {
                buyPage.goToModule(homeModule.name);
            }

            cy.intercept('POST', '**/addtocart').as(`addProduct_${index}`);
            buyPage.addToCart({ name: product.name, price: product.price });
            cy.wait(`@addProduct_${index}`).its('response.statusCode').should('eq', 200);
        });

        // Verificar todos los productos en el carrito
        buyPage.goToModule(cartModule.name);
        cy.contains('h2', 'Products').should('be.visible');

        productsData.slice(0, 3).forEach((product) => {
            cy.contains('td', product.name).should('be.visible');
        });

        cy.log('Todos los productos del CSV add al carrito');
    });
});
