import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from "../../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import { Row } from "antd";
import GridCards from "../commons/GridCards";
import Favorite from "./Sections/Favorite";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  const userId = document.cookie.substring(7);

  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.cast);
        setCasts(response.cast);
      });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Header */}

      <MainImage
        image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={userId} />
        </div>

        {/* Movie Info */}
        <MovieInfo movie={Movie} />
        <br />

        {/* Actors Grid*/}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={toggleActorView}>Toggle Actor View</button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}original${cast.profile_path}`
                        : null
                    }
                    actorName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}

        <br />

        {/* Comments */}
      </div>
    </div>
  );
}

export default MovieDetail;
