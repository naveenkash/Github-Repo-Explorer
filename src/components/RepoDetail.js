import React, { useEffect, useState } from "react";
import formatNumber from "../helper/formatNumber";
import RequestLoader from "./RequestLoader";

function RepoDetail({ repoDetail }) {
  const [languages, setLanguages] = useState(null);
  const [languagesLoading, setLanguagesLoading] = useState(false);
  const [languagesError, setLanguagesError] = useState(null);
  const fetchLanguagesUrl = repoDetail.languages_url;
  useEffect(() => {
    async function fetchLanguages() {
      setLanguagesLoading(true);
      try {
        const resp = await fetch(fetchLanguagesUrl);
        if (!resp.ok) {
          setLanguagesError(resp.statusText);
          setLanguagesLoading(false);
          return;
        }
        const data = await resp.json();
        setLanguages(data);
        setLanguagesError(null);
      } catch (error) {
        setLanguagesError(error.message);
      }
      setLanguagesLoading(false);
    }
    fetchLanguages();
  }, [fetchLanguagesUrl]);

  return (
    <div className="repo-detail-wrapper">
      <div className="repo-side-detail">
        <div className="repo-img">
          <img src={repoDetail.owner.avatar_url} alt={repoDetail.name} />
        </div>

        <div className="repo-detail-count flex">
          {languagesError ? <span>{languagesError}</span> : null}
          {languagesLoading ? (
            <div
              style={{
                marginTop: "50px",
              }}
            >
              <RequestLoader />
            </div>
          ) : languages ? (
            Object.keys(languages).map((lang) => (
              <span
                className="repo-detail-info btn"
                style={{
                  marginRight: "5px",
                  marginBottom: "5px",
                  fontSize: "13px",
                }}
                key={lang}
              >
                {lang}
              </span>
            ))
          ) : null}
        </div>
      </div>
      <div className="repo-detail">
        <h1>
          <a href={repoDetail.html_url} rel="noreferrer" target="_blank">
            {repoDetail.name}
          </a>
        </h1>

        <div className="repo-detail-count flex">
          <span className="repo-detail-info btn">
            <svg
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                fill={`var(--light-100)`}
                d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
              ></path>
            </svg>
            <span>{formatNumber(repoDetail.forks, 1)}</span>
          </span>
          <span className="repo-detail-info btn">
            <svg
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                fill={`var(--light-100)`}
                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
              ></path>
            </svg>
            <span>{formatNumber(repoDetail.stargazers_count, 1)}</span>
          </span>
        </div>
        <p>{repoDetail.description}</p>
      </div>
    </div>
  );
}

export default RepoDetail;
