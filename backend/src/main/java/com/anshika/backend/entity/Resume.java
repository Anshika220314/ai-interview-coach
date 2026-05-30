package com.anshika.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference; // 🌟 IMPORT ADDED HERE
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

    // 🌟 ADDED @JsonBackReference TO STOP JACKSON FROM LOOPING BACK INTO USER DETAILS
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;
}