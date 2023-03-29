pragma circom 2.1.4;

// Sample walkthrough on How to compile a circuit to r1cs and generate a solidity file to verify proofs
// on chain . 
// Checkout the scripts.sh file for more information..

template Mul() {

    signal input a ;
    signal input b ;

    signal output c ;

    c <== a * b ;
}

component main {public [a]} = Mul();

/* INPUT ={
    "a":32,
    "b":2
} */