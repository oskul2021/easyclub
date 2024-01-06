package com.hsesslingen.easyClub.password;

import com.hsesslingen.easyClub.appuser.AppUser;
import com.hsesslingen.easyClub.appuser.AppUserRepository;
import com.hsesslingen.easyClub.payload.MessageResponse;
import com.hsesslingen.easyClub.payload.PasswordChangeRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/change-password")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class PasswordChangeController {

    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping
    @PreAuthorize("hasRole('User') or hasRole('Moderator') or hasRole('Admin')")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest request) {

        AppUser appUser = appUserRepository.getById(request.getId());
        String oldPassword = appUser.getPassword();

        if (bCryptPasswordEncoder.matches(request.getOldPassword(), oldPassword)
                && request.getNewPassword().equals(request.getPasswordRepeat())) {
            String encrypedNewPassword = bCryptPasswordEncoder.encode(request.getNewPassword());
            appUser.setPassword(encrypedNewPassword);
            appUser.setCustomPassword(true);
            appUserRepository.save(appUser);
            return ResponseEntity.ok(new MessageResponse("Password changed successfully"));
        } else
            return ResponseEntity.badRequest().body("Password not changed successfully");

    }
}
