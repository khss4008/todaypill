package com.todaypill.request;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserFirstSurveyReq")
public class UserFirstSurveyReq {


	@ApiModelProperty(name = "유저 id", example = "1")
	@NotNull(message = "user id를 입력하세요.")
	private Integer userId;
	
	@ApiModelProperty(name = "임신 여부", example = "true")
	@NotNull(message = "임신 여부 입력하세요.")
	private boolean pregnant;
	
	@ApiModelProperty(name = "폐경기 여부", example = "true")
	@NotNull(message = "폐경기 여부 입력하세요.")
	private boolean menopause;
	
	@ApiModelProperty(name = "흡연 여부", example = "true")
	@NotNull(message = "흡연 여부 입력하세요.")
	private boolean smoking;
	
	@ApiModelProperty(name = "음주 여부", example = "2")
	@NotNull(message = "음주 여부 입력하세요.")
	private Integer drink;
	
	@ApiModelProperty(name = "알러지 개수", example = "꽃가루")
	@NotNull(message = "알러지 입력하세요.")
	private String allergy;
	
	@ApiModelProperty(name = "바깥활동 여부", example = "2")
	@NotNull(message = "바깥활동 여부 입력하세요.")
	private Integer outdoor_activity;
	
	@ApiModelProperty(name = "균형식사 여부", example = "true")
	@NotNull(message = "균형식사 입력하세요.")
	private boolean balanced_meal;
	
	@ApiModelProperty(name = "뭘 먹고있는지", example = "생선, 육류")
	@NotNull(message = "뭐가 부족한지 입력하세요.")
	private String lack;
	
	@ApiModelProperty(name = "큰 알약은 괜찮은지", example = "false")
	@NotNull(message = "큰 알약은 괜찮은지 입력하세요.")
	private boolean is_ok_big_pill;
	
	@ApiModelProperty(name = "증상 뭐있는지", example = "속쓰림")
	@NotNull(message = "증상 뭐있는지 입력하세요.")
	private String symptom;
	
	@ApiModelProperty(name = "병 뭐있는지", example = "빈혈")
	@NotNull(message = "병 뭐있는지 입력하세요.")
	private String disease;

	@ApiModelProperty(name = "복용중인 약 뭐있는지", example = "혈압약")
	@NotNull(message = "복용중인 약 입력하세요.")
	private String medicine;
	
	@ApiModelProperty(name = "격렬한 신체활동을 많이 하는지", example = "true")
	@NotNull(message = "격렬한 신체활동을 하는지 입력하세요.")
	private boolean toughActivity;
	
	
	@ApiModelProperty(name = "선호 브랜드 이름", example = "엔자이메디카")
	@NotNull(message = "선호 브랜드 이름 입력하세요.")
	private String preferred_brand;
	
	@ApiModelProperty(name = "고민거리", example = "배가 아파요")
	@NotNull(message = "고민거리 입력하세요.")
	private String problem;
	
}
