const chai = require('chai');
const { wasm } = require('circom_tester');
const path = require("path");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const wasm_tester = require("circom_tester").wasm;

const assert = chai.assert;

describe(" mimcSponge  ", function (){
    this.timeout(100000);

    it("Should Hash the input using mimcsponge with a secret salt", async()=>{
        const circuit = await wasm_tester(path.join(__dirname,"../Salt","Salt.circom"));
        await circuit.loadConstraints();
        let witness ; 
        
        const expectedOutput = 9298463176047380197626371459244539548819181814394649924288766436865924479390n;
        
        witness = await circuit.calculateWitness({"a":"4","b":"4","salt":"2"},true);

        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput)));

        witness = await circuit.calculateWitness({"a":"45","b":"1001","salt":"0099"},true);
        
        const expectedOutput2 = 17165551905088735098668729485755579194569447435279436338955576584338338632036n;
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput2)));
    
    })
})
