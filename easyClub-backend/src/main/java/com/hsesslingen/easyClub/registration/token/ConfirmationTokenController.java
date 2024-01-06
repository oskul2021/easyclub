package com.hsesslingen.easyClub.registration.token;

import com.hsesslingen.easyClub.appuser.AppUser;
import com.hsesslingen.easyClub.appuser.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path= "api/v1/confirmationTokens")
@AllArgsConstructor
public class ConfirmationTokenController {

    private final AppUserRepository appUserRepository;
    private final ConfirmationTokenRepository confirmationTokenRepository;

    @GetMapping
    public List<ConfirmationToken> getConfirmationTokens(@RequestParam("User") Long id) {
        AppUser user = appUserRepository.findById(id).orElseThrow(() -> new IllegalStateException("User doesn´t exist"));
        return confirmationTokenRepository.findByAppUser(user);
    }
}
