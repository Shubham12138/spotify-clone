import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

const updateApiToken = (token: String | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Token set in axios headers");
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    console.log("Token removed from axios headers");
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        console.log("Token received:", !!token);
        updateApiToken(token);
        if (token) {
          // console.log("Checking admin status...");
          await checkAdminStatus();

          if (userId) initSocket(userId);
        }
      } catch (error: any) {
        updateApiToken(null);
        console.log("Error in Auth Provider", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
    return () => disconnectSocket();
  }, [getToken, checkAdminStatus, userId, initSocket, disconnectSocket]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );

  return <>{children}</>;
};

export default AuthProvider;
