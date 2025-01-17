import { create } from "zustand";

const useFavorite = create((set) => ({
  isFavorite: JSON.parse(localStorage.getItem("isFavorite")) || false,
  setIsFavorite: (status) => {
    set({ isFavorite: status });
    localStorage.setItem("isFavorite", JSON.stringify(status));
  },
}));

export default useFavorite;
