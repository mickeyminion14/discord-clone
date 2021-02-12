import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, IconButton, Tooltip } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "./CustomDialog.scss";
const CustomDialog = ({ isOpen, fullWidth, handleClose, children }: any) => {
  return (
    <div className="dialogWrapper">
      <Dialog
        fullWidth={fullWidth}
        className="dialog"
        maxWidth="md"
        open={isOpen}
      >
        <IconButton onClick={handleClose} className="closeButton">
          <Tooltip title="Close">
            <Close />
          </Tooltip>
        </IconButton>
        <DialogContent className="content">{children}</DialogContent>
      </Dialog>
    </div>
  );
};

CustomDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default CustomDialog;
