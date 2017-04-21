import React from 'react';
import PropTypes from 'prop-types';
import * as core from '../core';

export default class FriendsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newStatus: null,
            showAlternativesForFriend: []
        };
        this.handleFriendStatusClick = this.handleFriendStatusClick.bind(this);
    }

    handleFriendStatusClick(event, friend) {

        event.preventDefault();

        console.log('THA CLAKICK');
        console.log(friend);
        console.log(two);
    }

    render() {
        const that = this;

        function getCircleElement (friend) {
            let circleColor;
            switch (friend.status){
                case 'ONLINE':
                    circleColor = 'green';
                    break;
                case 'IN_GAME':
                    circleColor = 'blue';
                    break;
                default:
                    circleColor = 'grey';
            }
            return (
                <svg height="40" width="40">
                    <circle onClick={(event) => that.handleFriendStatusClick(event, friend)} cx="20" cy="20" r="10" stroke={circleColor}  strokeWidth="5" fillOpacity="0"/>
                </svg>
            );
        }

        function getFriendElement(friend, i) {
            return (
                <div className="friend-container" key={i}>
                    <span className="friend-avatar-container">
                        {getCircleElement(friend)}
                        <img src="dist/img/happy-poop-smiley.jpg" width="42" height="42"/>
                    </span>
                    <div className="friend-information">
                        <div>{friend.name}</div>
                        <div>{core.getStatusText(friend.status)}</div>
                    </div>
                </div>
            );
        }

        const sortedFriends = core.sortFriends(that.props.friends);
        const friendElements = sortedFriends.map(getFriendElement);

        return (
            <div className="friends-list">
                {friendElements}
            </div>
        );
    }
}
FriendsList.propTypes = {
    friends: PropTypes.array
};