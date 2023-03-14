import React from "react";
import "./styles.scss";
import Button from "react-bootstrap/Button";

export const ComponentOne = (props) => {
  return (
    <div className="mainContainer">
      <h3 className="test">Hello React</h3>
      <Button variant="primary">Button as link</Button>
      <h4>Component one -- {props.name}</h4>
    </div>
  );
};
