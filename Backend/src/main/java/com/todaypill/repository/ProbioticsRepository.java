package com.todaypill.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todaypill.db.entity.Probiotics;

public interface ProbioticsRepository extends JpaRepository<Probiotics, String>{
	
}
