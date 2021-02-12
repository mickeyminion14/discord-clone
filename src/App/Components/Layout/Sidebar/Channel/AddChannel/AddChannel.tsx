import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { db } from "../../../../../Firebase/Firebase";
import "./AddChannel.scss";
import PropTypes from "prop-types";
import { snackBarService } from "../../../../../Common/Snackbar/Snackbar.service";
import { loaderService } from "../../../../../Common/Loader/Loader.service";

export const AddChannel = ({ handleClose }: any) => {
  const [channelName, setChannelName] = useState("");
  const [channelNameError, setchannelNameError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChannelNameChange = (event: any) => {
    let value: string = event.target.value;
    setChannelName(value.trimStart());
    if (value.trim() == "" || value == null || value == undefined) {
      setchannelNameError(true);
    } else {
      setchannelNameError(false);
    }
  };

  const handleAddChannel = () => {
    setLoading(true);
    db.collection("channels")
      .add({
        channelName: channelName,
      })
      .then((data) => {
        handleClose();
        snackBarService.openSnackbar("Channel added successfully");
        setLoading(false);
      })
      .catch((err) => {
        snackBarService.openSnackbar("Error adding new channel");
        setLoading(false);
      });
  };
  return (
    <div className="addChannelWrapper">
      <h3>Add channel</h3>

      <FormControl disabled={loading} size="small" error={channelNameError}>
        <TextField
          error={channelNameError}
          value={channelName}
          onChange={handleChannelNameChange}
          label="Channel Name"
          className="channelName"
          size="small"
          variant="outlined"
        />
        {channelNameError ? (
          <FormHelperText id="component-error-text">
            Enter a valid channel name
          </FormHelperText>
        ) : null}
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : (
        <Button disabled={channelNameError} onClick={handleAddChannel}>
          Add Channel
        </Button>
      )}
    </div>
  );
};

AddChannel.prototype = {
  handleClose: PropTypes.func.isRequired,
};
