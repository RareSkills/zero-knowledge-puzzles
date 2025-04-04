pragma circom 2.1.8;

// Create constraints that enforces all signals
// in `in` are binary, i.e. 0 or 1.

template IsTribonacci(n) {
    signal input in[n];
    assert (n >= 3);

    // check if in[n] is a tribonacci sequence
    // 0, 1, 1, 2, 4, 7, 13, 24, 44, ...
    // The three first are 0, 1, 1,
    // the rest are the sum of the previous three
    // circuit must work for arbitrary n

}

component main = IsTribonacci(9);