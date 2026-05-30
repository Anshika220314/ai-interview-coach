package com.anshika.backend.service;

import com.anshika.backend.security.JwtService;
import com.anshika.backend.dto.LoginRequest;
import com.anshika.backend.dto.SignupRequest;
import com.anshika.backend.entity.Role;
import com.anshika.backend.entity.User;
import com.anshika.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Constructor Injection for Repository, Encoder, and JWT Utility Infrastructure
    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String registerUser(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Error: Email is already taken!");
        }

        String encryptedPassword = passwordEncoder.encode(request.getPassword());

        // Streamlined user generation utilizing the modern Lombok Builder pipeline
        User newUser = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(encryptedPassword)
                .role(Role.USER)
                .build();

        userRepository.save(newUser);
        return "User registered successfully!";
    }

    public Map<String, String> loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Error: Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Error: Invalid email or password.");
        }

        // Generate a cryptographically secure JWT credential for the authenticated user session
        String realToken = jwtService.generateToken(user.getEmail());

        Map<String, String> responseData = new HashMap<>();
        responseData.put("token", realToken);
        responseData.put("name", user.getName());

        return responseData;
    }
}