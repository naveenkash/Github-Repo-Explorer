import React, { useEffect, useState, useRef } from "react";
import "../styles/SearchBar.css";
import Button from "./Button";

function SearchBar({ submit }) {
  const [userName, setUserName] = useState("");
  const [loadingRepo, setLoadingRepo] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    function keyDownHandler(event) {
      if (event.key === "Enter") {
        submitHandler();
      }
    }
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  });

  /**
   * Make request to github to get repos of user with provided username
   * @param {string} userName
   */
  async function fetchRepos(userName) {
    if (!userName) {
      alert("Username is empty");
      return;
    }
    setLoadingRepo(true);
    try {
      const resp = await fetch(
        `https://api.github.com/users/${userName}/repos`
      );
      if (!resp.ok) {
        setLoadingRepo(false);
        let err = await resp.json();
        setError(err ? err.message : "Error occurred");
        return;
      }
      const fetchedRepos = await resp.json();
      if (error) {
        setError("");
      }
      submit(fetchedRepos, userName);
    } catch (error) {
      setError(error.message);
    }
    setLoadingRepo(false);
  }

  /**
   * Submit handler
   */
  function submitHandler() {
    if (!userName) {
      inputRef.current.style.borderColor = "red";
      return;
    }
    inputRef.current.style.borderColor = "transparent";
    fetchRepos(userName);
  }

  /**
   * Input onchange event handler to update username value in state
   */
  function inputOnChangeHandler(e) {
    if (!e.target.value) {
      inputRef.current.style.borderColor = "red";
    } else {
      inputRef.current.style.borderColor = "transparent";
    }
    setUserName(e.target.value);
  }

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <input
          ref={inputRef}
          placeholder="Search by github username"
          value={userName}
          onChange={(e) => {
            inputOnChangeHandler(e);
          }}
        />
        <div
          onClick={() => {
            submitHandler();
          }}
        >
          <Button loading={loadingRepo} text={"Search"} />
        </div>
        {error ? <span>{error}</span> : null}
      </div>
    </div>
  );
}
export default SearchBar;
