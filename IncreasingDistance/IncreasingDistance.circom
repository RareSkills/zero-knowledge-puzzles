pragma circom 2.1.8;

// Create a circuit that takes an array of signals
// in1[n], in2[n], in3[n] and enforces that
// in1[0] * in2[0] === in3[0]
// in1[1] * in2[1] === in3[1] + 1
// in1[2] * in2[2] === in3[2] + 2
// ...
// in1[n-1] * in2[n-1] === in3[n-1] + n-1
template IncreasingDistance(n) {
    signal input in1[n];
    signal input in2[n];
    signal input in3[n];

}

component main = IncreasingDistance(4);
