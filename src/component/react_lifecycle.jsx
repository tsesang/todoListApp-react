import React from "react";
import { Component } from "react";

export default class LifeCycle extends Component {
  state = {
    count: 0,
    age: 0,
    check: true,
  };

  handleClick = () => {
    this.setState({
      age: this.state.age + 1,
    });
  };

  handleCheck = () => {
    this.setState({
      check: !this.state.check,
    });
  }

  componentDidMount() {
    console.log("component mounted");
  }

  componentWillUnmount() {
    console.log("component will unmount ...");
  }

  componentDidUpdate() {
    console.log("component did update");
  }

  render() {
    return (
      <div>
        <h1>hello</h1>
        <div>
          <div>
            <h1>age: {this.state.age}</h1>
            <button onClick={this.handleClick}>Increment Age</button>
          </div>
          <div>
            <h1>{this.state.check && "hello world"}</h1>
            <button onClick={this.handleCheck}>{this.state.check ? "hide" : "reveal"}</button>
          </div>
        </div>
      </div>
    );
  }
}
