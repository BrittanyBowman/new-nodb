import React, { Component } from "react";
import FavoriteDetails from '../FavoriteDetails/FavoriteDetails';

//import axios from 'axios';
//https://restcountries.eu/rest/v2/all
//`https://sandbox-api.brewerydb.com/v2/beer/random/?key=35f6daa6b7c71178b5f268208684bd55`

class Favorites extends Component {
  render() {
    const faves = this.props.faves.map(fave => (
      <FavoriteDetails key={fave.id} fave={fave} />
    ));

    return (
      <div>
        <button
          type="button"
          className="myButton"
          onClick={() => this.props.getFavorites()}
        >
          Favorite Countries
        </button>

        {faves}
      </div>
    );
  }
}

export default Favorites;
