package com.anshika.backend.controller;

import com.anshika.backend.dto.LoginRequest; // 🌟 Make sure you import your LoginRequest DTO!
import com.anshika.backend.dto.SignupRequest;
import com.anshika.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173","https://localhost:5174"})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        try {
            String response = authService.registerUser(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // This calls your AuthService login function which returns the JWT token map
            var responseData = authService.loginUser(request);
            return ResponseEntity.ok(responseData);
        } catch (RuntimeException e) {
            // If password doesn't match or email isn't found, return a 401 Unauthorized error
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}