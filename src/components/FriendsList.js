import React from 'react';
import PropTypes from 'prop-types';
import * as core from '../core';

export default class FriendsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlternatives: []
        };
        this.handleToggleStatusAlternatives = this.handleToggleStatusAlternatives.bind(this);
    }

    handleToggleStatusAlternatives(event, friend) {
        event.preventDefault();
        const newShowAlternatives = this.state.showAlternatives;
        const index = newShowAlternatives.indexOf(friend.name);
        index > -1 ? newShowAlternatives.splice(index, 1) : newShowAlternatives.push(friend.name);
        this.setState((prevState) => ({
            showAlternatives: newShowAlternatives
        }));
    }

    render() {
        const that = this;

        function getCircleElement(friend) {
            let circleColor;
            switch (friend.status) {
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
                    <circle onClick={(event) => that.handleToggleStatusAlternatives(event, friend)}
                            className="status-circle"
                            cx="20"
                            cy="20"
                            r="10"
                            stroke={circleColor}
                            strokeWidth="5"
                            fillOpacity="0"/>
                </svg>
            );
        }

        function getStatusAlternativeElement() {
            return (
                <div className="row">
                    <div className="col-12">
                        <button>ASDF</button>
                    </div>
                </div>
            );
        }

        function getFriendElement(friend, i) {
            const shouldShowAlternatives = that.state.showAlternatives.some((sa) => sa === friend.name);
            const statusAlternativesElement = shouldShowAlternatives ?
                getStatusAlternativeElement(friend.status) :
                null;

            return (
                <div className="friend-container container" key={i}>
                    <div className="row">
                        <div className="friend-avatar col-7">
                            {getCircleElement(friend)}
                            <img src="dist/img/happy-poop-smiley.jpg" width="42" height="42"/>
                        </div>
                        <div className="friend-information col-5">
                            <div>{friend.name}</div>
                            <div>{core.getStatusText(friend.status)}</div>
                        </div>
                    </div>
                    {statusAlternativesElement}
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