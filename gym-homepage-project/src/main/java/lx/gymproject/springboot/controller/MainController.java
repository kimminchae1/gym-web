package lx.gymproject.springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MainController {

	@GetMapping("/api/home") // React용 API
	public String home() {
		return "Gym Web Home"; // 단순 String
	}

	@GetMapping("/api/location") // React용 API
	public String location() {
		return "Gym Location Info"; // 단순 String
	}

//	
//	@GetMapping("/home.do")
//	public String home() {
//		return "home";
//	}
//	
//	//지도
//	@GetMapping("/location.do")
//	public String location() {
//		return "location";
//	}
//	
}
