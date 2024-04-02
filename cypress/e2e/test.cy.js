describe("cypress-diff-testing", () => {
  const data = [];
  before(() => {
    cy.task("log", JSON.stringify(process.env, null, 2));
    if (process.env.CYPRESS_PREV_RUN_JSON) {
      cy.fixture(process.env.CYPRESS_PREV_RUN_JSON).then((d) => {
        data = JSON.parse(d);
      });
    }
  });

  it("produces a new file", () => {
    const newList = ["https://google.com"];
    cy.writeFile(process.env.CYPRESS_PREV_RUN_JSON, JSON.stringify(newList));
  });
});
