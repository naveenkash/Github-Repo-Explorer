import React, { useState } from "react";
import Button from "./Button";
import formatNumber from "../helper/formatNumber";

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

  return (
    <div className="owner-followers">
      <div
        onClick={() => {
          fetchFollowers();
        }}
      >
        <Button
          load={followersLoading}
          text={`Followers ${formatNumber(owner.followers, 1)}`}
        />
      </div>
      <div
        onClick={() => {
          fetchFollowing();
        }}
      >
        <Button
          load={followingLoading}
          text={`Following ${formatNumber(owner.following, 1)}`}
        />
      </div>
    </div>
  );
}

export default FollowBtns;
