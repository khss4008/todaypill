package com.todaypill.response;

import com.todaypill.db.entity.Supplement;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplementAndScoreRes extends Supplement {

    private Double score;

    public SupplementAndScoreRes(Integer supplementId, String category, String supplementName, Double price, String brand, String image, String ingredients, Double bioavailability, Double laxative, Double kidneyDisease, Integer consumerLabScore, String additionalEfficacy, String note, String amount, String requiredCount, String formula, Integer like, Boolean sustainedRelease, String pillSize, String bestTime, String caution, Double score) {
        super(supplementId, category, supplementName, price, brand, image, ingredients, bioavailability, laxative, kidneyDisease, consumerLabScore, additionalEfficacy, note, amount, requiredCount, formula, like, sustainedRelease, pillSize, caution, bestTime);
        this.score = score;
    }

}
