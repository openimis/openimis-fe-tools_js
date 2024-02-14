import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useReportsQuery } from "../hooks";
import { Searcher, useTranslations, useModulesManager } from "@openimis/fe-core";
import GenerateReportPicker from "./GenerateReportPicker";
import { Box, Button } from "@material-ui/core";
import ReportDefinitionEditorDialog from "./ReportDefinitionEditorDialog";
import { RIGHT_REPORT_EDIT, RIGHT_REPORT_ADD } from "../constants"

const HEADERS = ["tools.report.description", ""];

const ReportSearcher = () => {
  const modulesManager = useModulesManager();
  const { formatMessageWithValues, formatMessage } = useTranslations("tools", modulesManager);
  const { data, isLoading, error, refetch } = useReportsQuery();
  const [editedReport, setEditedReport] = useState();
  const rights = useSelector((state) => state.core?.user?.i_user?.rights ?? []);
  const itemFormatters = useCallback(
    () => [
      (r) => r.description,
      (r) => (
        <Box display="flex" justifyContent={"flex-end"} gridGap={12}>
          {
            rights.includes(RIGHT_REPORT_ADD) &&
            rights.includes(RIGHT_REPORT_EDIT) &&
            <Button onClick={() => setEditedReport(r)} size="small">
              {formatMessage("ReportSearcher.editBtn")}
            </Button>
          }
          <GenerateReportPicker name={r.name} />
        </Box>
      ),
    ],
    []
  );

  return (
    <>
      <Searcher
        module="report"
        tableTitle={formatMessageWithValues("ReportSearcher.tableTitle", { count: data?.reports?.length })}
        items={data?.reports ?? []}
        fetchingItems={isLoading}
        errorItems={error}
        fetch={() => refetch()}
        itemsPageInfo={{ totalCount: data?.reports?.length ?? 0 }}
        headers={() => HEADERS}
        itemFormatters={itemFormatters}
        withPagination={false}
      />
      {editedReport && <ReportDefinitionEditorDialog name={editedReport.name} onClose={() => setEditedReport(null)} />}
    </>
  );
};

export default ReportSearcher;
