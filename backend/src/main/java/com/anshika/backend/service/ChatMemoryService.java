package com.anshika.backend.service;

import com.anshika.backend.entity.ChatMessage;
import com.anshika.backend.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMemoryService {

    private final ChatMessageRepository repository;

    public ChatMemoryService(
            ChatMessageRepository repository
    ) {
        this.repository = repository;
    }

    public void saveMessage(
            String role,
            String message,
            String sessionId
    ) {

        ChatMessage chatMessage =
                new ChatMessage();

        chatMessage.setRole(role);
        chatMessage.setMessage(message);
        chatMessage.setSessionId(sessionId);

        repository.save(chatMessage);
    }

    public List<ChatMessage> getSessionHistory(
            String sessionId
    ) {
        return repository.findBySessionId(
                sessionId
        );
    }
}