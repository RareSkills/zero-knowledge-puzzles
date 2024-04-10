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

describe("FourBitBinary", function() {
    this.timeout(100000);

    let circuit;

    before(async () => {
        circuit = await wasm_tester(path.join(__dirname, "../FourBitBinary/", "FourBitBinary.circom"));
        await circuit.loadConstraints();
    });

    it("Should not revert for [0,0,0,0] 0", async () => {
        await expect(circuit.calculateWitness({
            "in": [0, 0, 0, 0],
            "n": 0
        }, true)).not.to.eventually.be.rejected;
    });

    it("Should not revert for [1,0,0,0] 8", async () => {
        await expect(circuit.calculateWitness({
            "in": [0, 0, 0, 0],
            "n": 0
        }, true)).not.to.eventually.be.rejected;
    });
  
    it("Should not revert for [1,0,1,0] 10", async () => {
        await expect(circuit.calculateWitness({
            "in": [0, 0, 0, 0],
            "n": 0
        }, true)).not.to.eventually.be.rejected;
    });

    it("Should revert for [0,2,0,0] 4", async () => {
        await expect(circuit.calculateWitness({
            "in": [0, 2, 0, 0],
            "n": 4
        }, true)).to.eventually.be.rejected;
    });

    it("Should revert for [0,2,0,0] 4", async () => {
        await expect(circuit.calculateWitness({
            "in": [0, 2, 0, 0],
            "n": 4
        }, true)).to.eventually.be.rejected;
    });

    it("Should revert for [0,1,0,0] 7", async () => {
        await expect(circuit.calculateWitness({
            "in": [0, 1, 0, 0],
            "n": 7
        }, true)).to.eventually.be.rejected;
    });
});