package lx.gymproject.springboot.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lx.gymproject.springboot.service.FirestoreUserService;
import lx.gymproject.springboot.vo.GymUserVO;

@Controller
public class FirestoreUserController {

    private final FirestoreUserService userService;

    public FirestoreUserController(FirestoreUserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login_firestore.do")
    public String login(Model model, HttpSession session,
                        @RequestParam String userEmail,
                        @RequestParam String userPassword) throws Exception {

        GymUserVO vo = userService.findByEmail(userEmail);

        if (vo == null || !vo.getUserPassword().equals(userPassword)) {
            model.addAttribute("loginFailed", true);
            return "user/loginPage";
        }

        session.setAttribute("loginUser", vo);
        return "home";
    }
}
