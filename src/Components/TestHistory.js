import { useHistory } from "react-router";
import React, { Component } from "react";

export default function Test1() {
  let history = useHistory();

  function handleTest() {
    history.push("/testHistory2");
  }

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={handleTest}>
        Primary
      </button>
    </div>
  );
}
