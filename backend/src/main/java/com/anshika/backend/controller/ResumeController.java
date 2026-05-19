package com.anshika.backend.controller;

import com.anshika.backend.entity.Resume;
import com.anshika.backend.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}) // Allows your React app to talk to this endpoint safely
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    // 🚀 POST Endpoint to handle file uploads
    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId) {
        try {
            Resume savedResume = resumeService.uploadResume(file, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedResume);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload failed: " + e.getMessage());
        }
    }

    // 📂 GET Endpoint to fetch all uploaded resumes for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Resume>> getUserResumes(@PathVariable Long userId) {
        List<Resume> resumes = resumeService.getUserResumes(userId);
        return ResponseEntity.ok(resumes);
    }
}