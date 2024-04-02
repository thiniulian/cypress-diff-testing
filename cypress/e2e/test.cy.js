describe("cypress-diff-testing", () => {
  const data = [];
  before(() => {
    console.log(process.env.PREV_RUN_JSON);

    if (process.env.PREV_RUN_JSON) {
      cy.fixture(process.env.PREV_RUN_JSON).then((d) => {
        data = JSON.parse(d);
      });
    }
  });

  it("produces a new file", () => {
    const newList = ["https://google.com"];
    cy.writeFile("./prev-run.json", JSON.stringify(newList));
  });
});
