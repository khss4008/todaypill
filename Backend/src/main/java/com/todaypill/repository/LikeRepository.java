package com.todaypill.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.todaypill.db.entity.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Integer>{
	List<Like> findAllByUserId(int userId);
	
	List<Like> findAllBySupplementId(int supplementId);
	
	@Query(value = "select * from `like` where user_id = ?1 and supplement_id = ?2", nativeQuery = true)
	List<Like> likeClickOrNot(int userId, int supplementId);
	
	@Query(value = "delete * from `like` where like_id = ?1", nativeQuery = true)
	void deleteLike(int likeId);
}
