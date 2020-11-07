import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Repo from "./components/Repo";
function App() {
  const [repos, setRepos] = useState([]);

  /**
   * Save repos to state
   */
  function saveRepos(fetchedRepos) {
    setRepos(fetchedRepos);
  }

  return (
    <div className="App">
      <SearchBar submit={saveRepos} />
      <Repo repos={repos} />
    </div>
  );
}

export default App;
