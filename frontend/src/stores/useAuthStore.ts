import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  checkAdminStatus: async () => {
    console.log("Starting admin status check...");
    set({ isLoading: true, error: null });
    try {
      // First, let's test if the backend is reachable
      console.log("Testing backend connectivity...");
      try {
        // const testResponse = await axiosInstance.get("/songs", {
        //   timeout: 3000,
        // });
        console.log("Backend is reachable, songs endpoint works");
      } catch (testError: any) {
        console.log("Backend connectivity test failed:", testError.message);
      }

      console.log("Making request to /admin/check...");
      console.log(
        "Current axios headers:",
        axiosInstance.defaults.headers.common
      );

      const response = await axiosInstance.get("/admin/check", {
        timeout: 5000, // 5 second timeout
      });
      console.log("Request completed successfully!");
      console.log("Full response:", response);
      console.log("Admin check response:", response.data);
      console.log("Setting isAdmin to:", response.data.admin);

      set({ isAdmin: response.data.admin });
      console.log("Store state after setting isAdmin:", get());
    } catch (error: any) {
      console.log("Request failed with error:", error);
      console.log("Error message:", error.message);
      console.log("Error response:", error.response);
      console.log("Error details:", error.response?.data);
      set({
        isAdmin: false,
        error: error.response?.data?.message || error.message,
      });
    } finally {
      console.log("Finally block - setting isLoading to false");
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
