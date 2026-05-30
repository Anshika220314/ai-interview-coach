package com.anshika.backend.controller;

import com.anshika.backend.dto.LoginRequest;
import com.anshika.backend.dto.SignupRequest;
import com.anshika.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
// Ensures both of your local frontend development server ports bypass the CORS firewall gate cleanly
@CrossOrigin(origins = {"http://localhost:5173", "https://localhost:5174"})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Maps perfectly to: POST http://localhost:8080/api/auth/signup
     */
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        try {
            // Invokes registration service logic layer to persist user credentials
            String response = authService.registerUser(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // If the user already exists, safely catches and bubbles up the custom error string
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Maps perfectly to: POST http://localhost:8080/api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Calls your AuthService login function which verifies credentials and generates your JWT token
            var responseData = authService.loginUser(request);
            return ResponseEntity.ok(responseData);
        } catch (RuntimeException e) {
            // If password doesn't match or email isn't found, return a 401 Unauthorized error state
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}