package com.hsesslingen.easyClub.appuser;

import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.hsesslingen.easyClub.group.Group;

import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class AppUser {

    @SequenceGenerator(name = "app_user_sequence", sequenceName = "app_user_sequence", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    @NotBlank
    @Size(max = 120)
    private String password;

    @NotBlank
    @Size(max = 50)
    private String FirstName;

    @NotBlank
    @Size(max = 50)
    private String LastName;

    @NotBlank
    private Date BirthDate;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String mobileNumber;

    @NotBlank
    private String street;

    @NotBlank
    private String housenumber;

    @NotBlank
    private String city;

    @NotBlank
    private String postCode;

    @Column(name = "picture", unique = false, nullable = true, length = 100000)
    private byte[] picture;

    private Boolean customPassword = false;
    private Boolean locked = false;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "app_group_app_users",
            joinColumns = @JoinColumn(name = "app_users_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id"))
    private Set<Group> groups = new HashSet<>();


    public AppUser(@NotBlank @Size(max = 20) String username, @NotBlank @Size(max = 50) @Email String email,
                   @NotBlank @Size(max = 120) String password, @NotBlank @Size(max = 50) String firstName,
                   @NotBlank @Size(max = 50) String lastName, @NotBlank Date birthDate, @NotBlank String phoneNumber,
                   @NotBlank String mobileNumber, @NotBlank String street, @NotBlank String housenumber, @NotBlank String city,
                   @NotBlank String postCode, Set<Role> roles, byte[] picture) {
        this.username = username;
        this.email = email;
        this.password = password;
        FirstName = firstName;
        LastName = lastName;
        BirthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.mobileNumber = mobileNumber;
        this.street = street;
        this.housenumber = housenumber;
        this.city = city;
        this.postCode = postCode;
        this.roles = roles;
        this.picture = picture;
    }

    public AppUser(@NotBlank @Size(max = 20) String username, @NotBlank @Size(max = 50) @Email String email,
                   @NotBlank @Size(max = 120) String password, @NotBlank @Size(max = 50) String firstName,
                   @NotBlank @Size(max = 50) String lastName, @NotBlank Date birthDate, @NotBlank String phoneNumber,
                   @NotBlank String mobileNumber, @NotBlank String street, @NotBlank String housenumber, @NotBlank String city,
                   @NotBlank String postCode, Set<Role> roles) {
        this(username, email, password, firstName, lastName, birthDate, phoneNumber, mobileNumber, street, housenumber,
                city, postCode, roles, null);
    }
}
