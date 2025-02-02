import React from "react";

function SingleRepo({ repo, showRepoDetail }) {
  return (
    <div
      className="repo"
      onClick={() => {
        showRepoDetail();
      }}
    >
      <div className="repo-img">
        <img src={repo.owner ? repo.owner.avatar_url : ""} alt={repo.name} />
      </div>
      <div className="repo-detail">
        <span>
          <b>{repo.name}</b>{" "}
          {repo.fork ? (
            <span>
              <svg
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                ></path>
              </svg>
            </span>
          ) : null}
        </span>
        <p>{repo.description}</p>
      </div>
    </div>
  );
}

export default SingleRepo;
