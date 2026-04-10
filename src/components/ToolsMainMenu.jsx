import { GetIconComponent } from "@openimis/fe-core";
const Ballot = GetIconComponent("Ballot")
const ImportExport = GetIconComponent("ImportExport")
const SaveAlt = GetIconComponent("SaveAlt")
const Settings = GetIconComponent("Settings")

import { formatMessage, MainMenuContribution, withModulesManager } from "@openimis/fe-core";
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { TOOLS_MAIN_MENU_CONTRIBUTION_KEY  } from "../constants";

class ToolsMainMenu extends Component {
  render() {
    return (
      <MainMenuContribution
        {...this.props}
        header={formatMessage(this.props.intl, "tools", "mainMenu")}
        icon={<Settings />}
        menuId="ToolsMainMenu"
        contributionKey={TOOLS_MAIN_MENU_CONTRIBUTION_KEY}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export { ToolsMainMenu };
export default injectIntl(withModulesManager(connect(mapStateToProps)(ToolsMainMenu)));
