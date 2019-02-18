import React, { Component } from "react";
import "./App.css";
import Todos from "./Components/Todos";
import Header from "./Components/Layout/Header";
import AddToDo from "./Components/AddToDo";
import uuid from "uuid";
import axios from "axios";
import Search from "../src/Components/Search";

import Header2 from "./Components/Header/Header2";
import Favorites from "./Components/Favorites/Favorites";
import Footer from "./Components/Footer/Footer";

const baseUrl = "https://api.github.com/users";

class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
      randomCountry: null,
      favoritesList: [],
      name: "",
      avatar: "",
      company: "",
      email: "",
      location: "",
      bio: "",
      query: "",
      searchArray: [],
      todos: [
        {
          id: uuid.v4(),
          title: "BryanSmith33",
          completed: false
        },
        {
          id: uuid.v4(),
          title: "Dmust32",
          completed: false
        },
        {
          id: uuid.v4(),
          title: "cwadrupldijjit",
          completed: false
        }
      ]
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(text) {
    //console.log("clicked")
    axios.get(`${baseUrl}/${text}`)
    .then(response =>
      this.setState({
        name: response.data.name,
        avatar: response.data.avatar_url,
        company: response.data.company,
        email: response.data.email,
        location: response.data.location,
        bio: response.data.bio
      })
    );
  }
  //Toggle Complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };
  //Delete Todo
  delTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  //Add Todo
  addTodo = title => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  deleteFavorite = id => {
    axios
      .delete(`http://localhost:3002/api/faves/${id}`)
      .then(response => this.setState({ favoritesList: response.data }));
  };
  getFavorites = () => {
    axios
      .get("http://localhost:3002/api/faves")
      .then(response => this.setState({ favoritesList: response.data }));
  };

  componentDidMount() {
    axios.get("http://restcountries.eu/rest/v2/all").then(response => {
      this.setState({
        allCountries: response.data
      });
    });
  }

  addToFavorites = () => {
    axios.post("http://localhost:3002/api/faves", {
        country: this.state.randomCountry
      })
      .then(response => {
        console.log(".then", response.data);
        this.setState({
          favoritesList: response.data
        });
      });
  };

  getRandom = () => {
    let i = Math.floor(
      Math.random() * Math.floor(this.state.allCountries.length)
    );
    this.setState({ randomCountry: this.state.allCountries[i] });
  };

  render() {
    let country = this.state.randomCountry;
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddToDo addTodo={this.addTodo} />
          <Todos
            todos={this.state.todos}
            markComplete={this.markComplete}
            delTodo={this.delTodo}
          />
          <div className="wrapper">
            <div className="button__container">
              <Search searchFN={this.handleClick} />
              <p>{this.state.name}</p>
              <p>
                <img src={this.state.avatar} alt="" />
              </p>
              <p>{this.state.company}</p>
              <p>{this.state.email}</p>
              <p>{this.state.location}</p>
              <p>{this.state.bio}</p>
              <Header2 getRandomCountry={this.getRandom} />

              {this.state.randomCountry ? (
                <div>
                  <div className="country-card" key={country.id}>
                    {country.name}
                    <button type="button" onClick={() => this.addToFavorites()}>
                      Add Me!
                    </button>
                  </div>
                </div>
              ) : null}

              <Favorites
                faves={this.state.favoritesList}
                getFavorites={() => this.getFavorites()}
                deleteFavorite={() => this.deleteFavorite()}
              />

              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

//BRITTANY'S NOTES: Create a button that pulls information from an API, and returns just the data you WANT from the API.

//LINE 19: 1- Make a button inside of the render method in App.js, underneath the "extends Component" class. This will appear as a simple button on your browser screen (after updating the App.css file).

//LINES 5, 18, and 11: 2- Make an onClick FUNCTION called "handleClick" to HANDLE the data mutation that occurs when someone clicks the button in the browser. The alteration/mutation of the click will be handled with STATE. As such, build your constructor function inside of the App extends component.

// Line 6: 3- Create the constructor function with empty props (I think?). Create the super function to INITIALIZE STATE.

// Line 12: 4- Bind the data mutation of someone CLICKING the button to STATE. To do this, we use "this" . Now, the handleClick function can "handle" the alteration of the state of the object (or, the state of the button, in this case).

//LINE 11: 5- This is where you will create the actual function for handleClick, and test whether it is working inside of the render() method by using a console.log('Success'). ALWAYS put functions ABOVE the render() method.

//SECTION 2

//LINE 8: 6- Add STATE to our parent App component inside the App.js file.

//LINE 15: 7- In step 5, you made a function called "handleClick" that currently only logs whether it is working with "Success" in the console. If so, delete the console.log, and write what you want the function to ACTUALLY DO when it is called. In this case, we want to make a GET request with axios to a URL. To ensure it is working, tell the console to RESPOND with a .then() method, which tells the program to WAIT for the API to send the data, and THEN to log it in the console for me to see.

//Section 3

//3.1 Return to your handleClick function. We need to ONLY display the information we want from the API, and not ALL the information it is spewing out into the console. As such, I need TO PARSE that data, which means "to take apart" in Latin. After we parse it, we only want the console to DISPLAY the information we desire: in this case, only the NAMES of the Breweries (or whatever, I don't think I will end up using breweries).

// 3.2 Delete the "console.log(response));" from the handleClick, and replace it with "this.setState({name: response.data.name}))"

//3/3 Once you've changed your handleClick function, go into your render() method and make a <p> tag, adding in { this.state.name } with JSX.

//MORE NOTES FOR MY USE

// What is the DOM?

// The DOM, or Document Object Model, is an APPLICATION PROGRAMMING INTERFACE, or API.

// What does the DOM do? GIVES STRUCTURE LIKE A TREE, OR GROVE, OR ROOTS, ETC

// The DOM is an API (application programming interface). It is based on an object structure that RESEMBLES the structure of the documents that it MODELS.

// An object model is a collection of descriptions of classes or interfaces, together with their member data, member functions, and class-static operations.

// In React, you have the render() method that creates a node tree from React components, and this updates the tree in response to mutations in the data model that are caused by actions. The VIRTUAL DOM is React’s LOCAL COPY of the ACTUAL HTML DOM. It allows React to DO its computations and skip the real DOM operations…

// What are components in React?

// A React component is basically a JavaScript function.  When you have a component in REACT, it has a PROPS (input) instead of a PARAMS (input) like in regular JS methods.

// Example 1: Functional Components. DO NOT CONTAIN STATE. CONNECTED TO ROOT, but NOT THE PARENT – CHILD USES PROPS. PROPS ARE JUST VARIABLE PARAMETERS.

// Function Welcome(props){
// 	Return <h1>Hello, {props.name}</h1>
// }

// Example 2: ES6 class DEFINING A COMPONENT

// class Welcome extends Component {
// 	render() //RENDER BUILDS A STRUCTURE, like a tree, from ALL the components in your file. It UPDATES the tree in response to the mutations/actions taken in file data. //
// 		return <h1> Hello, {this.props.name}</h1>
// }

// Example of built in (from the DOM API) React Elements:

// Const element = <div />

// Example of user defined (meaning, I create the element myself and it is NOT from the DOM API) COMPONENTS:

// Const element = <Welcome name=”sara” />; //Does this mean that I need to CREATE the component in the component folder, then add a welcomeName.Js file and import it into App.js ??? OR is this just a self closing tag?

// What does react do with an ELEMENT that REPRESENTS a user-defined COMPONENT?

// React passes JSX attributes to the COMPONENT (i.e., the element) as a SINGLE OBJECT. That single object is identified as “props” .

// THUS: React is breaking into pieces our project so we can do it one piece at a time. DUH.

// What is the React Lifecycle and how does it work?

// There are 3 main phases of a component. They are:

// 1.	Mounting.
// 2.	Updating.
// 3.	Unmounting.
