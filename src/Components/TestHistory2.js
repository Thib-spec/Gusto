import { useHistory } from "react-router";
import React, { Component } from "react";

export default function Test2() {
  let history = useHistory();

  function handleTest() {
    history.push("/testHistory1");
  }

  return (
    <div>
      <button type="button" className="btn btn-danger" onClick={handleTest}>
        Danger
      </button>
    </div>
  );
}
