import { diRepositorires } from "@adapters/di";
import { IALMSetting, IDonbestSetting, ISystemSettingPayload } from "@adapters/dto";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { Button, Grid, TextField } from "@mui/material";
import { gridSpacing } from "@store/constant";

// project imports
import MainCard from "@ui-component/cards/MainCard";
import React from "react";
import { useForm } from "react-hook-form";

// ==============================|| SAMPLE PAGE ||============================== //

interface IFormValue extends IDonbestSetting, IALMSetting {}
const defaultValues: IFormValue = {
  apiKey: "",
  streamUsername: "",
  streamPassword: "",
  streamBrokerUrl: "",
  almUser: "",
};
const basicRequireRule = { required: "This is required." };
const SettingPage = () => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues });

  React.useEffect(() => {
    diRepositorires.systemSettings.fetAllSystemSettings().then((result: ISystemSettingPayload) => {
      reset({ ...result.almSetting, ...result.donbestSetting });
    });
  }, [reset]);

  const onSubmit = (data: IFormValue) => {
    emitStartLoading();
    const payload: ISystemSettingPayload = {
      donbestSetting: data,
      almSetting: data,
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
              <TextField
                label="ALM User Name "
                sx={{ flex: 1, mt: 1 }}
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("almUser", basicRequireRule)}
                error={!!errors.almUser}
                helperText={errors.almUser?.message}
              />
              <TextField
                label="Donbest Api Key"
                sx={{ flex: 1, mt: 2 }}
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("apiKey", basicRequireRule)}
                error={!!errors.apiKey}
                helperText={errors.apiKey?.message}
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
              <TextField
                label="Donbest Stream Broker Url"
                sx={{ flex: 1, mt: 2 }}
                InputLabelProps={{ shrink: true }}
                {...register("streamBrokerUrl", basicRequireRule)}
                fullWidth
                error={!!errors.streamBrokerUrl}
                helperText={errors.streamBrokerUrl?.message}
              />
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
