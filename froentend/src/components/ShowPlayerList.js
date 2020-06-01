import React, { Component } from 'react';
import axios from 'axios';
//Styling Css
import '../App.css';
//Custom Component
import Modal from './Model';

class ShowPlayerList extends Component {

  //Delete Function
  delete = player => {
    console.log("Delete")
    const url = `http://localhost:8082/api/players/${player._id}`
    axios
      .delete(url, this.state)
      .then(res => {
        console.log("Deleted");
        this.setState(previousState => {
          window.location.reload(false);
          return {
            players: previousState.players.filter(m => m.id !== player._id),
          };
        });
      })
      .catch(err => {
        console.log('Error Deleting' + err);
      });
  }

  //State for Popup Modal
  state = {
    showModal: 0
  };

  getModal = value => {
    this.setState({ showModal: value });
  };

  hideModal = value => {
    this.setState({ showModal: false });
  };


  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  //Display All Players
  componentDidMount() {
    axios
      .get('http://localhost:8082/api/players')
      .then(res => {
        console.log(res.data);
        this.setState({
          players: res.data

        })
      })
      .catch(err => {
        console.log('Error from ShowPlayerList');
      });

  };

  //Display Players List with Pop Up and Delete Functionality 
  render() {
    const players = this.state.players;
    console.log("PrintBook: " + players);
    let playersList;

    if (!players) {
      playersList = "there is no player recored!";
    } else {
      playersList = players.map((player, k) =>
        <div className="card-container">
          <div className="desc">
            <h2>
              {player.player_name}
            </h2>
            <p>{player.player_team}</p>
            <input type="button" onClick={() => this.getModal(k)} value="Get More Details" />
            <input type="button" onClick={this.delete.bind(this, player)} value="Delete" />

            <Modal
              show={this.state.showModal === k}
              onHide={() => this.hideModal(0)}
              name={player.player_name}
              runs={player.player_runs}
              dob={player.player_dob}
              team={player.player_team}
              avg={player.player_avg}
              matches={player.player_matches}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="ShowPlayerList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Players List</h2>
            </div>
            <br />
          </div>

          <div className="list">
            {playersList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowPlayerList;   