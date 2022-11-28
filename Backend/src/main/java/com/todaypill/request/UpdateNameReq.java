package com.todaypill.request;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UpdateNameReq")
public class UpdateNameReq {
	@ApiModelProperty(name = "user_id", example = "1")
	@NotNull(message = "user_id를 입력하세요.")
	private int userId;

	@ApiModelProperty(name = "name", example = "김정서")
	@NotNull(message = "바꿀 이름을 입력하세요.")
	private String name;

}
