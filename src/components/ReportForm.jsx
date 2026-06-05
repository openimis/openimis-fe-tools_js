import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Form, PublishedComponent } from "@openimis/fe-core";
import React from "react";

const StyledGridItem = styled(Grid)(({ theme }) => ({
  ...theme?.paper?.item ?? {},
}));

const MainPanel = ({ edited, onEditedChanged }) => {
  return (
    <Grid container>
      <StyledGridItem size={4}>
        <PublishedComponent
          pubRef="tools.ReportDefinitionEditor"
          value={edited.definition}
          defaultValue={edited.defaultReport}
          onChange={(definition) => onEditedChanged({ ...edited, definition })}
        />
      </StyledGridItem>
    </Grid>
  );
};

const ReportForm = ({ onBack, onSave, report, onChange }) => {
  if (!report) {
    return null;
  }
  return (
    <Form
      module="tools"
      title="ReportForm.title"
      titleParams={{ name: report.name }}
      HeadPanel={MainPanel}
      onEditedChanged={onChange}
      edited={report}
      edited_id={report.name}
      save={onSave}
      back={onBack}
    />
  );
};
export default ReportForm;
