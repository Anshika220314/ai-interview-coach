package com.anshika.backend.controller;

import com.anshika.backend.client.AiServiceClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiTestController {

    private final AiServiceClient aiServiceClient;

    // Standard constructor injection to safely bring in our new AI microservice client bean
    public AiTestController(
            AiServiceClient aiServiceClient
    ) {
        this.aiServiceClient = aiServiceClient;
    }

    @GetMapping("/ai/test")
    public String testAiService() {
        // Automatically fetches the string response from our Python server node loop
        return aiServiceClient.healthCheck();
    }
}