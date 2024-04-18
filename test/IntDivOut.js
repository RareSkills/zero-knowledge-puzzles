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

describe("integer division with `out`", function() {
    this.timeout(100000);

    let circuit;

    before(async () => {
        circuit = await wasm_tester(path.join(__dirname, "../IntDivOut/", "IntDivOut.circom"));
        await circuit.loadConstraints();
    });

    it("given 10 / 5 returns 2", async () => {

        let witness = await circuit.calculateWitness({
            "numerator": 10,
            "denominator": 2
        }, true);

        let out = witness[1];
        expect(Fr.eq(Fr.e(out), Fr.e(5))).to.be.true;
    });

    it("given 11 / 2 returns 5", async () => {
        let witness = await circuit.calculateWitness({
            "numerator": 11,
            "denominator": 2
        }, true);

        let out = witness[1];
        expect(Fr.eq(Fr.e(out), Fr.e(5))).to.be.true;
    });

    it("rejects division by zero", async () => {
        await expect(circuit.calculateWitness({
            "numerator": 0,
            "denominator": 0
        }, true)).to.eventually.be.rejected;
    });
});
