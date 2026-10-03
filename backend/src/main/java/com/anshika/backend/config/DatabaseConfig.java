package com.anshika.backend.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

    @Value("${DATABASE_URL:#{null}}")
    private String databaseUrl;

    @Value("${spring.datasource.url:jdbc:postgresql://localhost:5432/interview_coach}")
    private String defaultUrl;

    @Value("${spring.datasource.username:anshika}")
    private String defaultUsername;

    @Value("${spring.datasource.password:}")
    private String defaultPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();

        // If Render or cloud provider injects DATABASE_URL (postgres://... or postgresql://...)
        if (databaseUrl != null && !databaseUrl.isBlank() &&
                (databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://"))) {
            try {
                String cleanUrl = databaseUrl.replace("jdbc:", "");
                URI uri = new URI(cleanUrl);

                String host = uri.getHost();
                int port = uri.getPort() == -1 ? 5432 : uri.getPort();
                String path = uri.getPath(); // e.g. /dbname
                String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;

                String username = defaultUsername;
                String password = defaultPassword;

                if (uri.getUserInfo() != null) {
                    String[] userInfo = uri.getUserInfo().split(":", 2);
                    username = userInfo[0];
                    if (userInfo.length > 1) {
                        password = userInfo[1];
                    }
                }

                config.setJdbcUrl(jdbcUrl);
                config.setUsername(username);
                config.setPassword(password);
                config.setDriverClassName("org.postgresql.Driver");
                return new HikariDataSource(config);
            } catch (URISyntaxException e) {
                // In case of parsing exception, fall back to defaultUrl below
            }
        }

        config.setJdbcUrl(defaultUrl);
        config.setUsername(defaultUsername);
        config.setPassword(defaultPassword);
        config.setDriverClassName("org.postgresql.Driver");
        return new HikariDataSource(config);
    }
}
