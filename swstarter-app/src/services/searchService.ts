import { SearchResultItem } from "@/lib/types";
import { config } from "@/lib/config";

export const search = async (
  term: string,
  searchType: "people" | "movies"
): Promise<SearchResultItem[]> => {
  try {
    const searchparams = new URLSearchParams({
      term,
      type: searchType,
    });
    const response = await fetch(`${config.apiUrl}/search?${searchparams}`);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
