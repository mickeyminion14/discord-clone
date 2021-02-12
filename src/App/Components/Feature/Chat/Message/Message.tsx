import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.scss";
function Message({ timestamp, message, user }: any) {
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h4>
          {user.displayName}
          <span className="message_timestamp">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
