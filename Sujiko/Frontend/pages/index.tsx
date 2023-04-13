import styles from "@/styles/Home.module.css";
import { useState,Dispatch, SetStateAction,useEffect  } from "react";
import Footers from "./footer";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {VerifyProof} from "../proofs/Verify.js";
import {Button } from "@chakra-ui/react";
import { useContract,useSigner } from 'wagmi';
import abi from "../proofs/verifier.json";
import { writeContract,prepareWriteContract } from '@wagmi/core'
const {ethers} = require('ethers');
interface SquareProps {
  val:number[]
  setval: (val:number[]) => void  //Dispatch<SetStateAction<number[]>>
  index:number
  size: number;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}

const Square = ({val,setval,index, size, selected, setSelected }: SquareProps) => {
 
  
  const handleChange = (e:number, index:number) => {
    var updatedValues = [...val];
    updatedValues[index ] = e;
    setval(updatedValues);
    console.log("updated array",updatedValues);
  };

  
  const style = {
    width: size,
    height: size,
    backgroundColor: selected ? "#9e83c4" : "#843c91",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "1.5rem",
    border: "1px solid black",
    borderRadius: "10px",
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const numberKeyCodes = new Set([
      "Digit1",
      "Digit2",
      "Digit3",
      "Digit4",
      "Digit5",
      "Digit6",
      "Digit7",
      "Digit8",
      "Digit9",
    ]);
    console.log(numberKeyCodes);
    if (event.key === "0" || event.key === "Backspace") {
      console.log("backspace");
      console.log("index",index);
      // Set the value to undefined if the user pressed 0
      handleChange(0,index);
    } else if (numberKeyCodes.has(event.code)) {
      console.log("index",index);
      const newNumber = parseInt(event.key);
      console.log("newNumber",newNumber);
      
      handleChange(newNumber,index);
      if (!isNaN(newNumber)) {
      }
    }
  };

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <div
      style={style}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      tabIndex={0}
    >
      {val[index]}
      </div>

  );
};

export default function Home() {
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [val,setval]  =useState(Array<number>(9).fill(0));
  const [ques, setques]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>([]);
  console.log("abi",abi);
  const signer = useSigner();
  
  const question1:[string,string,string,string] = ["20","22","14","20"];
  const question2:[string,string,string,string] = ["21","15","29","19"]; // 2,4,3,8,7,1,9,5,6
  const question3:[string,string,string,string] = ["25","27","19","21"];
  const question4:[string,string,string,string] = ["22","15","30","18"];
  const question5:[string,string,string,string] = ["19","17","21","22"];
  const question6:[string,string,string,string] = ["21","19","26","24"];
  const questions:[string,string,string,string][] = [question1, question2 , question3,question4,question5,question6];
  
  useEffect(() => {
    const load = async() =>{
    const randomIndex = Math.floor(Math.random() * questions.length);
    setques(questions[randomIndex]);
    console.log("ques",ques);
    }
  load();
},[]);

  const handleSquareClick = (index: number) => {
    if (selectedSquare === index) {
      // If the clicked square is already selected, deselect it
      setSelectedSquare(null);
      console.log("deselect ",index,"square");
    } else {
      console.log("select ",index,"square");
      // Otherwise, select the clicked square and deselect the previously selected square (if any)
      setSelectedSquare(index);
    }
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 50px)",
    gridTemplateRows: "repeat(3, 50px)",
    gap: "13px",
    padding: "8px",
  };

  return (
    <div>
    <ConnectButton />
    <div className={styles.container}>
      {/*  This section is hard coded :)*/}
      <div className={styles.redbox} >{ques[0]}</div>
      <div className={styles.redbox1}>{ques[2]}</div>
      <div className={styles.redbox2}>{ques[1]}</div>
      <div className={styles.redbox3}>{ques[3]}</div>
      <div style={gridStyle}>
        <Square
          val = {val}
          setval = {setval}
          key={0}
          index = {0}
          size={50}
          selected={selectedSquare === 0}
          setSelected={() => handleSquareClick(0)}
        />
        <Square
        val = {val}
        setval = {setval}
          key={1}
          index = {1}
          size={50}
          selected={selectedSquare === 1}
          setSelected={() => handleSquareClick(1)}
        />
        <Square
          val = {val}
          setval = {setval}
          key={2}
          index = {2}
          size={50}
          selected={selectedSquare === 2}
          setSelected={() => handleSquareClick(2)}
        />
        <Square
          val = {val}
          setval = {setval}
          key={3}
          index= {3}
          size={50}
          selected={selectedSquare === 3}
          setSelected={() => handleSquareClick(3)}
        />
        <Square
          val = {val}
          setval = {setval}
          key={4}
          index = {4}
          size={50}
          selected={selectedSquare === 4}
          setSelected={() => handleSquareClick(4)}
        />
        <Square
          val = {val}
          setval = {setval}
          key={5}
          index = {5}
          size={50}
          selected={selectedSquare === 5}
          setSelected={() => handleSquareClick(5)}
        />
        <Square
          val = {val}
          setval = {setval}
          key={6}
          index = {6}
          size={50}
          selected={selectedSquare === 6}
          setSelected={() => handleSquareClick(6)}
        />
        <Square
          val = {val}
          setval = {setval}
          key={7}
          index = {7}
          size={50}
          selected={selectedSquare === 7}
          setSelected={() => handleSquareClick(7)}
        />
        <Square
          val = {val}
          setval = {setval}
          key={8}
          index = {8}
          size={50}
          selected={selectedSquare === 8}
          setSelected={() => handleSquareClick(8)}
        />
        <Button
          placeholder="Verify Proof"
          onClick={async () => {
          // Install chakrra ui for button 
            // let q:[string,string,string,string] = ques.slice(0, 4);
            // console.log("question",q);
            console.log("quesfinal",ques);
            const answer = val.map(v => v.toString());
            console.log("answer",answer);
            try{    
              let z = await VerifyProof(ques, answer);
              
              const config = await prepareWriteContract({
                address: '0x2d5c4f71b36a89594373da263b211f036b9cce70',
                abi: abi.abi,
                functionName: 'verifyProof',
                args:[z[0],z[1],z[2],z[3]]
              });
              const contract = new ethers.Contract(config.address, config.abi, signer.data);
              const res  = await contract.verifyProof(z[0],z[1],z[2],z[3]);
              console.log("res",res);           
              if(res){
                window.alert("correct solution");
              }
            }catch(e){
              window.alert("wrong solution");
              console.log("Errro",e);
            }
          }}
        >
          Verify
        </Button>
      </div>
    </div>
    <Footers />
    </div>
  );
}
