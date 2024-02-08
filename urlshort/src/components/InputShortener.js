import "../css/Login.css";
import React, { useState } from "react";
import { validateUrl } from "./ValidURL";

export default function InputShortener(props) {
  const [shortenLink, setShortenLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(shortenLink==="" || validateUrl(shortenLink)===false){
      alert("Enter Valid URL");
      return;
    }
    props.setInputValue(shortenLink); 
  };

  return (
    <div className="inputContainer">
      <h1>
        URL <span>Shortener</span>
      </h1>
      <div>
        <input
          type="text"
          value={shortenLink}
          onChange={(e) => setShortenLink(e.target.value)}
          placeholder="Paste a link"
        />
        <button type="submit" onClick={handleSubmit}>
          Shortener
        </button>
      </div>
    </div>
  );
}
