import React from "react";

import messages_en from "./translations/en.json";
import { RIGHT_REGISTERS, RIGHT_REPORTS, RIGHT_EXTRACTS } from "./constants";
import RegistersPage from "./pages/RegistersPage";
import ExtractsPage from "./pages/ExtractsPage";
import ReportsPage from "./pages/ReportsPage";


const DEFAULT_CONFIG = {
  translations: [{ key: "en", messages: messages_en }],
  "core.MainMenu": [{ name: "ToolsMainMenu", text: "tools.mainMenu", id: "tools.MainMenu", icon: "Settings" }],
  "core.Router": [
    { 
      path: "tools/registers",
      text: "tools.menu.registers",
      id: "tools.registers",
      component: RegistersPage,
      rights: RIGHT_REGISTERS,
      icon: "ImportExport"
    },
    { 
      path: "tools/extracts",
      text: "tools.menu.extracts",
      id: "tools.extracts",
      component: ExtractsPage,
      rights: RIGHT_EXTRACTS,
      icon: "SaveAlt" 
    },
    { path: "tools/reports",
      text: "tools.menu.reports",
      id: "tools.reports",
      component: ReportsPage,
      rights: RIGHT_REPORTS,
      icon: "Ballot" 
    },
  ],
  "tools.MainMenu": [
    {
      route: "tools/registers",
    },
    {  
      route: "tools/extracts",
    },
    {
      route: "tools/reports",
    }
  ]
};

export const ToolsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
};