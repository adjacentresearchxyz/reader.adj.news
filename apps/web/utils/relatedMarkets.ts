import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai';
import type { ItemType } from "@refeed/types/item";

function createRandomMatrix(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() * 2 - 1)
  );
}

function dotProduct(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function reduceEmbedding(embedding, targetDimensions = 384) {
  const projectionMatrix = createRandomMatrix(embedding.length, targetDimensions);
  return projectionMatrix[0].map((_, i) => 
    dotProduct(embedding, projectionMatrix.map(row => row[i]))
  );
}

export default async function useRelatedMarkets( item: ItemType ) {
  console.log(item.item.title)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  // const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  const openai = new OpenAI({apiKey: "sk-proj-wApDOlt0FJ5OSUpKgUs8T3BlbkFJAzmQaTjgaOMF1AnjcLg1", dangerouslyAllowBrowser: true });

  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: item.item.title,
  });
  
  const embedding = reduceEmbedding(response.data[0]?.embedding);

  console.log(embedding)

  const { data: documents, error } = await supabase.rpc('match_documents', {
    query_embedding: embedding, // pass the query embedding
    match_threshold: 0.90, // choose an appropriate threshold for your data
    match_count: 3, // choose the number of matches
  })
  if (error) console.error(error)

  documents.map(document => console.log(document.ticker));

  return documents
}