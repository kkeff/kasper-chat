import React from 'react';

export default function FriendsList(props) {

    function Friend(props) {
        return (
            <div className="friend">
                <span>{props.friend.name}</span>
                <span>{props.friend.status}</span>
            </div>
        );
    }

    return (
        <div className="friends-list">
            {props.friends.map(function (f, i) {
                return <Friend friend={f} key={i}></Friend>;
            })}
        </div>
    );
}
