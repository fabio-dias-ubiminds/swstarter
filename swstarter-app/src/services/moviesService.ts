import { Movie } from "@/lib/types";
import { config } from "@/lib/config";

export const getMovie = async (id: string): Promise<Movie> => {
  try {
    const response = await fetch(`${config.apiUrl}/movies/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
};
