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

describe("integer division", function() {
    this.timeout(100000);

    let circuit;

    before(async () => {
        circuit = await wasm_tester(path.join(__dirname, "../IntDiv/", "IntDiv.circom"));
        await circuit.loadConstraints();
    });

    it("Should accept [10 / 2  = 5 remainder 0]", async () => {

        await expect(circuit.calculateWitness({
            "numerator": 10,
            "denominator": 2,
            "quotient": 5,
            "remainder": 0
        }, true)).to.not.eventually.be.rejected;
    });

    it("Should accept [11 / 2] = 5 remainder 1", async () => {
        await expect(circuit.calculateWitness({
            "numerator": 11,
            "denominator": 2,
            "quotient": 5,
            "remainder": 1
        }, true)).to.not.eventually.be.rejected;
    });

    it("Should reject [11 / 2] = 4 remainder 3", async () => {
        await expect(circuit.calculateWitness({
            "numerator": 11,
            "denominator": 2,
            "quotient": 4,
            "remainder": 3
        }, true)).to.eventually.be.rejected;
    });

    it("Should division by zero", async () => {
        await expect(circuit.calculateWitness({
            "numerator": 0,
            "denominator": 0,
            "quotient": 0,
            "remainder": 0
        }, true)).to.eventually.be.rejected;
    });
});
