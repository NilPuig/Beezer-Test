import React from 'react';
import logoBeezer from '../../images/logo-beezer.png';
import './TopBar.css';


const TopBar = (props) => (
  <div className="TopBar">
    <img className="logo-img" src={logoBeezer}  alt="Beezer logo" />
  </div>
)

export default TopBar;
