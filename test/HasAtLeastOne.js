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

describe("HasAtLeastOne -- returns true if the element is in the list", function() {
    this.timeout(100000);

    let circuit;

    before(async () => {
        circuit = await wasm_tester(path.join(__dirname, "../HasAtLeastOne/", "HasAtLeastOne.circom"));
        await circuit.loadConstraints();
    });

    it("Should return 1 if at least one element is 1", async () => {
        let witness = await circuit.calculateWitness({
            "in": [1, 1, 1, 1],
            "k": 1
        }, true);
        let out = witness[1];
        expect(Fr.eq(Fr.e(out), Fr.e(1))).to.be.true;

        witness = await circuit.calculateWitness({
            "in": [0, 0, 151515, 0],
            "k": 151515
        }, true);
        out = witness[1];
        expect(Fr.eq(Fr.e(out), Fr.e(1))).to.be.true;
    });

    it("Should return 0 if the element is not in the list", async () => {
        let witness = await circuit.calculateWitness({
            "in": [1, 2, 3, 4],
            "k": 0
        }, true);
        let out = witness[1];
        expect(Fr.eq(Fr.e(out), Fr.e(0))).to.be.true;

        witness = await circuit.calculateWitness({
            "in": [2, 2, 3, 400],
            "k": 1
        }, true);
        out = witness[1];
        expect(Fr.eq(Fr.e(out), Fr.e(0))).to.be.true;
    });
});
