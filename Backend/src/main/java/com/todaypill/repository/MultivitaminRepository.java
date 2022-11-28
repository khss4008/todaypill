package com.todaypill.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todaypill.db.entity.Multivitamin;

public interface MultivitaminRepository extends JpaRepository<Multivitamin, String>{
	
}
