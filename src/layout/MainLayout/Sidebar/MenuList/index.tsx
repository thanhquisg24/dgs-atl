// project imports
import NavGroup from "./NavGroup";
import React from "react";
// material-ui
import { Typography } from "@mui/material";
import navigation from "../../../../menu-items/index";
// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = (): JSX.Element => {
  const navItems = navigation.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
