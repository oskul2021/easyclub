package com.hsesslingen.easyClub.accountPostings;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hsesslingen.easyClub.appuser.AppUser;
import com.hsesslingen.easyClub.club.Club;
import com.opencsv.bean.CsvBindByName;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

@JsonSerialize
@Data
public class CsvBean{

    @CsvBindByName(column = "account_donor_id")
    private int accountDonor;

    @NotBlank
    @CsvBindByName(column = "booking_date")
    private Timestamp bookingDate;

    @NotBlank
    @CsvBindByName(column = "booking_finished_date")
    private Timestamp bookingFinishedDate;

    @NotBlank
    @CsvBindByName(column = "booking_text")
    private String bookingText;

    @NotBlank
    @CsvBindByName(column = "usage_text")
    private String usageText;

    @NotBlank
    @CsvBindByName(column = "donation_receiver_id")
    private int donationReceiver;

    @NotBlank
    @CsvBindByName(column = "iban")
    private String iban;

    @NotBlank
    @CsvBindByName(column = "bic")
    private String bic;

    @NotBlank
    @CsvBindByName(column = "amount")
    private Long amount;

    @NotBlank
    @CsvBindByName(column = "type")
    private Integer type;
}