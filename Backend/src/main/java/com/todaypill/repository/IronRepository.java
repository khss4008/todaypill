package com.todaypill.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todaypill.db.entity.Iron;

public interface IronRepository extends JpaRepository<Iron, String>{
	
}
