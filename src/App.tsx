import { useState } from "react";
import "./App.css";
import DownloadPage from "./download_page";
import ProcessStep from "./download_page/process_step_bar";

function App() {

  return (
    <div className="container">
      <div className="container-inner">
        <ProcessStep />
        <hr/>
        <DownloadPage />
      </div>
    </div>
  );
}

export default App;
