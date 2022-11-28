package com.todaypill.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.todaypill.db.entity.Supplement;

@Repository
public interface SupplementRepository extends JpaRepository<Supplement, Integer>{
	Supplement findOneBySupplementId(int supplementId);
	
	@Modifying
	@Query(value = "update supplement set `like` =?2 where supplement_id= ?1", nativeQuery = true)
	void updateLike(int supplementId, int like);
	
	@Query(value = "select * from supplement", nativeQuery = true)
	List<Supplement> findAll();
	
	@Query(value = "select * from supplement order by `like` desc limit 10", nativeQuery = true)
	List<Supplement> findLikeTop10();
	
	@Query(value = "select * from supplement where category = ?1", nativeQuery = true)
	List<Supplement> findAllByCategory(String category);
	
	
//	@Query(value = "select * from supplement where supplement_id=?1", nativeQuery = true)
//	Supplement findOneBySupplementId(int supplementId);
}
