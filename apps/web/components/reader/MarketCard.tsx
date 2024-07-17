import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Market } from "@refeed/types/item";

const MarketCard = (markets: Market[]) => {
  const marketsArray = Object.values(markets);
  const sortedMarketsArray = Object.values(markets).sort((a, b) => b.probability - a.probability);
  return (
    <div className="flex flex-wrap flex-col -m-4 w-[110%]">
      {sortedMarketsArray.map((market) => (
        <div key={market.adj_ticker} className="p-4 w-full">
          <div className="w-full md:max-w-none border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col" style={{ height: "200px", width: "auto", maxWidth: "750px" }}>
            <a href={`https://data.adj.news/explore/market?question=${market.ticker}`} target="_blank" rel="noopener noreferrer" className="block flex-grow">
              <div className="flex flex-grow">
                <div className="w-1/3">
                  <img src={`https://source.boringavatars.com/marble/150/${market.adj_ticker}?square`} alt={`${market.question}: ${market.description}`} className="object-cover w-full h-full" />
                </div>
                <div className={`p-4 w-2/3 flex flex-col justify-between`}>
                  <div>
                    <h2 className="font-bold text-lg mb-2 text-gray-800">{market.question}</h2>
                    <p className="text-sm text-gray-600 mb-2">{`${market.probability}%`} probability of <strong>{market.description}</strong></p>
                    <p className="text-xs text-gray-600 mb-2">{`${market.rules}`}</p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <ExternalLink size={12} className="mr-1" />
                      <span>data.adj.news</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
};

export default MarketCard;