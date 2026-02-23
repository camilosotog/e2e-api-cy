import { Bill } from '../interfaces/bill.interface';
import { Product } from '../interfaces/product.interface';

export class BuyPage {
    addToCart(product: Product) {
        if (!product?.name?.trim()) {
            throw new Error('Producto no tiene un nombrev valido');
        }

        cy.contains('a', product.name).should('be.visible').click();
        cy.contains('a', 'Add to cart').click();
    }

    goToModule(moduleName: string) {
        if (!moduleName?.trim()) {
            throw new Error('Modulo no existe');
        }

        cy.contains('a', moduleName).should('be.visible').click();
    }

    fillPurchaseForm(bill: Bill) {
        const requiredFields: Array<keyof Bill> = [
            'name',
            'country',
            'city',
            'creditCard',
            'month',
            'year',
        ];
        const missingField = requiredFields.find((field) => !bill?.[field]?.trim());
        if (missingField) {
            throw new Error(`Datos de compra incompletos: falta ${missingField}`);
        }

        cy.contains('button', 'Place Order').click();
        
        cy.get('#orderModal').should('be.visible');
        cy.get('#orderModal .modal-body').should('be.visible');
        
        cy.get('#name').focus().clear().type(bill.name, { delay: 50, force: true });
        cy.get('#country').focus().clear().type(bill.country, { delay: 50, force: true });
        cy.get('#city').focus().clear().type(bill.city, { delay: 50, force: true });
        cy.get('#card').focus().clear().type(bill.creditCard, { delay: 50, force: true });
        cy.get('#month').focus().clear().type(bill.month, { delay: 50, force: true });
        cy.get('#year').focus().clear().type(bill.year, { delay: 50, force: true });
    }
}
