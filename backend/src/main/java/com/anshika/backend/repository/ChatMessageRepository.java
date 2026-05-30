package com.anshika.backend.repository;

import com.anshika.backend.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository
        extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findBySessionId(
            String sessionId
    );
}