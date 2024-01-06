package com.hsesslingen.easyClub.login;

import com.hsesslingen.easyClub.appuser.AppUserDetailsImp;
import com.hsesslingen.easyClub.payload.JwtResponse;
import com.hsesslingen.easyClub.security.jwt.JwtUtils;
import com.hsesslingen.easyClub.utils.ImageUtility;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/signin")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class LoginController {

        @Autowired
        AuthenticationManager authenticationManager;

        @Autowired
        JwtUtils jwtUtils;

        @PostMapping
        public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(loginRequest.getUserName(),
                                                loginRequest.getPassword()));

                AppUserDetailsImp appUserDetails = (AppUserDetailsImp) authentication.getPrincipal();
                List<String> roles = appUserDetails.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList());

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtUtils.generateJwtToken(authentication);
                System.out.println(appUserDetails.getPicture());
                byte[] image = appUserDetails.getPicture() != null ? ImageUtility.decompressImage(appUserDetails.getPicture()) : null;

                return ResponseEntity.ok(new JwtResponse(jwt,
                                appUserDetails.getId(),
                                appUserDetails.getUsername(),
                                appUserDetails.getFirstname(),
                                appUserDetails.getLastname(),
                                appUserDetails.getBirthdate(),
                                appUserDetails.getStreet(),
                                appUserDetails.getHousenumber(),
                                appUserDetails.getPostCode(),
                                appUserDetails.getCity(),
                                appUserDetails.getEmail(),
                                appUserDetails.getPhonenumber(),
                                appUserDetails.getMobilenumber(),
                                roles,
                                appUserDetails.isPasswordChanged(),
                                image
                                ));

        }
}
