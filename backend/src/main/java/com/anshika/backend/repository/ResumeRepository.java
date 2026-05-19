package com.anshika.backend.repository;

import com.anshika.backend.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    // Custom query to instantly look up all resumes belonging to a specific user id
    List<Resume> findByUserId(Long userId);
}