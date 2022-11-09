import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
/**
* @author
* @function Proses

**/

export const Proses = (props) => {
  const [done, setDone] = useState(0);
  const [done1, setDone1] = useState(0);
  const [done2, setDone2] = useState(0);
  const [done3, setDone3] = useState(0);

  const statuse = () => {
    if (done == 0) {
      setDone(25);
    } else {
      setDone(0);
    }
  };

  const statuse1 = () => {
    if (done1 == 0) {
      setDone(50);
    } else {
      setDone1(25);
    }
  };
  const statuse2 = () => {
    if (done2 == 0) {
      setDone(75);
    } else {
      setDone2(50);
    }
  };
  const statuse3 = () => {
    if (done3 == 0) {
      setDone(100);
    } else {
      setDone3(75);
    }
  };

  return (
    <div className={"container p-5 my-5 border"}>
      <ProgressBar variant="success" now={done} />
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
