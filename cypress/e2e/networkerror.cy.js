describe("website navigation", () => {
  it("should display error page when there is a server side error", () => {
     cy.intercept(
      "GET",
      "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11",
      {
        statusCode: 200,
        body: {
          "total": 1,
          "objectIDs": [
            436049
          ]
        }
      }
    );

    cy.intercept(
      
      "GET",
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/436049",
      {
        statusCode: 404,
        fixture: "object-436049",
      }
    ).as("getObject-436049");
    cy.visit("http://localhost:3000");

    cy.get('.error-image').should("exist")
    .get('.serverError > p').contains("Oh no! 404 Not Found. Something went wrong with getting object details.")
    .get('.return-button').should("exist")
  })
})
