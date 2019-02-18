let favorites = [];

module.exports = {
  getFavorites: (req, res) => {
    res.send(favorites);
  },
  addToFavorites: (req, res) => {
    const { country } = req.body;
    favorites.push(country);
    res.status(200).send(favorites);
  },
  deleteFavorite: (req, res) => {
    const favoriteId = req.params.id;
    const indexOfFavorite = favorites.findIndex(
      country => country.id == favoriteId
    );

    if (indexOfFavorite == -1) {
      return res.status(404).send({
        message: "Could not find favorite with id of " + favoriteId
      });
    }

    favorites.splice(indexOfFavorite, 1);

    res.send(favorites);
  },

  updateTags: (req, res) => {
    const favoriteTags = req.params.tags;
    const indexOfFavorite = favorites.findIndex(
      country => country.tags == favoriteTags
    );
    res.send(favorites);
  }
};
