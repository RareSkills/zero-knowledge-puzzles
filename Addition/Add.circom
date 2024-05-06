pragma circom 2.1.4;

template Add() {
    signal input in[3];

    in[0] === in[1] + in[2];
}

component main  = Add();
