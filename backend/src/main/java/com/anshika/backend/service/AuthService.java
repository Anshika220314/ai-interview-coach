package com.anshika.backend.service;

import com.anshika.backend.dto.SignupRequest;
import com.anshika.backend.entity.Role;
import com.anshika.backend.entity.User;
import com.anshika.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // Spring will automatically inject our database repository and encoder here
    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String registerUser(SignupRequest request) {
        // Feature 1: Validate email uniqueness
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Error: Email is already taken!");
        }

        // Feature 2: Encrypt the password using BCrypt
        String encryptedPassword = passwordEncoder.encode(request.getPassword());

        // Feature 3: Create and save the new user record
        User newUser = new User(
                request.getName(),
                request.getEmail(),
                encryptedPassword,
                Role.USER // New signups are standard USERS by default
        );

        userRepository.save(newUser);
        return "User registered successfully!";
    }
}
