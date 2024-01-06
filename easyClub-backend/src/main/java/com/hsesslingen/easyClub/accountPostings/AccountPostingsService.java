package com.hsesslingen.easyClub.accountPostings;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Service
@AllArgsConstructor
public class AccountPostingsService {
    private AccountPostingsRepository accountPostingsRepository;

    public List<AccountPosting> getAllAccountPostings() { return accountPostingsRepository.findAll();}

    //return a list of CsvBean---- CsvBean is a class who represent account_posting data
    public List<CsvBean> beanBuilder(Path path, Class clazz) throws Exception {

        CsvTransfer csvTransfer = new CsvTransfer();
        try (Reader reader = Files.newBufferedReader(path)) {
            CsvToBean<CsvBean> cb = new CsvToBeanBuilder<CsvBean>(reader)
                    .withType(clazz)
                    .build();

            csvTransfer.setCsvList(cb.parse());
        }
        return csvTransfer.getCsvList();
    }
}
