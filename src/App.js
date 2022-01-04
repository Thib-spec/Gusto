import React from "react";

import AdminRouter from "./Routes/AdminRouter";

import { useTranslation } from "react-i18next";
import "configFiles/i18n";

function App() {
  return (
    <div>
      <AdminRouter />
    </div>
  );
}

export default App;
