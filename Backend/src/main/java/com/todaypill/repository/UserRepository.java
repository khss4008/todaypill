package com.todaypill.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.todaypill.db.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	
//	@Query(value = "select * from user where user_id = ?1", nativeQuery = true)
	User findOneByUserId(int userId);
	
	@Modifying
	@Query(value = "update user set gender=?1 where email = ?2", nativeQuery = true)
	void patchGender(String gender, String email);
	
	@Query(value = "select * from user where email = ?1", nativeQuery = true)
	User findOneByEmail(String email);
	
	@Modifying
	@Query(value = "update user set recommend_one = ?2, recommend_two = ?3, recommend_three = ?4 where email = ?1", nativeQuery = true)
	void updateRecommend(String email, String recoOne, String recoTwo, String recoThr);
	
	@Modifying
	@Query(value = "update user set name = ?2 where user_Id = ?1", nativeQuery = true)
	void updateName(int userId, String name);
	
	@Query(value = "select * from user where age = ?1 and gender = ?2 and user_id != ?3", nativeQuery = true)
	List<User> findByAgeAndGender(int age, String gender, int userId);
}
