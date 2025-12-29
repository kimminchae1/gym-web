package lx.gymproject.springboot.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import lx.gymproject.springboot.dao.GymUserDAO;
import lx.gymproject.springboot.vo.GymUserVO;
//
//@Controller
//public class UserController {
//
//	@Autowired
//	SqlSession session;
//
//	@Autowired
//	GymUserDAO dao;
//
//	@GetMapping("/loginPage.do")
//	public String loginPage() {
//		return "user/loginPage";
//	}
//
//	@GetMapping("/registerPage.do")
//	public String registerPage() {
//		return "user/registerPage";
//	}
//
//	@PostMapping("/login.do")
//	public String login(Model model, HttpSession session, @RequestParam(value = "userEmail") String userEmail,
//			@RequestParam(value = "userPassword") String userPassword) {
//
//		GymUserVO vo = dao.doLoginByUserId(userEmail);
//
//		// 사용자가 존재하지 않거나 비밀번호가 틀린 경우
//		if (vo == null || !vo.getUserPassword().equals(userPassword)) {
//			model.addAttribute("loginFailed", true);
//			return "user/loginPage";
//		}
//
//		// 로그인 성공 - 세션에 사용자 정보 저장
//		session.setAttribute("loginUser", vo);
//		return "home";
//	}
//
//	@PostMapping("/register.do")
//	public String register(GymUserVO vo, Model model) {
//		int checkpw = 0;
//		try {
//			checkpw = dao.doRegisterByUserVO(vo);
//		} catch (Exception e) {
//
//		}
//
//		if (checkpw > 0) {
//			model.addAttribute("registerSuccess", checkpw);
//		} else {
//			model.addAttribute("registerFailed", checkpw + 1);
//		}
//		System.out.println(checkpw);
//		return "user/registerPage";
//	}
//
//	@GetMapping("/logout.do")
//	public String logout(HttpSession session) {
//		session.invalidate(); // 세션 무효화
//		return "redirect:loginPage.do";
//	}
//
//	@GetMapping("/mypage.do")
//	public String mypage(HttpSession session, Model model) {
//		GymUserVO loginUser = (GymUserVO) session.getAttribute("loginUser");
//		model.addAttribute("user", loginUser);
//		return "user/mypage";
//	}
//
//	@PostMapping("/userUpdate.do")
//	public String update(GymUserVO vo, HttpSession session) {
//		int result = dao.updateUserInfo(vo);
//		if (result > 0) {
//			session.setAttribute("loginUser", vo);
//		}
//		return "redirect:mypage.do";
//	}
//
//}
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    SqlSession session;

    @Autowired
    GymUserDAO dao;

    @GetMapping("/api/login-page")
    public String loginPage() {
        return "Login page loaded";
    }

    @GetMapping("/api/register-page")
    public String registerPage() {
        return "Register page loaded";
    }

    @PostMapping("/api/login")
    public Map<String, Object> login(@RequestParam("userEmail") String userEmail,
                                   @RequestParam("userPassword") String userPassword,
                                   HttpSession session) {
        GymUserVO vo = dao.doLoginByUserId(userEmail);
        Map<String, Object> response = new HashMap<>();

        if (vo != null && vo.getUserPassword().equals(userPassword)) {
            session.setAttribute("loginUser", vo);
            response.put("success", true);
            response.put("user", vo);
        } else {
            response.put("success", false);
            response.put("loginFailed", true);
        }
        return response;
    }

    @PostMapping("/api/register")
    public Map<String, Object> register(GymUserVO vo) {
        Map<String, Object> response = new HashMap<>();
        try {
            int checkpw = dao.doRegisterByUserVO(vo);
            if (checkpw > 0) {
                response.put("success", true);
                response.put("registerSuccess", checkpw);
            } else {
                response.put("success", false);
                response.put("registerFailed", checkpw + 1);
            }
        } catch (Exception e) {
            response.put("success", false);
        }
        System.out.println("Register result: " + response);
        return response;
    }

    @PostMapping("/api/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "Logout success";
    }

    @GetMapping("/api/mypage")
    public GymUserVO mypage(HttpSession session) {
        return (GymUserVO) session.getAttribute("loginUser");
    }

    @PostMapping("/api/update")
    public String update(GymUserVO vo, HttpSession session) {
        int result = dao.updateUserInfo(vo);
        if (result > 0) {
            session.setAttribute("loginUser", vo);
            return "User updated successfully";
        }
        return "Update failed";
    }
}
