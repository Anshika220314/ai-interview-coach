# ==========================================
# Multi-Stage Build for Spring Boot Backend
# ==========================================

# Stage 1: Build with Maven and JDK 21
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build production jar
RUN mvn clean package -DskipTests

# Stage 2: Minimal Production JRE 21 Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create upload directory for resumes
RUN mkdir -p /app/uploads

# Copy built artifact from build stage (finalName is app)
COPY --from=build /app/target/app.jar /app/app.jar

# Dynamic Port Binding
ENV PORT=8080
EXPOSE 8080

# Tune JVM for container memory limits (fits within Render Free Tier RAM)
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]
