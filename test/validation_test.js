const should = require("should");
const inputValidation = require("../src/validation");

describe("Test input ASADB", () => {
  it("input ASADB should return : false", done => {
    inputValidation("ASADB").should.be.exactly(false);
    done();
  });
});

describe("Test input ABCCED", () => {
  it("input ABCCED should return : true", done => {
    inputValidation("ABCCED").should.be.exactly(true);
    done();
  });
});

describe("Test input ABCF", () => {
  it("input ABCF should return : false", done => {
    inputValidation("ABCF").should.be.exactly(false);
    done();
  });
});

describe("Test input ASDF", () => {
  it("input ASDF should return : false", done => {
    inputValidation("ASDF").should.be.exactly(false);
    done();
  });
});
