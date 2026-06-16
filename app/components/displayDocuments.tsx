import { useDocumentStore } from "@/src/stores/useDocumentStore";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const DisplayDocuments = () => {
  const loadDocuments = useDocumentStore((state) => state.loadDocuments);
  const documents = useDocumentStore((state) => state.documents);
  const handleDelete = useDocumentStore((state) => state.deletingDocument);

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        keyExtractor={(doc) => doc.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item: doc }) => (
          <View style={styles.card}>
            <Image source={{ uri: doc.imagePath }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{doc.title}</Text>
              <Text style={styles.subtitle} numberOfLines={2}>
                {doc.description || "No description available."}
              </Text>
              <Text>{doc.ocrText}</Text>
              <Text style={styles.dateText}>
                📅 {doc.createdAt.split("T")[0]}
              </Text>

              <View style={styles.statusPill}>
                <View style={styles.actionButton}>
                  <AntDesign name="scan" size={18} color="#374151" />
                </View>

                <View
                  style={[
                    styles.syncBadge,
                    {
                      backgroundColor:
                        doc.syncStatus === "pending" ? "#FEF2F2" : "#ECFDF5",
                    },
                  ]}
                >
                  <AntDesign
                    name="cloud-sync"
                    size={18}
                    color={doc.syncStatus === "pending" ? "#f00606" : "#16A34A"}
                  />
                </View>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDelete(doc.id)}
                >
                  <AntDesign name="delete" size={18} color="#DC2626" />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 14,
    marginRight: 16,
    backgroundColor: "#f3f4f6",
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 8,
  },
  statusPill: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  syncBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DisplayDocuments;
