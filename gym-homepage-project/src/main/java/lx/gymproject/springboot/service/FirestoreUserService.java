package lx.gymproject.springboot.service;

import org.springframework.stereotype.Service;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;

import lombok.RequiredArgsConstructor;
import lx.gymproject.springboot.vo.GymUserVO;

//@Service
@RequiredArgsConstructor
public class FirestoreUserService {

    private final Firestore firestore;

//    public FirestoreUserService(Firestore firestore) {
//        this.firestore = firestore;
//    }
    
    public GymUserVO findByEmail(String email) throws Exception {
        QuerySnapshot snapshot = firestore
                .collection("users")
                .whereEqualTo("userEmail", email)
                .get()
                .get();

        if (snapshot.isEmpty()) return null;

        DocumentSnapshot doc = snapshot.getDocuments().get(0);
        return doc.toObject(GymUserVO.class);
    }
}
