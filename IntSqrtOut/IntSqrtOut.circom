pragma circom 2.1.8;
include "../node_modules/circomlib/circuits/comparators.circom";

// Be sure to solve IntSqrt before solving this 
// puzzle. Your goal is to compute the square root
// in the provided function, then constrain the answer
// to be true using your work from the previous puzzle.
// You can use the Bablyonian/Heron's or Newton's
// method to compute the integer square root. Remember,
// this is not the modular square root.


function intSqrtFloor(x) {
    // compute the floor of the
    // integer square root
}

template IntSqrtOut(n) {
    signal input in;
    signal output out;

    out <-- intSqrtFloor(x);
    // constrain out using your
    // work from IntSqrt
}

component main = IntSqrtOut(252);
