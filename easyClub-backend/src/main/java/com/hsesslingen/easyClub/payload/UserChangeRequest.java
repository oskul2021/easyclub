package com.hsesslingen.easyClub.payload;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UserChangeRequest {
    private final Long id;
    private final String email;
    private final String street;
    private final String housenumber;
    private final String postCode;
    private final String city;
    private final String phonenumber;
    private final String mobilenumber;

}
