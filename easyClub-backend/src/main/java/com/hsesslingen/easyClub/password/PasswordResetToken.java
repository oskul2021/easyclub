package com.hsesslingen.easyClub.password;

import com.hsesslingen.easyClub.appuser.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="password_reset_token")
@Getter
@Setter
@NoArgsConstructor
public class PasswordResetToken {

    @SequenceGenerator(name = "password_reset_token_sequence", sequenceName = "password_reset_token_sequence", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private Boolean used;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private AppUser appUser;

    public PasswordResetToken(String token, Boolean used, AppUser appUser) {
        this.token = token;
        this.used = used;
        this.appUser = appUser;
    }
}
