package com.minh.scholarship.model.filter;

import com.minh.model.ApiFilter;
import com.minh.scholarship.data.vo.ScholarshipVo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Setter
@Getter
@NoArgsConstructor
@ToString(callSuper = true)
public class ScholarshipFilter extends ApiFilter<ScholarshipVo> {

    public void beautify() {
        this.getCriteria().beautify();
    }

}
