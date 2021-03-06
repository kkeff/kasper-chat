import React from 'react';
import PropTypes from 'prop-types';
import * as userUtil from '../util/userUtil';
import constants from '../util/constants';

export default class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlternatives: []
    };
    this.handleNewStatusClicked = this.handleNewStatusClicked.bind(this);
    this.handleToggleStatusAlternativesClicked = this.handleToggleStatusAlternativesClicked.bind(this);
    this.toggleStatusAlternatives = this.toggleStatusAlternatives.bind(this);
  }

  handleToggleStatusAlternativesClicked(event, friend) {
    event.preventDefault();
    this.toggleStatusAlternatives(friend);
  }

  toggleStatusAlternatives (friend){
    const newShowAlternatives = this.state.showAlternatives;
    const index = newShowAlternatives.indexOf(friend.name);
    index > -1 ? newShowAlternatives.splice(index, 1) : newShowAlternatives.push(friend.name);
    this.setState({ showAlternatives: newShowAlternatives });
  }

  handleNewStatusClicked (event, friend, status) {
    event.stopPropagation();
    this.props.onNewStatus(friend, status);
    this.toggleStatusAlternatives(friend);
  }

  render() {
    const that = this;

    function getCircleElement(friend) {
      let circleColor;
      if (friend.status === constants.status.ONLINE) {
        circleColor = 'green';
      } else if (friend.status === constants.status.IN_GAME){
        circleColor = 'blue';
      } else {
        circleColor = 'grey';
      }
      return (
        <svg height="40" width="40">
          <circle className="status-circle" cx="20" cy="20" r="10" stroke={circleColor} strokeWidth="5" fillOpacity="0"/>
        </svg>
      );
    }

    function getStatusAlternativeElement(friend) {
      const statusInGameButton = (<button onClick={(event) => that.handleNewStatusClicked(event, friend, constants.status.IN_GAME)}>Go in game</button>);
      const statusOnlineButton = (<button onClick={(event) => that.handleNewStatusClicked(event, friend, constants.status.ONLINE)}>Go online</button>);
      const statusOfflineButton = (<button onClick={(event) => that.handleNewStatusClicked(event, friend, constants.status.OFFLINE)}>Go offline</button>);

      let buttons;
      if (friend.status === constants.status.ONLINE) {
        buttons = (<div className="col-12 status-alternatives">{statusInGameButton}{statusOfflineButton}</div>)
      } else if (friend.status === constants.status.IN_GAME){
        buttons = (<div className="col-12 status-alternatives">{statusOnlineButton}{statusOfflineButton}</div>)
      } else {
        buttons = (<div className="col-12 status-alternatives">{statusInGameButton}{statusOnlineButton}</div>)
      }

      return (
        <div className="row" >
          {buttons}
        </div>
      );
    }

    function getFriendElement(friend, i) {
      const shouldShowAlternatives = that.state.showAlternatives.some((sa) => sa === friend.name);
      const statusAlternativesElement = shouldShowAlternatives ?
        getStatusAlternativeElement(friend) :
        null;

      const poopSmileySrc = userUtil.getPoopSmileySrc(friend.status);

      return (
        <div className="friend-container container" key={i} onClick={(event) => that.handleToggleStatusAlternativesClicked(event, friend)}>
          <div className="row">
            <div className="friend-avatar col-7">
              {getCircleElement(friend)}
              <img src={poopSmileySrc} width="42" height="42"/>
            </div>
            <div className="friend-information col-5">
              <div>{friend.name}</div>
              <div>{userUtil.getStatusText(friend.status)}</div>
            </div>
          </div>
          {statusAlternativesElement}
        </div>
      );
    }

    const sortedFriends = userUtil.sortFriends(that.props.friends);
    const friendElements = sortedFriends.map(getFriendElement);

    return (
      <div className="friends-list">
      {friendElements}
      </div>
    );
  }
}
FriendsList.propTypes = {
  friends: PropTypes.array,
  onNewStatus: PropTypes.func.isRequired
};
