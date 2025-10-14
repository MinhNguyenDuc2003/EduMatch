package com.minh.media.utils;

import com.minh.model.dto.media.MediaDto;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.time.Duration;

public class S3UrlUtil {

    private final String bucketName;
    private final String region;
    private final S3Presigner presigner;

    private S3UrlUtil() {
        this.bucketName = System.getenv("AWS_BUCKET_NAME");
        this.region = System.getenv("AWS_DEFAULT_REGION");
        this.presigner = S3Presigner.builder()
                .region(Region.of(region))
                .build();
    }

    private static class Holder {
        private static final S3UrlUtil INSTANCE = new S3UrlUtil();
    }

    public static S3UrlUtil getInstance() {
        return Holder.INSTANCE;
    }

    public String getPublicUrl(String s3Key) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s",
                bucketName, region, s3Key);
    }

    public String getPresignedUrl(String s3Key, int expiryMinutes) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(s3Key)
                .build();

        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(expiryMinutes))
                .getObjectRequest(getObjectRequest)
                .build();

        return presigner.presignGetObject(presignRequest).url().toString();
    }

    public String getUrl(MediaDto media) {
        if (Boolean.TRUE.equals(media.getIsPublic())) {
            return getPublicUrl(media.getS3Key());
        } else {
            return getPresignedUrl(media.getS3Key(), 15);
        }
    }
}
