import React, { useState, useEffect } from "react";
import RequestLoader from "./RequestLoader";
import "../styles/Repo.css";
import Owner from "./Owner";
import SingleRepo from "./SingleRepo";
import formatNumber from "../helper/formatNumber";

function Repo({ repos, userName }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [owner, setOwner] = useState(null);
  const [ownerLoading, setOwnerLoading] = useState(false);
  const [ownerError, setOwnerError] = useState(null);
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
          {repos
            ? repos.map((repo) => <SingleRepo repo={repo} key={repo.id} />)
            : null}
        </div>
      </div>
    </div>
  );
}

export default Repo;
