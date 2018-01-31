import React, { Component } from 'react';
import {StarSVG as StarImg} from '../../images/icons';
import firebaseDB from "../api/firebase";
import './RatingSystem.css';


const Star = (props) => {

  const stateClassSuffix = (props.filledStars === true ? 'fill' : 'empty');

  const clickOnStars = (event) => {
    event.stopPropagation();
    props.setStars(props.starNum);
  }

  const hoverOnStars = (event) => {
    event.stopPropagation();
    props.hoverStars(props.starNum);
  }


  return (
    <div
      starNum={props.starNum}
      onClick={clickOnStars}
      onMouseEnter={hoverOnStars}
      className={'star-' + stateClassSuffix}>
      <StarImg onClick={clickOnStars}/>
    </div>
  )
}

class RatingSystem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starNum: props.starNum,
      filledStars: null
    }
    this.ratingKey = null;
  }

  render() {
    var i = 1;
    var stars = [];

    while (i < 6) {
      const currentRating = (this.state.filledStars == null ? this.state.starNum : this.state.filledStars);
      stars.push(
        <Star
          starNum={i}
          filledStars={i <= currentRating}
          setStars={(starNum) => this.setStars(starNum)}
          hoverStars={(starNum) => this.selectStars(starNum)}
          key={i}/>
      );
      i++;
    }

    return (
      <div className="stars" onMouseLeave={() => this.selectStars(null)}>
        {stars}
      </div>
    )
  }

  setStars(starNum) {
    this.setState({
      starNum
    });
    this.saveRating(starNum);
  }

  selectStars(starNum) {
    this.setState({
      filledStars: starNum
    });
  }

  saveRating(starNum) {
    const ratingPath = `/accounts/${this.props.accountId}/apps/${this.props.appId}/ratings/`;

    if (this.ratingKey !== null) {
      // Save rating key so it can be changed later
      firebaseDB.ref(ratingPath + this.ratingKey).set({starNum});
    } else {
        // If user already voted the app, modify previous rating in database t user already voted same app before
      this.ratingKey = firebaseDB.ref(ratingPath).push({starNum}).key;
    }
  }

}



export default RatingSystem;
