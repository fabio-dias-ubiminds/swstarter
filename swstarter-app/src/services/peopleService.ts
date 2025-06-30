import { Person } from "@/lib/types";
import { config } from "@/lib/config";

export const getPerson = async (id: string): Promise<Person> => {
  try {
    const response = await fetch(`${config.apiUrl}/people/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch person");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching person:", error);
    throw error;
  }
};
