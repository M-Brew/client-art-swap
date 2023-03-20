import React from "react";
import { Route, Routes } from "react-router-dom";

import { Guest } from "components/guest/Guest";
import { Admin } from "components/admin/Admin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Guest />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
