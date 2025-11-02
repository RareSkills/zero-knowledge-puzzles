const chai = require('chai');
const { wasm } = require('circom_tester');
const path = require("path");
const fs = require("fs");
const {groth16} = require("snarkjs");
const {ethers} = require("hardhat");
const {expect} = require("chai");


function unstringifyBigInts(o) {
    if ((typeof (o) == "string") && (/^[0-9]+$/.test(o))) {
        return BigInt(o);
    } else if ((typeof (o) == "string") && (/^0x[0-9a-fA-F]+$/.test(o))) {
        return BigInt(o);
    } else if (Array.isArray(o)) {
        return o.map(unstringifyBigInts);
    } else if (typeof o == "object") {
        if (o === null) return null;
        const res = {};
        const keys = Object.keys(o);
        keys.forEach((k) => {
            res[k] = unstringifyBigInts(o[k]);
        });
        return res;
    } else {
        return o;
    }
}

describe("Should verify correctly  ", function (){
    this.timeout(100000);

    it("Should compile the circuit and generate the proofs and verify them ", async()=> {

        const verifier = await ethers.getContractFactory("Groth16Verifier");
        const verifierContract = await verifier.deploy();
        await verifierContract.deployed();
        const { proof, publicSignals } = await groth16.fullProve(
            { "a": "23", "b": "2" }, 
            path.join(__dirname,"../Compile","Mul_js/Mul.wasm"), 
            path.join(__dirname,"../Compile","Mul_0001.zkey"));
           
        const editedPublicSignal = unstringifyBigInts(publicSignals);

        const editedProof = unstringifyBigInts(proof);

        const calldata = await groth16.exportSolidityCallData(editedProof,editedPublicSignal);


        const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());

        const a = [argv[0], argv[1]];
        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
        const c = [argv[6], argv[7]];
        const input = argv.slice(8);

        const check = await verifierContract.verifyProof(a,b,c,input);
        expect(check).to.be.true;
    })
})

