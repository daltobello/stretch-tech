describe("back button user flow", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11",
      {
        statusCode: 200,
        fixture: "objectIDs",
      }
    );

    cy.intercept(
      "GET",
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/436044",
      {
        statusCode: 200,
        fixture: "object-436044",
      }
    ).as("getObject-436044");

    cy.intercept(
      "GET",
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/436048",
      {
        statusCode: 200,
        fixture: "object-436048",
      }
    ).as("getObject-436048");

    cy.intercept(
      "GET",
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/436049",
      {
        statusCode: 200,
        fixture: "object-436049",
      }
    ).as("getObject-436049");

    cy.visit("http://localhost:3000");
    cy.wait("@getObject-436044");
    cy.wait("@getObject-436048");
    cy.wait("@getObject-436049");
  });
  it("should be ", () => {
    cy.get('.gallery .art-card')
    .first()  
    .click()
    .url().should('eq', 'http://localhost:3000/art/436044')
    .get('.back-btn').should("exist")
    .click()
    .get('.gallery').children().should("have.length", 3)
    .url().should('eq', 'http://localhost:3000/')
    // .get('h1')
    // .click()
   
    // .url().should('eq', 'http://localhost:3000/');
  })
})