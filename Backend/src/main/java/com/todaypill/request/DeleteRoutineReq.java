package com.todaypill.request;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("DeleteRoutineReq")
public class DeleteRoutineReq {
	@ApiModelProperty(name = "삭제 일자", example = "2022-11-11")
	@NotNull(message = "삭제 일자를 입력하세요.")
	private String deletedSince;
}
