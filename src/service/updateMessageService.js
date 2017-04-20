import server from '../../veryFakeServer';

export default function (user, message){
    server.updateNewMessage(user, message);
}
