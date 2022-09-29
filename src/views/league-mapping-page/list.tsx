// material-ui
import { useGetList } from "@hooks/useGetList";
import { Typography } from "@mui/material";

// project imports
import MainCard from "@ui-component/cards/MainCard";
import React from "react";

// ==============================|| SAMPLE PAGE ||============================== //

const ListLeagueMapping = () => {
  const getListDgsSport = useGetList(
    JSON.stringify({
      resource: "dgs-sports",
      perPage: 50,
      sort: { field: "sportOrder", order: "ASC" },
    }),
  );
  React.useEffect(() => {
    console.log("🚀 ~ file: AsynCustomSelect.tsx ~ line 27 ~ AsynCustomSelect ~ getList", getListDgsSport);
  }, [getListDgsSport]);

  // React.useEffect(() => {
  //   console.log("🚀 ~ file: AsynCustomSelect.tsx ~ line 27 ~ AsynCustomSelect ~ getList", getListDgsSport);
  // }, [getListDgsSport]);
  return (
    <MainCard title="List league mapping">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna
        alissa. Ut enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons
        construal. Duos aube grue dolor in reprehended in voltage veil esse colum doolie eu fujian bulla parian.
        Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate descent molls anim id est labours.
      </Typography>
    </MainCard>
  );
};
export default ListLeagueMapping;
