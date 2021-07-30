import React, { useState, useEffect } from "react";
import { List, Avatar, Row, Col, Button } from "antd";
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from "../../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorite";

/*
document.cookie - name=value
name에 맞는 string을 찾는다.
있으면 string index를 저장한다.
index 5(name=) 이후부터 마지막까지의 스트링을 리턴한다.
*/
const getCookie = (name, cookies) => {
  const searchName = name + "=";
  const searchNameLength = searchName.length;
  const nameIndexStart = cookies.indexOf(searchName);
  const val = cookies.substring(nameIndexStart+searchNameLength);

  return val;
}

function MovieDetail(props) {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  //   const [CommentLists, setCommentLists] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  //   const movieVariable = {
  //     movieId: movieId,
  //   };
  const userId = getCookie("user_id", document.cookie.toString());
  console.log(userId);
  
  const fetchDetailInfo = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setMovie(result);
        setLoadingForMovie(false);

        let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetch(endpointForCasts)
          .then((result) => result.json())
          .then((result) => {
            console.log(result);
            setCasts(result.cast);
          });

        setLoadingForCasts(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    console.log(movieId);
    let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchDetailInfo(endpointForMovieInfo);
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Header */}
      {!LoadingForMovie ? (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      ) : (
        <div>loading...</div>
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={userId}
          />
        </div>
        {/* Movie Info */}
        {!LoadingForMovie ? <MovieInfo movie={Movie} /> : <div>loading...</div>}

        <br />

        {/* Actors Grid*/}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button onClick={toggleActorView}>Toggle Actor View </Button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {!LoadingForCasts ? (
              Casts.map(
                (cast, index) =>
                  cast.profile_path && (
                    <GridCards
                      image={
                        cast.profile_path
                          ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                          : null
                      }
                      characterName={cast.name}
                    />
                  )
              )
            ) : (
              <div>loading...</div>
            )}
          </Row>
        )}
        <br />
      </div>
    </div>
  );
}

export default MovieDetail;
