import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { productId, userId, amount } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!product.isAuction) {
      return res.status(400).json({ message: 'This product is not an auction' });
    }

    if (new Date() > product.auctionEndTime!) {
      return res.status(400).json({ message: 'Auction has ended' });
    }

    if (amount <= (product.currentBid || product.price)) {
      return res.status(400).json({ message: 'Bid must be higher than current bid' });
    }

    product.currentBid = amount;
    product.bids!.push({
      userId,
      amount,
      timestamp: new Date(),
    });

    await product.save();

    res.status(200).json({ message: 'Bid placed successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}