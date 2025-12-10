import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    isAuction: '',
    isAntique: '',
    search: '',
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters as any);
      const response = await axios.get(`/api/products?${params}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Furniture', 'Jewelry', 'Paintings', 'Sculptures', 'Coins', 'Textiles', 'Pottery', 'Books'];

  return (
    <>
      <Head>
        <title>Browse Products - AntiquesBazaar</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">🏺 AntiquesBazaar</Link>
            <div className="space-x-4">
              <Link href="/products" className="text-primary font-semibold">Browse</Link>
              <Link href="/auctions" className="text-gray-700 hover:text-primary">Auctions</Link>
              <Link href="/sell" className="text-gray-700 hover:text-primary">Sell</Link>
              <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600">Login</Link>
            </div>
          </nav>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search products..."
                className="border rounded-lg px-4 py-2"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
              <select
                className="border rounded-lg px-4 py-2"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                className="border rounded-lg px-4 py-2"
                value={filters.isAuction}
                onChange={(e) => setFilters({ ...filters, isAuction: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="true">Auctions Only</option>
                <option value="false">Buy Now Only</option>
              </select>
              <select
                className="border rounded-lg px-4 py-2"
                value={filters.isAntique}
                onChange={(e) => setFilters({ ...filters, isAntique: e.target.value })}
              >
                <option value="">All Items</option>
                <option value="true">Antiques Only</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="text-2xl">Loading products...</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {products.length === 0 ? (
                <div className="col-span-4 text-center py-20">
                  <p className="text-xl text-gray-600">No products found</p>
                </div>
              ) : (
                products.map((product: any) => (
                  <Link key={product._id} href={`/product/${product._id}`} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl">🏺</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 truncate">{product.title}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-bold text-xl">₹{product.price.toLocaleString()}</span>
                        {product.isAuction && (
                          <span className="bg-accent text-white px-2 py-1 rounded text-xs">AUCTION</span>
                        )}
                      </div>
                      {product.isAntique && (
                        <span className="inline-block mt-2 bg-secondary text-white px-2 py-1 rounded text-xs">✓ VERIFIED ANTIQUE</span>
                      )}
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