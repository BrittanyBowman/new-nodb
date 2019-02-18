import React, { Component } from "react";
import axios from 'axios';
// TODO: import axios

export default class FavoriteDetails extends Component {
  state = {
    tags: this.props.fave.tags || "", 
    newTag: ''
  };

  updateTags(tags){
    axios.put("http://localhost:3002/api/faves/" + tags)
    .then(response => this.setState({ favoritesList: response.data }));
  }

  handNewTag = (tag) => {
    this.setState({newTag: tag})
  }

  render() {
    const { fave } = this.props;
    return (
      <div className="card">
        <h3>{fave.name}</h3>

        <input
          onChange={e => this.handNewTag(e.target.value)}
        />
        <button
          type="button" 
          onClick={() => this.props.updateTags(fave.tags)}>Update Tags
        </button>
        {/* TODO: Add click handler for the updateTags method */}

        <button
          type="button"
          onClick={() => this.props.deleteFavorite(fave.id)}
        >
          Delete
        </button>
      </div>
    );
  }
  // TODO: add updateTags method to actually send the request to update the tags in the back-end
}
