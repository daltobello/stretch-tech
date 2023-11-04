describe("page load", () => {
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

  it("should display all homepage elements", () => {
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
      .should('have.attr', 'id', 'heart');

    cy.get('.gallery .art-card')
      .eq(1)
      .find('.image-container')
      .should('exist') 
      .find('a.selected-art-link img')
      .should('exist')
      .should('have.attr', 'id', '436048')
      .get('.favorite-btn')
      .should('have.attr', 'id', 'heart');

    cy.get('.gallery .art-card')
      .eq(2)
      .find('.image-container')
      .should('exist') 
      .find('a.selected-art-link img')
      .should('exist')
      .should('have.attr', 'id', '436049')
      .get('.favorite-btn')
      .should('have.attr', 'id', 'heart')
      .get('.footer').contains("Disclaimer: This website is not affiliated with The Metropolitan Museum of Art. It is purely for educational purposes.")
    })
})