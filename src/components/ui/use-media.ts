import { useQuery } from "@tanstack/react-query";
import db from "../db/db";

export const useMediaByExactTitle = (title, limit = 10) => {
  return useQuery({
    queryKey: ["mediaItem", title], // Unique key for caching
    queryFn: () => fetchMediaByExactTitle(JSON.parse(title) || title), // Function to fetch data
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

/**
 * fetchMediaByExactTitle - returns the public URL for a file in "images" bucket
 * that exactly matches the "title" (filename).
 */
export async function fetchMediaByExactTitle(title) {
  // Use getPublicUrl to build the public URL for that filename
  const { data, error } = await db.storage.from("images").getPublicUrl(title);

  console.log(data, error, "checkImagedata");
  if (error) throw error;

  // data.publicUrl is the public URL if the bucket is public
  // If it's a private bucket, you'd need a signed URL approach
  return data?.publicUrl || null;
}
