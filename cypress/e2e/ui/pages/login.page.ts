export class LoginPage {
    login(username: string, password: string) {
        cy.contains('a', 'Log in').click();
        cy.get('#loginusername').clear().type(username);
        cy.get('#loginpassword').clear().type(password);
        cy.get('#logInModal').contains('button', 'Log in').click();
    }
}
