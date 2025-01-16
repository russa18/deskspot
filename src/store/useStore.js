import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const useStore = create(persist((set) => ({
  spaces: [], // Initial state for storing Firestore data
  loading: false, // State for loading status
  error: null, // State for error handling

  // Action to fetch data from Firestore
  fetchSpaces: async () => {
    set({ loading: true, error: null }); // Set loading to true before fetching data
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "workspaces")); // Replace 'spaces' with your Firestore collection name
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ spaces: dataList, loading: false }); // Update the state with fetched data
    } catch (error) {
      set({ error: error.message, loading: false }); // Handle any errors
    }
  },
})));

export default useStore;
