package com.hsesslingen.easyClub.payload;

import java.util.ArrayList;
import java.util.Base64;

import com.hsesslingen.easyClub.appuser.AppUser;
import com.hsesslingen.easyClub.group.Group;
import com.hsesslingen.easyClub.utils.ImageUtility;

import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class GroupRequest {
    Long id;
    String description;
    String name;
    ArrayList<RequestUser> users = new ArrayList<>();

    public GroupRequest(Group group) {
        this.setId(group.getId());
        this.setDescription(group.getDescription());
        this.setName(group.getName());
        group.getUsers().forEach(user -> users.add(new RequestUser(user)));
    }

    @Getter
    @Setter
    class RequestUser {
        Long id;
        String lastName;
        String firstName;
        String userName;
        String email;
        String profilePicture;

        RequestUser(AppUser user) {
            this.setId(user.getId());
            this.setLastName(user.getLastName());
            this.setFirstName(user.getFirstName());
            this.setUserName(user.getUsername());
            this.setEmail(user.getEmail());
            this.setProfilePicture(user.getPicture() != null
                    ? Base64.getEncoder().encodeToString(ImageUtility.decompressImage(user.getPicture()))
                    : "");
        }

    }
}
