package com.minh.media.utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

@Service
@RequiredArgsConstructor
@Slf4j
public class AmazonS3Util {

    private final S3Client s3Client;
    private static final String BUCKET_NAME;

    static {
        BUCKET_NAME = System.getenv("AWS_BUCKET_NAME");
    }

    public List<String> listFolder(String folderName) {
        ListObjectsRequest listRequest = ListObjectsRequest.builder()
                .bucket(BUCKET_NAME).prefix(folderName).build();

        ListObjectsResponse response = s3Client.listObjects(listRequest);

        List<S3Object> contents = response.contents();

        ListIterator<S3Object> listIterator = contents.listIterator();

        List<String> listKeys = new ArrayList<>();

        while (listIterator.hasNext()) {
            S3Object object = listIterator.next();
            listKeys.add(object.key());
        }

        return listKeys;
    }

    public String uploadFile(String folderName, String fileName, InputStream inputStream, Boolean isPublic) {
        String prefix = Boolean.TRUE.equals(isPublic) ? "public/" : "private/";
        String s3Key = prefix + folderName + "/" + fileName;

        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(s3Key)
                .build();

        try (inputStream) {
            s3Client.putObject(request, RequestBody.fromInputStream(inputStream, inputStream.available()));
            return s3Key;
        } catch (IOException ex) {
            throw new RuntimeException("Upload failed", ex);
        }
    }



    public void deleteFile(String fileName) {
        DeleteObjectRequest request = DeleteObjectRequest.builder().bucket(BUCKET_NAME)
                .key(fileName).build();
        s3Client.deleteObject(request);
    }

    public void removeFolder(String folderName) {
        ListObjectsRequest listRequest = ListObjectsRequest.builder()
                .bucket(BUCKET_NAME).prefix(folderName + "/").build();

        ListObjectsResponse response = s3Client.listObjects(listRequest);

        List<S3Object> contents = response.contents();

        for (S3Object object : contents) {
            DeleteObjectRequest request = DeleteObjectRequest.builder().bucket(BUCKET_NAME)
                    .key(object.key()).build();
            s3Client.deleteObject(request);
            System.out.println("Deleted " + object.key());
        }
    }

}
