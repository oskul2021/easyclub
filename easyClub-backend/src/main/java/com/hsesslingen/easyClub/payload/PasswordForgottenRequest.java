package com.hsesslingen.easyClub.payload;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class PasswordForgottenRequest {
    private String email;
    private String username;
}
