package com.anshika.backend.controller;

import com.anshika.backend.dto.AnalyticsOverviewDTO;
import com.anshika.backend.entity.InterviewResult;
import com.anshika.backend.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin("*") // Keeps your global open wildcard allowance intact for port 5173 cross-traffic
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    /**
     * POST /analytics/save
     * Handles direct, standard post entity saves into your PostgreSQL table layer
     */
    @PostMapping("/analytics/save")
    public InterviewResult save(@RequestBody InterviewResult result) {
        return analyticsService.saveResult(result);
    }

    /**
     * GET /analytics/overview
     * Streams the complex, structured multi-layer telemetry metrics matrices
     * needed by your React Recharts graphical line and pie panels.
     */
    @GetMapping("/analytics/overview")
    public ResponseEntity<AnalyticsOverviewDTO> getOverview() {
        // Simulating the default user identification session profile as 1L.
        // Map this to your active authenticated Principal token configuration later.
        Long currentUserId = 1L;

        AnalyticsOverviewDTO overviewMetrics = analyticsService.getUserAnalytics(currentUserId);
        return ResponseEntity.ok(overviewMetrics);
    }

    /**
     * GET /api/interviews/results
     * 🌟 ADDED FOR MODULE 3: INTERVIEW HISTORY
     * Streams the complete sequential list of archived interview results directly
     * into your responsive frontend data tables.
     */
    @GetMapping("/api/interviews/results")
    public ResponseEntity<List<InterviewResult>> getHistoryLog() {
        List<InterviewResult> historicalRecords = analyticsService.getAllResults();
        return ResponseEntity.ok(historicalRecords);
    }
}