import React, { Component } from "react";


export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  

  handleSearchChange = (text) => {
    this.setState({ query: text });
  };

  handleClick = () => {
    //console.log('clicked in search');
    this.props.searchFN(this.state.query);
  }
  render() {
    return (
      <div>
        <input
          className="inputBox"
          type="text"
          placeholder="Search for users..."
          onChange={ e => {this.handleSearchChange(e.target.value)}}
          value={this.state.query}
        />
        <p>{this.state.query}</p>
        <button className="button" onClick={this.handleClick}>
                Find User!
        </button>
      </div>
    );
  }
}

export default Search;
