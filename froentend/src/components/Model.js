import React, { Component } from "react";

//Import Css
import '../App.css';

//Model PopUp Page
class Modal extends Component {
    render() {
        return (
            <React.Fragment> {
                this.props.show && (
                    <center>
                        <div className="modal">

                            <h1 > Player Details </h1>
                            <div className='block_inline' > Player Name: {this.props.name} </div>
                            <div className='block_inline' > Player DOB: {this.props.dob} </div>
                            <div className='block_inline' > Player Team: {this.props.team} </div>
                            <div className='block_inline' > Player Matches: {this.props.matches} </div>
                            <div className='block_inline' > Player Runs: {this.props.runs} </div>
                            <div className='block_inline' > Player Average: {this.props.avg} </div>
                            <br></br>
                            <input type="button"
                                onClick={this.props.onHide}
                                value="Close" />
                        </div>
                    </center>
                )
            }
            </React.Fragment>
        );
    }
}

export default Modal;