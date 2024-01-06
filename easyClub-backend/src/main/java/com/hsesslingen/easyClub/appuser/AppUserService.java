package com.hsesslingen.easyClub.appuser;

import antlr.Token;
import com.hsesslingen.easyClub.email.EmailSender;
import com.hsesslingen.easyClub.login.LoginAttemptService;
import com.hsesslingen.easyClub.registration.token.ConfirmationToken;
import com.hsesslingen.easyClub.registration.token.ConfirmationTokenRepository;
import com.hsesslingen.easyClub.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;

import static java.time.LocalTime.now;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";
    private final AppUserRepository appUserRepository;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;
    private final RoleRepository roleRepository;
    @Autowired
    private LoginAttemptService loginAttemptService;

    @Autowired
    private HttpServletRequest request;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String ip = getClientIP();
        if (loginAttemptService.isBlocked(ip)) {
            throw new RuntimeException("blocked");
        }

        try {
            AppUser user = appUserRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, username)));
            return AppUserDetailsImp.build(user);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

        public AppUser signUpUser (AppUser appUser){

            boolean userExists = appUserRepository.findByUsername(appUser.getUsername()).isPresent();

            if (userExists) {
                AppUser existingUser = appUserRepository.findByUsername(appUser.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Username not found!"));
                throw new IllegalStateException("username already taken");
            }

            String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
            appUser.setPassword(encodedPassword);

            appUserRepository.save(appUser);

            return appUser;

        }

        private String getClientIP () {
            String xfHeader = request.getHeader("X-Forwarded-For");
            if (xfHeader == null) {
                return request.getRemoteAddr();
            }
            return xfHeader.split(",")[0];
        }


    }
