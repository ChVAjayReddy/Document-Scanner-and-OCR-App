import { useDocumentStore } from "@/src/stores/useDocumentStore";
import type { document } from "@/src/types/documentState";
import { useEffect } from "react";
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
import DocmentsInfo from "../components/documentsInfo";
import DocumentCard from "../components/HomePage/documetCard";
import Header from "../components/HomePage/header";
import ScanButton from "../components/HomePage/scanButton";
import Search from "../components/HomePage/search";
const Home = () => {
  const loadDocuments = useDocumentStore((state) => state.loadDocuments);

  const documents: document[] = useDocumentStore((state) => state.documents);
  const modalVisible = useDocumentStore((state) => state.modalVisible);
  const modalDocument: document[] = useDocumentStore(
    (state) => state.modalDocument,
  );
  const activeDocument = modalDocument[0];

  const closeModal = () => useDocumentStore.setState({ modalVisible: false });

  useEffect(() => {
    loadDocuments();
    //getUnsyncedDocuments();
    //uploadDocuments();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 15,
      }}
    >
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={documents}
          renderItem={({ item: doc }) => (
            <DocumentCard
              id={doc.id}
              description={doc.description}
              title={doc.title}
              syncStatus={doc.syncStatus}
              imagePath={doc.imagePath}
              createdAt={doc.createdAt}
              isDeleted={doc.isDeleted}
              ocrStatus={doc.ocrStatus}
              ocrText={doc.ocrText}
            />
          )}
          keyExtractor={(doc) => doc.id.toString()}
          ListHeaderComponent={
            <>
              <Header />
              <Search />
              <ScanButton />
              <DocmentsInfo />
            </>
          }
        ></FlatList>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.backdrop}>
          <View style={styles.modalWrapper}>
            <SafeAreaView style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Document details</Text>
                <Pressable style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>×</Text>
                </Pressable>
              </View>
              <ScrollView
                style={styles.modalScroll}
                contentContainerStyle={styles.modalContent}
                showsVerticalScrollIndicator={false}
              >
                {activeDocument ? (
                  <>
                    <Image
                      source={{ uri: activeDocument.imagePath }}
                      style={styles.documentImage}
                      resizeMode="cover"
                    />
                    <View style={styles.detailSection}>
                      <Text style={styles.sectionLabel}>Title</Text>
                      <Text style={styles.sectionValue} numberOfLines={2}>
                        {activeDocument.title}
                      </Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text style={styles.sectionLabel}>Description</Text>
                      <Text style={styles.sectionValue}>
                        {activeDocument.description ||
                          "No description provided."}
                      </Text>
                    </View>
                    <View style={styles.metaRow}>
                      <View>
                        <Text style={styles.metaLabel}>Created</Text>
                        <Text style={styles.metaValue}>
                          {activeDocument.createdAt?.split("T")[0] || "—"}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.statusPill,
                          activeDocument.syncStatus === "pending"
                            ? styles.pendingStatus
                            : styles.syncedStatus,
                        ]}
                      >
                        <Text
                          style={
                            activeDocument.syncStatus === "pending"
                              ? styles.pendingStatusText
                              : styles.syncedStatusText
                          }
                        >
                          {activeDocument.syncStatus?.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.detailSection}>
                      <Text style={styles.sectionLabel}>Extracted Text</Text>
                      <Text style={styles.sectionValue}>
                        {activeDocument.ocrText ||
                          "No extracted text available."}
                      </Text>
                    </View>
                  </>
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>
                      Select a document to view full details.
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
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.72)",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  modalWrapper: {
    width: "100%",
    maxWidth: 560,
  },
  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 16,
    maxHeight: "88%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#374151",
    lineHeight: 22,
  },
  modalScroll: {
    width: "100%",
  },
  modalContent: {
    paddingBottom: 16,
  },
  documentImage: {
    width: "100%",
    height: 180,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    marginBottom: 18,
  },
  detailSection: {
    marginBottom: 18,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    marginBottom: 6,
    letterSpacing: 0.2,
    textTransform: "uppercase",
  },
  sectionValue: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
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
  statusPill: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  pendingStatus: {
    backgroundColor: "#FEF3F2",
  },
  syncedStatus: {
    backgroundColor: "#ECFDF5",
  },
  pendingStatusText: {
    color: "#B91C1C",
    fontWeight: "700",
    fontSize: 12,
  },
  syncedStatusText: {
    color: "#15803D",
    fontWeight: "700",
    fontSize: 12,
  },
  emptyState: {
    minHeight: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default Home;
