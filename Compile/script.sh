cd Compile

echo "Compiling Mul.circom..."

circom Mul.circom --r1cs --wasm --sym -o .

snarkjs r1cs info Mul.r1cs

snarkjs groth16 setup Mul.r1cs powersOfTau28_hez_final_10.ptau circuit_0000.zkey
snarkjs zkey contribute circuit_0000.zkey circuit_final.zkey --name="Nova" -v -e="random dfd"
snarkjs zkey export verificationkey circuit_final.zkey verification_key.json

snarkjs zkey export solidityverifier circuit_final.zkey ../contracts/verifier.sol

cd ..
