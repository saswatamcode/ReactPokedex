import React from "react";
import "./ProgressBar.css";

export default function ProgressBar(props) {
  return (
    <div className="progress-bar">
      <Filler
        percentage={props.percentage}
        backgroundColor={props.backgroundColor}
      />
    </div>
  );
}
const Filler = props => {
  var percentage = props.percentage;
  if (percentage > 100) {
    percentage = 100;
  }
  return (
    <div
      className="filler"
      style={{
        width: `${percentage}%`,
        backgroundColor: `${props.backgroundColor}`
      }}
    >
      <div className="text">{props.percentage}%</div>
    </div>
  );
};
