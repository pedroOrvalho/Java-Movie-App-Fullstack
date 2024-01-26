package dev.pedro.MovieApp.MovieReview;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "reviews")
@Data
public class Review {

  @Id
  private String id;
  private String body;
  private String userId;

  public Review(String body, String userId) {
    this.body = body;
    this.userId = userId;
  }
}
