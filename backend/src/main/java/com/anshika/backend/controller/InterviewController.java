package com.anshika.backend.controller;

import com.anshika.backend.client.AiServiceClient;
import com.anshika.backend.dto.InterviewRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/interview")
@CrossOrigin("*")
public class InterviewController {

    private final AiServiceClient aiServiceClient;

    public InterviewController(
            AiServiceClient aiServiceClient
    ) {
        this.aiServiceClient = aiServiceClient;
    }

    @PostMapping("/generate")
    public String generateInterview(
            @RequestBody InterviewRequest request
    ) {

        return aiServiceClient.generateInterview(
                request.getRole(),
                request.getCompany(),
                request.getDifficulty()
        );
    }
}