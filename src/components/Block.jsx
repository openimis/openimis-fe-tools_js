import React from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { Paper, Box, Typography } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme?.paper?.paper ?? {},
  margin: 0,
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  ...theme?.paper?.header ?? {},
  ...theme?.paper?.title ?? {},
}));

const Block = (props) => {
  const { title, className, children } = props;
  return (
    <StyledPaper className={className}>
      {title && (
        <StyledHeader>
          <Typography>{title}</Typography>
        </StyledHeader>
      )}
      <Box overflow="auto">
        <Box m="10px">{children}</Box>
      </Box>
    </StyledPaper>
  );
};

export default Block;
