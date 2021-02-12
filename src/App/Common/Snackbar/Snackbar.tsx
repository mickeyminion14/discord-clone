import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { snackBarService } from "./Snackbar.service";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function SimpleSnackbar() {
  const [state, setState] = useState<{
    open: boolean;
    message: string;
    type: "info" | "success" | "warning" | "error";
  }>({
    open: false,
    message: "",
    type: "info",
  });
  useEffect(() => {
    snackBarService.getSnackBarSubject().subscribe(({ message, type }) => {
      setState({
        open: true,
        message: message,
        type: type ? type : "info",
      });
    });
  }, []);
  // effect

  const handleClose = (reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={state.open}
        autoHideDuration={4000}
        onClose={handleClose}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleClose} severity={state.type}>
          {state.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
