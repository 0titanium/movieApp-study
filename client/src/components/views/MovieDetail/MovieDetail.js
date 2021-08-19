import React, { useState, useEffect } from "react";
import { Row, Button, Col } from "antd";
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from "../../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorite";
import Comments from "./Sections/Comments";
import { getCookie } from "../../../utils/getCookie";
import LikeDislikes from "./Sections/LikesDislikes";

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

  const userId = getCookie("user_id", document.cookie);

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
          <LikeDislikes />
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={userId} />
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
                      key={index}
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

        <Comments
            // CommentLists={CommentLists}
            // postId={movieId}
            // refreshFunction={updateComment}
          />
      </div>
    </div>
  );
}

export default MovieDetail;
