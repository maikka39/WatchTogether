import React from "react";
import { Container } from "react-bootstrap";
import { ChatItem, Input, Button } from "react-chat-elements"
import { sendMessage, setChatListener, clearChatListener } from "../../utils/chat"

import 'react-chat-elements/dist/main.css';
import "./Chat.scss"

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.chatMessagesRef = React.createRef();

    this.state = { messages: [], sendmessage: "" };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onMessage = this.onMessage.bind(this);

    setChatListener(this.onMessage)
  }

  componentWillUnmount() {
    clearChatListener()
  }

  handleMessageChange(event) {
    this.setState({ sendmessage: event.target.value });
  }

  sendMessage() {
    sendMessage(this.state.sendmessage)
  }

  onMessage(message) {
    this.setState(prevState => ({ messages: [...prevState.messages, message] }))
    this.chatMessagesRef.current.scrollTo(0, this.chatMessagesRef.current.scrollHeight)

  }

  render() {
    return (
      <Container id="Chat">
        <h2>Chat</h2>
        <Container className="chat-view p-0 d-flex flex-column" fluid>
          {/* <ChatList
          className="flex-fill"
          dataSource={messages} /> */}
          <Container ref={this.chatMessagesRef} className="chat-messages flex-fill">
            {this.state.messages.map((msg, idx) => {
              return (
                <ChatItem
                  key={idx}
                  // onClick={() => console.log(1)},
                  avatar={msg.avatar}
                  alt={msg.alt}
                  title={msg.title}
                  subtitle={msg.subtitle}
                  date={msg.date}
                  unread={msg.unread}
                />
              )
            })}
          </Container>
          <Input
            placeholder="Type here..."
            value={this.state.sendmessage}
            onChange={this.handleMessageChange}
            rightButtons={
              <Button
                color='white'
                backgroundColor='black'
                text='Send'
                onClick={this.sendMessage} />
            } />
        </Container>
      </Container>
    );
  }
}
