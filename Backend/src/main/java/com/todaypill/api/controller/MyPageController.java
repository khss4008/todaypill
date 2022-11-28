package com.todaypill.api.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todaypill.db.entity.Like;
import com.todaypill.db.entity.Routine;
import com.todaypill.db.entity.User;
import com.todaypill.request.DeleteRoutineReq;
import com.todaypill.request.RoutineReq;
import com.todaypill.service.MyPageService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/api/mypage")
public class MyPageController {

	@Autowired
	private MyPageService myPageService;

	public MyPageController(MyPageService myPageService) {
		super();
		this.myPageService = myPageService;
	}

	@GetMapping("/{userId}")
	@ApiOperation(value = "유저의 마이페이지에 접근한다.", notes = "user id 필요")
	public ResponseEntity<?> myPage(@PathVariable int userId) {
		User user = myPageService.getUser(userId);
		List<Like> list = myPageService.getLikeList(userId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("user", user);
		map.put("likeList", list);
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	@GetMapping("/{userId}/mysupplement")
	@ApiOperation(value = "유저가 복용하는 영양제 데이터에 접근한다.", notes = "user id 필요")
	public ResponseEntity<?> mySupplement(@PathVariable int userId) {
		List<Routine> list = myPageService.getRoutineList(userId);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@PostMapping("/{userId}/mysupplement")
	@ApiOperation(value = "유저가 복용하는 영양제 데이터를 추가한다.", notes = "routine 필요")
	public ResponseEntity<?> insertSupplement(@PathVariable int userId, @RequestBody RoutineReq routineReq) {
		Routine routine = Routine.builder().userId(userId).supplementId(routineReq.getSupplementId())
				.time(routineReq.getTime()).day(routineReq.getDay()).tablets(routineReq.getTablets())
				.pushAlarm(routineReq.getPushAlarm()).addedSince(routineReq.getAddedSince()).build();
		myPageService.insertRoutine(routine);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PatchMapping("/{userId}/mysupplement/{routineId}")
	@ApiOperation(value = "유저가 복용하는 영양제 데이터를 삭제(deleteSince 날짜 추가)한다.", notes = "routine id, 삭제일자 String 필요")
	public ResponseEntity<?> updateRoutineVisibility(@PathVariable int routineId, @RequestBody DeleteRoutineReq deleteRoutineReq) {
		String deletedSince = deleteRoutineReq.getDeletedSince();
		myPageService.updateRoutineVisibility(routineId, deletedSince);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping("/{userId}/mysupplement/{routineId}")
	@ApiOperation(value = "유저가 복용하는 영양제 데이터를 수정한다.", notes = "routine id 필요")
	public ResponseEntity<?> updateSupplement(@PathVariable int userId, @PathVariable int routineId,
			@RequestBody RoutineReq routineReq) {
		String deletedSince = routineReq.getAddedSince();
		Routine routine = Routine.builder().userId(userId).supplementId(routineReq.getSupplementId())
				.time(routineReq.getTime()).day(routineReq.getDay()).tablets(routineReq.getTablets())
				.pushAlarm(routineReq.getPushAlarm()).addedSince(routineReq.getAddedSince()).build();
		myPageService.updateRoutine(routineId, routine, deletedSince);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
