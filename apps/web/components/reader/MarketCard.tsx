import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

import type { ItemType } from "@refeed/types/item";
import useRelatedMarkets from "@utils/relatedMarkets";

const MarketCard = (item: ItemType ) => {
  const [markets, setMarkets]  = useState([])

  const queryParams = new URLSearchParams(window.location.search);
  const itemId = queryParams.get('item');

  useEffect(() => {
    const fetchRelatedMarkets = async () => {
      const relatedMarkets = await useRelatedMarkets(item);
      setMarkets(relatedMarkets);
    };
  
    fetchRelatedMarkets();
  }, [itemId]);

  return (
    <div className="flex flex-wrap flex-col -m-4">
      {markets.map((market) => (
        <div key={market.adj_ticker} className="p-4 w-full">
          <div className="max-w-l border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300" style={{ height: "150px" }}>
            <a href={`https://data.adj.news/explore/market?question=${market.ticker}`} target="_blank" rel="noopener noreferrer" className="block">
              <div className="flex">
                <div className="w-1/3">
                  <img src={`https://source.boringavatars.com/marble/120/${market.question ? market.question : market.ticker}?square`} alt={market.ticker} className="object-cover w-full h-full" />
                </div>
                <div className={`p-4 w-2/3`}>
                  <h2 className="font-bold text-lg mb-2 text-gray-800">{market.question ? market.question : market.ticker}</h2>
                  <p className="text-sm text-gray-600 mb-2">{`${market.question ? market.question : market.ticker}: with odds of ${market.probability}%, trade at ${market.link}`}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <ExternalLink size={12} className="mr-1" />
                    <span>`data.adj.news`</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketCard;