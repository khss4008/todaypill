package com.todaypill.service;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todaypill.db.entity.Supplement;
import com.todaypill.db.entity.Zinc;
import com.todaypill.repository.SupplementRepository;
import com.todaypill.repository.ZincRepository;

@Service
public class ZincService {
	@Autowired
	private SupplementRepository supplementRepository;

	@Autowired
	private ZincRepository zincRepository;

	public ZincService(SupplementRepository supplementRepository, ZincRepository zincRepository) {
		super();
		this.supplementRepository = supplementRepository;
		this.zincRepository = zincRepository;
	}

	public void addZinc() throws IOException, InterruptedException {
		// String supplementName, Double price, String brand, String image,
		// String ingredients, Integer bioavailability, Integer laxative,
		// Integer kidneyDisease, Integer consumerLabScore, String additionalEfficacy,
		// String note, Float amount, Float requiredCount, String formula, Integer like,
		// Boolean sustainedRelease

		List<Zinc> list = zincRepository.findAll();
		for (Zinc m : list) {
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

			if (ingredients.contains("오로트산") || ingredients.contains("orotate") || ingredients.contains("오로테이트")) {
				cnt++;
				bioavailability += 5;
			}
			if (ingredients.contains("피콜린산") || ingredients.contains("picolinate") || ingredients.contains("피콜리네이트")) {
				cnt++;
				bioavailability += 5;
			}
			if (ingredients.contains("아세트산") || ingredients.contains("acetate") || ingredients.contains("아세테이트")) {
				cnt++;
				bioavailability += 4;
				set.add("감기 완화");
			}
			if (ingredients.contains("무기산") || ingredients.contains("inorganic")) {
				cnt++;
				bioavailability += 2;
				set.add("피부병 완화");
			}
			if (ingredients.contains("산화") || ingredients.contains("oxide") || ingredients.contains("옥사이드")) {
				cnt++;
				bioavailability += 2;
				set.add("화상 완화");
			}
			if (ingredients.contains("글루콘산") || ingredients.contains("gluconate") || ingredients.contains("글루코네이트")) {
				cnt++;
				bioavailability += 4;
				set.add("면역 증진");
			}
			
			if (cnt != 0) {
				bioavailability = (double) Math.round(bioavailability / cnt * 10) / 10.0;
				laxative = (double) Math.round(laxative / cnt * 10) / 10.0;
				kidneyDisease = (double) Math.round(kidneyDisease / cnt * 10) / 10.0;
			}

			Integer consumerLabScore = 0;
			if (brand.contains("MegaFood") && brand.contains("Zinc"))
				consumerLabScore = -10;

			for (String s : set) {
				sb.append(s);
				sb.append(", ");
			}

			String additionalEfficacy = sb.toString();
			if (sb.length() > 0)
				additionalEfficacy = sb.toString().substring(0, sb.length() - 2);
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
			if (m.getName().contains("서방형") || m.getName().contains("리포좀") || m.getName().contains("리포조멀")
					|| m.getName().contains("sustained") || m.getName().contains("timed"))
				sustainedRelease = true;
			String pillSize = "";
			String bestTime = "19:00";
			String caution = "철분과 함께 먹으면 흡수율이 저해돼요!";
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
