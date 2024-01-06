package com.hsesslingen.easyClub.accountPostings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotBlank;
import java.util.*;

@Repository
@Transactional(readOnly = true)
public interface AccountPostingsRepository extends JpaRepository<AccountPosting, Long> {
    Optional<AccountPosting> findByAccountDonor(final Long accountDonor);

    List<AccountPosting> findAccountPostingsByBookingDateBetween(final @NotBlank Date bookingDate, final @NotBlank Date bookingDate2);

    default List<AccountPosting> findAccountPostingsByBookingDateYear(final @NotBlank Date bookingDate) {
        // init Date with 1.1. of the bookingDate
        final Calendar cal = Calendar.getInstance();
        cal.setTime(bookingDate);
        cal.set(Calendar.MONTH, 0);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        final Date bookingDateStart = cal.getTime();

        // init Date with 31.12. of the bookingDate
        cal.setTime(bookingDate);
        cal.set(Calendar.MONTH, 11);
        cal.set(Calendar.DAY_OF_MONTH, 31);
        final Date bookingDateEnd = cal.getTime();

        return findAccountPostingsByBookingDateBetween(bookingDateStart, bookingDateEnd);
    }

    default List<AccountPosting> findAccountPostingsByBookingDateYear(final int bookingDate) {
        // init Date with 1.1. of the bookingDate
        final Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, bookingDate);
        cal.set(Calendar.MONTH, 0);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        final Date bookingDateStart = cal.getTime();

        // init Date with 31.12. of the bookingDate
        cal.set(Calendar.YEAR, bookingDate);
        cal.set(Calendar.MONTH, 11);
        cal.set(Calendar.DAY_OF_MONTH, 31);
        final Date bookingDateEnd = cal.getTime();

        System.out.println("bookingDateStart: " + bookingDateStart);
        System.out.println("bookingDateEnd: " + bookingDateEnd);
        return findAccountPostingsByBookingDateBetween(bookingDateStart, bookingDateEnd);
    }

    // find all accountPostings ordered by bookingDate as List<AccountPosting>
    // SELECT * FROM account_postings ORDER BY booking_date;
    // https://www.baeldung.com/spring-data-sorting
    // https://www.baeldung.com/spring-data-jpa-query
    // https://www.baeldung.com/spring-data-jpa-query-by-date
    List<AccountPosting> findAllByOrderByBookingDateAsc();

    // find all available years in bookingDate as List<Integer>
    // SELECT DISTINCT YEAR(booking_date) FROM account_postings;
    // https://stackoverflow.com/questions/1823317/java-how-to-get-all-dates-between-two-dates
    // https://stackoverflow.com/questions/7182996/java-get-month-integer-from-date
    // https://stackoverflow.com/questions/136419/get-integer-value-of-the-current-year-month-and-day-in-java
    default List<Integer> findAccountPostingsYears() {
        final List<AccountPosting> accountPostingsOrderedByBookingDate = findAllByOrderByBookingDateAsc();
        System.out.println("accountPostingsOrderedByBookingDate: " + accountPostingsOrderedByBookingDate);
        final Set<Integer> years = new LinkedHashSet<>();
        for (final AccountPosting accountPosting : accountPostingsOrderedByBookingDate) {
            final Calendar cal = Calendar.getInstance();
            cal.setTime(accountPosting.getBookingDate());
            years.add(cal.get(Calendar.YEAR));
        }
        return new ArrayList<>(years);
    }
}
