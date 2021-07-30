import React, { useEffect, useState } from "react";
import Axios from "axios";
import {FAVORITE_SERVER} from "../../../../Config";

import { Button } from "antd";

/*
  로그인 하지 않았을 때 favorite을 사용하면 안되는데?
  로그인 상태가 아니라면?
  favorite req를 보내지 않아야겠지?
  auth()를 해서?
  로그인? -> 원래 기능?
  낫로그인? -> alert?
  */
function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };

  useEffect(() => {
    Axios.post(`${FAVORITE_SERVER}/favoriteNumber`, variables).then((response) => {
      console.log(response.data);
      setFavoriteNumber(response.data.favoriteNumber);
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert("숫자 정보를 가져오는 것에 실패 했습니다.");
      }
    });

    Axios.post(`${FAVORITE_SERVER}/favorited`, variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("정보를 가져오는 것에 실패 했습니다.");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post(`${FAVORITE_SERVER}/removeFromFavorite`, variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Favorite 리스트에서 지우는 것에 실패했습니다.");
          }
        }
      );
    } else {
      Axios.post(`${FAVORITE_SERVER}/addToFavorite`, variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 리스트에 추가하는 것에 실패했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {Favorited ? " Not Favorite" : "Add to Favorite "} {FavoriteNumber}{" "}
      </Button>
    </div>
  );
}

export default Favorite;
