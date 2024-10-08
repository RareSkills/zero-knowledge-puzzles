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
        
        const expectedOutput = 17588055722251891539725204770637639669261029749544372363945149066696774180511n;
        
        witness = await circuit.calculateWitness({"a":"4","b":"4","salt":"2"},true);

        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput)));

        witness = await circuit.calculateWitness({"a":"45","b":"1001","salt":"0099"},true);
        
        const expectedOutput2 = 21789734462778371607222800966534358127947886088940268109596186508023018029595n;
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(expectedOutput2)));
    
    })
})
