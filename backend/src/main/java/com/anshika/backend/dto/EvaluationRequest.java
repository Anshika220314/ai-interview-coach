package com.anshika.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EvaluationRequest {

    private String question;

    private String answer;
}