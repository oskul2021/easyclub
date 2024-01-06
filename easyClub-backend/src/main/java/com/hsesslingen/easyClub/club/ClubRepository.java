package com.hsesslingen.easyClub.club;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface ClubRepository extends JpaRepository<Club, Integer> {
    Optional<Club> findById(int aLong);
}
