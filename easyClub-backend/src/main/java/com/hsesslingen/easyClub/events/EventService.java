package com.hsesslingen.easyClub.events;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventService { // a list is created out of the repository
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Transactional
    public void deleteEvent(Event event) {

        eventRepository.save(event);
        eventRepository.delete(event);
    }

    public Event createEvent(Event request) {
        Event event = new Event(request.getName(), request.getCategory(), request.getLocation(), request.getStartdate(),
                request.getStarttime(),
                request.getEnddate(), request.getEndtime(), request.getDescription(), request.getColor(),
                request.getAllday());
        return eventRepository.save(event);
    }

    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }

}
