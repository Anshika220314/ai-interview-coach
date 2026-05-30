package com.anshika.backend.controller;

import com.anshika.backend.client.AiServiceClient;
import com.anshika.backend.dto.EvaluationRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/evaluation")
@CrossOrigin("*")
public class EvaluationController {

    private final AiServiceClient aiServiceClient;

    public EvaluationController(
            AiServiceClient aiServiceClient
    ) {
        this.aiServiceClient = aiServiceClient;
    }

    @PostMapping
    public String evaluate(
            @RequestBody EvaluationRequest request
    ) {

        return aiServiceClient.evaluateAnswer(
                request.getQuestion(),
                request.getAnswer()
        );
    }
}