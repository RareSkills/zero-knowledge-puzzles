import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Footers from "./footer";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {VerifyProof} from "../proofs/Verify.js";
import {Button } from "@chakra-ui/react";
interface SquareProps {
  index:number
  size: number;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}

const Square = ({index, size, selected, setSelected }: SquareProps) => {
  const [value, setValue] =useState(Array(9).fill(0));
  console.log("value",value);

  const handleChange = (e:number, index:number) => {
    console.log("value",e,"index",index);
    const updatedValues = [...value];
    // console.log("updatedValues",updatedValues);
    updatedValues[index ] = e;
    // console.log("updatedValues",updatedValues);
    setValue(updatedValues);
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
      {value[index]}
    </div>
  );
};

export default function Home() {
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);

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
      <div className={styles.redbox} >5</div>
      <div className={styles.redbox1}>4</div>
      <div className={styles.redbox2}>4</div>
      <div className={styles.redbox3}>4</div>
      <div style={gridStyle}>
        <Square
          key={0}
          index = {0}
          size={50}
          selected={selectedSquare === 0}
          setSelected={() => handleSquareClick(0)}
        />
        <Square
          key={1}
          index = {1}
          size={50}
          selected={selectedSquare === 1}
          setSelected={() => handleSquareClick(1)}
        />
        <Square
          key={2}
          index = {2}
          size={50}
          selected={selectedSquare === 2}
          setSelected={() => handleSquareClick(2)}
        />
        <Square
          key={3}
          index= {3}
          size={50}
          selected={selectedSquare === 3}
          setSelected={() => handleSquareClick(3)}
        />
        <Square
          key={4}
          index = {4}
          size={50}
          selected={selectedSquare === 4}
          setSelected={() => handleSquareClick(4)}
        />
        <Square
          key={5}
          index = {5}
          size={50}
          selected={selectedSquare === 5}
          setSelected={() => handleSquareClick(5)}
        />
        <Square
          key={6}
          index = {6}
          size={50}
          selected={selectedSquare === 6}
          setSelected={() => handleSquareClick(6)}
        />
        <Square
          key={7}
          index = {7}
          size={50}
          selected={selectedSquare === 7}
          setSelected={() => handleSquareClick(7)}
        />
        <Square
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
