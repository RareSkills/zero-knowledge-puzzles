const chai = require('chai');
const { wasm } = require('circom_tester');
const path = require("path");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);
const chaiAsPromised = require("chai-as-promised");
const wasm_tester = require("circom_tester").wasm;

chai.use(chaiAsPromised);
const expect = chai.expect;


describe("Tribonacci Test", function (){
    this.timeout(100000);

    it("should test if tribonacci is correct", async() => {
        const circuit = await wasm_tester(path.join(__dirname,"../IsTribonacci/","IsTribonacci.circom"));
        await circuit.loadConstraints();
        
        const correct = [0, 1, 1, 2, 4, 7, 13, 24, 44];
        const wrong1 = [0, 0, 1, 2, 4, 7, 13, 24, 44];
        const wrong2 = [0, 1, 2, 2, 4, 7, 13, 24, 44];
        const wrong3 = [0, 1, 2, 2, 4, 7, 13, 25, 44];
        expect(await circuit.calculateWitness({"in":correct}, true)).to.be.ok;

        await expect(circuit.calculateWitness({"in": wrong1}, true)).to.be.eventually.rejected;
        await expect(circuit.calculateWitness({"in": wrong2}, true)).to.be.eventually.rejected;
        await expect(circuit.calculateWitness({"in": wrong3}, true)).to.be.eventually.rejected;
    })
})
