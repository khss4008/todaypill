package com.todaypill.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todaypill.db.entity.CommonQuestion;
import com.todaypill.db.entity.CompareUser;
import com.todaypill.db.entity.Supplement;
import com.todaypill.db.entity.User;
import com.todaypill.service.CommonQuestionService;
import com.todaypill.service.LikeService;
import com.todaypill.service.SupplementService;
import com.todaypill.service.UserService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/api/supplement")
public class SupplementController {

	UserService userService;
	SupplementService supplementService;
	CommonQuestionService commonquestionService;
	LikeService likeService;

	@Autowired
	public SupplementController(UserService userService, SupplementService supplementService,
			CommonQuestionService commonquestionService, LikeService likeService) {
		super();
		this.userService = userService;
		this.supplementService = supplementService;
		this.commonquestionService = commonquestionService;
		this.likeService = likeService;
	}

	@GetMapping("/findAll")
	@ApiOperation(value = "supplement 전부를 가져온다", notes = "가져온다")
	public ResponseEntity<?> firstSurvey() throws Exception {
		List<Supplement> list = supplementService.findAll();
		return new ResponseEntity<List<Supplement>>(list, HttpStatus.OK);
	}
	
	@GetMapping("/findAllByCategory/{category}")
	@ApiOperation(value = "supplement를 카테고리 별로 가져온다", notes = "가져온다")
	public ResponseEntity<?> firstSurvey(@PathVariable String category) throws Exception {
		List<Supplement> list = supplementService.findAllByCategory(category);
		return new ResponseEntity<List<Supplement>>(list, HttpStatus.OK);
	}

	@GetMapping("/{supplementId}")
	@ApiOperation(value = "supplement id로 해당 영양제 정보를 가져온다", notes = "가져온다")
	public ResponseEntity<?> findSupplement(@PathVariable int supplementId) throws Exception {
		Supplement supplement = supplementService.getSupplement(supplementId);
		return new ResponseEntity<Supplement>(supplement, HttpStatus.OK);
	}

	@GetMapping("/findLikeTop10")
	@ApiOperation(value = "supplement 중 like 순위 10위 안의 영양제를 가져온다", notes = "가져온다")
	public ResponseEntity<?> findLikeTop10() throws Exception {
		List<Supplement> list = supplementService.getLikeTop10();
		return new ResponseEntity<List<Supplement>>(list, HttpStatus.OK);
	}

	@GetMapping("/{supplementId}/{userId}")
	@ApiOperation(value = "유사 추천 데이터를 포함한 디테일 정보를 가져온다", notes = "supplementId, userId 필요")
	public ResponseEntity<?> getDetail(@PathVariable int supplementId, @PathVariable int userId) throws Exception {
		Supplement supplement = supplementService.getSupplement(supplementId);
		String category = supplement.getCategory();

		CommonQuestion cq = commonquestionService.findOneByUserId(userId);
		User user = userService.findOneByUserId(userId);
		int age = user.getAge();
		String gender = user.getGender();
		List<CompareUser> userList = userService.calcSimilarity(cq, age, gender, userId);
		List<Supplement> similarList = likeService.findByCategory(userList, category);
		
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("supplement", supplement);
		res.put("similar", similarList);
		
		return new ResponseEntity<Map<String, Object>>(res, HttpStatus.OK);
	}
	


}