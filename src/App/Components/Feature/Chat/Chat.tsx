import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
  Send,
} from "@material-ui/icons";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectChannelName, selectChannelId } from "../../../features/appSlice";
import { selectUser } from "../../../features/userSlice";
import { db } from "../../../Firebase/Firebase";
import "./Chat.scss";
import ChatHeader from "./ChatHeader/ChatHeader";
import Message from "./Message/Message";
import noChatLogo from "../../../../assets/empty_chat.svg";
import noChannelLogo from "../../../../assets/no_channel.svg";
import firebase from "firebase";
import { useRef } from "react";
import { snackBarService } from "../../../Common/Snackbar/Snackbar.service";
function Chat() {
  const user = useSelector(selectUser);

  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<any>>([]);

  const chat_container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
      setTimeout(() => {
        if (chat_container.current)
          chat_container.current.scrollTop =
            chat_container.current?.scrollHeight;
      }, 100);
    }
  }, [channelId]);

  const sendMessage = (e: any) => {
    if (channelId) {
      e.preventDefault();
      if (input != "") {
        db.collection("channels").doc(channelId).collection("messages").add({
          message: input,
          user: user,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
        setTimeout(() => {
          if (chat_container.current)
            chat_container.current.scrollTop =
              chat_container.current?.scrollHeight;
        }, 100);
      } else {
        snackBarService.openSnackbar("Dont spam empty messages !", "error");
      }
    }
  };

  const handleInputChange = (event: any) => {
    const value: string = event.target.value;

    setInput(value.trimStart());
  };
  return (
    <Fragment>
      {channelName ? (
        <div className="chat">
          <ChatHeader channelName={channelName} />

          <div
            ref={chat_container}
            className={`chat__messages ${!messages.length ? "center" : ""}`}
          >
            {messages.length ? (
              messages.map((message, idx) => (
                <Message
                  key={idx}
                  timestamp={message.timestamp}
                  user={message.user}
                  message={message.message}
                />
              ))
            ) : (
              <img src={noChatLogo} alt="" />
            )}
          </div>
          <div className="chat__input">
            <AddCircle fontSize="large" />
            <form>
              <input
                disabled={!channelId}
                onChange={handleInputChange}
                value={input}
                placeholder={`Message #${channelName}`}
                type="text"
              />
              <button
                onClick={sendMessage}
                className="chat__inputButton"
                type="submit"
              >
                Send Message
              </button>
            </form>
            <div className="chat__inputIcons">
              {/* <CardGiftcard fontSize="large" />
              <Gif fontSize="large" /> */}
              <Send
                // disabled={!channelId}
                onClick={sendMessage}
                fontSize="large"
              />
              {/* <EmojiEmotions fontSize="large" /> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="no__channel">
          <ChatHeader channelName={channelName} />

          <img className="no__channelImg" src={noChannelLogo} alt="" />
        </div>
      )}
    </Fragment>
  );
}

export default Chat;
