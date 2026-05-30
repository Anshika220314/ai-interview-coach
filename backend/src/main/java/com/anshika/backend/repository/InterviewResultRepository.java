package com.anshika.backend.repository;

import com.anshika.backend.entity.InterviewResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InterviewResultRepository extends JpaRepository<InterviewResult, Long> {

    /**
     * 🌟 FIX: Clean mapping to fetch all rows using standard object graph queries
     */
    @Query("SELECT ir FROM InterviewResult ir")
    List<InterviewResult> findAllResults();

    /**
     * 🌟 FIX: Updated table name string to 'interview_result' (singular)
     * matching Hibernate's default pluralization strategy schema.
     */
    @Query(value = "SELECT company FROM interview_result GROUP BY company ORDER BY COUNT(company) DESC LIMIT 1", nativeQuery = true)
    String findMostPracticedCompany();
}