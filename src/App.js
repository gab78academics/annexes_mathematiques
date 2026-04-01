import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Animation1 from "./Animation1";
import Animation2 from "./Animation2";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>      👇Annexes Mathématiques - gab92i 👇</h1>
              <ul>
                <li>
                  <Link to="/animation1">Formules de Stirling</Link>
                </li>
                <li>
                  <Link to="/animation2">
                    Position de la courbe par rapport à sa tangente
                  </Link>
                </li>
              </ul>
            </div>
          }
        />
        <Route path="/animation1" element={<Animation1 />} />
        <Route path="/animation2" element={<Animation2 />} />
      </Routes>
    </Router>
  );
}
