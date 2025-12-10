import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

export default function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products?isAuction=true');
      setAuctions(response.data.products);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Live Auctions - AntiquesBazaar</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">🏺 AntiquesBazaar</Link>
            <div className="space-x-4">
              <Link href="/products" className="text-gray-700 hover:text-primary">Browse</Link>
              <Link href="/auctions" className="text-primary font-semibold">Auctions</Link>
              <Link href="/sell" className="text-gray-700 hover:text-primary">Sell</Link>
              <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600">Login</Link>
            </div>
          </nav>
        </header>

        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-8">🔥 Live Auctions</h1>

          {loading ? (
            <div className="text-center py-20">
              <div className="text-2xl">Loading auctions...</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {auctions.length === 0 ? (
                <div className="col-span-3 text-center py-20">
                  <p className="text-xl text-gray-600">No active auctions at the moment</p>
                </div>
              ) : (
                auctions.map((auction: any) => (
                  <Link key={auction._id} href={`/product/${auction._id}`} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                    <div className="relative">
                      <div className="h-56 bg-gray-200 flex items-center justify-center">
                        {auction.images?.[0] ? (
                          <img src={auction.images[0]} alt={auction.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-5xl">🏺</span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        LIVE
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-xl mb-2">{auction.title}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Bid:</span>
                          <span className="text-primary font-bold text-xl">
                            ₹{(auction.currentBid || auction.price).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bids:</span>
                          <span className="font-semibold">{auction.bids?.length || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Ends:</span>
                          <span className="text-red-600 font-semibold">
                            {auction.auctionEndTime ? formatDistanceToNow(new Date(auction.auctionEndTime), { addSuffix: true }) : 'Soon'}
                          </span>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-accent text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
                        Place Bid →
                      </button>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}