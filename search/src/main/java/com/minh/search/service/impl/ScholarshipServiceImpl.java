package com.minh.search.service.impl;

import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.aggregations.StringTermsAggregate;
import co.elastic.clients.elasticsearch._types.aggregations.StringTermsBucket;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.search.data.entity.ScholarshipEntity;
import com.minh.search.data.mapper.ScholarshipMapper;
import com.minh.search.data.repository.ScholarshipRepository;
import com.minh.search.data.vo.ScholarshipVo;
import com.minh.search.feign.ScholarshipFeign;
import com.minh.search.model.constant.ScholarshipField;
import com.minh.search.model.filter.ScholarshipFilter;
import com.minh.search.service.ScholarshipService;
import com.minh.service.base.BaseService;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.common.unit.Fuzziness;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchAggregation;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.*;
import org.springframework.data.elasticsearch.core.query.FetchSourceFilter;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScholarshipServiceImpl extends BaseService implements ScholarshipService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final ScholarshipMapper scholarshipMapper;
    private final ScholarshipRepository scholarshipRepository;
    private final ScholarshipFeign scholarshipFeign;

    @Override
    public ScholarshipVo findScholarshipAdvance(ScholarshipFilter criteria) {
        NativeQueryBuilder nativeQuery = NativeQuery.builder()
                .withAggregation("country", Aggregation.of(a -> a
                        .terms(ta -> ta.field(ScholarshipField.COUNTRY))))
                .withAggregation("studyLevel", Aggregation.of(a -> a
                        .terms(ta -> ta.field(ScholarshipField.STUDY_LEVEL))))
                .withPageable(PageRequest.of(criteria.getPage(), criteria.getSize()));

        boolean hasKeyword = StringUtils.hasText(criteria.getKeyword());
        boolean hasCountry = criteria.getCriteria().getCountry() != null && !criteria.getCriteria().getCountry().isEmpty();
        boolean hasStudyLevel = criteria.getCriteria().getStudyLevel() != null && !criteria.getCriteria().getStudyLevel().isEmpty();
        boolean hasScholarshipType = criteria.getCriteria().getScholarshipType() != null && !criteria.getCriteria().getScholarshipType().isEmpty();
        boolean hasGpa = criteria.getMinGpa() != null || criteria.getMaxGpa() != null;

        if (hasKeyword) {
            nativeQuery.withQuery(q -> q
                    .bool(b -> {
                        b.should(s -> s
                                .match(m -> m
                                        .field(ScholarshipField.TITLE)
                                        .query(criteria.getKeyword())
                                        .fuzziness(Fuzziness.ONE.asString())
                                )
                        );
                        return b;
                    })
            );
        }

        if (StringUtils.hasText(criteria.getCriteria().getUniversity())) {
            nativeQuery.withFilter(f -> f
                    .bool(b -> {
                        b.must(m -> m
                                .term(t -> t
                                        .field(ScholarshipField.UNIVERSITY)
                                        .value(criteria.getCriteria().getUniversity())
                                )
                        );
                        return b;
                    })
            );
        }

        if (hasCountry || hasStudyLevel || hasScholarshipType || hasGpa) {
            nativeQuery.withFilter(f -> f
                    .bool(b -> {
                        if (hasCountry)
                            extractedTermsFilter(criteria.getCriteria().getCountry(), ScholarshipField.COUNTRY, b);
                        if (hasStudyLevel)
                            extractedTermsFilter(criteria.getCriteria().getStudyLevel(), ScholarshipField.STUDY_LEVEL, b);
                        if (hasScholarshipType)
                            extractedTermsFilter(criteria.getCriteria().getScholarshipType(), ScholarshipField.SCHOLARSHIP_TYPE, b);
                        if (hasGpa) extractedRange(criteria.getMinGpa(), criteria.getMaxGpa(), b);
                        return b;
                    })
            );
        }

        nativeQuery.withSort(criteria.getSort());
        SearchHits<ScholarshipEntity> searchHits = elasticsearchOperations.search(nativeQuery.build(), ScholarshipEntity.class);
        SearchPage<ScholarshipEntity> searchPage = SearchHitSupport.searchPageFor(searchHits, nativeQuery.getPageable());
        List<ScholarshipEntity> searchHitsResult = searchPage.stream().map(SearchHit::getContent).collect(Collectors.toList());
        ScholarshipVo scholarshipVo = new ScholarshipVo();
        scholarshipVo.setScholarship(this.parseResponse(scholarshipFeign.getByIds(searchHitsResult.stream().map(ScholarshipEntity::getId).collect(Collectors.toList()))));
        scholarshipVo.setPageNum(criteria.getPage());
        scholarshipVo.setPageSize(criteria.getSize());
        scholarshipVo.setTotalPages(searchPage.getTotalPages());
        scholarshipVo.setTotalElements(searchPage.getTotalElements());

        scholarshipVo.setAggregations(getAggregations(searchHits));
        return scholarshipVo;
    }

    @Override
    public List<ScholarshipDto> autoCompleteScholarshipName(String keyword) {
        NativeQuery matchQuery = NativeQuery.builder()
                .withQuery(q -> q
                        .matchPhrasePrefix(m -> m
                                .field(ScholarshipField.TITLE)
                                .query(keyword)
                        )
                )
                .withSourceFilter(new FetchSourceFilter(
                        new String[]{"title"},
                        null)
                )
                .build();
        SearchHits<ScholarshipEntity> result = elasticsearchOperations.search(matchQuery, ScholarshipEntity.class);
        List<ScholarshipEntity> scholarships = result.stream().map(SearchHit::getContent).toList();
        return scholarshipMapper.toDto(scholarships);
    }

    @Override
    public List<ScholarshipDto> getAll() {
        return scholarshipMapper.toDto(scholarshipRepository.findAll());
    }

    @Override
    public List<ScholarshipDto> autoCompleteUniversity(String keyword) {
        NativeQuery matchQuery = NativeQuery.builder()
                .withQuery(q -> q
                        .matchPhrasePrefix(m -> m
                                .field(ScholarshipField.UNIVERSITY)
                                .query(keyword)
                        )
                )
                .withSourceFilter(new FetchSourceFilter(
                        new String[]{"university"},
                        null)
                )
                .build();
        SearchHits<ScholarshipEntity> result = elasticsearchOperations.search(matchQuery, ScholarshipEntity.class);
        List<ScholarshipEntity> scholarships = result.stream().map(SearchHit::getContent).toList();
        Map<String, ScholarshipEntity> scholarshipEntityMap = scholarships.stream().collect(Collectors.toMap(ScholarshipEntity::getUniversity, Function.identity(), (o1, o2) -> o1));
        return scholarshipMapper.toDto(new ArrayList<>(scholarshipEntityMap.values()));
    }

    private void extractedTermsFilter(String fieldValues, String keywordField, BoolQuery.Builder boolBuilder) {
        if (!StringUtils.hasText(fieldValues)) return;

        String[] valuesArray = fieldValues.split(",");
        if (valuesArray.length == 0) return;

        BoolQuery.Builder inner = new BoolQuery.Builder();
        for (String value : valuesArray) {
            if (!StringUtils.hasText(value)) continue;
            inner.should(s -> s.term(t -> t.field(keywordField).value(value).caseInsensitive(false)));
        }

        boolBuilder.must(m -> m.bool(inner.build()));
    }

    private void extractedRange(Number min, Number max, BoolQuery.Builder bool) {
        if (min != null || max != null) {
            bool.must(m -> m
                    .range(r -> r
                            .field(ScholarshipField.GPA_REQUIREMENT)
                            .from(min != null ? min.toString() : null)
                            .to(max != null ? max.toString() : null)
                    )
            );
        }
    }

    private Map<String, Map<String, Long>> getAggregations(SearchHits<ScholarshipEntity> searchHits) {
        List<org.springframework.data.elasticsearch.client.elc.Aggregation> aggregations = new ArrayList<>();
        if (searchHits.hasAggregations()) {
            ((List<ElasticsearchAggregation>) searchHits.getAggregations().aggregations())
                    .forEach(elsAgg -> aggregations.add(elsAgg.aggregation()));
        }

        Map<String, Map<String, Long>> aggregationsMap = new HashMap<>();
        aggregations.forEach(agg -> {
            Map<String, Long> aggregation = new HashMap<>();
            StringTermsAggregate stringTermsAggregate = (StringTermsAggregate) agg.getAggregate()._get();
            List<StringTermsBucket> stringTermsBuckets = (List<StringTermsBucket>) stringTermsAggregate.buckets()._get();
            stringTermsBuckets.forEach(bucket -> aggregation.put(bucket.key()._get().toString(), bucket.docCount()));
            aggregationsMap.put(agg.getName(), aggregation);
        });

        return aggregationsMap;
    }

}
