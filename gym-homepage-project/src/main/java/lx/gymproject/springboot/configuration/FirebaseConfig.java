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

    @Bean(destroyMethod = "") // ⭐ 스프링이 close() 호출 못하게 막음
    public Firestore firestore() throws Exception {

        if (FirebaseApp.getApps().isEmpty()) {
            try (FileInputStream serviceAccount = new FileInputStream(firebaseSaPath)) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();
                FirebaseApp.initializeApp(options);
            }
        }

        return FirestoreClient.getFirestore();
    }
}

