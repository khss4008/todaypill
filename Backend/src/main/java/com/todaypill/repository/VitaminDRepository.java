package com.todaypill.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todaypill.db.entity.VitaminD;

public interface VitaminDRepository extends JpaRepository<VitaminD, String>{
	
}
