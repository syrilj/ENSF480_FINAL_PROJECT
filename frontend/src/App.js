import React, { Component } from "react";
import "./styles.css";
import CustomInput from "./componets/CustomInput";
import Button from "./componets/Button";

export default class App extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  render() {
    return (
        <div className="App">
          <form className="form">
            <CustomInput
                labelText="Email"
                id="email"
                formControlProps={{
                  fullWidth: true
                }}
                handleChange={this.handleChange}
                type="text"
            />
            <CustomInput
                labelText="Password"
                id="password"
                formControlProps={{
                  fullWidth: true
                }}
                handleChange={this.handleChange}
                type="password"
            />

            <Button type="button" color="primary" className="form__custom-button">
              Log in
            </Button>
          </form>
        </div>
    );
  }
}
