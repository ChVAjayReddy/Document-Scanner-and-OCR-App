import { useDocumentStore } from "@/src/stores/useDocumentStore";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const DocmentsInfo = () => {
  const documents = useDocumentStore((state) => state.documents);
  const unsyncedDocuments = documents.filter(
    (doc) => doc.isDeleted === 0 && doc.syncStatus === "pending",
  );
  const pendingOCRDocuments = documents.filter(
    (doc) => doc.isDeleted === 0 && doc.ocrStatus === "pending",
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainStatsCard}>
        <View style={styles.statsIconContainer}>
          <AntDesign name="file" size={32} color="#3b82f6" />
        </View>
        <View style={styles.statsTextContainer}>
          <Text style={styles.statsLabel}>Total Documents</Text>
          <Text style={styles.statsValue}>{documents.length}</Text>
        </View>
      </View>

      <View style={styles.cardsRow}>
        <View style={styles.statCard}>
          <View style={styles.cardHeader}>
            <AntDesign name="scan" size={20} color="#3b82f6" />
            <Text style={styles.cardTitle}>OCR Processing</Text>
          </View>
          <View style={styles.cardStats}>
            <View style={styles.statItem}>
              <View style={[styles.statDot, styles.statDotCompleted]} />
              <Text style={styles.statItemLabel}>Completed</Text>
              <Text style={styles.statItemValue}>
                {documents.length - pendingOCRDocuments.length}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={[styles.statDot, styles.statDotPending]} />
              <Text style={styles.statItemLabel}>Pending</Text>
              <Text style={styles.statItemValue}>
                {pendingOCRDocuments.length}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.cardHeader}>
            <AntDesign name="cloud-sync" size={20} color="#3b82f6" />
            <Text style={styles.cardTitle}>Sync Status</Text>
          </View>
          <View style={styles.cardStats}>
            <View style={styles.statItem}>
              <View style={[styles.statDot, styles.statDotSynced]} />
              <Text style={styles.statItemLabel}>Synced</Text>
              <Text style={styles.statItemValue}>
                {documents.length - unsyncedDocuments.length}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={[styles.statDot, styles.statDotPending]} />
              <Text style={styles.statItemLabel}>Pending</Text>
              <Text style={styles.statItemValue}>
                {unsyncedDocuments.length}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f9fafb",
  },
  mainStatsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statsIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  statsTextContainer: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },
  cardsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginLeft: 8,
  },
  cardStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  statDotCompleted: {
    backgroundColor: "#10b981",
  },
  statDotSynced: {
    backgroundColor: "#10b981",
  },
  statDotPending: {
    backgroundColor: "#f59e0b",
  },
  statItemLabel: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  statItemValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e5e7eb",
  },
});

export default DocmentsInfo;
