package com.todaypill.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todaypill.db.entity.Like;
import com.todaypill.db.entity.Supplement;
import com.todaypill.db.entity.User;
import com.todaypill.repository.LikeRepository;
import com.todaypill.repository.SupplementRepository;
import com.todaypill.repository.UserRepository;
import com.todaypill.request.UpdateNameReq;
import com.todaypill.request.UserFirstSurveyReq;

@Service
public class SupplementService {

	@Autowired
	UserRepository userRepository;
	LikeRepository likeRepository;
	SupplementRepository supplementRepository;
	
	
	
	public SupplementService(UserRepository userRepository, LikeRepository likeRepository,
			SupplementRepository supplementRepository) {
		super();
		this.userRepository = userRepository;
		this.likeRepository = likeRepository;
		this.supplementRepository = supplementRepository;
	}
	
	@Transactional
	public List<Supplement> findAll() throws Exception {
		List<Supplement> list = supplementRepository.findAll();
		return list;
	}
	
	@Transactional
	public Supplement getSupplement(int supplementId) throws Exception {
		Supplement supplement = supplementRepository.findOneBySupplementId(supplementId);
		return supplement;
	}
	
	@Transactional
	public List<Supplement> getLikeTop10() throws Exception {
		return supplementRepository.findLikeTop10();
	}
	
	@Transactional
	public List<Supplement> findAllByCategory(String category) throws Exception {
		return supplementRepository.findAllByCategory(category);
	}
	
	
}