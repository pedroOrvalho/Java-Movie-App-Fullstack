package dev.pedro.MovieApp.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.Data;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired
  UserService userService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @PostMapping
  public User createUser(@RequestBody User user) {
    return userService.createUser(user);
  }

  @PostMapping("/login")
  public ResponseEntity<User> loginByEmail(@RequestBody LoginRequest loginRequest) {
    String email = loginRequest.getEmail();
    String requestPassword = loginRequest.getPassword();

    Optional<User> userOptional = userService.findByEmail(email);

    if (userOptional.isPresent()) {
      User user = userOptional.get();
      String storedPassword = user.getPassword();

      if (storedPassword != null && passwordEncoder.matches(requestPassword, storedPassword)) {

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
