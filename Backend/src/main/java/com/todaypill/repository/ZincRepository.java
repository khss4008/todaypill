package com.todaypill.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todaypill.db.entity.Zinc;

public interface ZincRepository extends JpaRepository<Zinc, String>{
	
}
