import { BuyPage } from "../pages/buy.page";
import { galaxyS7, sonyVaioI5 } from "../data/product.data";
import { cartModule, homeModule } from "../data/module.data";
import { billData } from "../data/bill.data";

describe("Validacion de funciones de compra en demoblaze", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Flujo de compra", () => {
        const buyPage = new BuyPage();

        // Agregar dos productos al carrito
        cy.intercept("POST", "**/addtocart").as("addToCartProduct1");
        buyPage.addToCart(galaxyS7);
        cy.wait("@addToCartProduct1")
            .its("response.statusCode")
            .should("eq", 200);

        buyPage.goToModule(homeModule.name);

        cy.intercept("POST", "**/addtocart").as("addToCartProduct2");
        buyPage.addToCart(sonyVaioI5);
        cy.wait("@addToCartProduct2")
            .its("response.statusCode")
            .should("eq", 200);

        // Visualizar el carrito
        buyPage.goToModule(cartModule.name);
        cy.contains("h2", "Products").should("be.visible");
        cy.contains("td", galaxyS7.name).should("be.visible");
        cy.contains("td", sonyVaioI5.name).should("be.visible");

        // Completar el formulario
        buyPage.fillPurchaseForm(billData);
        cy.get("#name").should("have.value", billData.name);
        cy.get("#country").should("have.value", billData.country);
        cy.get("#city").should("have.value", billData.city);
        cy.get("#card").should("have.value", billData.creditCard);
        cy.get("#month").should("have.value", billData.month);
        cy.get("#year").should("have.value", billData.year);

        // Finalizar la compra
        cy.contains("button", "Purchase").click();
        cy.contains("h2", "Thank you for your purchase!").should("be.visible");
    });
});
