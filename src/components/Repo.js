import React, { useState, useEffect } from "react";
import RequestLoader from "./RequestLoader";
import "../styles/Repo.css";
import Owner from "./Owner";

function Repo({ repos }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [owner, setOwner] = useState(null);
  const [ownerLoading, setOwnerLoading] = useState(false);
  const [ownerError, setOwnerError] = useState(null);

  const validRepos = repos && repos.length > 0;
  const ownerDep = validRepos ? repos[0].owner : "";

  useEffect(() => {
    async function fetchOwner() {
      setOwnerLoading(true);
      try {
        const resp = await fetch(ownerDep.url);
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
    if (!isEmptyObject(ownerDep)) {
      fetchOwner();
    }
  }, [ownerDep]);

  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  return (
    <div className="repo-wrapper">
      <div className="container">
        <div className="owner-container">
          {!validRepos ? <span>Search for github username</span> : null}

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
      </div>
    </div>
  );
}

export default Repo;
