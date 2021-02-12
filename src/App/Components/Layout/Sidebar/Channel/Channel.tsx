import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../../../../features/appSlice";
import "./Channel.scss";
export default function Channel({ id, channel }: any) {
  const dispatch = useDispatch();
  const handleChannelChange = () => {
    dispatch(setChannelInfo({ channelId: id, channelName: channel }));
  };
  return (
    <div className="channel" onClick={handleChannelChange}>
      <h4>
        <span className="channel__hash">#</span>
        {channel}
      </h4>
    </div>
  );
}
