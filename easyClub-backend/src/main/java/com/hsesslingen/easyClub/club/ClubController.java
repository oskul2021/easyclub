package com.hsesslingen.easyClub.club;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/club")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class ClubController {
    private final ClubService clubService;
    private final ClubRepository clubRepository;

    @GetMapping("all")
    @PreAuthorize("hasRole('Executive')")
    public List<Club> getAllClubs() {
        List<Club> list = clubService.getAllClubs();
        return list;
    }
}
