package com.hsesslingen.easyClub.accountPostings;

import com.hsesslingen.easyClub.appuser.AppUserRepository;
import com.hsesslingen.easyClub.club.ClubRepository;
import lombok.AllArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;
@RestController
@RequestMapping(path = "api/v1/accountPostings")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AccountPostingsController {
    private final AccountPostingsService accountPostingsService;
    private final AccountPostingsRepository accountPostingsRepository;
    private final AppUserRepository appUserRepository;
    private final ClubRepository clubRepository;
    private HttpServletRequest request;
    private final StorageService storageService;

    @PostMapping("add")
    @PreAuthorize("hasRole('Executive')")
    public AccountPosting addAccountPosting(@RequestBody AccountPosting accountPosting) {
        return accountPostingsRepository.save(accountPosting);
    }

    @GetMapping("all")
    @PreAuthorize("hasRole('Executive')")
    public List<AccountPosting> getAllAccountPostings() {
        List<AccountPosting> list = accountPostingsService.getAllAccountPostings();
        return list;
    }

    @GetMapping("year/{year}")
    @PreAuthorize("hasRole('Executive')")
    public List<AccountPosting> getAccountPostingsByYear(@PathVariable("year") int year) {
        System.out.println("year: " + year);
        return accountPostingsRepository.findAccountPostingsByBookingDateYear(year);
    }

    @GetMapping("years")
    @PreAuthorize("hasRole('Executive')")
    public List<Integer> getAccountPostingsYears() {
        return accountPostingsRepository.findAccountPostingsYears();
    }

    //how to read the csv file
    public List<CsvBean> csvRead(String filename) throws Exception {
        Path path = Paths.get(storageService.getUploadPath()+"/"+filename);
        //Path path = Paths.get(
                //ClassLoader.getSystemResource("").toURI());
        List<CsvBean> sortedList = accountPostingsService.beanBuilder(path, CsvBean.class).stream()
                .collect(Collectors.toSet())
                .stream()
                .toList();
        return sortedList;
    }

    public List<CsvBean> csvWrite(String filename) throws Exception {
        List<CsvBean> sorted = csvRead(filename);
        List<AccountPosting> toSave = new ArrayList<AccountPosting>();
        for (CsvBean bean: sorted){
            AccountPosting obj = new AccountPosting();
            obj.setBic(bean.getBic());
            obj.setAccountDonor(appUserRepository.getById((long) bean.getAccountDonor()));
            obj.setAmount(bean.getAmount());
            obj.setIban(bean.getIban());
            obj.setBookingDate(bean.getBookingDate());
            obj.setBookingFinishedDate(bean.getBookingFinishedDate());
            obj.setBookingText(bean.getBookingText());
            obj.setUsageText(bean.getUsageText());
            obj.setType(bean.getType());
            obj.setDonationReceiver(clubRepository.findById(bean.getDonationReceiver()).get());
            toSave.add(obj);
        }
        accountPostingsRepository.saveAll(toSave);
        return sorted;
    }

    @PostMapping("/upload")
    public List<CsvBean> fileUploading(@RequestParam("file") MultipartFile file) throws Exception {
        if (!file.isEmpty()){
            storageService.save(file);
        }
        List<CsvBean> csvBeans = csvWrite(file.getOriginalFilename());
        return csvBeans;
    }
}


