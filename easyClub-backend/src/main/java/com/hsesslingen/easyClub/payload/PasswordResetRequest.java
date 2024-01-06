package com.hsesslingen.easyClub.payload;

import com.hsesslingen.easyClub.password.PasswordResetToken;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class PasswordResetRequest {
    String token;
    String newPassword;
    String passwordRepeat;

}
