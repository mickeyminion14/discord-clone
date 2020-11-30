import React from "react";
import "./Sidebar.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import Channel from "./Channel/Channel";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Sarthak</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon className="sidebar__addChannel" />
        </div>

        <div className="sidebar__channelsList">
          <Channel />
          <Channel />
          <Channel />

          <Channel />
        </div>
      </div>
    </div>
  );
}
