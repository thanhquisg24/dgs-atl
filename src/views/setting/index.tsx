import { diRepositorires } from "@adapters/di";
import { IALMSetting, IDonbestSetting, ISystemSettingPayload } from "@adapters/dto";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Grid, TextField } from "@mui/material";
import { gridSpacing } from "@store/constant";
// project imports
import MainCard from "@ui-component/cards/MainCard";
import BasicIconTooltip from "@ui-component/icon-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import DgsUserSelectbox from "./dgs-user-select";

// ==============================|| SAMPLE PAGE ||============================== //

interface IFormValue extends IDonbestSetting, IALMSetting {}
const defaultValues: IFormValue = {
  apiKey: "",
  streamUsername: "",
  streamPassword: "",
  streamBrokerUrl: "",
  almUser: "",
  almIdUser: -1,
};
const basicRequireRule = { required: "This is required." };
const SettingPage = () => {
  const {
    control,
    reset,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });
  const [state, setState] = React.useState<any>(null);
  React.useEffect(() => {
    diRepositorires.systemSettings.fetAllSystemSettings().then((result: ISystemSettingPayload) => {
      setState(result);
      console.log("🚀 ~ file: index.tsx ~ line 37 ~ diRepositorires.systemSettings.fetAllSystemSettings ~ result", result);
    });
    return () => setState(null);
  }, []);

  React.useEffect(() => {
    if (state !== null) {
      reset({ ...state.almSetting, ...state.donbestSetting, almIdUser: { id: state.almSetting.almIdUser, label: state.almSetting.almUser } });
    }
  }, [reset, state]);

  const onRefreshToken = () => {
    emitStartLoading();

    diRepositorires.systemSettings
      .fetNewToken()
      .then((result) => {
        setValue("apiKey", result);
      })
      .catch((error) => notifyMessageError(error.message))
      .finally(() => emitStopLoading());
  };
  const onSubmit = (data: IFormValue | any) => {
    emitStartLoading();
    const payload: ISystemSettingPayload = {
      donbestSetting: data,
      almSetting: {
        almUser: data.almIdUser.label,
        almIdUser: data.almIdUser.id,
      },
    };
    diRepositorires.systemSettings
      .postUpdateSystemSetting(payload)
      .then(() => {
        notifyMessageSuccess("Update Setting successfull!");
      })
      .catch((error) => notifyMessageError(error.message))
      .finally(() => emitStopLoading());
  };

  return (
    <MainCard title="System Setting">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid spacing={gridSpacing} container>
          <Grid item md={4}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="baseline">
              {/* <TextField
                label="ALM User Name "
                sx={{ flex: 1, mt: 1 }}
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("almIdUser", basicRequireRule)}
                error={!!errors.almIdUser}
                helperText={errors.almIdUser?.message}
              /> */}
              <Controller
                control={control}
                name="almIdUser"
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <DgsUserSelectbox
                    sx={{ mt: 2 }}
                    id="id-alm-user-name"
                    label="ALM User Name"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.almIdUser?.message}
                    idField="idUser"
                    textField="loginName"
                  />
                  // <CustomAutoCompleteV2
                  //   sx={{ mt: 2 }}
                  //   id="id-alm-user-name"
                  //   label="ALM User Name"
                  //   size="small"
                  //   registerProp={field}
                  //   errorMsg={errors.almIdUser?.message}
                  //   idField="idUser"
                  //   textField="loginName"
                  //   queryStr={JSON.stringify({
                  //     resource: "dgs-user",
                  //     perPage: 50,
                  //     sort: { field: "loginName", order: "ASC" },
                  //   })}
                  //   defaultOption={[{ id: state?.almSetting.almIdUser, label: state?.almSetting.almUser }]}
                  // />
                )}
              />

              <TextField
                label="Donbest Api Key"
                sx={{ flex: 1, mt: 2 }}
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("apiKey", basicRequireRule)}
                error={!!errors.apiKey}
                helperText={errors.apiKey?.message}
                InputProps={{ endAdornment: <BasicIconTooltip icon={<RefreshIcon onClick={() => onRefreshToken()} />} title="Refresh a new Token" /> }}
              />

              <TextField
                label="Donbest Stream Username"
                sx={{ flex: 1, mt: 2 }}
                {...register("streamUsername", basicRequireRule)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.streamUsername}
                helperText={errors.streamUsername?.message}
              />
              <TextField
                label="Donbest Stream Password"
                sx={{ flex: 1, mt: 2 }}
                {...register("streamPassword", basicRequireRule)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.streamPassword}
                helperText={errors.streamPassword?.message}
              />
              {/* <TextField
                disabled
                label="Donbest Stream Broker Url"
                sx={{ flex: 1, mt: 2 }}
                InputLabelProps={{ shrink: true }}
                {...register("streamBrokerUrl", basicRequireRule)}
                fullWidth
                error={!!errors.streamBrokerUrl}
                helperText={errors.streamBrokerUrl?.message}
              /> */}
              <Button type="submit" variant="contained" sx={{ flex: 1, mt: 2 }}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default SettingPage;
