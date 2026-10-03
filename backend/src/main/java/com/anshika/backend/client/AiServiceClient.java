package com.anshika.backend.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class AiServiceClient {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ai.service.url:http://127.0.0.1:8000}")
    private String aiServiceUrl;

    private String getBaseUrl() {
        if (aiServiceUrl != null && aiServiceUrl.endsWith("/")) {
            return aiServiceUrl.substring(0, aiServiceUrl.length() - 1);
        }
        return aiServiceUrl != null ? aiServiceUrl : "http://127.0.0.1:8000";
    }

    /**
     * Verifies connection to the running FastAPI microservice instance
     */
    public String healthCheck() {
        String url = getBaseUrl() + "/health";
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
        String url = UriComponentsBuilder.fromHttpUrl(getBaseUrl() + "/chat")
                .queryParam("query", query)
                .queryParam("company", company)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }

    /**
     * Connects Spring Boot to the Python interview generation endpoint
     */
    public String generateInterview(String role, String company, String difficulty) {
        String url = UriComponentsBuilder.fromHttpUrl(getBaseUrl() + "/generate-interview")
                .queryParam("role", role)
                .queryParam("company", company)
                .queryParam("difficulty", difficulty)
                .toUriString();

        return restTemplate.postForObject(url, null, String.class);
    }

    /**
     * Connects Spring Boot to the AI evaluation engine endpoint via form data
     */
    public String evaluateAnswer(String question, String answer) {
        String url = getBaseUrl() + "/evaluate-answer";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("question", question);
        map.add("answer", answer);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        return restTemplate.postForObject(url, request, String.class);
    }
}