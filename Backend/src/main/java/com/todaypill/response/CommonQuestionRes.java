package com.todaypill.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommonQuestionRes {
	
	private String allergy;
    private Boolean balanced_meal;
    private String disease;
    private Integer drink;
    private Boolean is_ok_big_pill;
    private String lack;
    private String medicine;
    private Boolean menopause;
    private Integer outdoor_activity;
    private String preferred_brand;
    private Boolean pregnant;
    private String problem;
    private Boolean smoking;
    private String symptom;
    private Boolean toughActivity;
    private Integer userId;

}
