const chai = require('chai');
const { wasm } = require('circom_tester');
const path = require("path");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);
var chaiAsPromised = require("chai-as-promised");
const wasm_tester = require("circom_tester").wasm;


chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Add Test ", function (){
    this.timeout(100000);

    it("Should validate a multiplication", async()=>{
        const circuit = await wasm_tester(path.join(__dirname,"../MultiplyNoOutput/","MultiplyNoOutput.circom"));
        await circuit.loadConstraints();

        let witness = await circuit.calculateWitness({"in":[4,5,20]},true);
        expect(witness.length).to.equal(4);

        await expect(circuit.calculateWitness({"in": [4,5,21]}, true)).to.be.eventually.rejected;
    });
});
