# 🏺 Ransus Antique - Indian Antiques & Auction Platform

A comprehensive marketplace for buying, selling, and auctioning genuine antiques and collectibles across India.

## ✨ Features

- **User Authentication**: Secure registration and login
- **Product Listings**: Browse and search products with filters
- **Live Auctions**: Real-time bidding system with countdown timers
- **Antique Verification**: Certificate upload and verification system
- **Secure Payments**: Razorpay integration (UPI, Cards, Wallets)
- **Location-based Search**: Find items near you
- **Rating & Reviews**: Build trust with seller ratings
- **Admin Dashboard**: Moderate listings and users
- **Mobile Responsive**: Works on all devices

## 🚀 Quick Deploy to Vercel

### Step 1: Click Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ujjwalraj0056-lgtm/ransus-antique)

### Step 2: Add Environment Variables

After clicking deploy, add these environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Step 3: Deploy!

Click "Deploy" and your site will be live in 2-3 minutes!

---

## 🔧 Manual Deployment

### Prerequisites

1. **MongoDB Atlas** (FREE): https://mongodb.com/cloud/atlas
2. **Razorpay Account** (FREE testing): https://razorpay.com
3. **Cloudinary Account** (FREE): https://cloudinary.com

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ujjwalraj0056-lgtm/ransus-antique.git
cd ransus-antique
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Payment**: Razorpay (Indian Payment Gateway)
- **Image Upload**: Cloudinary
- **Real-time**: Socket.io for live auctions
- **Authentication**: JWT

---

## 🎯 Features Breakdown

### For Buyers
- Browse products by category
- Search and filter listings
- Participate in live auctions
- Secure checkout with Razorpay
- Track orders
- Rate sellers

### For Sellers
- List products for sale
- Create auction listings
- Upload antique certificates
- Manage inventory
- Track sales
- Receive payments

### For Admins
- Verify antique authenticity
- Moderate listings
- Manage users
- View analytics
- Handle disputes

---

## 🌐 Live Demo

**Repository**: https://github.com/ujjwalraj0056-lgtm/ransus-antique

**Deploy Now**: Click the Vercel button above!

---

## 📱 Roadmap

- [ ] Mobile app (React Native)
- [ ] AI-powered antique authentication
- [ ] Multi-language support (Hindi, Tamil, Bengali)
- [ ] Shipping integration
- [ ] Advanced analytics
- [ ] Social features
- [ ] Wishlist & favorites
- [ ] Email notifications
- [ ] SMS alerts

---

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Contact

For questions or support, reach out to ujjwalraj0056@gmail.com

---

**Made with ❤️ in India 🇮🇳**

**Ransus Antique** - Preserving India's Heritage, One Antique at a Time