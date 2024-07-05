import { createClient } from '@supabase/supabase-js'
import type { ItemType } from "@refeed/types/item";

export default function useRelatedMarkets(item: ItemType) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  if (item && item.embedding) {
    return supabase.rpc('match_documents', {
      query_embedding: item.embedding, // pass the query embedding
      match_threshold: 0.85, // choose an appropriate threshold for your data
      match_count: 3, // choose the number of matches
    }).then(({ data: documents }) => {
      return documents;
    }).catch(error => {
      console.error(error);
      return [];
    });
  } else {
    return Promise.resolve([]);
  }
}