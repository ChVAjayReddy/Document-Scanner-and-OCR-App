const documentService = {
  uploadDocuments: async (documents: any[]) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      success: true,
    };
  },
};

export default documentService;
