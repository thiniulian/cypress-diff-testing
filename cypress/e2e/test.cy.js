describe("cypress-diff-testing", () => {
  const data = [];
  before(() => {
    if (Cypress.env("PREV_RUN_JSON")) {
      cy.task("readFileMaybe", Cypress.env("PREV_RUN_JSON")).then(
        (fileContent) => {
          if (fileContent) {
            data = JSON.parse(fileContent);
          }
        }
      );
    }
  });

  it("produces a new file", () => {
    const newList = ["https://google.com"];
    cy.writeFile(Cypress.env("PREV_RUN_JSON"), JSON.stringify(newList));
  });
});
