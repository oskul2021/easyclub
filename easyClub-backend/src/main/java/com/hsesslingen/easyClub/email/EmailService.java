package com.hsesslingen.easyClub.email;

import com.hsesslingen.easyClub.password.PasswordResetToken;
import com.hsesslingen.easyClub.registration.token.ConfirmationToken;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.hsesslingen.easyClub.appuser.AppUser;

@Service
@AllArgsConstructor
public class EmailService implements EmailSender{

    private final static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Override
    @Async
    public void send(String to, String email, String topic) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject(topic);
            helper.setFrom("easyClub@confirmation.com");
            mailSender.send(mimeMessage);

        }catch(MessagingException e) {
            LOGGER.error("failed to send email", e);
            throw new IllegalStateException("failed to send email");
        }

    }

    @Override
    @Async
    public void send(AppUser replyTo, String[] to, String subject, String message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(message, true);
            helper.setReplyTo(replyTo.getEmail());
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom("message@easyClub.com");
            mailSender.send(mimeMessage);

        }catch(MessagingException e) {
            LOGGER.error("failed to send email", e);
            throw new IllegalStateException("failed to send email");
        }

    }


}
