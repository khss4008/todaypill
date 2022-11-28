package com.todaypill.request;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CalendarReq")
public class CalendarReq {	
	@ApiModelProperty(name = "날짜", example = "2022-11-09")
	@NotNull(message = "날짜를 입력하세요.")
	private String date;

	@ApiModelProperty(name = "routineId", example = "1")
	@NotNull(message = "routineId를 입력하세요.")
	private int routineId;

	@ApiModelProperty(name = "userId", example = "1")
	@NotNull(message = "userId를 입력하세요.")
	private int userId;
}
