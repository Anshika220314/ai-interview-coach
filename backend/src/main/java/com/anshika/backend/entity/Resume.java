package com.anshika.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String fileType;

    private String filePath;

    private LocalDateTime uploadedAt;

    // Establishing a multi-relationship link back to your core User model
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}