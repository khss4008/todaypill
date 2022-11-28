package com.todaypill.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todaypill.db.entity.CompareUser;
import com.todaypill.db.entity.Like;
import com.todaypill.db.entity.Supplement;
import com.todaypill.repository.LikeRepository;
import com.todaypill.repository.SupplementRepository;

@Service
public class LikeService {

	@Autowired
	LikeRepository likeRepository;

	@Autowired
	SupplementRepository supplementRepository;

	public LikeService(LikeRepository likeRepository, SupplementRepository supplementRepository) {
		super();
		this.likeRepository = likeRepository;
		this.supplementRepository = supplementRepository;
	}

	@Transactional
	public List<Supplement> findByCategory(List<CompareUser> userList, String category) {
		List<Supplement> res = new ArrayList<Supplement>();

		Map<Integer, Integer> map = new HashMap<Integer, Integer>();

		for (CompareUser cu : userList) {
			int userId = cu.getUserId();
			List<Like> likeList = likeRepository.findAllByUserId(userId);
			for (Like l : likeList) {
				int supplementId = l.getSupplementId();
				Supplement supplement = supplementRepository.findOneBySupplementId(supplementId);
				if (supplement.getCategory().equals(category)) {
					if (map.get(supplement.getSupplementId()) != null)
						map.put(supplement.getSupplementId(), map.get(supplement.getSupplementId()) + 1);
					else
						map.put(supplement.getSupplementId(), 1);
				}
			}
		}
		for (int i = 0; i < 3; i++) {
			int max = 0;
			int index = 0;
			for (Integer key : map.keySet())
				if (map.get(key) > max)
					max = map.get(key);
			for (Integer key : map.keySet())
				if (map.get(key) == max)
					index = key;
			res.add(supplementRepository.findOneBySupplementId(index));
			map.remove(index);
		}
		return res;
	}
}
