import type { ItemType } from "@refeed/types/item";

import { PrismaClient } from '@prisma/client';

export async function fetchItemEmbedding(id: string) {
    const prisma = new PrismaClient();
    // raw query the db to get the unsupported embedding type
    // https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries
    // https://www.prisma.io/docs/orm/prisma-schema/data-model/models#unsupported-types
    const result = await prisma.$queryRaw`SELECT 
      id,
      title,
      url,
      website_content,
      image_url,
      image_source_url,
      readibility_score,
      content_length,
      feed_id,
      from_external_url,
      from_newsletter,
      newsletter_sender,
      newsletter_email,
      user_id,
      created_at,
      updated_at,
      embedding_json
    FROM item WHERE id = ${id}`;
    return result;
  }
  