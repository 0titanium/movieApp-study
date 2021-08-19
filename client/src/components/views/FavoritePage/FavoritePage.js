import React, { useState, useEffect } from "react";
import Axios from "axios";
import { IMAGE_BASE_URL, FAVORITE_SERVER } from "../../../Config";
import { getCookie } from "../../../utils/getCookie";
import "./FavoritePage.css";
import { Button, Popover } from "antd";

function FavoritePage() {

  const userId = getCookie("user_id", document.cookie);

  const [Favorites, setFavorites] = useState([]);

  const fetchFavoriteMovies = () => {
    Axios.post(`${FAVORITE_SERVER}/getFavoriteMovies`, {
      userFrom: userId,
    }).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setFavorites(response.data.favoriteList);
      } else {
        alert("favorite list를 가져오는 것에 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  const removeFromFavorite = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    Axios.post(`${FAVORITE_SERVER}/removeFromFavorite`, variables).then(
      (response) => {
        if (response.data.success) {
          fetchFavoriteMovies();
        } else {
          alert("favorite list에서 지우는 것에 실패했습니다.");
        }
      }
    );
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img
            src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}
            alt="favorite.movieTitle"
          />
        ) : (
          `${favorite.movieTitle}`
        )}
      </div>
    );

    return (
      <tr key={index} className="favoriteRow">
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td className="favoriteInfo">{favorite.movieTitle}</td>
        </Popover>
        <td className="favoriteInfo">{favorite.movieRunTime} mins</td>
        <td className="favoriteInfo">
          <Button
            onClick={() =>
              removeFromFavorite(favorite.movieId, favorite.userFrom)
            }
          >
            Remove
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table className="favoriteTable">
        <thead>
          <tr className="favoriteRow">
            <th className="favoriteInfo">Movie title</th>
            <th className="favoriteInfo">Movie runtime</th>
            <td className="favoriteInfo">Remove from favorite list</td>
          </tr>
        </thead>
        <tbody>{Favorites && renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
