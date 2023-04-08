import {groth16calldata} from "./proof.js";

export async function VerifyProof(question,solution) {


    const INPUT = {
        "question":[
            "20","22","14","20"
        ],"solution":[
           "7","9","2","1","3","8","6","4","5"
        ]
    }

    let res = await groth16calldata(INPUT,"/Sujiko.wasm","/Sujiko_0001.zkey");
    console.log(res);
}