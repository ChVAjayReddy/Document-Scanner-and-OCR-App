import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { addDocument, getDocuments } from "@/src/database/documentRepository";

const SQLiteTest = () => {
  const [documents, setDocuments] = useState<any[]>([]);

  const handleAddDocument = () => {
    addDocument("Invoice", "Electricity Bill");
  };

  const handleFetchDocuments = () => {
    const docs = getDocuments();

    setDocuments(docs as any[]);
  };

  return (
    <View>
      <Pressable onPress={handleAddDocument}>
        <Text>Add Document</Text>
      </Pressable>

      <Pressable onPress={handleFetchDocuments}>
        <Text>Fetch Documents</Text>
      </Pressable>

      {documents.map((doc: any) => (
        <Text key={doc.id}>{doc.title}</Text>
      ))}
    </View>
  );
};

export default SQLiteTest;
