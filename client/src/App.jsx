import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import ViewPaste from "./views/ViewPaste";

function App() {
return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/p/:id" element={<ViewPaste />} />
      </Routes>
    </Router>
  );
}

export default App