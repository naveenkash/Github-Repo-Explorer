import React, { useState } from "react";
import SearchBar from "./components/SearchBar";

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
    </div>
  );
}

export default App;
