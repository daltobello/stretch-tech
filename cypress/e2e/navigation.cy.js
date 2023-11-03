describe("website navigation", () => {
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

  it("should be able to return you to the homepage", () => {
    cy.get('.gallery .art-card')
    .first()
    .get('.image-container')
    .should('exist') 
    .find('a.selected-art-link img')
    .should('exist')
    .should('have.attr', 'id', '436044')
    .get('.favorite-btn')
    .should('have.attr', 'id', 'heart')
    .get('.gallery .art-card')
    .first()
    .click()
    .url().should('eq', 'http://localhost:3000/art/436044')
    .get('.fav-button').contains("Favorites")
    .get(".frame").should("exist")
    .find(".selected-art-card-img").should('have.attr', 'alt', 'Portrait of a Man art piece')
    .get('.back-btn').should("exist")
    .get('#heart').should("exist")
    .get('.art-title').should("contain", "Portrait of a Man")
    // .get('.art-title').contain("Portrait of a Man")
    .get('.selected-art-info').first().contains("DEVIN, He got hitched at a castle").last().contains("32.100.61")
    
    
    
    .get('h1').contains("THE MET").click()
    .get('.gallery').children().should("have.length", 3)
    .url().should('eq', 'http://localhost:3000/');
  })

  it("should return to homepage after clicking artwork and viewing details", () => {
    cy.get('.gallery .art-card')
    .first()  
    .click()
    .url().should('eq', 'http://localhost:3000/art/436044')
    .get('.back-btn').should("exist")
    .click()
    .get('.gallery').children().should("have.length", 3)
    .url().should('eq', 'http://localhost:3000/')
    .get('.favorite-btn')
    .first()
    .click()
    .get('.gallery .art-card')
    .first()  
    .click()
    .get('.back-btn').should("exist")
    .click()
    .url().should('eq', 'http://localhost:3000/')
  })
})

// UserFlow: User clicks the first piece of art in the gallery, they are routed to a new page, user clicks the home button (h1) and are routed back to the homepage.