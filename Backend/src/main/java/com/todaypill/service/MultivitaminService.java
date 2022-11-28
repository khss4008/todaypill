package com.todaypill.service;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todaypill.db.entity.Multivitamin;
import com.todaypill.db.entity.Supplement;
import com.todaypill.repository.MultivitaminRepository;
import com.todaypill.repository.SupplementRepository;

@Service
public class MultivitaminService {
	@Autowired
	private SupplementRepository supplementRepository;

	@Autowired
	private MultivitaminRepository multivitaminRepository;

	public MultivitaminService(SupplementRepository supplementRepository,
			MultivitaminRepository multivitaminRepository) {
		super();
		this.supplementRepository = supplementRepository;
		this.multivitaminRepository = multivitaminRepository;
	}

	public void addMultivitamin() throws IOException, InterruptedException {
		// String supplementName, Double price, String brand, String image,
		// String ingredients, Integer bioavailability, Integer laxative,
		// Integer kidneyDisease, Integer consumerLabScore, String additionalEfficacy,
		// String note, Float amount, Float requiredCount, String formula, Integer like,
		// Boolean sustainedRelease

		String[][] notApproved = {
				{"Nutrilite", "Daily"},
				{"Vitafusion", "MultiVites - Natural Berry, Peach & Orange Flavors"},
				{"Vimerson Health","Women's Multivitamin"},
				{"Vimerson Health","Women's Multivitamin"},
				{"New Chapter","Perfect Prenatal™ Multivitamin"},
				{"Rainbow Light","Prenatal One"},
				{"CVS Health","Men's Daily Gummies"},
				{"Innate","Men's 40+ Multivitamin"},
				{"MegaFood","Men's One Daily"},
		};
		
		List<Multivitamin> list = multivitaminRepository.findAll();
		for (Multivitamin m : list) {
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

			if (ingredients.contains("티아민HCI") || ingredients.contains("티아민 염산염")
					|| ingredients.contains("thiamine HCI")) {
				cnt++;
				bioavailability += -5;
				set.add("근육통 완화");
			}
			if (ingredients.contains("티아민 나이트레이트") || ingredients.contains("티아민 질산염")
					|| ingredients.contains("thiamine nitrate")) {
				cnt++;
				bioavailability += -5;
				set.add("에너지 증진");
			}
			if (ingredients.contains("티아민 피로인산") || ingredients.contains("TPP")
					|| ingredients.contains("thiamine pyrophosphate")) {
				cnt++;
				bioavailability += 5;
				set.add("에너지 증진");
			}
			if (ingredients.contains("벤포티아민") || ingredients.contains("benfotiamine")) {
				cnt++;
				bioavailability += 5;
				set.add("에너지 증진");
			}
			if (ingredients.contains("푸르설티아민") || ingredients.contains("fursultiamine")) {
				cnt++;
				bioavailability += 5;
				set.add("신경통 완화");
			}
			if (ingredients.contains("비스벤티아민") || ingredients.contains("bisbentiamine")) {
				cnt++;
				bioavailability += 5;
				set.add("관절 건강");
			}
			if (ingredients.contains("리보플라빈") || ingredients.contains("riboflavin") || ingredients.contains("글루코네이트")) {
				cnt++;
				set.add("신경통 완화");
			}
			if (ingredients.contains("리보플라빈포스페이트") || ingredients.contains("riboflavine-5-phosphate")) {
				cnt++;
				bioavailability += 1;
				set.add("탈모 완화");
			}
			if (ingredients.contains("판토텐산") || ingredients.contains("pantothenic acid")
					|| ingredients.contains("설페이트")) {
				cnt++;
				set.add("스트레스 완화");
			}
			if (ingredients.contains("판테틴") || ingredients.contains("pantethine")) {
				cnt++;
				bioavailability += 1;
				set.add("스트레스 완화");
			}
			if (ingredients.contains("피리독신 염산염") || ingredients.contains("pyridoxine HCI")) {
				cnt++;
				set.add("스트레스 완화");
			}
			if (ingredients.contains("피리독설포스페이트") || ingredients.contains("pyridoxal-5-phosphate")) {
				cnt++;
				bioavailability += 1;
				set.add("독성 물질 경감");
			}
			if (ingredients.contains("엽산") || ingredients.contains("folic acid")) {
				cnt++;
				set.add("독성 물질 경감");
			}
			if (ingredients.contains("메틸테트라히드로폴레이트") || ingredients.contains("5-methyltetrahydrofolate")
					|| ingredients.contains("5-MTHF")) {
				cnt++;
				bioavailability += 1;
				set.add("우울증 완화");
			}
			if (ingredients.contains("시아노코발라민") || ingredients.contains("cyanocobalamin")) {
				cnt++;
				set.add("혈액순환");
			}
			if (ingredients.contains("히드록소코발라민") || ingredients.contains("hydroxocobalamin")) {
				cnt++;
				bioavailability += 1;
				set.add("신경통 완화");
			}
			if (ingredients.contains("메틸코발라민") || ingredients.contains("methylcobalamin")) {
				cnt++;
				bioavailability += 1;
				set.add("면역 증진");
			}
			if (ingredients.contains("아데노실코발라민") || ingredients.contains("adenocylcobalamin")) {
				cnt++;
				bioavailability += 1;
				set.add("독성 물질 경감");
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
			String caution = "위장장애 발생시 식사와 함께 섭취하는 걸 추천드려요!";
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
