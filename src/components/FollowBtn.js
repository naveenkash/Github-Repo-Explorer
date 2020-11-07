import React, { useState } from "react";
import Button from "./Button";

function FollowBtns({ owner, onFollowers, onFollowing }) {
  const [followersLoading, setFollowersLoading] = useState(false);
  const [followingLoading, setFollowingLoading] = useState(false);

  /**
   * Fetch Owner followers
   */
  async function fetchFollowers() {
    setFollowersLoading(true);
    try {
      const resp = await fetch(owner.followers_url);
      const fetchedFollowers = await resp.json();
      if (!resp.ok) {
        setFollowersLoading(false);
        return;
      }
      onFollowers(fetchedFollowers);
    } catch (error) {
      alert(error.message);
    }
    setFollowersLoading(false);
  }

  /**
   * Fetch Owner following accounts
   */
  async function fetchFollowing() {
    setFollowingLoading(true);
    try {
      const resp = await fetch(
        `https://api.github.com/users/${owner.login}/following`
      );
      const fetchedFollowing = await resp.json();
      if (!resp.ok) {
        setFollowingLoading(false);
        return;
      }
      onFollowing(fetchedFollowing);
    } catch (error) {
      alert(error.message);
    }
    setFollowingLoading(false);
  }

  function formatFollower(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

  return (
    <div className="owner-followers">
      <div
        onClick={() => {
          fetchFollowers();
        }}
      >
        <Button
          load={followersLoading}
          text={`Followers ${formatFollower(owner.followers, 1)}`}
        />
      </div>
      <div
        onClick={() => {
          fetchFollowing();
        }}
      >
        <Button
          load={followingLoading}
          text={`Following ${formatFollower(owner.following, 1)}`}
        />
      </div>
    </div>
  );
}

export default FollowBtns;
