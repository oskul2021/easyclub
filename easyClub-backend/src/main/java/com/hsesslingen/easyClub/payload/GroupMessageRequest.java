package com.hsesslingen.easyClub.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class GroupMessageRequest {
    private String message;
    private String subject;
    
}
