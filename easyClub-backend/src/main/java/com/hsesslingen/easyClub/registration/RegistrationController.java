package com.hsesslingen.easyClub.registration;

import com.hsesslingen.easyClub.payload.MessageResponse;
import com.hsesslingen.easyClub.payload.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path= "api/v1/registration")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class RegistrationController {

    private final RegistrationService registrationService;

    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
            System.out.println(request);
            registrationService.register(request);
            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

}
