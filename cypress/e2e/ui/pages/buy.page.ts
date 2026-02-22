import { Bill } from "../interfaces/bill.interface";
import { Product } from "../interfaces/product.interface";

export class BuyPage {
    addToCart(product: Product) {
        cy.contains("a", product.name).click();
        cy.contains("a", "Add to cart").click();
    }

    goToModule(moduleName: string) {
        cy.contains("a", moduleName).click();
    }

    fillPurchaseForm(bill: Bill) {
        cy.contains("button", "Place Order").click();
        cy.get("#name").type(bill.name);
        cy.get("#country").type(bill.country);
        cy.get("#city").type(bill.city);
        cy.get("#card").type(bill.creditCard);
        cy.get("#month").type(bill.month);
        cy.get("#year").type(bill.year);
    }
}
