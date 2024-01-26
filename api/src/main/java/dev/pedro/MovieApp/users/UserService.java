package dev.pedro.MovieApp.users;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }
}