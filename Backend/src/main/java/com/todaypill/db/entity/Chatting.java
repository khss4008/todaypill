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
@Table(name = "Chatting")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Chatting {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "chatting_id")
		private Integer chattingId;

		@Column(name = "room_name")
		private String roomName;
		
}
