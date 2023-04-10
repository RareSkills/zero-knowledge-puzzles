import {groth16calldata} from "./proof.js";

export async function VerifyProof(question,solution) {

    const INPUT = {
        "question":question,"solution":solution
    }

    let res = await groth16calldata(INPUT,"/Sujiko.wasm","/Sujiko_0001.zkey");
    console.log(res);
    return res;
}