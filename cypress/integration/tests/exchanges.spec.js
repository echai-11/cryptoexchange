/// <reference types="cypress"/>
describe("Exchanges", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000");
  });

  it("has a table", () => {
    cy.wait(10000);
    cy.get("table").should("have.attr", "role").and("equal", "table");
  });
  it("has correct columns", () => {
    cy.get("th").should(($th) => {
      expect($th).to.have.length(4);
      expect($th.eq(0), "first column").to.contain("Name");
      expect($th.eq(1), "second column").to.contain("Country");
      expect($th.eq(2), "third column").to.contain("URL");
      expect($th.eq(3), "last column").to.contain("Trust Rank");
    });
  });
  it("has pagination and pagination works", () => {
    var row1 = "";
    cy.get("a.exchange-redirect-link span")
      .invoke("text")
      .then((text) => {
        row1 = text;
      });
    cy.get(".pagination").children("li.active + li").click();
    cy.wait(5000);
    cy.get("a.exchange-redirect-link span")
      .invoke("text")
      .then((text) => {
        expect(text).to.not.equal(row1);
      });
  });
  it("link to exchange works ", () => {
    var currency_id = "";
    cy.get("a.exchange-redirect-link")
      .first()
      .children("span")
      .invoke("text")
      .then((text) => {
        currency_id = text;
      });
    cy.get("a.exchange-redirect-link").first().click();
    cy.wait(8000);
    cy.url().should("include", "crypto-info");
    cy.get("h1")
      .invoke("text")
      .then((text) => {
        expect(text).to.include(currency_id);
      });
  });
  it("back button works", () => {
    cy.get("button").click();
    cy.url().should("not.include", "crypto-info");
  });
});
