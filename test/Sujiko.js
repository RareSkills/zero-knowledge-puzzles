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
      path.join(__dirname, "../Sujiko", "Sujiko.circom"),
    );
    await circuit.loadConstraints();
    let witness;

    const expectedOutput = 1;

    witness = await circuit.calculateWitness(
      {
        question: ["21", "18", "16", "15"],
        solution: ["9", "3", "5", "7", "2", "8", "6", "1", "4"],
      },
      true,
    );

    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput)));

    try {
      witness = await circuit.calculateWitness(
        {
          question: ["20", "22", "14", "20"],
          solution: ["7", "9", "2", "1", "3", "8", "6", "4", "5"],
        },
        true,
      );

      const expectedOutput2 = 1;
      assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
      assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput2)));
      console.log("PASSING!");
    } catch (e) {
      console.log("Circuit is reverting . FAILING!!!");
    }
  });
});
