package com.todaypill.db.entity;

import javax.persistence.Column;
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
@Table(name = "routine")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Routine {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "routine_id")
		private int routineId;
		
		@Column(name = "user_id")
		private int userId;
		
		@Column(name = "supplement_id")
		private int supplementId;

		@Column(name = "time")
		// hh-mm
		private String time;
		
		@Column(name = "day")
		// 월화수목금토일 - 1234567
		private String day;

		@Column(name = "tablets")
		private int tablets;
		
		@Column(name = "added_since")
		private String addedSince;
		
		@Column(name = "deleted_since")
		private String deletedSince;
		
		@Column(name = "push_alarm")
		private Boolean pushAlarm;
}
