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

describe("integer square root validation", function() {
    this.timeout(100000);

    let circuit;

    before(async () => {
        circuit = await wasm_tester(path.join(__dirname, "../IntSqrt/", "IntSqrt.circom"));
        await circuit.loadConstraints();
    });

    it("Should accept [2, 4]", async () => {

        await expect(circuit.calculateWitness({
            "in": [2, 4]
        }, true)).to.not.eventually.be.rejected;
    });

    it("Should accept [2, 5]", async () => {

        await expect(circuit.calculateWitness({
            "in": [2, 5]
        }, true)).to.not.eventually.be.rejected;
    });

    it("Should reject [2, 9]", async () => {

        await expect(circuit.calculateWitness({
            "in": [2, 9]
        }, true)).to.eventually.be.rejected;
    });
});
