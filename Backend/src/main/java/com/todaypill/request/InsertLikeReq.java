package com.todaypill.request;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("InsertLikeReq")
public class InsertLikeReq {
	@ApiModelProperty(name = "user_id", example = "1")
	@NotNull(message = "user id를 입력하세요.")
	private int userId;

	@ApiModelProperty(name = "supplement_id", example = "1")
	@NotNull(message = "supplement id를 입력하세요.")
	private int supplementId;


}
