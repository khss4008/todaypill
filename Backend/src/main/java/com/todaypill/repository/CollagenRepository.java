package com.todaypill.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todaypill.db.entity.Collagen;

public interface CollagenRepository extends JpaRepository<Collagen, String>{
	
}
