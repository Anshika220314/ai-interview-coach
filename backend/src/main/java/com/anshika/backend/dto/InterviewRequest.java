package com.anshika.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InterviewRequest {

    private String role;

    private String company;

    private String difficulty;
}