pragma circom 2.1.4;

include "../node_modules/circomlib/circuits/comparators.circom";

// Create a Quadratic Equation( ax^2 + bx + c ) verifier using the below data. 
template QuadraticEquations() {

    signal input x;  // x value
    signal input acoeffecient;// coeffecient of x^2
    signal input bcoeffecient;// coeffecient of x 
    signal input constant; // constant c in equation
    signal input res; // Expected result of the equation
    signal output out;// If res is correct , then return 1 , else 0 . 

}

component main  = QuadraticEquations();



