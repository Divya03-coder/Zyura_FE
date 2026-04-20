import { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hook";
import { selectToken, selectUser } from "@/store/features/auth/auth.slice";
import { io, Socket } from "socket.io-client";
import { useLocation } from "react-router-dom";

const SocketTracker = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const { pathname } = useLocation();
  const socketRef = useRef<Socket | null>(null);

  // Define route mappings for feature keys
  const getFeatureKey = (path: string): string | null => {
    if (
      path.includes("/dashboard/mcq-bank") ||
      path.includes("/dashboard/practice-mcq") ||
      path.includes("/dashboard/test") ||
      path.includes("/dashboard/quiz-generator") ||
      path.includes("/dashboard/quiz-page") ||
      path.includes("/dashboard/quiz-collection") ||
      path.includes("/dashboard/all-generated-quiz") ||
      path.includes("/dashboard/quiz/") ||
      path.includes("/dashboard/quiz-answer-overview")
    ) {
      return "mcq";
    }
    if (
      path.includes("/dashboard/clinical-case-generator") ||
      path.includes("/dashboard/clinical-case")
    ) {
      return "clinical_case";
    }
    if (path.includes("/dashboard/osce") || 
        path.includes("/dashboard/practice-with-checklist") || 
        path.includes("/dashboard/osce-tutorial") || 
        path.includes("/dashboard/check-list-result")) {
      return "osce";
    }
    return null;
  };

  const featureKey = getFeatureKey(pathname);

  useEffect(() => {
    const role = user?.account?.role;
    const isEligible = role === "STUDENT" || role === "PROFESSIONAL";

    // Helper to establish connection
    const connectSocket = () => {
      if (socketRef.current) {
        // If the key in the current socket matches our current featureKey, do nothing
        const socketQuery = socketRef.current.io.opts.query as Record<string, string>;
        if (socketQuery?.key === (featureKey || undefined)) {
          if (socketRef.current.connected) return;
          // If not connected, try to connect it
          socketRef.current.connect();
          return;
        }
        // Key changed, disconnect and nullify to create new instance
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      console.log(`Initializing Socket.IO Tracker for ${role} with key: ${featureKey || "none"}...`);
      
      const queryParams: Record<string, string> = {
        token: token || "",
      };
      
      if (featureKey) {
        queryParams.key = featureKey;
      }
      
      const socket = io("https://api.zyura-e.com", {
        query: queryParams,
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Socket.IO connection established for tracking.");
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket.IO disconnected:", reason);
        if (reason === "io server disconnect") {
          socket.connect();
        }
      });

      socket.on("connect_error", (error) => {
        console.error("Socket.IO connection error:", error);
      });
    };

    // Helper to disconnect
    const disconnectSocket = () => {
      if (socketRef.current) {
        console.log("Visibility changed/Unmount: Disconnecting Socket.IO...");
        socketRef.current.disconnect();
        // We don't nullify socketRef here immediately if we want to reuse the instance for quick reconnects, 
        // but for safety/cleanliness on unmount we will nullify it in the cleanup return.
        // For visibility toggles, keeping the instance is fine, but disconnect() stops the active connection.
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tabs or minimized -> Stop tracking
        disconnectSocket();
      } else {
        // User is back -> Start tracking
        if (isEligible && token) {
          connectSocket();
        }
      }
    };

    if (token && isEligible) {
      // Only connect initially if the page is visible
      if (!document.hidden) {
        connectSocket();
      }

      // Add visibility listener
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        if (socketRef.current) {
          console.log("Cleanup: Disconnecting Socket.IO...");
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    } else {
      // Not eligible or logged out
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    }
  }, [token, user?.account?.role, featureKey]);

  return null;
};

export default SocketTracker;

