package com.hsesslingen.easyClub.login;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class LoginRequest {
    private final String userName;
    private final String password;
}
