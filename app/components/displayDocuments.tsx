import { useDocumentStore } from "@/src/stores/useDocumentStore";
import type { document } from "@/src/types/documentState";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DisplayDocuments = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [displayDocument, setDisplayDocument] = useState<document[]>([]);
  const loadDocuments = useDocumentStore((state) => state.loadDocuments);
  const documents = useDocumentStore((state) => state.documents);
  const handleDelete = useDocumentStore((state) => state.deletingDocument);
  function handleFullDetails(id: number) {
    const temp = documents.filter((document) => document.id === id);
    setDisplayDocument(temp);
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
                <Pressable
                  onPress={() => {
                    handleFullDetails(doc.id);
                    setModalVisible(true);
                  }}
                >
                  <Text>{doc.syncStatus}</Text>
                  <Text>Full Details</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalWrapper}>
            <SafeAreaView style={styles.modalContainer}>
              <ScrollView
                style={styles.modalScroll}
                contentContainerStyle={styles.modalScrollContent}
                nestedScrollEnabled
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Document details</Text>
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    style={styles.modalClose}
                  >
                    <AntDesign name="close" size={18} color="#6b7280" />
                  </Pressable>
                </View>

                {displayDocument.length > 0 ? (
                  <View style={styles.modalBody}>
                    <Image
                      source={{ uri: displayDocument[0].imagePath }}
                      style={styles.modalImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.modalSectionTitle}>Title</Text>
                    <Text style={styles.modalText} numberOfLines={2}>
                      {displayDocument[0].title}
                    </Text>

                    <Text style={styles.modalSectionTitle}>Description</Text>
                    <Text style={styles.modalText}>
                      {displayDocument[0].description ||
                        "No description provided."}
                    </Text>

                    <View style={styles.modalMetaRow}>
                      <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>Created</Text>
                        <Text style={styles.metaValue}>
                          {displayDocument[0].createdAt.split("T")[0]}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.syncBadge,
                          displayDocument[0].syncStatus === "pending"
                            ? styles.pendingBadge
                            : styles.syncedBadge,
                        ]}
                      >
                        <Text
                          style={
                            displayDocument[0].syncStatus === "pending"
                              ? styles.pendingBadgeText
                              : styles.syncedBadgeText
                          }
                        >
                          {displayDocument[0].syncStatus.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.modalSectionTitle}>Extracted Text</Text>
                    <Text style={styles.modalText}>
                      {displayDocument[0].ocrText}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.modalBody}>
                    <Text style={styles.modalEmptyText}>
                      Select a document to view the full details.
                    </Text>
                  </View>
                )}
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.68)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalScroll: {
    flex: 1,
    minHeight: 0,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 520,
    height: "85%",
    minHeight: 0,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
    overflow: "hidden",
  },
  modalScrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  modalClose: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    gap: 16,
  },
  modalImage: {
    width: "100%",
    height: 180,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
  },
  modalSectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 6,
  },
  modalText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
  },
  modalMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    gap: 12,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  // syncBadge: {
  //   borderRadius: 999,
  //   paddingVertical: 8,
  //   paddingHorizontal: 14,
  // },
  pendingBadge: {
    backgroundColor: "#FEF2F2",
  },
  syncedBadge: {
    backgroundColor: "#ECFDF5",
  },
  pendingBadgeText: {
    color: "#B91C1C",
    fontWeight: "700",
  },
  syncedBadgeText: {
    color: "#15803D",
    fontWeight: "700",
  },
  modalEmptyText: {
    color: "#6B7280",
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 24,
  },
});

export default DisplayDocuments;
