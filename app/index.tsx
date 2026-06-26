import { initDatabase } from "@/src/database/initDatabase";
import { initializeOCRWorker } from "@/src/services/ocrService";
import { processSyncQueue } from "@/src/services/syncSerivec";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { useDocumentStore } from "@/src/stores/useDocumentStore";
import { useFirebaseStore } from "@/src/stores/useFirebaseStore";
import { router } from "expo-router";
import { useEffect } from "react";

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth0 } from "react-native-auth0";

export default function Index() {
  const { authorize, user, isLoading } = useAuth0();

  const initialize = useAuthStore((state) => state.initialize);
  const pendingOCRDocuments = useDocumentStore(
    (state) => state.pendingOCRDocuments,
  );
  const getUnsyncedDocuments = useFirebaseStore(
    (state) => state.getUnsyncedDocuments,
  );

  const login = async () => {
    try {
      await authorize({
        scope: "openid profile email",
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const init = async () => {
      await initialize();
      initDatabase();
    };
    init();
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      if (user) {
        useAuthStore.setState({ userDetails: user });
        router.replace("/(app)/Home");
        initializeOCRWorker();
        processSyncQueue();

        pendingOCRDocuments();
      } else {
        return;
      }
    }
  }, [isLoading, user]);
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Initializing...</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBadge}>
            <Image
              source={require("..//assets/images/6962598.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>ScanVault</Text>
          <Text style={styles.subtitle}>Scan • Extract • Store</Text>
          <Text style={styles.description}>
            Transform your documents into digital assets with advanced OCR
            technology
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.featureContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureDot}>📱</Text>
            <Text style={styles.featureText}>Quick Scanning</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureDot}>✨</Text>
            <Text style={styles.featureText}>Instant Extraction</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureDot}>🔒</Text>
            <Text style={styles.featureText}>Secure Storage</Text>
          </View>
        </View>

        <View style={styles.authSection}>
          <Text style={styles.authTitle}>Get Started</Text>
          <Text style={styles.authSubtitle}>
            Sign in to access your documents
          </Text>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={login}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Sign In with Auth0</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Your documents are encrypted and secure
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
  },
  topSection: {
    flex: 0.55,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F4F8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    width: 70,
    height: 70,
  },
  contentSection: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 21,
    maxWidth: 300,
    fontWeight: "400",
  },
  bottomSection: {
    flex: 0.45,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "space-between",
  },
  featureContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingVertical: 24,
    marginBottom: 20,
  },
  featureItem: {
    alignItems: "center",
    flex: 1,
  },
  featureDot: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
    textAlign: "center",
  },
  authSection: {
    paddingBottom: 10,
  },
  authTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
    textAlign: "center",
  },
  authSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 24,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  footerText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    fontWeight: "500",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
  },
});

// export default MainScreen;
