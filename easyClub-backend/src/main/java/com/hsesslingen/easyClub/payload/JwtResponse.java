package com.hsesslingen.easyClub.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "easyClub";
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private Date birthdate;
    private String street;
    private String housenumber;
    private String postCode;
    private String city;
    private String email;
    private String phonenumber;
    private String mobilenumber;
    private List<String> roles;
    private boolean passwordChanged;
    private byte[] picture;

    public JwtResponse(String token, Long id, String username, String firstname, String lastname, Date birthdate,
            String street, String housenumber, String postCode, String city, String email, String phonenumber,
            String mobilenumber, List<String> roles, boolean passwordChanged, byte[] picture) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.street = street;
        this.housenumber = housenumber;
        this.postCode = postCode;
        this.city = city;
        this.email = email;
        this.phonenumber = phonenumber;
        this.mobilenumber = mobilenumber;
        this.roles = roles;
        this.passwordChanged = passwordChanged;
        this.picture = picture;
    }
}
