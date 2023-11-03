describe("favorites user flow", () => {
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

  it("should navigate to favorites page", () => {
    cy.get('h1').contains("THE MET")
    
    .get('.gallery').children().should("have.length", 3)
    
    cy.get('.gallery .art-card')
      .eq(0)
      .get('.image-container')
      .should('exist') 
      .find('a.selected-art-link img')
      .should('exist')
      .should('have.attr', 'id', '436044')
      .get('.favorite-btn')
      .should('have.attr', 'id', 'heart')
      .get('.favorite-btn')
      .first()
      .click()
      .get('.fav-button')
      .click()
      .url().should('eq', 'http://localhost:3000/favorites')
      .get('h1').contains("THE MET")
      .get('.favorites-container')
      .find('a.selected-art-link img')
      .should('exist')
      .should('have.attr', 'id', '436044')
  })
})