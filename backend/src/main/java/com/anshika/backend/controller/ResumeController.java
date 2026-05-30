package com.anshika.backend.controller;

import com.anshika.backend.entity.Resume;
import com.anshika.backend.service.ResumeService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/upload")
    public String uploadResume(
            @RequestParam Long userId,
            @RequestParam MultipartFile file
    ) throws IOException {
        // 🌟 FIXED: Passing (userId, file) in the exact order your service method expects!
        return resumeService.uploadResume(userId, file);
    }

    @GetMapping("/all/{userId}")
    public List<Resume> getUserResumes(@PathVariable Long userId) {
        return resumeService.getUserResumes(userId);
    }

    @DeleteMapping("/{id}")
    public String deleteResume(@PathVariable Long id) {
        return resumeService.deleteResume(id);
    }
}