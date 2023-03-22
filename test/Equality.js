const chai = require('chai');
const { wasm } = require('circom_tester');
const path = require("path");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const wasm_tester = require("circom_tester").wasm;

const assert = chai.assert;

describe("Equality Test ", function (){
    this.timeout(100000);

    it("Check Equality", async()=>{
        const circuit = await wasm_tester(path.join(__dirname,"../Equality","Equality.circom"));
        await circuit.loadConstraints();
        let witness ; 
        // 2 == 2 && 2 == 2 
        const expectedOutput = 1;
        
        witness = await circuit.calculateWitness({"a":[2,2,2]},true);
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput)));

        witness = await circuit.calculateWitness({"a":[1,0,1]},true);
        let expectedOutput2 = 0;
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput2)));

    
    })
})