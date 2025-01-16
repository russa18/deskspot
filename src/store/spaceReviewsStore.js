import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../config/firebase-config";
import { persist } from "zustand/middleware";

const useReviewPost = create(
  persist((set) => ({
    reviews: [],
    rating:null,
    loading: false,
    error: null,

    postReviews: async (
      workspaceId,
      review,
      userId = null,
      username = "Anonymous",
      reviewImgs = [],
      rating = null,
      profileImg = null
    ) => {
      try {
        // Generate a unique ID for the review document
        const reviewId = `${workspaceId}-${Date.now()}`;
        await setDoc(doc(db, "workspaceReviews", reviewId), {
          workspaceId,
          review,
          userId,
          username,
          reviewImgs,
          rating,
          profileImg,
          createdAt: new Date().toISOString(),
        });
        set((state) => ({
          reviews: [
            ...state.reviews,
            {
              workspaceId,
              review,
              userId,
              username,
              reviewImgs,
              rating,
              profileImg,
              createdAt: new Date().toISOString(),
            },
          ],
          loading: false, // Reset loading state
        }));
      } catch (error) {
        set({ error: error.message, loading: false });
        console.error("Error posting review:", error);
      }
    },

    fetchReviews: async () => {
      set({ loading: true, error: null });
      try {
        const querySnapshot = await getDocs(collection(db, "workspaceReviews"));
        const reviewsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        set({ reviews: reviewsList, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },

    setRating:async(newRating) => set({ rating: newRating })
  }))
);

export default useReviewPost;
