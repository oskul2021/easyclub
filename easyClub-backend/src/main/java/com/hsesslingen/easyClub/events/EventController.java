package com.hsesslingen.easyClub.events;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/events")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class EventController {
    private final EventRepository eventRepository;
    private final EventService eventService;

    @GetMapping()
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("hasRole('Admin')")
    public List<Event> deleteEvent(@PathVariable("id") Long id) {
        Event event = eventRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such event with id: " + id));

        eventService.deleteEvent(event);
        List<Event> list = eventService.getAllEvents();

        return list;

    }

    @PostMapping
    @PreAuthorize("hasRole('Admin')")
    public List<Event> createEvent(@RequestBody Event request) {
        eventService.createEvent(request);
        List<Event> list = eventService.getAllEvents();
        return list;

    }

    @PatchMapping(value = "/{id}")
    @PreAuthorize("hasRole('Admin')")
    public List<Event> changeEvent(@PathVariable("id") Long eventId, @RequestBody Event _event) {
        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such event with id: " + eventId));

        if (_event.getName() != null && _event.getCategory() != null && _event.getColor() != null
                && _event.getStartdate() != null && _event.getEnddate() != null && _event.getLocation() != null
                && _event.getDescription() != null) {
            event.setName(_event.getName());
            event.setCategory((_event.getCategory()));
            event.setColor((_event.getColor()));
            event.setStartdate((_event.getStartdate()));
            event.setEnddate((_event.getEnddate()));
            event.setLocation(_event.getLocation());
            event.setStarttime(_event.getStarttime());
            event.setEndtime(_event.getEndtime());
            event.setDescription(_event.getDescription());
            event.setAllday(_event.getAllday());
        }

        eventService.updateEvent(event);
        List<Event> list = eventService.getAllEvents();
        return list;
    }
}
