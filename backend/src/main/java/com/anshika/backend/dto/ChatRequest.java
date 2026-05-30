package com.anshika.backend.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRequest {

    private String query;
    private String company;
    private String sessionId;
}