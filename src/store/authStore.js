import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { create } from "zustand";
import { auth, db, googleProvider } from "../config/firebase-config";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Helper function to handle errors
const getErrorMessage = (error) => {
  switch (error.code) {
    case "auth/user-not-found":
      return "User not found. Please check your email or register.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/too-many-requests":
      return "Access to this account has been temporarily disabled due to too many failed login attempts.";
    default:
      return `Check credentials and try again `;
  }
};

const useAuthStore = create((set) => ({
  user: null,
  userData: [],
  isAuthenticated: false,
  loading: false,
  error: null,

  //email/pass/uname/phno

  register: async (email, password, username, phoneno) => {
    set({ loading: true, error: null });
    try {
      // Create the user with email and password
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;

      // Save additional user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        username: username || "Anonymous User",
        email: user.email,
        phoneno: phoneno || "",
        createdAt: new Date().toISOString(),
      });

      // Update Zustand state
      set({ user: user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ error: getErrorMessage(error), loading: false });
    }
  },

  // Email/password login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({
        user: userCredentials.user,
        isAuthenticated: true,
        loading: false,
      });
      return userCredentials;
    } catch (error) {
      set({ error: getErrorMessage(error), loading: false });
    }
  },

  // Google login
  loginWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);

      const user = userCredentials.user;

      // Save additional user details to Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          userId: user.uid,
          username: user.displayName,
          email: user.email,
          phoneno: null,
          createdAt: new Date().toISOString(),
        });
      }
      set({
        user: userCredentials.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ error: getErrorMessage(error), loading: false });
    }
  },

  // Logout
  logout: async () => {
    try {
      await auth.signOut();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      set({ error: "Failed to logout. Please try again.", loading: false });
    }
  },

  // Initialize authentication state
  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    });
    return unsubscribe; // Return the unsubscribe function for cleanup
  },

  fetchUserDetails: async (uid) => {
    try {
      // Reference the specific user's document in the "users" collection
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        set({
          userData: [{ id: userDoc.id, ...userDoc.data() }], // Store the user details
          loading: false,
        });
      } else {
        set({ error: "User not found", loading: false });
      }
    } catch (error) {
      set({ error: getErrorMessage(error), loading: false });
    }
  },

  addToFavWorkspace: async ( workspaceId,userId) => {
    try {
      //  console.log(workspaceId);
       
      const userDocRef = doc(db, "users", userId); // Reference to the user's document
      await updateDoc(userDocRef, {
        favWorkspace: arrayUnion(workspaceId), // Add workspaceId to the array
      });
      // console.log("Workspace added to favorites!");
      // return { success: true };
    } catch (error) {
      set({ error: getErrorMessage(error), loading: false });
    }
  },
}));

export default useAuthStore;
