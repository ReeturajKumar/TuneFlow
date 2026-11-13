import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

const AuthProviderComponent = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const {checkAdminStatus} = useAuthStore();
  const {initSocket, disconnectSocket} = useChatStore();

  // Clerk session tokens expire after ~60s, so fetch a fresh one per request
  useEffect(() => {
    const id = axiosInstance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => axiosInstance.interceptors.request.eject(id);
  }, [getToken]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (userId) {
          await checkAdminStatus();
          initSocket(getToken);
        } else {
          useAuthStore.getState().reset();
        }
      } catch (err) {
        console.error("Error initializing authentication:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // clean up 
    return () => disconnectSocket();
    
  }, [checkAdminStatus, disconnectSocket, getToken, initSocket, userId]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <Loader className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProviderComponent;
