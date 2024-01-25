import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { Movie } from "../../Types";

import "./Home.css";

type HomeProps = {
  movies: Movie[];
};

export default function Home({ movies }: HomeProps) {
  const navigate = useNavigate();
  
  return (
    <div className="movie-carousel-container">
      <Carousel autoPlay={false}>
        {movies.map((movie) => {
          return (
            <Paper>
              <div className="movie-card-container">
                <div
                  className="movie-card"
                  style={
                    {
                      "--img": `url(${movie.backdrops[0]})`,
                    } as React.CSSProperties
                  }
                >
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt={movie.title} />
                    </div>
                    <div className="movie-title">
                      <h3>{movie.title}</h3>

                    </div>
                    <div className="play-button-container">
                      <div className="play-button-icon-container">
                        <Link
                          to={`/trailer/${movie.trailerLink.substring(
                            movie.trailerLink.length - 11
                          )}`}
                        >
                          <FontAwesomeIcon
                            className="play-button-icon"
                            icon={faCirclePlay}
                          />
                        </Link>
                      </div>
                    </div>
                  <div className="movie-review-button-container">
                    <Button variant ="info" onClick={() => navigate(`/reviews/${movie.imdbId}`)}>Reviews</Button>
                  </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
}
