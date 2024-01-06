package com.hsesslingen.easyClub.payload;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class PasswordChangeRequest {
    private final Long id;
    private final String oldPassword;
    private final String newPassword;
    private final String passwordRepeat;
}
