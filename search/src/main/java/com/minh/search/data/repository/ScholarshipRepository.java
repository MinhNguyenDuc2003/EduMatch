package com.minh.search.data.repository;

import com.minh.search.data.entity.ScholarshipEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipRepository extends ElasticsearchRepository<ScholarshipEntity, Long> {
    List<ScholarshipEntity> findAll();
}
