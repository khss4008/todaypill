package com.todaypill.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todaypill.db.entity.Calendar;
import com.todaypill.db.entity.Routine;
import com.todaypill.request.CalendarReq;
import com.todaypill.response.CalendarRes;
import com.todaypill.service.MyPageService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

	@Autowired
	private MyPageService myPageService;

	public CalendarController(MyPageService myPageService) {
		super();
		this.myPageService = myPageService;
	}

	@GetMapping("/{userId}/{month}")
	@ApiOperation(value = "유저의 캘린더에 접근한다.", notes = "user id, month(String) 필요")
	public ResponseEntity<?> calendar(@PathVariable int userId, @PathVariable int month) {
		List<Calendar> calendarList = myPageService.getCalendarMonthList(userId, month);
		return new ResponseEntity<>(calendarList, HttpStatus.OK);
	}

	@GetMapping("/{userId}/{date}/{day}")
	@ApiOperation(value = "특정 일자 캘린더에 접근한다.", notes = "user id, date, day(String, 요일 숫자) 필요")
	public ResponseEntity<?> myDate(@PathVariable int userId, @PathVariable String date, @PathVariable String day) {
		List<CalendarRes> resultList = new ArrayList<CalendarRes>();
		List<Routine> routineList = myPageService.getRoutineListByDay(userId, day, date);
		List<Calendar> calendarList = myPageService.getCalendarDayList(userId, date);
		for (Routine r : routineList) {
			CalendarRes res = new CalendarRes();
			res.setRoutineId(r.getRoutineId());
			res.setUserId(r.getUserId());
			res.setSupplementId(r.getSupplementId());
			res.setTime(r.getTime());
			res.setDay(r.getDay());
			res.setTablets(r.getTablets());
			res.setAddedSince(r.getAddedSince());
			res.setDeletedSince(r.getDeletedSince());
			res.setPushAlarm(r.getPushAlarm());
			
			int routineId = r.getRoutineId();
			Boolean taken = false;
			for (Calendar c : calendarList) {
				if (c.getRoutineId() == routineId)
					taken = true;
				res.setCalendarId(c.getCalendarId());
			}
			res.setTaken(taken);
			resultList.add(res);
		}
		return new ResponseEntity<>(resultList, HttpStatus.OK);
	}

	@GetMapping("/{calendarId}")
	@ApiOperation(value = "복용 데이터를 조회한다.", notes = "calendarId 필요")
	public ResponseEntity<?> getCalendar(@PathVariable int calendarId) {
		Optional<Calendar> calendar = myPageService.getCalendar(calendarId);
		return new ResponseEntity<>(calendar, HttpStatus.OK);
	}
	
	@PostMapping("/{userId}/{date}")
	@ApiOperation(value = "복용 데이터를 기록한다.", notes = "user id, date(String) 필요")
	public ResponseEntity<?> insertCalendar(@RequestBody CalendarReq calendarReq) {
		Calendar calendar = Calendar.builder().routineId(calendarReq.getRoutineId()).userId(calendarReq.getUserId())
				.date(calendarReq.getDate()).taken(true).build();
		myPageService.insertCalendar(calendar);
		return new ResponseEntity<>(calendar.getCalendarId(), HttpStatus.OK);
	}

	@DeleteMapping("/{calendarId}")
	@ApiOperation(value = "복용 데이터를 삭제한다.", notes = "user id, date(String) 필요")
	public ResponseEntity<?> deleteCalendar(@PathVariable int calendarId) {
		myPageService.deleteCalendar(calendarId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
