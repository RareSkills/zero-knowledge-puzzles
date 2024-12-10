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

describe("increasing distance", function() {
    this.timeout(100000);

    let circuit;

    before(async () => {
        circuit = await wasm_tester(path.join(__dirname, "../IncreasingDistance/", "IncreasingDistance.circom"));
        await circuit.loadConstraints();
    });

    it("test case 1", async () => {
        await expect(circuit.calculateWitness({
            "in1": [1, 1, 1, 1],
            "in2": [1, 1, 1, 1],
            "in2": [1, 2, 3, 4]
        }, true)).to.eventually.not.be.rejected;
    });

    it("test case 2", async () => {
        await expect(circuit.calculateWitness({
            "in1": [2, 2, 2, 2],
            "in2": [3, 3, 3, 3],
            "in2": [6, 7, 8, 9]
        }, true)).to.eventually.not.be.rejected;
    });

    it("test case 3", async () => {
        await expect(circuit.calculateWitness({
            "in1": [2, 2, 2, 2],
            "in2": [3, 3, 3, 4],
            "in2": [6, 7, 8, 11]
        }, true)).to.eventually.not.be.rejected;
    });

    it("test case 4", async () => {
        await expect(circuit.calculateWitness({
            "in1": [2, 2, 2, 2],
            "in2": [3, 3, 3, 4],
            "in2": [6, 7, 8, 10]
        }, true)).to.eventually.be.rejected;
    });

    it("test case 5", async () => {
        await expect(circuit.calculateWitness({
            "in1": [2, 2, 2, 2],
            "in2": [3, 3, 3, 4],
            "in2": [5, 7, 8, 11]
        }, true)).to.eventually.be.rejected;
    });

});
