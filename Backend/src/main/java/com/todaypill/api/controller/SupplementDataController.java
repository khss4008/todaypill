package com.todaypill.api.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todaypill.service.CollagenService;
import com.todaypill.service.IronService;
import com.todaypill.service.LuteinService;
import com.todaypill.service.MagnesiumService;
import com.todaypill.service.MilkthisleService;
import com.todaypill.service.MultivitaminService;
import com.todaypill.service.Omega3Service;
import com.todaypill.service.ProbioticsService;
import com.todaypill.service.PropolisService;
import com.todaypill.service.VitaminBService;
import com.todaypill.service.VitaminCService;
import com.todaypill.service.VitaminDService;
import com.todaypill.service.ZincService;

@RestController
public class SupplementDataController {
	@Autowired
	private VitaminBService vitaminBService;

	@Autowired
	private VitaminCService vitaminCService;

	@Autowired
	private VitaminDService vitaminDService;

	@Autowired
	private MultivitaminService multivitaminService;

	@Autowired
	private MagnesiumService magnesiumService;
	
	@Autowired
	private Omega3Service omega3Service;
	
	@Autowired
	private MilkthisleService milkthisleService;
	
	@Autowired
	private LuteinService luteinService;
	
	@Autowired
	private ZincService zincService;
	
	@Autowired
	private ProbioticsService probioticsService;

	@Autowired
	private CollagenService collagenService;

	@Autowired
	private IronService ironService;

	@Autowired
	private PropolisService propolisService;

	public SupplementDataController(VitaminBService vitaminBService, VitaminCService vitaminCService,
			VitaminDService vitaminDService, MultivitaminService multivitaminService, MagnesiumService magnesiumService,
			Omega3Service omega3Service, MilkthisleService milkthisleService, LuteinService luteinService,
			ZincService zincService, ProbioticsService probioticsService, CollagenService collagenService,
			IronService ironService, PropolisService propolisService) {
		super();
		this.vitaminBService = vitaminBService;
		this.vitaminCService = vitaminCService;
		this.vitaminDService = vitaminDService;
		this.multivitaminService = multivitaminService;
		this.magnesiumService = magnesiumService;
		this.omega3Service = omega3Service;
		this.milkthisleService = milkthisleService;
		this.luteinService = luteinService;
		this.zincService = zincService;
		this.probioticsService = probioticsService;
		this.collagenService = collagenService;
		this.ironService = ironService;
		this.propolisService = propolisService;
	}

	@GetMapping("test")
	public void addSupplement() throws IOException, InterruptedException {
		vitaminBService.addVitaminB();
		vitaminCService.addVitaminC();
		vitaminDService.addVitaminD();
		multivitaminService.addMultivitamin();
		magnesiumService.addMagnesium();
		omega3Service.addOmega3();
		milkthisleService.addMilkthisle();
		luteinService.addLutein();
		zincService.addZinc();
		probioticsService.addProbiotics();
		collagenService.addCollagen();
		ironService.addIron();
		propolisService.addPropolis();
	}
}
