package com.todaypill.response;

import com.todaypill.db.entity.Routine;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CalendarRes extends Routine {
	private Boolean taken;
	private int calendarId;

	public CalendarRes(int routineId, int userId, int supplementId, String time, String day, int tablets,
			String addedSince, String deletedSince, Boolean pushAlarm, Boolean taken, int calendarId) {
		super(routineId, userId, supplementId, time, day, tablets, addedSince, deletedSince, pushAlarm);
		this.taken = taken;
		this.calendarId = calendarId;
	}
}
