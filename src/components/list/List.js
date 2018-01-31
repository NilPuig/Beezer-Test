import React, { Component } from 'react';
import firebaseDB from "../api/firebase";
import User from '../user/User';
import './List.css';

const List = () => (
  <section className="list">
    <ListContent/>
  </section>
)

class ListContent extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      status: 'fetch',
      search: ''
    }
  }

  componentDidMount() {
    const ref = firebaseDB.ref('/');

    ref.once('value')
      .then((result) => {
        this.setState({
          userList: ListContent.fetchData(result.val()),
          status: 'success'
        })
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          status: 'error'
        });
      })
  }


    // Fetch data
    static fetchData(result) {
      let users = [];

      Object.keys(result.users).forEach((userId) => {
        let user = {id: userId, ...result.users[userId]};

        // Get app List from user
        const appList = result.accounts[user.account].apps;

        // Add app property to user
        user.apps = Object.keys(appList).map((appId) => ({id: appId, ...appList[appId]}));
        users.push(user);
      });

      return users.sort((x, y) => x.name.localeCompare(y.name));
    }

  render() {

    const isLoaded = (this.state.status == "success");

    // Check if data was loaded succesfully
    if (!isLoaded) {
      return (
        <div className="loading-status">
          { !isLoaded ? "Please wait..." : "User list coudn't be retrieved" }
        </div>
      )
    }

    // Create user list
    else {
      return (

        <div className="list-content">
          <div className="list-header">
            <h1 className="list-title">User List</h1>
            <div className="search-box">
              <form>
                <input
                  className="search-input"
                  placeholder="Search users..."
                  autoComplete="off"
                  onChange={this.updateSearch.bind(this)}/>
              </form>
            </div>
          </div>

          <div >
          { this.state.userList.map((user, account) => {
              if (!user.name.toLowerCase().includes(this.state.search)) {
                return null;
              }
              return (
                  <User
                    key={account}
                    user={user}/>
              )
            })
          }
        </div>
        </div>
      )
  }
  }

  updateSearch(event) {
    this.setState({search: event.target.value.toLowerCase()})
  }

}

export default List;
