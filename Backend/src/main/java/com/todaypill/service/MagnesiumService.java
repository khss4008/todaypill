package com.todaypill.service;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todaypill.db.entity.Magnesium;
import com.todaypill.db.entity.Supplement;
import com.todaypill.repository.MagnesiumRepository;
import com.todaypill.repository.SupplementRepository;

@Service
public class MagnesiumService {
	@Autowired
	private SupplementRepository supplementRepository;

	@Autowired
	private MagnesiumRepository magnesiumRepository;

	public MagnesiumService(SupplementRepository supplementRepository, MagnesiumRepository magnesiumRepository) {
		super();
		this.supplementRepository = supplementRepository;
		this.magnesiumRepository = magnesiumRepository;
	}

	public void addMagnesium() throws IOException, InterruptedException {
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
		
		List<Magnesium> list = magnesiumRepository.findAll();
		for (Magnesium m : list) {
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

			if (ingredients.contains("비스글리시네이트") || ingredients.contains("bisglycinate")
					|| ingredients.contains("글리시네이트") || ingredients.contains("글리신산")
					|| ingredients.contains("글라이시네이트")) {
				cnt++;
				bioavailability += 5;
				set.add("스트레스 완화");
			}
			if (ingredients.contains("구연산") || ingredients.contains("시트레이트") || ingredients.contains("citrate")) {
				cnt++;
				bioavailability += 6;
				laxative += 3;
				set.add("스트레스 완화");
			}
			if (ingredients.contains("트레온산") || ingredients.contains("threonate") || ingredients.contains("트레오네이트")) {
				cnt++;
				bioavailability += 5;
				set.add("기억력 증진");
			}
			if (ingredients.contains("타우린") || ingredients.contains("taurate") || ingredients.contains("타우레이트")) {
				cnt++;
				bioavailability += 6;
				set.add("기억력 증진");
			}
			if (ingredients.contains("아스파르트산") || ingredients.contains("aspartate") || ingredients.contains("아스파테이트")) {
				cnt++;
				bioavailability += 5;
				set.add("에너지 증진");
			}
			if (ingredients.contains("말산") || ingredients.contains("malate") || ingredients.contains("말레이트")) {
				cnt++;
				bioavailability += 5;
				set.add("근육통 완화");
			}
			if (ingredients.contains("글루콘산") || ingredients.contains("gluconate") || ingredients.contains("글루코네이트")) {
				cnt++;
				bioavailability += 6;
				set.add("근육통 완화");
			}
			if (ingredients.contains("젖산") || ingredients.contains("lactate") || ingredients.contains("락테이트")) {
				cnt++;
				bioavailability += 3;
				kidneyDisease -= 10;
				set.add("근육통 완화");
			}
			if (ingredients.contains("황산") || ingredients.contains("sulfate") || ingredients.contains("설페이트")) {
				cnt++;
				bioavailability += 3;
				laxative += 5;
				set.add("근육통 완화");
			}
			if (ingredients.contains("산화") || ingredients.contains("oxide") || ingredients.contains("옥사이드")) {
				cnt++;
				bioavailability += 3;
				laxative += 5;
				set.add("근육통 완화");
			}
			if (ingredients.contains("탄산") || ingredients.contains("carbonate") || ingredients.contains("카보네이트")) {
				cnt++;
				bioavailability += 3;
				set.add("제산제 효과");
			}
			if (ingredients.contains("오로트산") || ingredients.contains("orotate") || ingredients.contains("오로테이트")) {
				cnt++;
				bioavailability += 5;
				set.add("혈액 순환");
			}
			if (ingredients.contains("염화") || ingredients.contains("chloride") || ingredients.contains("클로라이드")) {
				cnt++;
				bioavailability += 3;
				laxative += 3;
				set.add("제산제 효과");
			}
			if (ingredients.contains("수산화") || ingredients.contains("hydroxide") || ingredients.contains("하이드로옥사이드")) {
				cnt++;
				bioavailability += 3;
				laxative += 5;
				set.add("스트레스 완화");
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
			String note = "수면 1시간 전";
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
			String bestTime = "22:00";
			String caution = "설사 등 위장장애 발생시 킬레이트 형태를 복용하는 걸 추천드려요!";
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
