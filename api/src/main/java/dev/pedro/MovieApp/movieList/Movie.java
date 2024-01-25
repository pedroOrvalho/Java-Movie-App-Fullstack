package dev.pedro.MovieApp.movieList;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import dev.pedro.MovieApp.MovieReview.Review;

import java.util.List;

import lombok.Data;

//@Document is an annotation provided by Spring data project. 
//It is used to identify a domain object, which is persisted to MongoDB.
//So you can use it to map a Java class into a collection inside MongoDB.
@Document(collection = "movies")


@Data
//The @Data annotation is a part of the Lombok library, 
//which automatically generates boilerplate code for your classes. 
//For example writting the Getter and Setter methods
public class Movie {
  
  @Id
  private ObjectId id;
  private String imdbId;
  private String title;
  private String releaseDate;
  private String trailerLink;
  private List<String> genres;
  private String poster;
  private List<String> backdrops;
  @DocumentReference
  private List<Review> reviewIds;
}
