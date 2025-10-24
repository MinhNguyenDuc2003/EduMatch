package com.minh.search.data.repository;

import com.minh.search.data.entity.ScholarshipEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScholarshipRepository extends ElasticsearchRepository<ScholarshipEntity, Long> {
}
