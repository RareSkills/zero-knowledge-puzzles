pragma circom 2.1.4;

include "../node_modules/circomlib/circuits/comparators.circom";

// Create a 3 x 3 Sujiko Verifier circuit 
// https://en.wikipedia.org/wiki/Sujiko

/// Question will be in the form of  
/// q[0]  q[1]
/// q[2]  q[3]

/// solution will be in the form of 
/// s[0]  s[1]  s[2]
/// s[3]  s[4]  s[5]
/// s[6]  s[7]  s[8]

template Sujiko () {

  signal input solution[9];
  signal input question[4];
  signal output out;

  // Your Code here ..

}

component main { public [ question ] } = Sujiko();

