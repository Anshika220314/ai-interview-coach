package com.anshika.backend.repository;

import com.anshika.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Checks if an email is already taken during signup
    boolean existsByEmail(String email);

    // Finds a user's profile by their email during login
    Optional<User> findByEmail(String email);
}