import {
  Drawer,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from "@store/actions";
import { useDispatch, useSelector } from "react-redux";

import AnimateButton from "@ui-component/extended/AnimateButton";
import { IconSettings } from "@tabler/icons";
// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
// project imports
import SubCard from "@ui-component/cards/SubCard";
import { gridSpacing } from "@store/constant";
// material-ui
import { useTheme } from "@mui/material/styles";

// concat 'px'
function valueText(value: any) {
  return `${value}px`;
}

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state: any) => state.customization);

  // drawer on/off
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  // state - border radius
  const [borderRadius, setBorderRadius] = useState<any>(customization.borderRadius);
  const handleBorderRadius = (event: any, newValue: any) => {
    setBorderRadius(newValue);
  };

  useEffect(() => {
    dispatch({ type: SET_BORDER_RADIUS, borderRadius });
  }, [dispatch, borderRadius]);

  let initialFont;
  switch (customization.fontFamily) {
    case "'Inter', sans-serif":
      initialFont = "Inter";
      break;
    case "'Poppins', sans-serif":
      initialFont = "Poppins";
      break;
    case "'Roboto', sans-serif":
    default:
      initialFont = "Roboto";
      break;
  }

  // state - font family
  const [fontFamily, setFontFamily] = useState(initialFont);
  useEffect(() => {
    let newFont;
    switch (fontFamily) {
      case "Inter":
        newFont = "'Inter', sans-serif";
        break;
      case "Poppins":
        newFont = "'Poppins', sans-serif";
        break;
      case "Roboto":
      default:
        newFont = "'Roboto', sans-serif";
        break;
    }
    dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
  }, [dispatch, fontFamily]);

  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: "50%",
            borderBottomLeftRadius: "50%",
            borderTopRightRadius: "50%",
            borderBottomRightRadius: "4px",
            top: "25%",
            position: "fixed",
            right: 10,
            zIndex: theme.zIndex.speedDial,
          }}
        >
          <AnimateButton type="rotate">
            <IconButton color="inherit" size="large" disableRipple>
              <IconSettings />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 280,
          },
        }}
      >
        <PerfectScrollbar component="div">
          <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
            <Grid item xs={12}>
              <SubCard title="Font Family">
                <FormControl>
                  <RadioGroup
                    aria-label="font-family"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Roboto"
                      control={<Radio />}
                      label="Roboto"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "& .MuiFormControlLabel-label": { color: theme.palette.grey[900] },
                      }}
                    />
                    <FormControlLabel
                      value="Poppins"
                      control={<Radio />}
                      label="Poppins"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "& .MuiFormControlLabel-label": { color: theme.palette.grey[900] },
                      }}
                    />
                    <FormControlLabel
                      value="Inter"
                      control={<Radio />}
                      label="Inter"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "& .MuiFormControlLabel-label": { color: theme.palette.grey[900] },
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              <SubCard title="Border Radius">
                <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
                  <Grid item>
                    <Typography variant="h6" color="secondary">
                      4px
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Slider
                      size="small"
                      value={borderRadius}
                      onChange={handleBorderRadius}
                      getAriaValueText={valueText}
                      valueLabelDisplay="on"
                      aria-labelledby="discrete-slider-small-steps"
                      marks
                      step={2}
                      min={4}
                      max={24}
                      color="secondary"
                      sx={{
                        "& .MuiSlider-valueLabel": {
                          color: "secondary.light",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" color="secondary">
                      24px
                    </Typography>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
};

export default Customization;
