package com.hsesslingen.easyClub.accountPostings;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class StorageService{
    @Value("${file.path}")
    private String filePath;

    public String getUploadPath(){
        String uploadDir = System.getProperty("user.dir")+"/"+filePath;
        //String realPathUpload = request.getServletContext().getRealPath(uploadDir);
        if(!new File(uploadDir).exists()){
            new File(uploadDir).mkdir();
        }
        return uploadDir;
    }

    public void save(MultipartFile file){
        try{
            String uploadDir = getUploadPath();
            String filename = file.getOriginalFilename();
            System.out.println("realPathToUpload = {} "+uploadDir);
            String storedFile = uploadDir+"/"+filename;
            File dest = new File(storedFile);
            file.transferTo(dest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (IllegalStateException e) {
            throw new RuntimeException(e);
        }
    }
}
