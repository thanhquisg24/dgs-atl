import React from "react";
import { useMemoCurrentDgsLeague } from "./useMemoCurrentDgsLeague";
import { useMemoCurrentLineType } from "./useMemoCurrentLineType";

export default function LeagueFormLegend(props: { dgsLeagueId: number; lineTypeId: number }) {
  const { dgsLeagueId, lineTypeId } = props;
  const currentDgsLeague = useMemoCurrentDgsLeague(dgsLeagueId);
  const currentLineType = useMemoCurrentLineType(lineTypeId);
  return (
    <legend>
      Line Type: {currentLineType ? currentLineType.description : ""} -League:{" "}
      {currentDgsLeague ? currentDgsLeague.dgsLeague.description : ""}
    </legend>
  );
}
