package com.todaypill.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "supplement")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Supplement {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer supplementId;

	private String category;

	@Column(name = "supplement_name")
	private String supplementName;

	@Column
	private Double price;

	@Column
	private String brand;

	@Column
	private String image;

	// columnDefinition = "TEXT" 이거는 에러남
	@Column(name = "ingredients", length = 2500)
	private String ingredients;

	@Column
	private Double bioavailability;

	@Column
	private Double laxative;

	@Column(name = "kidney_disease")
	private Double kidneyDisease;

	@Column(name = "consumer_lab_score")
	private Integer consumerLabScore;

	@Column(name = "additional_efficacy")
	private String additionalEfficacy;

	@Column
	private String note;

	@Column
	private String amount;

	@Column(name = "required_count")
	private String requiredCount;

	@Column
	private String formula;

	@Column
	private Integer like;

	@Column(name = "sustained_release")
	private Boolean sustainedRelease;
	
	@Column(name = "pill_size")
	private String pillSize;
	
	@Column(name = "best_time")
	private String bestTime;
	
	@Column
	private String caution;
}
