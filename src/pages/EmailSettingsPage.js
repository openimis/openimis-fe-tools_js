import React, { Component } from "react";
import { ProxyPage } from "@openimis/fe-core";


class EmailSettingsPage extends Component {
    render() {
        return <ProxyPage url="/EmailSettings.aspx" />
    }
}

export { EmailSettingsPage };