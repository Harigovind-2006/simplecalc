import React, { useState } from "react";
import "./index.css";

function App() {
  const [display, setDisplay] = useState("");

  const calculate = (expr) => {
    try {
      let nums = expr.split(/[ + - * /]/).map(Number);
      let ops = expr.match(/[ + - * /]/g);

      if (!ops) return expr;

      // Handle * and /
      for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "*" || ops[i] === "/") {
          let result =
            ops[i] === "*"
              ? nums[i] * nums[i + 1]
              : nums[i] / nums[i + 1];

          nums.splice(i, 2, result);
          ops.splice(i, 1);
          i--;
        }
      }

      // Handle + and -
      let result = nums[0];
      for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "+") result += nums[i + 1];
        else result -= nums[i + 1];
      }

      return result.toString();
    } catch {
      return "Error";
    }
  };

  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("");
    } else if (value === "Del") {
      setDisplay(display.slice(0, -1));
    } else if (value === "=") {
      setDisplay(calculate(display));
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <div>
      <h1>CALCULATOR</h1>

      <div className="calculator">
        <input type="text" value={display} className="display" readOnly />

        <div className="buttons">
          {["7","8","9","/",
            "4","5","6","*",
            "1","2","3","-",
            "0",".","=","+"].map((btn) => (
              <button key={btn} onClick={() => handleClick(btn)}>
                {btn}
              </button>
          ))}

          <button onClick={() => handleClick("C")}>C</button>
          <button onClick={() => handleClick("Del")}>Del</button>
        </div>
      </div>
    </div>
  );
}

export default App;
