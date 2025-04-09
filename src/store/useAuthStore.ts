import { create } from "zustand";
import { axiosInstance } from "../lib";
import type { AuthUserType, FormDataType } from "../@types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";


interface UseAuthType {
  authUser: AuthUserType | null;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  imgUploadLoading: boolean;
  isCheckingUserLoader: boolean;
  onlineUsers: string[];
  socket: Socket | null;
  signin: (data: FormDataType) => Promise<void>;
  signup: (data: FormDataType) => Promise<void>;
  updatePhoto: (data: FormData) => Promise<void>;
  checkUser: () => Promise<void>;
  logout: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<UseAuthType>((set, get) => ({
  authUser: null,
  isLoginLoading: false,
  isRegisterLoading: false,
  isCheckingUserLoader: false,
  imgUploadLoading: false,
  onlineUsers: [],
  socket: null,

  connectSocket() {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;
    const socketIo = io("https://chat-app-bb-tai4.onrender.com", {
      query: { userId: authUser?._id },
      withCredentials: true,
    });
    socketIo.connect();
    set({ socket: socketIo });
    socketIo.on("getOnlineUsers", (userId: string[]) => {
      set({ onlineUsers: userId });
    });
  },

  

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect();
  },

  checkUser: async () => {
    set({ isCheckingUserLoader: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data });
      get().connectSocket()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        }
      }
    } finally {
      set({ isCheckingUserLoader: false });
    }
  },

  signin: async (data) => {
    set({ isLoginLoading: true });
    try {
      const res = await axiosInstance.post("/auth/sign-in", data);
      console.log(res);

      set({ authUser: res.data.data });
      toast.success("Sign-in completed successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        }
      }
    } finally {
      set({ isLoginLoading: false });
    }
  },

  signup: async (data) => {
    set({ isRegisterLoading: true });
    try {
      const res = await axiosInstance.post("/auth/sign-up", data);
      set({ authUser: res.data.data });
      toast.success("Sign-up completed successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        }
      }
    } finally {
      set({ isRegisterLoading: false });
    }
  },

  updatePhoto: async (data) => {
    set({ imgUploadLoading: true });
    try {
      const res = await axiosInstance.post("/auth/update-photo", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ authUser: res.data.data });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        }
      }
    } finally {
      set({ imgUploadLoading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout completed successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        }
      }
    }
  },
}));
