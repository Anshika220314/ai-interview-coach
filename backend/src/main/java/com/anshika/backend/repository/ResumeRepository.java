package com.anshika.backend.repository;

import com.anshika.backend.entity.Resume;
import com.anshika.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    // 🌟 This line must be exactly here so ResumeService can call it!
    List<Resume> findByUser(User user);
}