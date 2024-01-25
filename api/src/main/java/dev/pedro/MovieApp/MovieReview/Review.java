package dev.pedro.MovieApp.MovieReview;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "review")
@Data
public class Review {
  
  @Id
  private ObjectId id;
  private String body;
  
  public Review(String body) {
    this.body = body;
  }
}
