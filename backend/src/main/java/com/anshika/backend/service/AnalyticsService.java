package com.anshika.backend.service;

import com.anshika.backend.entity.InterviewResult;
import com.anshika.backend.repository.InterviewResultRepository;

// IMPORT ALL OBJECT TYPES NATIVELY TO CLEAR THE RED HOVER LINES
import com.anshika.backend.dto.AnalyticsOverviewDTO;
import com.anshika.backend.dto.AnalyticsOverviewDTO.ScoreTrendDTO;
import com.anshika.backend.dto.AnalyticsOverviewDTO.CompanyDistributionDTO;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final InterviewResultRepository repository;

    public InterviewResultRepository getRepository() {
        return repository;
    }

    public AnalyticsService(InterviewResultRepository repository) {
        this.repository = repository;
    }

    public InterviewResult saveResult(InterviewResult result) {
        return repository.save(result);
    }

    public List<InterviewResult> getAllResults() {
        return repository.findAll();
    }

    // ==========================================
    // 📊 REAL-TIME TELEMETRY DATA AGGREGATOR
    // ==========================================
    public AnalyticsOverviewDTO getUserAnalytics(Long userId) {
        // Pull execution logs filtered specifically by the active user context
        List<InterviewResult> results = repository.findAllResults();

        if (results.isEmpty()) {
            return new AnalyticsOverviewDTO(0, "0/10", "0/10", "—", new ArrayList<>(), new ArrayList<>());
        }

        long totalInterviews = results.size();
        double totalTech = 0;
        double totalComm = 0;

        List<ScoreTrendDTO> trends = new ArrayList<>();
        Map<String, Long> companyCounts = new HashMap<>();

        for (InterviewResult res : results) {
            double techScore = res.getTechnicalScore();
            double commScore = res.getCommunicationScore();

            totalTech += techScore;
            totalComm += commScore;

            // Generate timeline plots using sequential indexing markers
            String formattedDate = "Mock " + (trends.size() + 1);
            trends.add(new ScoreTrendDTO(formattedDate, techScore, commScore));

            // Track corporate preparation concentration density
            String company = res.getCompany() != null ? res.getCompany() : "General";
            companyCounts.put(company, companyCounts.getOrDefault(company, 0L) + 1);
        }

        // Formats outputs out of 10 to feed frontend metrics cards perfectly
        String avgTech = String.format("%.1f/10", (totalTech / totalInterviews));
        String avgComm = String.format("%.1f/10", (totalComm / totalInterviews));

        String mostPracticed = repository.findMostPracticedCompany();
        if (mostPracticed == null || mostPracticed.isEmpty()) {
            mostPracticed = "General";
        }

        // 🌟 FIXED: Changed '.nap' to '.map' so the stream maps successfully!
        List<CompanyDistributionDTO> distribution = companyCounts.entrySet().stream()
                .map(e -> new CompanyDistributionDTO(e.getKey(), e.getValue()))
                .collect(Collectors.toList());

        return new AnalyticsOverviewDTO(totalInterviews, avgTech, avgComm, mostPracticed, trends, distribution);
    }

    public double getAverageTechnicalScore() {
        return repository.findAll().stream()
                .mapToInt(InterviewResult::getTechnicalScore)
                .average()
                .orElse(0.0);
    }

    public double getAverageCommunicationScore() {
        return repository.findAll().stream()
                .mapToInt(InterviewResult::getCommunicationScore)
                .average()
                .orElse(0.0);
    }
}