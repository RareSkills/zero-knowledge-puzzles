const chai = require('chai');
const {
    wasm
} = require('circom_tester');
const path = require("path");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);
const chaiAsPromised = require("chai-as-promised");
const wasm_tester = require("circom_tester").wasm;

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("MultiANDNoOut -- All elements are one", function() {
    this.timeout(100000);

    let circuit;

    before(async () => {
        circuit = await wasm_tester(path.join(__dirname, "../MultiANDNoOut/", "MultiANDNoOut.circom"));
        await circuit.loadConstraints();
    });

    it("Should not be satisfied if there is a 0", async () => {
        await expect(circuit.calculateWitness({
            "in": [1, 1, 1, 0]
        }, true)).to.eventually.be.rejected;
    });

    it("Should not be satisfied if there is a 2", async () => {
        await expect(circuit.calculateWitness({
            "in": [1, 2, 1, 1]
        }, true)).to.eventually.be.rejected;
    });

    it("Should be satisfied if all are 1", async () => {
        await expect(circuit.calculateWitness({
            "in": [1, 1, 1, 1]
        }, true)).to.eventually.not.be.rejected;
    });
});
