import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import ReviewForm from "../reviewForm/ReviewForm";

import { Movie } from "../../Types";

type Review = {
  body: string;
};

export default function Reviews() {
  const [movie, setMovie] = useState<Movie>();
  const [reviews, setReviews] = useState<Review[]>();
  const [reviewText, setReviewText] = useState<string>("");
  let params = useParams();
  const movieId = params.movieId;
  const userId = localStorage.getItem("userId")
  const navigate= useNavigate();
  
  const getMovieData = async (movieId: string | undefined) => {
    try {
      const response = await axios(
        `http://localhost:8080/movies/${movieId}`
      );
      const movieData: Movie = response.data;
      setMovie(movieData);
      setReviews(movieData.reviewIds);
    } catch (error) {
      console.error(error);
    }
  };

  const addReview = async (e: any) => {
    e.preventDefault();
    if(!userId){
      alert("Please log in to place a review.");
      navigate("/login")
    }
    try {
      await axios.post("http://localhost:8080/reviews", {
        reviewBody: reviewText || "",
        userId:userId,
        imdbId: movieId,
      });
      setReviewText("");
      getMovieData(movieId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieData(movieId);
  }, [movieId]);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt={movie?.title} />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    setReviewText={setReviewText}
                    labelText="Write a Review?"
                    value={reviewText}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((review: Review, index: number) => {
            return (
              <div key={index}>
                <>
                  <Row>
                    <Col>{review.body}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </>
              </div>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
}
