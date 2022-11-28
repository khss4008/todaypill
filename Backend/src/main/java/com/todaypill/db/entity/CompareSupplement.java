package com.todaypill.db.entity;

import lombok.Data;

@Data
public class CompareSupplement implements Comparable<CompareSupplement> {
	private Integer supplementId;
	private Integer cnt;

	public CompareSupplement(Integer supplementId, Integer cnt) {
		super();
		this.supplementId = supplementId;
		this.cnt = cnt;
	}

	@Override
	public int compareTo(CompareSupplement cu) {
		CompareSupplement u2 = cu;
		return u2.cnt - this.cnt;
	}
}
