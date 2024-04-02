describe("cypress-diff-testing", () => {
  const data = [];
  before(() => {
    if (Cypress.env("PREV_RUN_JSON")) {
      cy.fixture(Cypress.env("PREV_RUN_JSON"))
        .then((d) => {
          data = JSON.parse(d);
        })
        .catch((err) => {
          cy.task("log", "File is not present yet");
        });
    }
  });

  it("produces a new file", () => {
    const newList = ["https://google.com"];
    cy.writeFile(Cypress.env("PREV_RUN_JSON"), JSON.stringify(newList));
  });
});
