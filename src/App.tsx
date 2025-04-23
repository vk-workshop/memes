import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarItem } from "@heroui/navbar";

import { Meme } from "./types/interfaces";
import { initialMemes } from "./data/initialMemes";
import { TableView } from "./components/TableView";
import { ListView } from "./components/ListView";

function App() {
  const [memes, setMemes] = useState<Meme[]>(() => {
    const saved = localStorage.getItem("memes");

    return saved ? JSON.parse(saved) : initialMemes;
  });

  useEffect(() => {
    localStorage.setItem("memes", JSON.stringify(memes));
  }, [memes]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="bg-primary-600 text-primary shadow-lg">
        <NavbarBrand as={Link} className="text-xl font-bold" to="/">
          🎭 Meme
        </NavbarBrand>
        <div className="flex gap-2">
          <NavbarItem
            as={Link}
            className="hover:bg-primary-500 px-4 py-2 rounded-lg transition-colors"
            to="/table"
          >
            Table View
          </NavbarItem>
          <NavbarItem
            as={Link}
            className="hover:bg-primary-500 px-4 py-2 rounded-lg transition-colors"
            to="/list"
          >
            List View
          </NavbarItem>
        </div>
      </Navbar>

      <div className="flex flex-col min-h-screen overflow-auto">
        <Routes>
          <Route element={<Navigate replace to="/table" />} path="/" />
          <Route
            element={<TableView memes={memes} setMemes={setMemes} />}
            path="/table"
          />
          <Route
            element={<ListView memes={memes} setMemes={setMemes} />}
            path="/list"
          />
          <Route element={<div className="p-4">Not Found</div>} path="*" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
