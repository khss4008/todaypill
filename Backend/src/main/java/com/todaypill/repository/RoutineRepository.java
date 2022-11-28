package com.todaypill.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.todaypill.db.entity.Routine;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Integer>{
	List<Routine> findAllByUserId(int userId);
	
	@Query(value = "select * from `routine` where user_id = ?1 and day like %?2% and ((added_since <= ?3 and ?3 < deleted_since) or (added_since <= ?3 and deleted_since is null));", nativeQuery = true)
	List<Routine> findAllByUserIdAndDay(int userId, String day, String date);
	
	Routine findOneByRoutineId(int routineId);
}
