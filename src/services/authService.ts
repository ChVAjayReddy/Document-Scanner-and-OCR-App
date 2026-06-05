const authService = {
  loginUser: async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      token: email,
    };
  },
};
export default authService;
