pragma circom 2.1.4;

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