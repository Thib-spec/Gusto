import React, { Component, useState } from "react";

export default function UploadForm() {
  return (
    <div className="addProduct-container-form">
      <div className="input-group">
        <input
          type="file"
          className="form-control"
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Upload"
        />
      </div>
    </div>
  );
}
