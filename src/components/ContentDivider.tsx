import { Box } from "@mui/material";
import React from "react";

interface DividerProps {
  useLine: boolean;
}

const ContentDivider = ({ useLine }: DividerProps) => {
  return (
    <>
      {useLine ? (
        <Box width="100%" height={1.5} bgcolor={"#f5f5f5"} marginY={2}></Box>
      ) : (
        <Box width="100%" height={1.5} marginY={2}></Box>
      )}
    </>
  );
};

export default ContentDivider;
