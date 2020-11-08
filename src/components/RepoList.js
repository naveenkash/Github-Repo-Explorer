import React, { useState, useEffect } from "react";
import RequestLoader from "./RequestLoader";
import "../styles/Repo.css";
import Owner from "./Owner";
import SingleRepo from "./SingleRepo";
import RepoDetail from "./RepoDetail";
import Button from "./Button";

function Repo({ repos, userName }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [owner, setOwner] = useState(null);
  const [ownerLoading, setOwnerLoading] = useState(false);
  const [ownerError, setOwnerError] = useState(null);
  const [showRepoDetails, setShowRepoDetail] = useState(false);
  const [showRepos, setShowRepos] = useState(true);
  const [repoDetail, setRepoDetail] = useState(null);

  const ownerDep = userName;

  useEffect(() => {
    async function fetchOwner() {
      setOwnerLoading(true);
      try {
        const resp = await fetch(`https://api.github.com/users/${ownerDep}`);
        const fetchedOwner = await resp.json();
        if (!resp.ok) {
          setOwnerError(fetchedOwner ? fetchedOwner.message : "Error occurred");
          setOwnerLoading(false);
          return;
        }
        setOwnerError((err) => {
          if (err) {
            return null;
          }
        });
        setOwner(fetchedOwner);
      } catch (error) {
        setOwnerError(error.message);
      }
      setOwnerLoading(false);
    }
    if (ownerDep) {
      fetchOwner();
    }
  }, [ownerDep]);

  function showRepoList() {
    setShowRepoDetail(false);
    setShowRepos(true);
    setRepoDetail(null);
  }
  function showRepoDetail(repo) {
    setShowRepoDetail(true);
    setShowRepos(false);
    setRepoDetail(repo);
  }

  return (
    <div className="repo-wrapper">
      <div className="container">
        <div className="owner-container">
          {!ownerDep ? <span>Search for github username</span> : null}

          {ownerLoading ? (
            <RequestLoader />
          ) : ownerError ? (
            <span className="center">{ownerError}</span>
          ) : ownerDep && owner ? (
            <Owner
              owner={owner}
              ownerError={ownerError}
              fetchFollowers={setFollowers}
              fetchFollowing={setFollowing}
            />
          ) : null}
        </div>

        <div className="repo-container">
          {repos && showRepos ? (
            repos.map((repo) => (
              <SingleRepo
                repo={repo}
                showRepoDetail={() => {
                  showRepoDetail(repo);
                }}
                key={repo.id}
              />
            ))
          ) : showRepoDetails ? (
            <div>
              <div
                onClick={() => {
                  showRepoList();
                }}
                className="repo-detail-back-btn"
              >
                <Button text={"Back"} />
              </div>
              <RepoDetail repoDetail={repoDetail} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Repo;
