package com.todaypill.request;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GetHealthReq")
public class GetHealthReq {
	@ApiModelProperty(name = "유저 이름", example = "김영진")
	@NotNull(message = "이름을 입력하세요.")
	private String userName;

	@ApiModelProperty(name = "핸드폰 번호", example = "01012341234")
	@NotNull(message = "핸드폰 번호를 입력하세요.")
	private String phoneNumber;

	@ApiModelProperty(name = "생년원일", example = "19961122")
	@NotNull(message = "생일을 입력하세요.")
	private String birthday;
	
	@ApiModelProperty(name = "이메일", example = "khss5558@naver.com")
	@NotNull(message = "이메일을 입력하세요.")
	private String email;

}
