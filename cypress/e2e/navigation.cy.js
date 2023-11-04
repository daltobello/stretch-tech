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

  it("should display artwork details and be able to return to the homepage", () => {
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
    .get('.fav-button').contains("FAVORITES")
    .get(".frame").should("exist")
    .find(".selected-art-card-img").should('have.attr', 'alt', 'Portrait of a Man art piece')
    .get('.back-btn').should("exist")
    .get('#heart').should("exist")
    .get('.art-title').should("contain", "Portrait of a Man")
    .get('.selected-art-info').find('.overview').should('contain', 'Artist: DEVIN, He got hitched at a castle')
    .should('contain', 'Medium: Oil on alder')
    .should('contain', 'Dimensions: 22 x 16 3/4 in. (55.9 x 42.5 cm)')
    .should('contain', 'Credit Line: The Friedsam Collection, Bequest of Michael Friedsam, 1931')
    .should('contain', 'Accession Number: 32.100.61')

    .get('h1').contains("THE MET").click()
    .get('.gallery').children().should("have.length", 3)
    .url().should('eq', 'http://localhost:3000/');
  })

  it("should return to homepage after clicking artwork and viewing details", () => {
    cy.get('.gallery .art-card').first()
    .click()
    .url().should('eq', 'http://localhost:3000/art/436044').get('.back-btn').should("exist")
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

  it('should visit a bad URL, display error page, and return home', () => {
    cy.intercept(
      "GET",
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/fakeURL",
      {
        statusCode: 404,
        body: ""
      }
    );

    cy.visit('http://localhost:3000/art/fakeURL')
    .url().should('eq', 'http://localhost:3000/art/fakeURL')
    .get('.error-image').should("exist")
    .get('.serverError > p').contains("Oh no! Sorry, that art piece doesn't exist.")
    .get('.return-button').click()
    .visit("http://localhost:3000/")
    .url().should('eq', 'http://localhost:3000/')
  })
})

