describe("Compare and update URLs", () => {
  let previousUrls = [];

  before(() => {
    // Load previous run data if it exists, parsing it from the environment variable set in the GitHub Actions workflow
    const prevRunJsonPath = Cypress.env("PREV_RUN_JSON");
    if (prevRunJsonPath) {
      cy.task("readFileMaybe", prevRunJsonPath).then((data) => {
        if (data) {
          previousUrls = data;
        }
      });
    }
    cy.visit("/content/current"); // Replace with the URL of the page you want to test
  });

  it("Checks and updates URLs", () => {
    cy.get(".toc-item a").then(($anchors) => {
      const newUrls = $anchors.map((i, el) => el.href).get();
      const urlsToTest = newUrls.filter((url) => !previousUrls.includes(url));

      if (!urlsToTest.length) {
        cy.log("No new URLs found to test");
        cy.task("log", "No new URLs found to test");
        return;
      }
      // Perform tests for the URLs present in the new list and not in the previousRun
      urlsToTest.forEach((url) => {
        cy.visit(url);
        cy.get("h1#article-title-1").should("be.visible");
      });

      // If all tests pass, update previousRun.json
      cy.writeFile(Cypress.env("PREV_RUN_JSON"), newUrls);
    });
  });
});
