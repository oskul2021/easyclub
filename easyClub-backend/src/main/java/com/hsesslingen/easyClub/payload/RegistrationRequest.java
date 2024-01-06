package com.hsesslingen.easyClub.payload;

import com.hsesslingen.easyClub.appuser.Role;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {
    private final String firstName;
    private final String lastName;
    private final String email;
    private final Date birthDate;
    private final Set<String> roles;
    private final String phoneNumber;
    private final String mobileNumber;
    private final String street;
    private final String housenumber;
    private final String city;
    private final String postCode;


}
