const chai = require('chai');
const { wasm } = require('circom_tester');
const path = require("path");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const wasm_tester = require("circom_tester").wasm;

const assert = chai.assert;

describe("ForLoop Test ", function (){
    this.timeout(100000);

    it("Should create a For Loop circuit", async()=>{
        const circuit = await wasm_tester(path.join(__dirname,"../ForLoop","ForLoop.circom"));
        await circuit.loadConstraints();
        let witness ; 
        // (3+4 )* 4 
        const expectedOutput = 28;
        
        witness = await circuit.calculateWitness({"a":[3,4]},true);
        
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput)));

        witness = await circuit.calculateWitness({"a":[3,7]},true);
        // 3 +7 = 10 * 4 = 40
        const expectedOutput2 = 40;
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput2)));
    
    })
})