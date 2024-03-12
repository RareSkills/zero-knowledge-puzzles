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


describe("Add Test ", function (){
    this.timeout(100000);

    it("Should test if everything is binary (0 or 1)", async() => {
        const circuit = await wasm_tester(path.join(__dirname,"../AllBinary/","AllBinary.circom"));
        await circuit.loadConstraints();
        
        expect(circuit.constraints.length >= 4, "underconstrained circuit");
        let witness = await circuit.calculateWitness({"in":[1,1,1,1]},true);
        console.log(witness)
        expect(witness.length).to.be.at.least(5);

        expect(await circuit.calculateWitness({"in":[0,0,0,0]}, true)).to.be.ok;
        expect(await circuit.calculateWitness({"in":[1,0,1,0]}, true)).to.be.ok;

        await expect(circuit.calculateWitness({"in": [1,2,1,1]}, true)).to.be.eventually.rejected;
        await expect(circuit.calculateWitness({"in": [1,0,1,-1]}, true)).to.be.eventually.rejected;
    })
})
