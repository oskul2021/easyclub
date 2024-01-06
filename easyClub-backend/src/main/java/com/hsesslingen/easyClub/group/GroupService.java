package com.hsesslingen.easyClub.group;

import com.hsesslingen.easyClub.appuser.AppUser;
import com.hsesslingen.easyClub.appuser.AppUserRepository;
import com.hsesslingen.easyClub.payload.GroupRequest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GroupService {
    
    private GroupRepository groupRepository;
    private AppUserRepository userRepository;

    public List<Group> getAllGroups(){
        return groupRepository.findAll();
    }

    public ArrayList<GroupRequest> getGroupsOfUser(AppUser user) {

        ArrayList<GroupRequest> groups = new ArrayList<>();

        user.getGroups().forEach(group -> {
            group.getUsers().removeIf(u -> (u.getId().equals(user.getId())));
            group.getUsers().forEach(_user-> _user.setGroups(null));
            groups.add(new GroupRequest(group));
        });

        return groups;
    }

    public Group createGroup(Group request) {
        Group group = new Group(request.getName(), request.getDescription());
        return groupRepository.save(group);
    }
    @Transactional
    public void deleteGroup(Group group) {
        group.getUsers().removeAll(group.getUsers());
        groupRepository.save(group);
        groupRepository.delete(group);
    }

    @Transactional
    public List<AppUser> getRestUser(Group group) {
        List<AppUser> restUsers = userRepository.findAll();
        restUsers.removeAll(group.getUsers());
        return restUsers;
    }

    public Group addUserToGroup(AppUser user, Group group){
        
        group.getUsers().add(user);
        return groupRepository.save(group);
    }

    public Group removeUserFromGroup(AppUser user, Group group) {
        group.getUsers().remove(user);
        return groupRepository.save(group);
    }
    public Group updateGroup(Group group) {
        return groupRepository.save(group);
    }
    

    
}
