import React from "react";
import FollowBtn from "./FollowBtn";

function Owner({ owner, fetchFollowers, fetchFollowing }) {
  return (
    <div className="owner">
      <div className="owner-info">
        <div className="owner-img">
          <img src={owner.avatar_url} alt={`${owner.login}`} />
        </div>
        <div className="owner-details">
          <div className="owner-name">
            <span>{owner.name || owner.login}</span>
            <p>{owner.bio}</p>
          </div>
          <FollowBtn
            owner={owner}
            onFollowers={fetchFollowers}
            onFollowing={fetchFollowing}
          />
        </div>
      </div>
    </div>
  );
}

export default Owner;
