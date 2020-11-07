import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Repo from "./components/Repo";
function App() {
  const [repos, setRepos] = useState(null);
  const [userName, setUserName] = useState("");
  /**
   * Save repos to state
   */
  function saveRepos(fetchedRepos, userName) {
    setRepos(fetchedRepos);
    setUserName(userName);
  }

  return (
    <div className="App">
      <SearchBar submit={saveRepos} />
      <Repo repos={repos} userName={userName} />
    </div>
  );
}

export default App;
