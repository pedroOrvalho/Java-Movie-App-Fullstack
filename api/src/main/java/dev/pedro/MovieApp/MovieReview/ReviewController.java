package dev.pedro.MovieApp.MovieReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

  @Autowired
  private ReviewService reviewService;

  @PostMapping
  public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload) {
    return new ResponseEntity<Review>(
        reviewService.createReview(payload.get("reviewBody"), payload.get("userId"), payload.get("imdbId")),
        HttpStatus.CREATED);
  }

  @DeleteMapping("/{reviewId}")
  public ResponseEntity<Void> deleteReview(@PathVariable String reviewId, @RequestBody Map<String, String> payload) {
    String userId = payload.get("userId");
    String imdbId = payload.get("imdbId");

    reviewService.deleteReview(reviewId, userId, imdbId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
