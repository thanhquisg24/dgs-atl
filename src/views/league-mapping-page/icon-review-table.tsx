// import { Check } from "@mui/icons-material";
import React from "react";

export default function BooleanIcon(props: { status: boolean; rest?: any }) {
  const { status, rest } = props;
  return <span>{status ? "Yes" : "No"}</span>;
}
