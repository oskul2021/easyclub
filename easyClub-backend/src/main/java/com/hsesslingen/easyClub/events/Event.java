package com.hsesslingen.easyClub.events;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity(name = "event")
@Table(name = "app_events")
public class Event {
    @SequenceGenerator(name = "app_event_sequence", sequenceName = "app_event_sequence", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // if only the admin is allowed to add events userId is not needed. Else a new
    // joined table should be created instead of the String value
    @NotBlank
    private String name;
    @NotBlank
    private String category;
    @NotBlank
    private String location;
    @NotBlank
    private String startdate;
    @NotBlank
    private String starttime;
    @NotBlank
    private String enddate;
    @NotBlank
    private String endtime;
    @NotBlank
    private String description;

    private String color;
    private Boolean allday;

    public Event(String name, String category, String location, String startdate, String starttime, String enddate,
            String endtime,
            String description, String color, Boolean allday) {

        this.name = name;
        this.category = category;
        this.location = location;
        this.startdate = startdate;
        this.enddate = enddate;
        this.starttime = starttime;
        this.endtime = endtime;
        this.description = description;
        this.color = color;
        this.allday = allday;

    }
}
