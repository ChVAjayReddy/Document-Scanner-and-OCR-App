import { useDocumentStore } from "@/src/stores/useDocumentStore";
import type { document } from "@/src/types/documentState";
import { AntDesign } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const DocumentCard = (props: document) => {
  const {
    id,
    title,
    description,
    imagePath,
    ocrStatus,
    syncStatus,
    createdAt,
  } = props;
  const handleDelete = useDocumentStore((state) => state.deletingDocument);
  return (
    <View style={styles.card}>
      <Image source={{ uri: imagePath }} style={styles.thumbnail} />

      <View style={styles.content}>
        <Text style={styles.title}>{title || "Untitled document"}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description || "No description available."}
        </Text>

        <Text style={styles.date}>Created : {createdAt.split("T")[0]}</Text>

        <View style={styles.statusRow}>
          <View style={styles.statusBadge}>
            <AntDesign
              name="scan"
              size={14}
              color={ocrStatus === "pending" ? "#B91C1C" : "#15803D"}
            />
            <Text style={styles.statusText}>
              {ocrStatus === "pending" ? "OCR Pending" : "OCR Completed"}
            </Text>
          </View>

          <View style={styles.statusBadge}>
            <AntDesign
              name="cloud-sync"
              size={14}
              color={syncStatus === "pending" ? "#B91C1C" : "#15803D"}
            />
            <Text style={styles.statusText}>
              {syncStatus === "pending" ? "Pending sync" : "Synced"}
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.viewButton}
          onPress={() => useDocumentStore.getState().setModalDocument(id)}
        >
          <Text style={styles.viewButtonText}>View full details</Text>
        </Pressable>
      </View>

      <Pressable style={styles.deleteButton} onPress={() => handleDelete(id)}>
        <AntDesign name="delete" size={20} color="#DC2626" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  thumbnail: {
    width: 96,
    height: 96,
    borderRadius: 18,
    backgroundColor: "#f3f4f6",
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  viewButton: {
    marginTop: 6,
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#2563EB",
  },
  viewButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  deleteButton: {
    marginLeft: 12,
    padding: 8,
    alignSelf: "flex-start",
    borderRadius: 12,
    backgroundColor: "rgba(220, 38, 38, 0.08)",
  },
});

export default DocumentCard;
