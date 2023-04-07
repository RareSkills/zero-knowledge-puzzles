const chai = require("chai");
const { wasm } = require("circom_tester");
const path = require("path");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617",
);
const Fr = new F1Field(exports.p);

const wasm_tester = require("circom_tester").wasm;

const assert = chai.assert;

describe("Sudoku Tester ", function () {
  this.timeout(100000);

  it("Should create a Sudoku circuit", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "../Sudoku", "Sudoku.circom"),
    );
    await circuit.loadConstraints();
    let witness;

    const expectedOutput = 1;

    witness = await circuit.calculateWitness(
      {
        question: [ "1","0","0","0","0","2","0","0","0","0","2","0","0","0","0","1", ],
        solution: [ "1","4","3","2","3","2","1","4","4","1","2","3","2","3","4","1", ],
      },
      true,
    );

    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput)));

    witness = await circuit.calculateWitness(
      {
        question: [ "2","0","0","0","0","3","0","0","0","0","3","0","3","0","0","0", ],
        solution: [ "2","1","4","3","4","3","2","1","1","2","3","4","3","4","1","2", ],
      },
      true,
    );

    const expectedOutput2 = 1;
    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput2)));

    witness = await circuit.calculateWitness(
      {
        question: [ "2","0","0","0","0","3","0","0","0","0","3","0","3","0","0","0", ],
        solution: [ "2","1","4","3","4","3","2","1","1","2","3","4","3","2","1","4", ],
      },
      true,
    );

    const expectedOutput3 = 0;
    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput3)));
  });
});
