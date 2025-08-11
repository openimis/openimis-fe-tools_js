import React from "react";
import { styled } from "@mui/material/styles";
import ReportSearcher from "../components/ReportSearcher";

const StyledPage = styled('div')(({ theme }) => ({
  ...theme.page,
}));

const ReportsPage = () => {
  return (
    <StyledPage>
      <ReportSearcher />
    </StyledPage>
  );
};
export default ReportsPage;
