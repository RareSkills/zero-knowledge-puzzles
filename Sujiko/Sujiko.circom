pragma circom 2.1.4;

include "../node_modules/circomlib/circuits/comparators.circom";

// Based on this -->   https://en.wikipedia.org/wiki/Sujiko
// 
template Sujiko () {
  signal input solution[9];
  signal input question[4];
  signal output out ;

   
}

component main { public [ question ] } = Sujiko();

