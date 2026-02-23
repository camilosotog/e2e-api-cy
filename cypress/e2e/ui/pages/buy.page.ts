import { Bill } from '../interfaces/bill.interface';
import { Product } from '../interfaces/product.interface';

export class BuyPage {
    addToCart(product: Product) {
        cy.contains('a', product.name).click();
        cy.contains('a', 'Add to cart').click();
    }

    goToModule(moduleName: string) {
        cy.contains('a', moduleName).click();
    }

    fillPurchaseForm(bill: Bill) {
        cy.contains('button', 'Place Order').click();
        
        cy.get('#orderModal').should('be.visible');
        cy.get('#orderModal .modal-body').should('be.visible');
        cy.wait(1000);
        
        cy.get('#name').focus().clear().type(bill.name, { delay: 50, force: true });
        cy.get('#country').focus().clear().type(bill.country, { delay: 50, force: true });
        cy.get('#city').focus().clear().type(bill.city, { delay: 50, force: true });
        cy.get('#card').focus().clear().type(bill.creditCard, { delay: 50, force: true });
        cy.get('#month').focus().clear().type(bill.month, { delay: 50, force: true });
        cy.get('#year').focus().clear().type(bill.year, { delay: 50, force: true });
    }
}
