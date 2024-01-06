package com.hsesslingen.easyClub.appuser;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Set;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hsesslingen.easyClub.group.GroupRepository;
import com.hsesslingen.easyClub.payload.UserChangeRequest;
import com.hsesslingen.easyClub.utils.ImageUtility;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/user")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AppUserController {


    private final AppUserRepository appUserRepository;
    private GroupRepository groupRepo;

    @PostMapping("change-user")
    @PreAuthorize("hasRole('User') or hasRole('Moderator') or hasRole('Admin')")
    public ResponseEntity<?> changeUser(@RequestBody UserChangeRequest request) {
        AppUser appUser = appUserRepository.getById(request.getId());

        appUser.setEmail(request.getEmail());
        appUser.setStreet(request.getStreet());
        appUser.setHousenumber(request.getHousenumber());
        appUser.setPostCode(request.getPostCode());
        appUser.setCity(request.getCity());
        appUser.setPhoneNumber(request.getPhonenumber());
        appUser.setMobileNumber(request.getMobilenumber());

        appUserRepository.save(appUser);

        return ResponseEntity.ok().body("User Details changed sucessfully");

    }

    @PostMapping("user-picture")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id)
            throws IOException {

        AppUser appUser = appUserRepository.getById(id);
        appUser.setPicture(ImageUtility.compressImage(file.getBytes()));
        appUserRepository.save(appUser);

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG)
                .body(Base64.getEncoder().encodeToString(ImageUtility.decompressImage(appUser.getPicture())));
    }

    @GetMapping("all")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> getUsers() {
        List<AppUser> Users = appUserRepository.findAll();

        Users.forEach(user -> user.setGroups(null));
        return ResponseEntity.ok(Users);
    }

    @DeleteMapping("delete")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> deleteUsers(@RequestBody List<Long> userIDs) {
        List<AppUser> users = appUserRepository.findAllById(userIDs);
        users.forEach(user -> {
            user.getGroups().forEach(group -> {
                Set<AppUser> newUsers = groupRepo.getById(group.getId()).getUsers();
                newUsers.remove(user);
                groupRepo.getById(group.getId()).setUsers(newUsers);
            });

            user.setGroups(null);
        });

        appUserRepository.deleteAllById(userIDs);
        List<AppUser> updatedUsers = appUserRepository.findAll();
        updatedUsers.forEach(user -> user.setGroups(null));
       return ResponseEntity.ok().body(updatedUsers);

    }

}
