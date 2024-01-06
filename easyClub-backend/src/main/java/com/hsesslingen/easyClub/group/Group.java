package com.hsesslingen.easyClub.group;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.*;

import com.hsesslingen.easyClub.appuser.AppUser;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity(name="group")
@Table(name = "app_group")
public class Group {
    @SequenceGenerator(name = "app_group_sequence", sequenceName = "app_group_sequence", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToMany(mappedBy = "groups")
    private Set<AppUser> users = new HashSet<>();


    public Group(String name, String descritption) {
        this.name = name;
        this.description = descritption;
    }
}
