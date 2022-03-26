import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddCharacter extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeElement = this.onChangeElement.bind(this);
    this.onChangeTier = this.onChangeTier.bind(this);
    this.onChangeWeaponType = this.onChangeWeaponType.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      name: null,
      element: "",
      tier: "", 
      weaponType: "",

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeElement(e) {
    this.setState({
      element: e.target.value
    });
  }

  onChangeTier(e) {
    this.setState({
      tier: e.target.value
    });
  }

  onChangeWeaponType(e) {
    this.setState({
      weaponType: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      name: this.state.name,
      element: this.state.element,
      tier: this.state.tier,
      weaponType: this.state.weaponType
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          name: response.data.name,
          element: response.data.element,
          tier: response.data.tier,
          weaponType: response.data.weaponType,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      name: null,
      element: "",
      tier: "",
      weaponType: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName
          }
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Element</label>
              <input
                type="text"
                className="form-control"
                id="element"
                required
                value={this.state.element}
                onChange={this.onChangeElement}
                name="element"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tier">Tier</label>
              <input
                type="text"
                className="form-control"
                id="tier"
                required
                value={this.state.tier}
                onChange={this.onChangeTier}
                name="tier"
              />
            </div>

            <div className="form-group">
              <label htmlFor="weaponType">Weapon Type</label>
              <input
                type="text"
                className="form-control"
                id="weaponType"
                required
                value={this.state.weaponType}
                onChange={this.onChangeWeaponType}
                name="weaponType"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
