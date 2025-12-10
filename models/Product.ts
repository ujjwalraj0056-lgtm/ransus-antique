import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  isAuction: boolean;
  auctionEndTime?: Date;
  currentBid?: number;
  bids?: Array<{
    userId: mongoose.Types.ObjectId;
    amount: number;
    timestamp: Date;
  }>;
  sellerId: mongoose.Types.ObjectId;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'antique';
  isAntique: boolean;
  antiqueDetails?: {
    age: number;
    origin: string;
    certificate: string;
    verified: boolean;
  };
  location: {
    city: string;
    state: string;
  };
  status: 'active' | 'sold' | 'expired';
  views: number;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true },
  isAuction: { type: Boolean, default: false },
  auctionEndTime: { type: Date },
  currentBid: { type: Number },
  bids: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    timestamp: { type: Date, default: Date.now }
  }],
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  condition: { type: String, enum: ['new', 'like-new', 'good', 'fair', 'antique'], required: true },
  isAntique: { type: Boolean, default: false },
  antiqueDetails: {
    age: Number,
    origin: String,
    certificate: String,
    verified: { type: Boolean, default: false }
  },
  location: {
    city: String,
    state: String
  },
  status: { type: String, enum: ['active', 'sold', 'expired'], default: 'active' },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);