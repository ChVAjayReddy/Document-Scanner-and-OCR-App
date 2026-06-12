import { File, Paths } from "expo-file-system";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

import {
  getDocuments,
  markDocumentAsSynced,
  softDeleteDocument,
} from "@/src/database/documentRepository";

const SQLiteTest = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [uri, seturi] = useState<string[]>([]);

  // const handleAddDocument = () => {
  //   addDocument("Invoice", "Electricity Bill",);
  // };

  const handleFetchDocuments = () => {
    const docs = getDocuments();
    console.log(docs, "Documents from DB");

    setDocuments(docs as any[]);
  };
  const handleSyncDocuments = () => {
    const docs = getDocuments();
    for (let i = 1; i <= docs.length; i++) {
      markDocumentAsSynced(i);
    }
  };
  const handleDisplayDocuments = () => {
    const docs: any[] = getDocuments();
    const temp: string[] = docs.map((doc) => {
      return doc.imagePath;
    });
    seturi(temp);
  };
  function handleDeleteDocuments(id: number, uri: string) {
    softDeleteDocument(id);

    try {
      const file = new File(Paths.document, uri.split("files/")[1]);
      file.delete();

      console.log("file deleted");
    } catch (error) {
      console.error("Error saving photo:", error);
    }
  }
  return (
    <View>
      {/* <Pressable onPress={handleAddDocument}>
        <Text>Add Document</Text>
      </Pressable> */}

      <Pressable onPress={handleFetchDocuments}>
        <Text>Fetch Documents</Text>
      </Pressable>
      <Pressable onPress={handleSyncDocuments}>
        <Text>Sync Documents</Text>
      </Pressable>
      <Pressable onPress={handleDisplayDocuments}>
        <Text>Display Documents</Text>
      </Pressable>

      <FlatList
        data={documents}
        keyExtractor={(doc) => doc.id.toString()}
        renderItem={({ item: doc }) => (
          <View>
            <Text>{doc.id}</Text>
            <Text>{doc.title}</Text>
            <Text>{doc.description}</Text>
            <Text>{doc.createdAt}</Text>
            <Text>{doc.imagePath}</Text>
            <Text>{doc.syncStatus}</Text>
            <Text>{doc.isDeleted}</Text>

            <Image
              source={{ uri: doc.imagePath }}
              style={{ width: 200, height: 200 }}
            />
            <Pressable
              onPress={() => handleDeleteDocuments(doc.id, doc.imagePath)}
            >
              <Text>Delete Documents</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default SQLiteTest;
