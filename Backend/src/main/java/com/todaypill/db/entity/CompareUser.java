package com.todaypill.db.entity;

import lombok.Data;

@Data
public class CompareUser implements Comparable<CompareUser> {
	private Integer userId;
	private Integer cnt;

	public CompareUser(Integer userId, Integer cnt) {
		super();
		this.userId = userId;
		this.cnt = cnt;
	}

	@Override
	public int compareTo(CompareUser cu) {
		CompareUser u2 = cu;
		return u2.cnt - this.cnt;
	}
}
