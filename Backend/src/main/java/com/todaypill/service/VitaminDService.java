package com.todaypill.service;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todaypill.db.entity.Supplement;
import com.todaypill.db.entity.VitaminD;
import com.todaypill.repository.SupplementRepository;
import com.todaypill.repository.VitaminDRepository;

@Service
public class VitaminDService {
	@Autowired
	private SupplementRepository supplementRepository;

	@Autowired
	private VitaminDRepository vitaminDRepository;

	public VitaminDService(SupplementRepository supplementRepository, VitaminDRepository vitaminDRepository) {
		super();
		this.supplementRepository = supplementRepository;
		this.vitaminDRepository = vitaminDRepository;
	}

	public void addVitaminD() throws IOException, InterruptedException {
		// String supplementName, Double price, String brand, String image,
		// String ingredients, Integer bioavailability, Integer laxative,
		// Integer kidneyDisease, Integer consumerLabScore, String additionalEfficacy,
		// String note, Float amount, Float requiredCount, String formula, Integer like,
		// Boolean sustainedRelease
		
		String[][] notApproved = {
				{"Nature's Way","Calcium & Vitamin D3 - Citrus Flavored"},
				{"Jarrow Formulas","BoneUp"},
				{"Naturelo"," Bone Strength Plant Calcium Complex With Magnesium, C, D3, K2, & Zinc"},
				{"Vitacost","Magnesium Citrate"},
				{"Nature's Way","Calcium & Vitamin D3 - Citrus Flavored"},
		};
		
		List<VitaminD> list = vitaminDRepository.findAll();
		for (VitaminD m : list) {
			String category = m.getCategory();
			String brand = m.getName().split(",")[0];
			String supplementName = m.getName().substring(brand.length() + 2);
			String[] ps = m.getPrice().split(",");
			Double price = Double.parseDouble(ps[0].concat(ps[1]));
			String image = m.getImg();
			String ingredients = m.getNutrition();

			// 여기서부터 점수 계산
			int cnt = 0;
			Double bioavailability = (double) 0;
			Double laxative = (double) 0;
			Double kidneyDisease = (double) 0;
			StringBuilder sb = new StringBuilder();
			Set<String> set = new LinkedHashSet<String>();

			if (ingredients.contains("콜레칼시페롤") || ingredients.contains("cholecalciferol")
					|| ingredients.contains("D3")) {
				cnt++;
				bioavailability += 5;
			}

			if (cnt != 0) {
				bioavailability = (double) Math.round(bioavailability / cnt * 10) / 10.0;
				laxative = (double) Math.round(laxative / cnt * 10) / 10.0;
				kidneyDisease = (double) Math.round(kidneyDisease / cnt * 10) / 10.0;
			}

			Integer consumerLabScore = 0;
			for (int i = 0; i < notApproved.length; i++)
				if (brand.contains(notApproved[i][0]) && brand.contains(notApproved[i][1]))
					consumerLabScore = -10;
			
			for (String s : set) {
				sb.append(s);
				sb.append(", ");
			}

			String additionalEfficacy = sb.toString();
			if (sb.length() > 0)
				additionalEfficacy = sb.toString().substring(0, sb.length() - 2);
			String note = "점심 식후 30분";
			String[] detail = m.getName().split(", ");
			String amount = detail[detail.length - 1];
			String requiredCount = m.getServing();
			String formula = "capsule";
			if (amount.contains("ml") || requiredCount.contains("ml"))
				formula = "liquid";
			if (amount.contains("젤리"))
				formula = "chewable";
			if (amount.contains("g") || requiredCount.contains("g"))
				formula = "powder";
			Integer like = 0;
			Boolean sustainedRelease = false;
			if (m.getName().contains("서방형") || m.getName().contains("리포솜") || m.getName().contains("리포소말")
					|| m.getName().contains("sustained") || m.getName().contains("timed"))
				sustainedRelease = true;
			String pillSize = "";
			String bestTime = "13:00";
			String caution = "일일 섭취량은 4000IU 미만으로 권장드려요!";
			Supplement supplement = Supplement.builder().category(category).supplementName(supplementName).price(price)
					.brand(brand).image(image).ingredients(ingredients).bioavailability(bioavailability)
					.laxative(laxative).kidneyDisease(kidneyDisease).consumerLabScore(consumerLabScore)
					.additionalEfficacy(additionalEfficacy).note(note).amount(amount).requiredCount(requiredCount)
					.formula(formula).like(like).sustainedRelease(sustainedRelease).pillSize(pillSize)
					.bestTime(bestTime).caution(caution).build();
			supplementRepository.save(supplement);
		}
	}
}
