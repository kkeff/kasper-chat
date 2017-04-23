import React from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import FriendsList from './FriendsList';
import * as userUtil from '../util/userUtil';
import * as core from '../core';

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chatMessages: [],
            friends: userUtil.createInitialFriends(),
            user: userUtil.createInitalUser()
        };
        this.handleNewStatus = this.handleNewStatus.bind(this);
        this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
        this.setNewMessage = this.setNewMessage.bind(this);
        this.setNewFriends = this.setNewFriends.bind(this);
    }

    componentDidMount() {
        const that = this;
        this._randomMessageTimer = setTimeout(() => that.setNewMessage(core.createGreetingChatMessage(that.state.friends, that.state.user)), 1250);
        this._randomStatusTimer = setTimeout(() => {
            const newFriends = core.setNewStatusOnRandomFriend(that.state.friends);
            that.setNewFriends(newFriends);
        }, 2000);
    }

    componentDidUpdate(prevProps, prevState) {
        const that = this;
        if (core.shouldClearRandomMessageTimer(prevState.chatMessages, that.state.chatMessages)) {
            clearTimeout(this._randomMessageTimer);
            this._randomMessageTimer = setTimeout(() => that.setNewMessage(core.createIdleChatMessage(that.state.friends)), 13000);
        } else if (core.shouldClearRandomStatusChange(prevState.friends, that.state.friends)){
            clearTimeout(this._randomStatusTimer);
            this._randomStatusTimer = setTimeout(() => {
                core.setNewStatusOnRandomFriend(that.state.friends);
                that.setState({friends: core.setNewStatusOnRandomFriend(that.state.friends)})
            }, 2000);
        }
    }

    handleNewUserMessage(message) {
        const that = this;
        that.setNewMessage(core.createChatMessage(message, that.state.user));
        if (core.messageContainsActiveUserName(that.state.friends, message)) {
            const conversationChatMessage = core.createConversationChatMessage(that.state.friends, message, that.state.user.name);
            setTimeout(() => {
                that.setNewMessage(conversationChatMessage)
            }, 1250);
        }
    }

    handleNewStatus(friend, newStatus) {
        const that = this;
        if (core.shouldSendGreetingMessage(friend, that.state.friends)) {
            const greetingChatMessage = core.createGreetingChatMessage(that.state.friends, friend);
            setTimeout(() => {
                that.setNewMessage(greetingChatMessage)
            }, 2000);
        }
        const newFriends = core.getFriendsWithNewStatus(friend, newStatus, that.state.friends);
        that.setNewFriends(newFriends);
    }

    setNewFriends (newFriends){
        this.setState({friends: newFriends});
    }

    setNewMessage(newMessage) {
        const that = this;
        that.setState((prevState) => ({
            chatMessages: prevState.chatMessages.concat(newMessage)
        }));
    }

    render() {
        const that = this;
        return (
            <div className="container black">
                <div className="row">
                    <div className="col-8">
                        <ChatMessages chatMessages={that.state.chatMessages}></ChatMessages>
                        <ChatInput user={that.state.user.name}
                                   onNewUserMessage={that.handleNewUserMessage}></ChatInput>
                    </div>
                    <div className="col-4">
                        <FriendsList friends={that.state.friends}
                                     onNewStatus={that.handleNewStatus}></FriendsList>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppContainer;
