import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
/**
* @author
* @function Proses

**/

export const Proses = (props) => {
  const [done, setDone] = useState(0);
  const [variant, setvariant] = useState("");

  const statuse = () => {
    if (done == 0) {
      setDone(25);
      setvariant("danger");
    } else {
      setDone(0);
    }
  };

  const statuse1 = () => {
    if (done == 25) {
      setDone(50);
      setvariant("warning");
    } else {
      setDone(25);
    }
  };
  const statuse2 = () => {
    if (done == 50) {
      setDone(75);
      setvariant("info");
    } else {
      setDone(50);
    }
  };

  const statuse3 = () => {
    if (done == 75) {
      setDone(100);
      setvariant("success");
    } else {
      setDone(75);
    }
  };

  return (
    <div className={"container p-5 my-5 border"}>
      <ProgressBar variant={variant} now={done} />
      {/* <ProgressBar variant="info" now={done1} />
      <ProgressBar variant="warning" now={done2} />
      <ProgressBar variant="danger" now={done3} /> */}

      <button onClick={statuse}>הזמנה התקבלה</button>
      <button onClick={statuse1}>הזמנה מוכנה</button>
      <button onClick={statuse2}>יצאה למשלוח </button>
      <button onClick={statuse3}>התקבלה</button>
    </div>
  );
};
