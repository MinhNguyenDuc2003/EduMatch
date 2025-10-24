package com.minh.search.service.impl;

import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.aggregations.StringTermsAggregate;
import co.elastic.clients.elasticsearch._types.aggregations.StringTermsBucket;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.search.data.entity.ScholarshipEntity;
import com.minh.search.data.mapper.ScholarshipMapper;
import com.minh.search.data.vo.ScholarshipVo;
import com.minh.search.model.constant.ScholarshipField;
import com.minh.search.model.filter.ScholarshipFilter;
import com.minh.search.service.ScholarshipService;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScholarshipServiceImpl implements ScholarshipService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final ScholarshipMapper scholarshipMapper;

    @Override
    public ScholarshipVo findScholarshipAdvance(ScholarshipFilter criteria) {
        NativeQueryBuilder nativeQuery = NativeQuery.builder()
                .withAggregation("countries", Aggregation.of(a -> a
                        .terms(ta -> ta.field(ScholarshipField.COUNTRY))))
                .withAggregation("universities", Aggregation.of(a -> a
                        .terms(ta -> ta.field(ScholarshipField.UNIVERSITY))))
                .withAggregation("studyLevels", Aggregation.of(a -> a
                        .terms(ta -> ta.field(ScholarshipField.STUDY_LEVEL))))
                .withQuery(q -> q
                        .bool(b -> {
                            if (StringUtils.hasText(criteria.getKeyword())) {
                                b.should(s -> s
                                        .multiMatch(m -> m
                                                .fields(ScholarshipField.TITLE, ScholarshipField.DESCRIPTION)
                                                .query(criteria.getKeyword())
                                                .fuzziness(Fuzziness.ONE.asString())
                                        )
                                );
                            }
                            return b;
                        })
                )
                .withPageable(PageRequest.of(criteria.getPage(), criteria.getSize()));

        nativeQuery.withFilter(f -> f
                .bool(b -> {
                    extractedTermsFilter(criteria.getCriteria().getCountry(), ScholarshipField.COUNTRY, b);
                    extractedTermsFilter(criteria.getCriteria().getUniversity(), ScholarshipField.UNIVERSITY, b);
                    extractedTermsFilter(criteria.getCriteria().getStudyLevel(), ScholarshipField.STUDY_LEVEL, b);
                    extractedRange(criteria.getMinGpa(), criteria.getMaxGpa(), b);
                    return b;
                })
        );
        nativeQuery.withSort(criteria.getSort());
        SearchHits<ScholarshipEntity> searchHits = elasticsearchOperations.search(nativeQuery.build(), ScholarshipEntity.class);
        SearchPage<ScholarshipEntity> searchPage = SearchHitSupport.searchPageFor(searchHits, nativeQuery.getPageable());
        List<ScholarshipEntity> searchHitsResult = searchPage.stream().map(SearchHit::getContent).collect(Collectors.toList());
        ScholarshipVo scholarshipVo = new ScholarshipVo();
        scholarshipVo.setScholarship(scholarshipMapper.toDto(searchHitsResult));
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

    private void extractedTermsFilter(String fieldValues, String scholarshipField, BoolQuery.Builder b) {
        if (StringUtils.hasText(fieldValues)) {
            return;
        }
        String[] valuesArray = fieldValues.split(",");
        b.must(m -> {
            BoolQuery.Builder innerBool = new BoolQuery.Builder();
            for (String value : valuesArray) {
                innerBool.should(s -> s
                        .term(t -> t
                                .field(scholarshipField)
                                .value(value)
                                .caseInsensitive(true)
                        )
                );
            }
            return new Query.Builder().bool(innerBool.build());
        });
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
