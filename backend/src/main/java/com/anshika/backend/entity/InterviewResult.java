package com.anshika.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "interview_result") // 🌟 Explicit table mapping matching our repository query rules
@Getter
@Setter
public class InterviewResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String role;

    @Column(name = "technical_score")
    private int technicalScore;

    @Column(name = "communication_score")
    private int communicationScore;

    @Column(columnDefinition = "TEXT")
    private String strengths;

    @Column(columnDefinition = "TEXT")
    private String weaknesses;

    // Zero-argument constructor required by JPA specifications
    public InterviewResult() {}
}