package com.todaypill.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todaypill.db.entity.Lutein;
import com.todaypill.db.entity.Supplement;
import com.todaypill.repository.LuteinRepository;
import com.todaypill.repository.SupplementRepository;

@Service
public class LuteinService {
	@Autowired
	private SupplementRepository supplementRepository;

	@Autowired
	private LuteinRepository luteinRepository;

	public LuteinService(SupplementRepository supplementRepository, LuteinRepository luteinRepository) {
		super();
		this.supplementRepository = supplementRepository;
		this.luteinRepository = luteinRepository;
	}

	public void addLutein() throws IOException, InterruptedException {
		// String supplementName, Double price, String brand, String image,
		// String ingredients, Integer bioavailability, Integer laxative,
		// Integer kidneyDisease, Integer consumerLabScore, String additionalEfficacy,
		// String note, Float amount, Float requiredCount, String formula, Integer like,
		// Boolean sustainedRelease

		List<Lutein> list = luteinRepository.findAll();
		for (Lutein m : list) {
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
			
			if (ingredients.contains("루테인") || supplementName.contains("lutein") || supplementName.contains("Lutein")) {
				cnt++;
				bioavailability += 3;
			}
			if (ingredients.contains("지아잔틴") || supplementName.contains("zeaxanthin") || supplementName.contains("제아잔틴")) {
				cnt++;
				bioavailability += 5;
				sb.append("항산화");
			}
			if (ingredients.contains("아스타잔틴") || supplementName.contains("astaxanthin")) {
				cnt++;
				bioavailability += 3;
				sb.append("항산화");
			}
			
			if (cnt != 0) {
				bioavailability = (double) Math.round(bioavailability / cnt * 10) / 10.0;
				laxative = (double) Math.round(laxative / cnt * 10) / 10.0;
				kidneyDisease = (double) Math.round(kidneyDisease / cnt * 10) / 10.0;
			}

			Integer consumerLabScore = 0;
			if (brand.contains("Doctor's Best") && brand.contains("Lutein with OptiLut"))
				consumerLabScore = -10;

			String additionalEfficacy = sb.toString();
			String note = "저녁 식후 30분";
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
			String bestTime = "19:00";
			String caution = "장기 복용할 경우 흡연자는 폐암 확률이 높아져요!";
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
