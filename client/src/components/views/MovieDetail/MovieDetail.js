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
import Axios from "axios";
import { COMMENT_SERVER } from "../../../Config";

function MovieDetail(props) {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  const movieVariable = {
    movieId: movieId,
  };

  const userId = getCookie("user_id", document.cookie);

  // movie Info
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

  const updateComment = (newComment) => {
    // setCommentLists(CommentLists.concat(newComment)); // add new comment
    fetchComments(movieVariable); // get all comments again
  };

  // get comments

  const fetchComments = (movieVariable) => {
    Axios.post(`${COMMENT_SERVER}/getComments`, movieVariable).then(
      (response) => {
        if (response.data.success) {
          console.log("response.data.comments", response.data.comments);
          setCommentLists(response.data.comments);
        } else {
          alert("댓글을 불러오는데 실패했습니다.");
        }
      }
    );
  };

  useEffect(() => {
    console.log(movieId);
    let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchDetailInfo(endpointForMovieInfo);
    fetchComments(movieVariable);
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
          <LikeDislikes
            postId={movieId}
            userId={userId}
            userTo={movieId}
            isLogin={userId !== "" ? true : false}
          />
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
          CommentLists={CommentLists}
          postId={movieId}
          refreshFunction={updateComment}
        />
      </div>
    </div>
  );
}

export default MovieDetail;
