package com.todaypill.db.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "nutrients_type")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NutrientsType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "supplement_id")
	private int supplementId;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "best_time")
	private String bestTime;
	
}

