package com.todaypill.db.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "omega3")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Omega3 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String category;
	String img;
	String name;
	String price;
	String serving;
	String nutrition;
}
