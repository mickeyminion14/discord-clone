import {
  EditLocationRounded,
  Notifications,
  PeopleAltRounded,
  SearchRounded,
  SendRounded,
} from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../../features/userSlice";
import { auth } from "../../../../Firebase/Firebase";
import "./ChatHeader.scss";

import MenuIcon from "@material-ui/icons/Menu";
import { selectSidebarOpen, setSidebar } from "../../../../features/appSlice";

function ChatHeader({ channelName }: any) {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(selectSidebarOpen);

  const logoutUser = () => {
    dispatch(logout());
    auth.signOut();
  };

  const toogleSidebar = () => {
    dispatch(setSidebar({ sidebarOpen: !sidebarOpen }));
  };

  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <MenuIcon onClick={toogleSidebar} className="sidebar__toogle" />
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        {/* <Notifications />
        <EditLocationRounded />
        <PeopleAltRounded />
        <div className="chatHeader__search">
          <input type="text" placeholder="Search" />
          <SearchRounded />
        </div>
        <SendRounded /> */}
        <ExitToAppIcon onClick={logoutUser} />
      </div>
    </div>
  );
}

export default ChatHeader;
