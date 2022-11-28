package com.todaypill.request;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/*영양제 종류마다 개별적으로 받는 유저가 선호하는 영양제 속성*/
@Data
public class UserSecondSurveyReq {
	
	@ApiModelProperty(name = "email", example = "khss4008@gmail.com")
	@NotNull(message = "email을 입력하세요.")
    private String email;
	
	@ApiModelProperty(name = "category", example = "마그네슘")
	@NotNull(message = "카테고리를 입력하세요.")
    private String category;
	
	@ApiModelProperty(name = "lowerPriceLimit", example = "5000")
	@NotNull(message = "사용자가 원하는 최소 가격를 입력하세요.")
    private Double  lowerPriceLimit;
	
	@ApiModelProperty(name = "upperPriceLimit", example = "100000")
	@NotNull(message = "사용자가 원하는 최대 가격을 입력하세요.")
    private Double  upperPriceLimit;
	
	@ApiModelProperty(name = "additionalEfficacy", example = "stress_relief")
	@NotNull(message = "원하는 부가 효과를 입력하세요.")
    private String additionalEfficacy; // 추가적인효과 : stress_relief, memory_boost, blood_circulation, energy_boost, muscle_pain
    //,antacid (제산제 효과), 추가중..
	@ApiModelProperty(name = "formula", example = "capsule")
	@NotNull(message = "약의 제형을 입력하세요.")
    private String formula; // capsule, chewable, liquid, powder, spray
	
	@ApiModelProperty(name = "sustainedRelease", example = "false")
	@NotNull(message = "서방형 제재를 원하시는지 여부를 입력하세요.")
    private Boolean sustainedRelease; // 서방형제재를 원하시나요?

}
