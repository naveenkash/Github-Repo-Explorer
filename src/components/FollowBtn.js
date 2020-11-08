import React from "react";
import Button from "./Button";
import formatNumber from "../helper/formatNumber";

function FollowBtns({ owner }) {
  return (
    <div className="owner-followers">
      <div>
        <Button text={`Followers ${formatNumber(owner.followers, 1)}`} />
      </div>
      <div>
        <Button text={`Following ${formatNumber(owner.following, 1)}`} />
      </div>
    </div>
  );
}

export default FollowBtns;
