package com.hsesslingen.easyClub.password;

import com.hsesslingen.easyClub.appuser.AppUser;
import com.hsesslingen.easyClub.appuser.AppUserRepository;
import com.hsesslingen.easyClub.email.EmailSender;
import com.hsesslingen.easyClub.payload.PasswordChangeRequest;
import com.hsesslingen.easyClub.payload.PasswordForgottenRequest;
import com.hsesslingen.easyClub.payload.PasswordResetRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path= "api/v1/forgot-password")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class PasswordForgottenController {

    private final AppUserRepository appUserRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailSender emailSender;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping
    public ResponseEntity<?> changePasswordRequest(@RequestBody PasswordForgottenRequest request) {

        Optional<AppUser> appUserOptional = appUserRepository.findByUsername(request.getUsername());

        if(appUserOptional.isPresent()) {
            UUID uuid = UUID.randomUUID();
            PasswordResetToken passwordResetToken = new PasswordResetToken(uuid.toString(),false, appUserOptional.get());
            passwordResetTokenRepository.save(passwordResetToken);

            String link = "http://localhost:3000/forgot-password?token=" + passwordResetToken.getToken();

            emailSender.send(appUserOptional.get().getEmail(), buildEmail(appUserOptional.get().getFirstName(), link), "Forgot your password?");
            return ResponseEntity.ok().body(passwordResetToken.getToken());
        }



    return ResponseEntity.badRequest().body("Username not found!");
    }

    @PostMapping("change")
     public ResponseEntity<?> change(@RequestBody PasswordResetRequest passwordResetRequest) {

        if(passwordResetTokenRepository.findPasswordResetTokenByToken(passwordResetRequest.getToken()).isPresent()) {
            AppUser appUser = passwordResetTokenRepository.findPasswordResetTokenByToken(passwordResetRequest.getToken()).get().getAppUser();
            if(passwordResetRequest.getNewPassword().equals(passwordResetRequest.getPasswordRepeat())) {
                String encryptedPassword = bCryptPasswordEncoder.encode(passwordResetRequest.getNewPassword());
                appUser.setPassword(encryptedPassword);
                appUserRepository.save(appUser);
                passwordResetTokenRepository.delete(passwordResetTokenRepository.findPasswordResetTokenByToken(passwordResetRequest.getToken()).get());
                return ResponseEntity.ok().body("Success");
            }
            else {
                return  ResponseEntity.badRequest().body("Passwords don´t match");
            }
        }
         return ResponseEntity.badRequest().body("Password reset token not found.");

    }





    private String buildEmail(String name, String link) {
       return  "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
               "                        <h1> Hi" + name +  "</h1>" +
                "                       <span> Click on the Link to reset you password! <span />" +
                "                       <span> <a href=" + link + ">Reset Password </a><span />" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "\n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";

    }

}
