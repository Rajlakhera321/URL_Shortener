import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function LinkShortener(props) {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      let id = localStorage.getItem("userId");
      let token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://friendly-space-zebra-444g94vw9rfqxq9-3030.app.github.dev/app/v1/createURL",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({
            userId: id,
            url: props.inputValue,
          }),
        }
      );
      const json = await response.json();
      props.getList();
      setShortenLink(`https://friendly-space-zebra-444g94vw9rfqxq9-3030.app.github.dev/app/v1/${json.shortid}`);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.inputValue.length) {
      fetchData();
    }
  }, [props.inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p className="noData">loading...</p>;
  }
  if (error) {
    return <p className="noData">Something went wrong :( </p>;
  }

  function handleColor(e) {
    e.target.style.background = "black";
  }
  
  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""} onClick={(e) => handleColor(e)}>
              Copy to clipboard
            </button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
}
