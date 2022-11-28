package com.todaypill.service;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todaypill.db.entity.Probiotics;
import com.todaypill.db.entity.Supplement;
import com.todaypill.repository.ProbioticsRepository;
import com.todaypill.repository.SupplementRepository;

@Service
public class ProbioticsService {
	@Autowired
	private SupplementRepository supplementRepository;

	@Autowired
	private ProbioticsRepository probioticsRepository;

	public ProbioticsService(SupplementRepository supplementRepository, ProbioticsRepository probioticsRepository) {
		super();
		this.supplementRepository = supplementRepository;
		this.probioticsRepository = probioticsRepository;
	}

	public void addProbiotics() throws IOException, InterruptedException {
		// String supplementName, Double price, String brand, String image,
		// String ingredients, Integer bioavailability, Integer laxative,
		// Integer kidneyDisease, Integer consumerLabScore, String additionalEfficacy,
		// String note, Float amount, Float requiredCount, String formula, Integer like,
		// Boolean sustainedRelease

		List<Probiotics> list = probioticsRepository.findAll();
		for (Probiotics m : list) {
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

			if (ingredients.contains("람노서스") || ingredients.contains("rhamnosus")) {
				set.add("면역 증진");
				set.add("다이어트");
				set.add("질 건강");
			}
			if (ingredients.contains("애시도필러스") || ingredients.contains("acidophilus")) {
				set.add("면역 증진");
			}
			if (ingredients.contains("플란타럼") || ingredients.contains("plantarum")) {
				set.add("다이어트");
			}
			if (ingredients.contains("카제이") || ingredients.contains("casei")) {
				set.add("다이어트");
				set.add("질 건강");
			}
			if (ingredients.contains("퍼멘텀") || ingredients.contains("페르멘텀") || ingredients.contains("fermentum")) {
				set.add("면역 증진");
				set.add("질 건강");
			}
			if (ingredients.contains("커베터스") || ingredients.contains("curvatus")) {
				set.add("다이어트");
			}
			if (ingredients.contains("락티스") || ingredients.contains("lactis")) {
				set.add("피부 케어");
			}

			if (cnt != 0) {
				bioavailability = (double) Math.round(bioavailability / cnt * 10) / 10.0;
				laxative = (double) Math.round(laxative / cnt * 10) / 10.0;
				kidneyDisease = (double) Math.round(kidneyDisease / cnt * 10) / 10.0;
			}

			Integer consumerLabScore = 0;
			if (brand.contains("Dr. Ohhira's") && brand.contains("Dr. Ohhira's Probiotics"))
				consumerLabScore = -10;

			for (String s : set) {
				sb.append(s);
				sb.append(", ");
			}

			String additionalEfficacy = sb.toString();
			if (sb.length() > 0)
				additionalEfficacy = sb.toString().substring(0, sb.length() - 2);
			String note = "기상 직후 물과 함께";
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
			String bestTime = "08:00";
			String caution = "항생제를 복용하시면 2시간 정도 시간 간격을 두세요!";
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
