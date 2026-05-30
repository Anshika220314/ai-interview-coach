package com.anshika.backend.service;

import com.anshika.backend.entity.Resume;
import com.anshika.backend.entity.User;
import com.anshika.backend.repository.ResumeRepository;
import com.anshika.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    // Pulls the path location dynamically. Defaults to a root folder named uploads
    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    public ResumeService(ResumeRepository resumeRepository, UserRepository userRepository) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    public String uploadResume(Long userId, MultipartFile file) throws IOException {
        // 1. Verify if the user exists in our database system
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User profile not found with ID: " + userId));

        // 2. Enforce strict PDF validation limits
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload an empty file.");
        }
        if (!"application/pdf".equals(file.getContentType())) {
            throw new IllegalArgumentException("Invalid file format. Only PDF files are allowed.");
        }

        // 3. Setup safe storage directories
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 4. Generate a completely unique filename to avoid collision bugs
        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, uniqueFileName);

        // 5. Transfer bytes directly onto local disk storage
        Files.copy(file.getInputStream(), filePath);

        // 6. Build the metadata entity snapshot for PostgreSQL cataloging
        Resume resume = new Resume();
        resume.setFileName(file.getOriginalFilename());
        resume.setFileType(file.getContentType());
        resume.setFilePath(filePath.toString());
        resume.setUploadedAt(LocalDateTime.now());
        resume.setUser(user);

        resumeRepository.save(resume);
        return "Resume uploaded successfully!";
    }

    public List<Resume> getUserResumes(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🌟 SYNCED FIX: Uses your repo's exact findByUser(user) signature method!
        return resumeRepository.findByUser(user);
    }

    public String deleteResume(Long id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        File file = new File(resume.getFilePath());
        if (file.exists()) {
            file.delete();
        }

        resumeRepository.delete(resume);
        return "Resume deleted successfully!";
    }
}