package com.hsesslingen.easyClub.email;

import com.hsesslingen.easyClub.appuser.AppUser;
import com.hsesslingen.easyClub.password.PasswordResetToken;
import com.hsesslingen.easyClub.registration.token.ConfirmationToken;

public interface EmailSender {

    void send(AppUser replyTo, String[] to, String subject, String message);
    void send(String to, String email, String topic);
}
