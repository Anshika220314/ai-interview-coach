package com.anshika.backend.dto;

import java.util.List;

public class AnalyticsOverviewDTO {
    private long totalInterviews;
    private String avgTechnicalScore;
    private String avgCommunicationScore;
    private String mostPracticedCompany;
    private List<ScoreTrendDTO> scoreTrends;
    private List<CompanyDistributionDTO> distribution;

    public AnalyticsOverviewDTO() {}

    public AnalyticsOverviewDTO(long totalInterviews, String avgTechnicalScore, String avgCommunicationScore,
                                String mostPracticedCompany, List<ScoreTrendDTO> scoreTrends,
                                List<CompanyDistributionDTO> distribution) {
        this.totalInterviews = totalInterviews;
        this.avgTechnicalScore = avgTechnicalScore;
        this.avgCommunicationScore = avgCommunicationScore;
        this.mostPracticedCompany = mostPracticedCompany;
        this.scoreTrends = scoreTrends;
        this.distribution = distribution;
    }

    // 🌟 MAKE SURE THESE SAY "PUBLIC STATIC CLASS" EXPLICITLY
    public static class ScoreTrendDTO {
        private String date;
        private double tech;
        private double comm;

        public ScoreTrendDTO(String date, double tech, double comm) {
            this.date = date;
            this.tech = tech;
            this.comm = comm;
        }
        public String getDate() { return date; }
        public double getTech() { return tech; }
        public double getComm() { return comm; }
    }

    public static class CompanyDistributionDTO {
        private String name;
        private long value;

        public CompanyDistributionDTO(String name, long value) {
            this.name = name;
            this.value = value;
        }
        public String getName() { return name; }
        public long getValue() { return value; }
    }

    // Getters and Setters for outer fields
    public long getTotalInterviews() { return totalInterviews; }
    public String getAvgTechnicalScore() { return avgTechnicalScore; }
    public String getAvgCommunicationScore() { return avgCommunicationScore; }
    public String getMostPracticedCompany() { return mostPracticedCompany; }
    public List<ScoreTrendDTO> getScoreTrends() { return scoreTrends; }
    public List<CompanyDistributionDTO> getDistribution() { return distribution; }
}