package lx.gymproject.springboot.configuration;

import java.io.FileInputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.firestore.Firestore;

@Configuration
public class FirebaseConfig {

    @Value("${FIREBASE_SA_PATH}")
    private String firebaseSaPath;

    @Bean
    public Firestore firestore() throws Exception {

        // 🔑 핵심 포인트 1
        // DevTools 재시작 때문에 FirebaseApp 중복 초기화 방지
        if (FirebaseApp.getApps().isEmpty()) {

            FileInputStream serviceAccount =
                    new FileInputStream(firebaseSaPath);

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(
                        GoogleCredentials.fromStream(serviceAccount)
                    )
                    .build();

            FirebaseApp.initializeApp(options);
        }

        // 🔑 핵심 포인트 2
        // FirestoreClient에서 singleton Firestore 반환
        return FirestoreClient.getFirestore();
    }
}
