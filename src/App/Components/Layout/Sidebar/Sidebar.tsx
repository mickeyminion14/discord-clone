import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import Channel from "./Channel/Channel";
import {
  Call,
  HeadsetSharp,
  InfoOutlined,
  MicOutlined,
  Settings,
  SignalCellularAlt,
} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import { db } from "../../../Firebase/Firebase";
import CustomDialog from "../../../Common/CustomDialog/CustomDialog";
import { AddChannel } from "./Channel/AddChannel/AddChannel";
import { selectSidebarOpen, setSidebar } from "../../../features/appSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [addChannelDialogOpen, setAddChannelDialogOpen] = useState(false);
  const [channels, setChannels] = useState<Array<any>>([]);
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarOpen = useSelector(selectSidebarOpen);

  const toogleSidebar = () => {
    dispatch(setSidebar({ sidebarOpen: !sidebarOpen }));
  };
  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc: any) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : "close"}`}>
      <div className="sidebar__top">
        <h3>{user.displayName}</h3>
        <ExpandMoreIcon onClick={toogleSidebar} />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon
            onClick={() => setAddChannelDialogOpen(true)}
            className="sidebar__addChannel"
          />
        </div>

        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }, idx) => (
            <Channel key={idx} id={id} channel={channel.channelName} />
          ))}
        </div>
      </div>
      {/* <div className="sidebar__voice">
        <SignalCellularAlt className="sidebar__voiceIcon" fontSize="large" />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlined />
          <Call />
        </div>
      </div> */}

      <div className="sidebar__profile">
        <Avatar src={user.photo} />
        <div className="sidebar_profileInfo">
          <h3>Sarthak Agrawal</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <MicOutlined />
          <HeadsetSharp />
          <Settings />
        </div>
      </div>

      <CustomDialog
        fullWidth={false}
        isOpen={addChannelDialogOpen}
        handleClose={() => {
          setAddChannelDialogOpen(false);
        }}
      >
        <AddChannel
          handleClose={() => {
            setAddChannelDialogOpen(false);
          }}
        />
      </CustomDialog>
    </div>
  );
}
