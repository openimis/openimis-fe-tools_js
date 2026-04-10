import React from "react";
import { GetIconComponent } from "@openimis/fe-core";
const Ballot = GetIconComponent("Ballot")
const ImportExport = GetIconComponent("ImportExport")
const SaveAlt = GetIconComponent("SaveAlt")
const Settings = GetIconComponent("Settings")

import { FormattedMessage } from "@openimis/fe-core";
import ToolsMainMenu from "./components/ToolsMainMenu";
import messages_en from "./translations/en.json";
import { RIGHT_REGISTERS, RIGHT_REPORTS, RIGHT_EXTRACTS, TOOLS_MAIN_MENU_CONTRIBUTION_KEY } from "./constants";

const DEFAULT_CONFIG = {
  translations: [{ key: "en", messages: messages_en }],
  "core.MainMenu": [{ name: "ToolsMainMenu", component: ToolsMainMenu }],
  "tools.MainMenu": [
    {
      text: <FormattedMessage module="tools" id="menu.registers" />,
      icon: <ImportExport />,
      route: "/tools/registers",
      id: "tools.registers",
      filter: (rights) => RIGHT_REGISTERS.some(r => rights.includes(r)),
    },
    {
      text: <FormattedMessage module="tools" id="menu.extracts" />,
      icon: <SaveAlt />,
      route: "/tools/extracts",
      id: "tools.extracts",
      filter: (rights) => RIGHT_EXTRACTS.some(r => rights.includes(r)),
    },
    {
      text: <FormattedMessage module="tools" id="menu.reports" />,
      icon: <Ballot />,
      route: "/tools/reports",
      id: "tools.reports",
      filter: (rights) => RIGHT_REPORTS.some(r => rights.includes(r)),
    }
  ]
};

export const ToolsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
};