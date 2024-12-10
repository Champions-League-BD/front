import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Teams from "./pages/Teams"; // Outros componentes
import Players from "./pages/Players";
import Stadiums from "./pages/Stadiums";
import Championships from "./pages/Championships";
import AdvancedQueries from "./pages/AdvancedQueries";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<Players />} />
        <Route path="/stadiums" element={<Stadiums />} />
        <Route path="/championships" element={<Championships />} />
        <Route path="/advanced-queries" element={<AdvancedQueries />} />
      </Routes>
    </Router>
  );
};

export default App;
