package com.hsesslingen.easyClub.accountPostings;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hsesslingen.easyClub.appuser.AppUser;
import com.hsesslingen.easyClub.club.Club;
import com.opencsv.bean.CsvBindByName;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@JsonSerialize
public class AccountPosting {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "account_posting_sequence", sequenceName = "account_posting_sequence", allocationSize = 1)
    @Id
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne(cascade = CascadeType.REMOVE, optional = false)
    @JoinColumn(name = "account_donor_id", nullable = false, foreignKey = @ForeignKey(name = "FK_account_donor_id"))
    @NotBlank
    @CsvBindByName(column = "account_donor_id")
    private AppUser accountDonor;

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

    @ManyToOne(cascade = CascadeType.REMOVE, optional = false)
    @JoinColumn(name = "donation_receiver_id", nullable = false, foreignKey = @ForeignKey(name = "FK_donation_receiver_id"))
    @NotBlank
    @CsvBindByName(column = "donation_receiver")
    private Club donationReceiver;

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
