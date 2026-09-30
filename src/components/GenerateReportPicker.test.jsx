import React from "react";
import { describe, expect, it, vi } from "vitest";

const core = vi.hoisted(() => ({ useGraphqlQuery: vi.fn() }));

// fe-core's barrel imports itself, so the real pieces come from their defining modules.
vi.mock("@openimis/fe-core", async () => ({
  Autocomplete: (await vi.importActual("@openimis/fe-core/components/inputs/Autocomplete")).default,
  ErrorBoundary: (await vi.importActual("@openimis/fe-core/helpers/ErrorBoundary")).default,
  SelectInput: (await vi.importActual("@openimis/fe-core/components/inputs/SelectInput")).default,
  useBoolean: (await vi.importActual("@openimis/fe-core/helpers/hooks")).useBoolean,
  useModulesManager: (await vi.importActual("@openimis/fe-core/helpers/modules")).useModulesManager,
  useTranslations: (await vi.importActual("@openimis/fe-core/helpers/i18n")).useTranslations,
  ...core,
}));

const { default: GenerateReportPicker } = await import("./GenerateReportPicker");
const { mockModulesManager, renderWithProviders, screen, userEvent, waitFor } = await import("@openimis/fe-core/testing");

const REPORT = { name: "claim_statistics", module: "claim", description: "Claims per month" };

const messages = {
  "tools.GenerateReportPicker.triggerBtn": "Generate report",
  "tools.GenerateReportPicker.title": "Generate",
  "tools.GenerateReportPicker.generateBtn": "Generate",
  "tools.GenerateReportPicker.cancelBtn": "Cancel",
  "tools.GenerateReportPicker.formatLabel": "Format",
};

const renderPicker = ({ isValid = () => true, props = {} } = {}) => {
  core.useGraphqlQuery.mockReturnValue({ isLoading: false, error: null, data: { report: REPORT } });
  const open = vi.fn();
  vi.stubGlobal("open", open);
  const moduleReport = {
    isValid,
    getParams: () => ({ date_from: "2024-01-01", region: "R1 & R2" }),
  };
  const modulesManager = mockModulesManager({
    getReport: (name) => (name === REPORT.name ? moduleReport : null),
  });
  renderWithProviders(<GenerateReportPicker name={REPORT.name} {...props} />, { modulesManager, messages });
  return { open };
};

const openDialog = () => userEvent.click(screen.getByRole("button", { name: "Generate report" }));
const generate = () => screen.getByRole("button", { name: "Generate" });

describe("GenerateReportPicker", () => {
  it("asks for the named report only", () => {
    renderPicker();

    const [text, variables, config] = core.useGraphqlQuery.mock.calls[0];
    expect(text).toContain("report(");
    expect(variables).toEqual({ name: REPORT.name });
    expect(config).toEqual({ skip: false });
  });

  it("downloads the report as a PDF with the parameters its module builds", async () => {
    const { open } = renderPicker();

    await openDialog();
    await userEvent.click(generate());

    expect(open).toHaveBeenCalledExactlyOnceWith(
      "/api/report/claim_statistics/pdf/?date_from=2024-01-01&region=R1+%26+R2",
      "_blank",
      "download",
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("downloads in the format the user picks", async () => {
    const { open } = renderPicker();

    await openDialog();
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "XLSX" }));
    await userEvent.click(generate());

    expect(open.mock.calls[0][0]).toMatch(/^\/api\/report\/claim_statistics\/xlsx\//);
  });

  it("does not offer a format choice when the caller fixed one", async () => {
    const { open } = renderPicker({ props: { outputFormat: "xlsx" } });

    await openDialog();

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    await userEvent.click(generate());
    expect(open.mock.calls[0][0]).toMatch(/\/xlsx\//);
  });

  it("keeps generation disabled until the report module accepts the parameters", async () => {
    renderPicker({ isValid: () => false });

    await openDialog();

    expect(generate()).toBeDisabled();
  });

  it("lets the caller render its own trigger", async () => {
    core.useGraphqlQuery.mockReturnValue({ isLoading: false, error: null, data: { report: REPORT } });
    renderWithProviders(
      <GenerateReportPicker name={REPORT.name}>
        {({ toggle }) => <button type="button" onClick={toggle}>Print</button>}
      </GenerateReportPicker>,
      { modulesManager: mockModulesManager({ getReport: () => null }), messages },
    );

    await userEvent.click(screen.getByRole("button", { name: "Print" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(generate()).toBeDisabled();
  });
});
