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

  question[0] === solution[0] + solution[1] + solution[3] +solution[4];
  question[1] === solution[1] + solution[2] + solution[4] + solution[5];
  question[2] === solution[3] + solution[4] + solution[6] + solution[7];
  question[3] === solution[4] + solution[5] + solution[7] + solution[8];

    component s[81];
    var iter=0;
  for(var i = 1 ; i < 10; i++){
      for(var z = 0; z < 9 ; z++){
          s[iter] = IsEqual();
          s[iter].in[0] <== i;
          s[iter].in[1] <== solution[z];
          iter++;
      }
      1 === s[iter-9].out + s[iter-8].out + s[iter-7].out + s[iter -6].out + s[iter -5].out + s[iter -4].out + s[iter-3].out + s[iter -2].out + s[iter -1 ].out ;
  }

    for(var i =0 ; i < 9; i++){
        assert(solution[i] > 0 && solution[i] < 10);
    }

    out <== 1;

}

component main { public [ question ] } = Sujiko();


