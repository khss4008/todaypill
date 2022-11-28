package com.todaypill.request;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("DetailHealthReq")
public class DetailHealthReq {
	@ApiModelProperty(name = "알약 크기 ", example = "true")
	@NotNull(message = "알약 크기를 입력하세요.")
	private Boolean pillSize;

	@ApiModelProperty(name = "브랜드 ", example = "롯데")
	@NotNull(message = "선호 브랜드를 입력하세요.")
	private String brand;

	@ApiModelProperty(name = "user id", example = "1")
	@NotNull(message = "user id를 입력하세요.")
	private Integer userId;

}
