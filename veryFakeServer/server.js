import * as index from '../src/index';
import * as userUtil from './userUtil';
import * as messageUtil from './messageUtil';
import * as serverFunctions from './serverFunctions';

export default function server(){

  const user = userUtil.createInitalUser();
  const friends = userUtil.createInitialFriends();
  const messages = [];

  function addNewMessage (user, message){
    messages.push({user: user, message: message});
    index.listenToNewMessagesFromServer(messages);
  }

  function sendGreetingMessage(userName){
    setTimeout(function () {
      //addNewMessage(messages.randomGreetingMessage(userName))
    }, 1000);
  }

  // *** Very fake API ***
  return {
    getUser: function () {
        return user;
    },
    getFriends: function () {
      return friends;
    },
    getMessages: function () {
      sendGreetingMessage(user.name);
      return messages;
    },
    updateNewMessage: function (user, message) {
      // Simulate server response time
      setTimeout(function () {
        // addNewMessage(messages.randonGreetingMessage(userName))
        addNewMessage(user, message);
        if(serverFunctions.messageContainsActiveUserName(friends, message)){
          serverFunctions.sendConversationMessage(friends, user);
        }
      }, 250);
    }
  }
}
