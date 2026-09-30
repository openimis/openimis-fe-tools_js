import React from "react";
import { describe, expect, it, vi } from "vitest";

const core = vi.hoisted(() => ({ useGraphqlQuery: vi.fn() }));

// fe-core's barrel imports itself, so the real pieces come from their defining modules.
vi.mock("@openimis/fe-core", async () => ({
  Autocomplete: (await vi.importActual("@openimis/fe-core/components/inputs/Autocomplete")).default,
  useModulesManager: (await vi.importActual("@openimis/fe-core/helpers/modules")).useModulesManager,
  useTranslations: (await vi.importActual("@openimis/fe-core/helpers/i18n")).useTranslations,
  ...core,
}));

const { default: ReportPicker } = await import("./ReportPicker");
const { mockModulesManager, renderWithProviders, screen, userEvent } = await import("@openimis/fe-core/testing");

const REPORTS = [
  { name: "invoice_fhea", module: "invoice", description: "Invoice for health facilities" },
  { name: "claim_statistics", module: "claim", description: "Claims per month" },
  { name: "contributions_list", module: "contribution", description: "Contributions collected" },
];

const modulesManager = mockModulesManager({
  getConf: (module, key, defaultValue = null) => (key === "debounceTime" ? 0 : defaultValue),
});

const renderPicker = (props = {}) => {
  core.useGraphqlQuery.mockReturnValue({ isLoading: false, error: null, data: { reports: REPORTS } });
  const onChange = vi.fn();
  renderWithProviders(<ReportPicker onChange={onChange} {...props} />, {
    modulesManager,
    messages: { "tools.ReportPicker.label": "Report" },
  });
  return { onChange };
};

const options = () => screen.queryAllByRole("option").map((option) => option.textContent);

describe("ReportPicker", () => {
  it("offers every report, labelled by its description", async () => {
    renderPicker();

    await userEvent.click(screen.getByRole("combobox", { name: "Report" }));

    expect(options()).toEqual(["Invoice for health facilities", "Claims per month", "Contributions collected"]);
  });

  it("narrows the reports as the user types", async () => {
    renderPicker();

    await userEvent.type(screen.getByRole("combobox"), "contrib");

    await vi.waitFor(() => expect(options()).toEqual(["Contributions collected"]));
  });

  // Currently fails: the picker narrows on the report's technical name while showing its
  // description, so typing words the user can see ("month") empties the list.
  it.fails("finds a report by the description it shows", async () => {
    renderPicker();

    await userEvent.type(screen.getByRole("combobox"), "month");
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(options()).toEqual(["Claims per month"]);
  });

  it("reports the chosen report", async () => {
    const { onChange } = renderPicker();

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "Claims per month" }));

    expect(onChange).toHaveBeenCalledExactlyOnceWith(REPORTS[1]);
  });
});
