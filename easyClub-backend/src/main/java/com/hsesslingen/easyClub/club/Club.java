package com.hsesslingen.easyClub.club;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name="club")
@Getter
@Setter
@NoArgsConstructor
public class Club {

    @Id
    private Integer id;

    @NotBlank
    private String name;

    @NotBlank
    private String street;

    @NotBlank
    private String houseNumber;

    @NotBlank
    private String postCode;

    @NotBlank
    private String city;

    @NotBlank
    private String taxOffice;

    @NotBlank
    private String taxNumber;

    @NotBlank
    private Date nonProfitAssociationApproval;

    @NotBlank
    private String purposeOfAssociation;
}
