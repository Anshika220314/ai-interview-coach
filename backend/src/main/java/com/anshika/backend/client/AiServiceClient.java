package com.anshika.backend.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AiServiceClient {

    // RestTemplate handles the heavy lifting of sending outbound HTTP requests
    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Verifies connection to the running FastAPI microservice instance
     */
    public String healthCheck() {
        String url = "http://127.0.0.1:8000/health";
        return restTemplate.getForObject(url, String.class);
    }

    /**
     * AI integration verification endpoint stub
     */
    public String analyzeResume() {
        return "AI integration ready";
    }

    /**
     * 🌟 UPDATED FOR COMPANY-AWARENESS: Connects Spring Boot to the Python RAG vector service chat loop
     */
    public String askQuestion(
            String query,
            String company
    ) {

        String url =
                "http://127.0.0.1:8000/chat"
                        + "?query=" + query
                        + "&company=" + company;

        return restTemplate.getForObject(
                url,
                String.class
        );
    }

    /**
     * Connects Spring Boot to the Python interview generation endpoint
     */
    public String generateInterview(String role, String company, String difficulty) {
        String url = "http://127.0.0.1:8000/generate-interview"
                + "?role=" + role
                + "&company=" + company
                + "&difficulty=" + difficulty;

        return restTemplate.postForObject(url, null, String.class);
    }

    /**
     * Connects Spring Boot to the AI evaluation engine endpoint
     */
    public String evaluateAnswer(String question, String answer) {
        String url = "http://127.0.0.1:8000/evaluate-answer"
                + "?question=" + question
                + "&answer=" + answer;

        return restTemplate.postForObject(url, null, String.class);
    }
}