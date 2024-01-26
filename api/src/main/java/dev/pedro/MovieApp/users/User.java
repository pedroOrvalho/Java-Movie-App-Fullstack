package dev.pedro.MovieApp.users;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import dev.pedro.MovieApp.MovieReview.Review;
import lombok.Data;

@Document(collection = "users")
@Data
public class User {

  @Id
  private String id;
  private String firstName;
  private String lastName;
  private String email;
  private String password;
  @DocumentReference
  private List<Review> reviewIds;
}

