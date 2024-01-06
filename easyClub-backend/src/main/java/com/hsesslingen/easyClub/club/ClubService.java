package com.hsesslingen.easyClub.club;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ClubService {
    private ClubRepository clubRepository;

    public List<Club> getAllClubs() { return clubRepository.findAll(); }
}
