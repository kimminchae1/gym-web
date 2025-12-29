package lx.gymproject.springboot.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.cloud.firestore.Firestore;

@RestController
public class FirestoreHealthController {

    private final Firestore firestore;

    public FirestoreHealthController(Firestore firestore) {
        this.firestore = firestore;
    }

    @GetMapping("/api/firestore/health")
    public Map<String, Object> health() {
        Map<String, Object> res = new HashMap<>();
        try {
            // 아주 가벼운 호출(연결 확인용)
            firestore.listCollections(); 
            res.put("ok", true);
            res.put("message", "Firestore 연결 OK");
        } catch (Exception e) {
            res.put("ok", false);
            res.put("message", "Firestore 연결 FAIL: " + e.getMessage());
        }
        return res;
    }
}
