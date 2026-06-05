import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslations, useModulesManager } from "@openimis/fe-core";
import ReportBro from "./ReportBro";
import { useOverrideReportMutation, useReportQuery } from "../hooks";

const StyledDialog = styled(Dialog)(() => ({
  zIndex: "2001 !important",
  '& .MuiPaper-root': {
    height: "100%",
  },
}));

const StyledDialogContent = styled(DialogContent)(() => ({
  padding: 0,
}));

const ReportDefinitionEditorDialog = (props) => {
  const { name, onClose } = props;
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("tools", modulesManager);
  const [resetKey, setResetKey] = useState(null);

  const { report, isLoading } = useReportQuery({ name });
  const { mutate } = useOverrideReportMutation();
  const [definition, setDefinition] = useState(null);

  useEffect(() => {
    setDefinition(report?.definition ?? report?.defaultReport);
  }, [report]);

  const onReset = () => {
    setResetKey(Date.now());
    setDefinition(report?.defaultReport);
  };

  const handleChange = async (value) => {
    await mutate({ name, definition: value });
    onClose();
  };

  return (
    <StyledDialog maxWidth="xl" open fullWidth onClose={onClose}>
      <DialogTitle>{formatMessage("ReportDefinitionEditor.title")}</DialogTitle>
      <StyledDialogContent>
        {report && <ReportBro key={resetKey} definition={definition} onChange={handleChange} />}
        {isLoading && <CircularProgress />}
      </StyledDialogContent>
      <DialogActions>
        {report?.defaultReport && (
          <Button onClick={onReset}>{formatMessage("tools.ReportDefinitionEditor.resetToDefault")}</Button>
        )}
        <Button onClick={onClose}>{formatMessage("tools.ReportDefinitionEditor.cancel")}</Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ReportDefinitionEditorDialog;
