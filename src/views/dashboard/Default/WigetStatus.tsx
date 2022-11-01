// material-ui
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

// project imports
import MainCard from "@ui-component/cards/MainCard";
import TotalIncomeCard from "@ui-component/cards/Skeleton/TotalIncomeCard";

// assets
import React from "react";

// styles
const CardWrapper = styled(MainCard)(() => ({
  overflow: "hidden",
  position: "relative",
  "&:after": {
    // eslint-disable-next-line quotes
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    // background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    // eslint-disable-next-line quotes
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    // background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

interface IProps {
  isLoading: boolean;
  title: string;
  subTitle: string;
  icon: React.ReactElement;
  status: "SUCCESS" | "ERROR" | "DEFAULT";
}

const WigetStatus = (props: IProps) => {
  const theme: any = useTheme();
  const { isLoading, title, subTitle, icon, status } = props;
  const bgColor = React.useMemo(() => {
    let bg = { backgroundColor: theme.palette.primary.light, color: theme.palette.primary.dark };
    let subTitleColor = { color: theme.palette.grey[500] };
    if (status === "ERROR") {
      bg = { backgroundColor: theme.palette.error.light, color: theme.palette.error.dark };
      subTitleColor = { color: theme.palette.error[500] };
    } else if (status === "SUCCESS") {
      bg = { backgroundColor: theme.palette.success.light, color: theme.palette.success.dark };
      subTitleColor = { color: theme.palette.success[500] };
    }
    return { bg, subTitleColor };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      ...bgColor.bg,
                    }}
                  >
                    {icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45,
                  }}
                  primary={<Typography variant="h4">{title}</Typography>}
                  secondary={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: bgColor.bg.color,
                        mt: 0.5,
                      }}
                    >
                      {subTitle}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default WigetStatus;
