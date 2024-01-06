package com.hsesslingen.easyClub.group;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import com.hsesslingen.easyClub.appuser.AppUser;
import com.hsesslingen.easyClub.appuser.AppUserRepository;
import com.hsesslingen.easyClub.appuser.ERole;
import com.hsesslingen.easyClub.appuser.Role;
import com.hsesslingen.easyClub.email.EmailSender;
import com.hsesslingen.easyClub.payload.GroupMessageRequest;
import com.hsesslingen.easyClub.payload.GroupRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "api/v1/group")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class GroupController {

    private final GroupService groupService;
    private AppUserRepository appRepo;
    private GroupRepository groupRepo;

    private final EmailSender emailSender;

    @GetMapping()
    @PreAuthorize("hasRole('Admin')")
    public List<Group> getAllGroups() {
        List<Group> list = groupService.getAllGroups();
        list.forEach(group -> group.getUsers().forEach(user -> user.setGroups(null)));
        return list;
    }

    @GetMapping(value = "/{userId}")
    @PreAuthorize("hasRole('User')")
    public ArrayList<GroupRequest> getGroupsByUser(@PathVariable("userId") Long userId) {
        AppUser user = appRepo.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user with id: " + userId));
        return groupService.getGroupsOfUser(user);
    }

    @PostMapping
    @PreAuthorize("hasRole('Admin')")
    public List<Group> createGroup(@RequestBody Group request) {
        groupService.createGroup(request);
        List<Group> list = groupService.getAllGroups();
        list.forEach(_group -> _group.getUsers().forEach(_user -> _user.setGroups(null)));
        return list;
    }

    @DeleteMapping(value = "/{groupId}")
    @PreAuthorize("hasRole('Admin')")
    public List<Group> deleteGroup(@PathVariable("groupId") Long groupId) {

        Group group = groupRepo.findById(groupId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such group with id: " + groupId));
        groupService.deleteGroup(group);

        List<Group> list = groupService.getAllGroups();
        list.forEach(_group -> _group.getUsers().forEach(_user -> _user.setGroups(null)));
        return list;
    }

    @GetMapping(value = "/restUsers/{groupId}")
    @PreAuthorize("hasRole('Admin')")
    public List<AppUser> getRestUsers(@PathVariable("groupId") Long groupId) {
        Group group = groupRepo.findById(groupId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such group with id: " + groupId));
        List<AppUser> users = groupService.getRestUser(group);
        users.forEach(user -> user.setGroups(null));
        return users;
    }

    @PutMapping(value = "/addUser/{userId}/{groupId}")
    @PreAuthorize("hasRole('Admin')")
    public List<Group> addUserToGroup(@PathVariable("userId") Long userId, @PathVariable("groupId") Long groupId) {

        AppUser user = appRepo.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user with id: " + userId));
        Group group = groupRepo.findById(groupId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such group with id: " + groupId));

        group = groupService.addUserToGroup(user, group);
        List<Group> list = groupService.getAllGroups();
        list.forEach(_group -> _group.getUsers().forEach(_user -> _user.setGroups(null)));
        return list;
    }

    @PutMapping(value = "/removeUser/{userId}/{groupId}")
    @PreAuthorize("hasRole('Admin')")
    public List<Group> removeUser(@PathVariable("userId") Long userId, @PathVariable("groupId") Long groupId) {
        AppUser user = appRepo.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user with id: " + userId));
        Group group = groupRepo.findById(groupId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such group with id: " + groupId));

        group = groupService.removeUserFromGroup(user, group);
        List<Group> list = groupService.getAllGroups();
        list.forEach(_group -> _group.getUsers().forEach(_user -> _user.setGroups(null)));
        return list;
    }

    @PatchMapping(value = "/{groupId}")
    @PreAuthorize("hasRole('User')")
    public List<Group> updateGroup(@PathVariable("groupId") Long groupId, @RequestBody Group _group) {

        Group group = groupRepo.findById(groupId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such group with id: " + groupId));
        if (_group.getName() != null)
            group.setName(_group.getName());

        if (_group.getDescription() != null)
            group.setDescription(_group.getDescription());

        group = groupService.updateGroup(group);
        List<Group> list = groupService.getAllGroups();
        list.forEach(g -> g.getUsers().forEach(_user -> _user.setGroups(null)));
        return list;
    }

    @PostMapping("/sendGroupMail/{userId}/{groupId}")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<String> sendGroupMail(@PathVariable("userId") Long userId,
            @PathVariable("groupId") Long groupId,
            @RequestBody GroupMessageRequest request) {

        AppUser user = appRepo.findById(userId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user with id: " + userId));
        Group group = groupRepo.findById(groupId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such group with id: " + groupId));

        if (!hasUserRole(user, ERole.Admin))
            if (!isUserInGroup(user, group))
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Users are not in the same group.");
        
        
        ArrayList<String> to = new ArrayList<>();
        group.getUsers().forEach(u -> {
            if (!u.getUsername().equals(user.getUsername()))
                to.add(u.getEmail());
        });

        emailSender.send(user, to.toArray(String[]::new), request.getSubject(), request.getMessage());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/sendUserMail/{senderId}/{recipientId}")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<String> sendUserMail(@PathVariable("senderId") Long senderId,
            @PathVariable("recipientId") Long recipientId,
            @RequestBody GroupMessageRequest request) {

        AppUser sender = appRepo.findById(senderId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user with id: " + senderId));
        AppUser recipent = appRepo.findById(recipientId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user with id: " + recipientId));
        if (!hasUserRole(sender, ERole.Admin))
            if (!checkAreUsersInSameGroup(sender, recipent))
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Users are not in the same group.");

        String[] to = { recipent.getEmail() };
        emailSender.send(sender, to, request.getSubject(), request.getMessage());
        return ResponseEntity.ok().build();
    }

    public boolean checkAreUsersInSameGroup(AppUser sender, AppUser recipent) {
        try {
            sender.getGroups().forEach(_group -> {
                _group.getUsers().forEach(u -> {
                    if (u.getId().equals(recipent.getId()))
                    throw new RuntimeException();
                });
            });
            return false;
        } catch (Exception e) {
            return true;
        }
    }

    public boolean isUserInGroup(AppUser user, Group group){
        try{
        user.getGroups().forEach(g -> {
            g.getUsers().forEach(u ->{
                if (u.getId().equals(user.getId()))
                throw new RuntimeException();
            });
        });
        return false;
    } catch (Exception e) {
        return true;
    }
    }

    public boolean hasUserRole(AppUser user, ERole role){
        try{
            user.getRoles().forEach(r -> {
            if(r.getName() == role) 
                throw new RuntimeException();
        });
        return false;
    } catch (Exception e) {
        return true;
    }
    }

}
