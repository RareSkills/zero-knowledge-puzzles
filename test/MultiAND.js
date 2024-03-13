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

describe("MultiAND -- All elements are one", function() {
    this.timeout(100000);

    let circuit;

    before(async () => {
        circuit = await wasm_tester(path.join(__dirname, "../MultiAND/", "MultiAND.circom"));
        await circuit.loadConstraints();
    });

    it("Should return true if all elements are 1", async () => {
        // const circuit = await wasm_tester(path.join(__dirname,"../HasOne/","HasOne.circom"));
        // await circuit.loadConstraints();

        let witness = await circuit.calculateWitness({
            "in": [1, 1, 1, 1]
        }, true);
        let out = witness[1];
        expect(Fr.eq(Fr.e(out), Fr.e(1))).to.be.true;
    });

    it("Should return false if there is a zero element", async () => {
        let witness = await circuit.calculateWitness({
            "in": [1, 1, 0, 1]
        }, true);
        let out = witness[1];
        //expect(Fr.eq(Fr.e(out), Fr.e(0))).to.be.true;

        witness = await circuit.calculateWitness({
            "in": [0, 1, 1, 1]
        }, true);
        out = witness[1];
        expect(Fr.eq(Fr.e(out), Fr.e(0))).to.be.true;
    });

    it("Should reject inputs that contain non binary elements", async () => {
        await expect(circuit.calculateWitness({
            "in": [1, 2, 0, 0]
        }, true)).to.eventually.be.rejected;
        await expect(circuit.calculateWitness({
            "in": [1, 2, 0, 1000]
        }, true)).to.eventually.be.rejected;
    });
});
