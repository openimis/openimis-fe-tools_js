import ToolsMainMenu from "./components/ToolsMainMenu";
import RegistersPage from "./pages/RegistersPage";
import { PolicyRenewalsPage } from "./pages/PolicyRenewalsPage";
import { FeedbackPromptsPage } from "./pages/FeedbackPromptsPage";
import { ExtractsPage } from "./pages/ExtractsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { UtilitiesPage } from "./pages/UtilitiesPage";
import { FundingPage } from "./pages/FundingPage";
import { EmailSettingsPage } from "./pages/EmailSettingsPage";
import messages_en from "./translations/en.json";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "core.Router": [
    { path: "tools/registers", component: RegistersPage },
    { path: "tools/policyRenewals", component: PolicyRenewalsPage },
    { path: "tools/feedbackPrompts", component: FeedbackPromptsPage },
    { path: "tools/extracts", component: ExtractsPage },
    { path: "tools/reports", component: ReportsPage },
    { path: "tools/utilities", component: UtilitiesPage },
    { path: "tools/funding", component: FundingPage },
    { path: "tools/emailSettings", component: EmailSettingsPage },
  ],
  "core.MainMenu": [ToolsMainMenu],
};

export const ToolsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
};
