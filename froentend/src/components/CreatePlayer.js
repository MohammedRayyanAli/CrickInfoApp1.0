import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';


class CreatePlayer extends Component {
  constructor() {
    super();
    this.state = {
      player_name: '',
      player_dob: '',
      player_team: '',
      player_matches: '',
      player_runs: '',
      player_avg: ''
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  //onsubmit
  onSubmit = e => {
    e.preventDefault();
    const data = {
      player_name: this.state.player_name,
      player_dob: this.state.player_dob,
      player_team: this.state.player_team,
      player_matches: this.state.player_matches,
      player_runs: this.state.player_runs,
      player_avg: this.state.player_avg
    };
  
    axios
      .post('http://localhost:8082/api/players', data)
      .then(res => {
        this.setState({
          player_name: '',
          player_dob: '',
          player_team: '',
          player_matches: '',
          player_runs: '',
          player_avg: ''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreatePlayer!");
      })
  };

  //Form
  render() {
    return (
      <div className="container_form">
        <center>
          <h1>Create Player</h1>
          <form noValidate onSubmit={this.onSubmit}>
            <label>Player Name    </label>
            <input type="text" id="player_name" name="player_name" placeholder="Player name.."
              value={this.state.player_name}
              onChange={this.onChange}
            />
            <br></br>

            <label>Player DOB    </label>
            <input type="date" id="player_dob" name="player_dob" placeholder="Your DOB.."
              value={this.state.player_dob}
              onChange={this.onChange}
            />
            <br></br>
            <label>Team    </label>
            <input type="text" id="player_team" name="player_team" placeholder="Name of Team.."
              value={this.state.player_team}
              onChange={this.onChange}
            />
            <br></br>
            <label>Matches   </label>
            <input type="number" id="player_matches" name="player_matches" placeholder="Number of Matches.."
              value={this.state.player_matches}
              onChange={this.onChange}
            />

<br></br>
            <label>Runs   </label>
            <input type="number" id="player_runs" name="player_runs" placeholder="Number of Runs.."
              value={this.state.player_runs}
              onChange={this.onChange}
            />

            <br></br>
            <label> Average     </label>
            <input type="number" id="player_avg" name="player_avg" placeholder="Player Average.."
              value={this.state.player_avg}
              onChange={this.onChange}
            />
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        </center>
      </div>
    );
  }
}

export default CreatePlayer;