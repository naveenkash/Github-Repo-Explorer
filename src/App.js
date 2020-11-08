import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import RepoList from "./components/RepoList";
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
      <RepoList repos={repos} userName={userName} />
    </div>
  );
}

export default App;
