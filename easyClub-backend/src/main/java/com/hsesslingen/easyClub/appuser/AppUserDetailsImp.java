package com.hsesslingen.easyClub.appuser;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
public class AppUserDetailsImp implements UserDetails {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private Date birthdate;
    private String street;
    private String housenumber;
    private String city;
    private String email;
    private String phonenumber;
    private String mobilenumber;
    private String postCode;
    private byte[] picture;
    @JsonIgnore
    private String password;
    private Boolean customPassword;

    private Collection<? extends GrantedAuthority> authorities;

    public AppUserDetailsImp(Long id, String username, String firstname, String lastname, Date birthdate, String street,
            String housenumber, String postCode, String city, String email, String phonenumber, String mobilenumber,
            String password, Boolean customPassword, byte[] picture,
            Collection<? extends GrantedAuthority> authorities) {
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
        this.mobilenumber = mobilenumber;
        this.phonenumber = phonenumber;
        this.password = password;
        this.customPassword = customPassword;
        this.picture = picture;
        this.authorities = authorities;
    }

    public static AppUserDetailsImp build(AppUser user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());
        return new AppUserDetailsImp(
                user.getId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getBirthDate(),
                user.getStreet(),
                user.getHousenumber(),
                user.getPostCode(),
                user.getCity(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getMobileNumber(),
                user.getPassword(),
                user.getCustomPassword(),
                user.getPicture(),
                 authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        AppUserDetailsImp user = (AppUserDetailsImp) o;
        return Objects.equals(id, user.id);
    }

    public Boolean isPasswordChanged() {
        return customPassword;
    }
}
