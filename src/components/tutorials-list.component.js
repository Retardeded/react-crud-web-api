import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class CharactersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      filteredCharacters: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      doFiltering: false
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;


    this.setState({
      searchTitle: searchTitle,
      doFiltering: searchTitle != ""
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data,
          filteredCharacters: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    TutorialDataService.findByElement(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, doFiltering, filteredCharacters, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by element"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tutorials List</h4>

          <ul className="list-group">

          {doFiltering ? (


         filteredCharacters.filter(person => person.element.includes(searchTitle)).map((tutorial, index) => (
          <li
            className={
              "list-group-item " +
              (index === currentIndex ? "active" : "")
            }
            onClick={() => this.setActiveTutorial(tutorial, index)}
            key={index}
          >
            {tutorial.name}
          </li>
      ))) : (
        filteredCharacters.map((tutorial, index) => (
          <li
            className={
              "list-group-item " +
              (index === currentIndex ? "active" : "")
            }
            onClick={() => this.setActiveTutorial(tutorial, index)}
            key={index}
          >
            {tutorial.name}
          </li>
      )))
        }
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Character</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentTutorial.name}
              </div>
              <div>
                <label>
                  <strong>Element:</strong>
                </label>{" "}
                {currentTutorial.element}
              </div>
              <div>
                <label>
                  <strong>Tier:</strong>
                </label>{" "}
                {currentTutorial.tier}
              </div>
              <div>
                <label>
                  <strong>Weapon Type:</strong>
                </label>{" "}
                {currentTutorial.weaponType}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/characters/" + currentTutorial.name}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
