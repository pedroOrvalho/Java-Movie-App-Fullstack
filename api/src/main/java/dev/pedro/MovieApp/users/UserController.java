package dev.pedro.MovieApp.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.Data;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @PostMapping
  public User createUser(@RequestBody User user) {
    return userRepository.save(user);
  }

  @PostMapping("/login")
  public ResponseEntity<User> loginByEmail(@RequestBody LoginRequest loginRequest) {
    String email = loginRequest.getEmail();
    String requestPassword = loginRequest.getPassword();

    User user = userRepository.findByEmail(email);

    if (user != null) {
      String storedPassword = user.getPassword();

      if (storedPassword.equals(requestPassword)) {
        // Passwords match
        return new ResponseEntity<User>(user, HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
      }
    } else {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
  }

  @Data
  private static class LoginRequest {
    private String email;
    private String password;
  }
}

/*

  @PostMapping("/login")
  public User getUserByEmail(@RequestBody LoginRequest loginRequest) {
    String email = loginRequest.getEmail();
    String requestPassword = loginRequest.getPassword();

    User user = userRepository.findByEmail(email);

    if (user != null) {
      String storedPassword = user.getPassword();

      if (storedPassword.equals(requestPassword)) {

      }
    }

    return user;
  }

*/ 