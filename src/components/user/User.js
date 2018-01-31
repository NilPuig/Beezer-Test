import React, { Component } from 'react';
import RatingSystem from "../rating/RatingSystem";
import './User.css';


const AppList = (props) => {
  return (

    <div className="app-list">

      <div className="separation-line"></div>

      <div className="app-list-title">• Apps:</div>
        { Object.keys(props.apps).map((appId, index) => {
          const app = props.apps[appId];

          var appRating = 0;

          // Check if there are previous ratings
          if (app.ratings !== undefined) {

            // Get average of rating
            var rankingTotal = 0;
            var rankingCount = 0;
            for (var i in app.ratings) {
                rankingTotal += app.ratings[i].starNum;
                rankingCount += 1;
            }
            appRating = rankingTotal / rankingCount;
          }
          return (
            <li key={index} className="app-list-item">
              <div>{app.title}</div>
              <RatingSystem
                starNum={appRating}
                accountId={props.accountId}
                appId={app.id}/>
            </li>
          )
          }
        )}
    </div>
  )
}

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const acountString = `Account ID: ${this.props.user.account}`;
    const userApps = this.props.user.apps;
    const userAppNum = userApps.length;
    var userAppNames = (userAppNum == 1)? `${userAppNum} App`: `${userAppNum} Apps`;

    return (

      <div className="user-box">
        <div className="user-details">
          <div>
            <div className="user">{this.props.user.name}</div>
            <div className="account">{acountString}</div>
          </div>
          <div>
              {userAppNames}
          </div>
        </div>
          { userAppNum > 0?
            <AppList
              accountId={this.props.user.account}
              apps={userApps}/> :null
          }
      </div>
    )
  }


}


export default User;
