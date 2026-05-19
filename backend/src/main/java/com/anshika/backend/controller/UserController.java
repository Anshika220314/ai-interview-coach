package com.anshika.backend.controller;

import com.anshika.backend.repository.UserRepository;
import com.anshika.backend.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        // 1. Extract the authenticated email
        String authenticatedEmail = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // 2. Fetch user profile from database
        User user = userRepository.findByEmail(authenticatedEmail)
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body("Error: User profile not found.");
        }

        // 3. Build a simple response packet using a plain HashMap to avoid any strict typing bounds
        Map<String, String> response = new HashMap<>();
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().name());
        response.put("message", "Welcome to your secure VIP profile dashboard!");

        return ResponseEntity.ok(response);
    }
}