package dev.pedro.MovieApp.MovieReview;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Query;

import dev.pedro.MovieApp.movieList.Movie;
import dev.pedro.MovieApp.users.User;

@Service
public class ReviewService {

  @Autowired
  private ReviewRepository reviewRepository;

  @Autowired
  private MongoTemplate mongoTemplate;

  public Review createReview(String reviewBody, String userId, String imdbId) {
    Review review = reviewRepository.insert(new Review(reviewBody, userId));

    mongoTemplate.update(Movie.class)
        .matching(Criteria.where("imdbId").is(imdbId))
        .apply(new Update().push("reviewIds").value(review))
        .first();

    mongoTemplate.update(User.class)
        .matching(Criteria.where("_id").is(userId))
        .apply(new Update().push("reviewIds").value(review))
        .first();

    return review;
  }

  public void deleteReview(String reviewId, String userId, String imdbId) {
    reviewRepository.deleteById(new ObjectId(reviewId));

    mongoTemplate.update(Movie.class)
        .matching(Criteria.where("imdbId").is(imdbId))
        .apply(new Update().pull("reviewIds", new Query(Criteria.where("_id").is(new ObjectId(reviewId)))))
        .first();

    mongoTemplate.update(User.class)
        .matching(Criteria.where("_id").is(userId))
        .apply(new Update().pull("reviewIds", new Query(Criteria.where("_id").is(new ObjectId(reviewId)))))
        .first();
  }
}
