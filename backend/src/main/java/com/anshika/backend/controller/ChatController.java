package com.anshika.backend.controller;

import com.anshika.backend.client.AiServiceClient;
import com.anshika.backend.dto.ChatRequest;
import com.anshika.backend.service.ChatMemoryService; // 🌟 Added import
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@CrossOrigin("*")
public class ChatController {

    private final AiServiceClient aiServiceClient;
    private final ChatMemoryService chatMemoryService; // 🌟 Added memory dependency

    // Updated Constructor for Spring Dependency Injection
    public ChatController(
            AiServiceClient aiServiceClient,
            ChatMemoryService chatMemoryService
    ) {
        this.aiServiceClient = aiServiceClient;
        this.chatMemoryService = chatMemoryService;
    }

    @PostMapping
    public String chat(
            @RequestBody ChatRequest request
    ) {

        // 1. Persist user prompt statement to history log
        chatMemoryService.saveMessage(
                "user",
                request.getQuery(),
                request.getSessionId()
        );

        // 2. Transmit forward to AI Vector/Company Processing Core
        String response =
                aiServiceClient.askQuestion(
                        request.getQuery(),
                        request.getCompany()
                );

        // 3. Persist AI assistant generated advice back to database log
        chatMemoryService.saveMessage(
                "assistant",
                response,
                request.getSessionId()
        );

        return response;
    }
}