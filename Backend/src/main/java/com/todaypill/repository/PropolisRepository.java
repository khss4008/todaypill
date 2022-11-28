package com.todaypill.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todaypill.db.entity.Propolis;

public interface PropolisRepository extends JpaRepository<Propolis, String>{
	
}
