import "../css/Login.css";
import React, { useEffect, useState } from "react";
import InputShortener from "../components/InputShortener";
import LinkShortener from "../components/LinkShortener";
import { Link } from "react-router-dom";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    getList();
  }, []);

  function getList() {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    fetch(
      `https://url-shortener-p22z.onrender.com/app/v1/urlId/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      }
    ).then((result) => {
      result.json().then((res) => {
        console.log(res);
        setData(res);
      });
    });
  }

  function deleteUser(id) {
    fetch(
      `https://url-shortener-p22z.onrender.com/app/v1/urlId/delete/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      }
    ).then((result) => {
      result.json().then((res) => {
        getList();
      });
    });
  }
  console.log(data.length);
  return (
    <>
      <div className="inputContainer">
        <InputShortener setInputValue={setInputValue} />
        <LinkShortener inputValue={inputValue} getList={getList}/>
      </div>
      <div className="table">
        {data.length === 0 ? (
          ""
        ) : (
          <div className="urlTable">
            <table>
              <tr>
                <th>index</th>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Update</th>
                <th>Delete</th>
                <th>View</th>
              </tr>
              {data.map((item, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <th className="originalRow">{item.originalUrl}</th>
                  <th>{`https://url-shortener-p22z.onrender.com/app/v1/${item.shortUrl}`}</th>
                  <th>
                    <button>Update</button>
                  </th>
                  <th>
                    <button onClick={() => deleteUser(item._id)}>Delete</button>
                  </th>
                  <th>
                    <Link to={`/view/${item._id}`} className="view">View</Link>
                  </th>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </>
  );
}
