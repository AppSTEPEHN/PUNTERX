# Punter X - Sports Betting Platform

**WHERE FORTUNE MEETS GREATNESS**

A full-stack sports betting platform built with Next.js, MongoDB, and Paystack payment integration.

## Features

- 🎯 **Multiple Betting Categories**: Rollover, 10+ Odds, 15+ Odds, Correct Score
- 👥 **User Authentication**: Secure signup/login with JWT
- 💳 **Paystack Integration**: Seamless payment processing
- 📊 **Admin Dashboard**: Full platform management
- 🏆 **Bet Management**: Place bets, track history, view winnings
- 🎨 **Black & Gold Design**: Premium betting experience
- 📱 **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Paystack
- **Security**: bcryptjs for password hashing

## Project Structure

```
punter-x/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication routes
│   │   ├── bets/          # Bet management routes
│   │   ├── payment/       # Paystack integration
│   │   └── admin/         # Admin API routes
│   ├── dashboard/         # User dashboard
│   ├── admin/             # Admin panel
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── auth/              # Authentication modals
│   ├── dashboard/         # Dashboard components
│   └── admin/             # Admin components
├── models/                # MongoDB models
│   ├── User.js
│   ├── BetOdd.js
│   ├── Ticket.js
│   └── Transaction.js
├── lib/
│   ├── mongodb.js         # Database connection
│   └── auth.js            # JWT utilities
├── styles/
│   └── globals.css        # Global styles
└── public/                # Static assets
```

## Installation

### Prerequisites
- Node.js 18+ or Python with uv
- MongoDB Atlas account
- Paystack account

### Setup

1. **Clone/Navigate to project**:
```bash
cd punter-x
```

2. **Install dependencies**:
```bash
npm install
# or
npm i
```

3. **Create environment file**:
```bash
cp .env.example .env.local
```

4. **Update `.env.local` with your credentials**:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/punter-x
JWT_SECRET=your_secret_key_here
NEXT_PUBLIC_PAYSTACK_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
NODE_ENV=development
```

### Get Credentials

#### MongoDB
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/punter-x`

#### Paystack
1. Create account at [Paystack](https://paystack.com)
2. Go to Settings → API Keys & Webhooks
3. Copy Public and Secret keys

## Running the Application

### Development Mode
```bash
npm run dev
```
Visit `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Usage

### User Features
1. **Sign Up**: Create account with email and password
2. **Login**: Access your dashboard
3. **Browse Odds**: View available betting odds
4. **Place Bets**: Select odds and stake amount
5. **Payment**: Complete payment via Paystack
6. **View History**: Track all bets and winnings

### Admin Features
1. **Login**: Admin credentials at signup
2. **Dashboard**: View platform statistics
3. **Manage Odds**: Add, edit, delete betting odds
4. **Users**: View and manage user accounts
5. **Transactions**: Monitor all transactions
6. **Settings**: Configure platform settings

## Database Models

### User
```javascript
{
  email: String,
  username: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  accountBalance: Number,
  role: 'user' | 'admin',
  totalBets: Number,
  totalWinnings: Number
}
```

### BetOdd
```javascript
{
  title: String,
  category: 'rollover' | '10+' | '15+' | 'correct_score',
  odds: Number,
  sport: String,
  eventDate: Date,
  matchDetails: { home, away, league },
  isActive: Boolean,
  minStake: Number,
  maxStake: Number,
  status: 'pending' | 'live' | 'closed' | 'settled'
}
```

### Ticket
```javascript
{
  userId: ObjectId,
  bets: [{ betOddId, odds, category, title }],
  stake: Number,
  totalOdds: Number,
  potentialWinnings: Number,
  status: 'pending' | 'won' | 'lost' | 'cancelled',
  reference: String
}
```

### Transaction
```javascript
{
  userId: ObjectId,
  type: 'deposit' | 'withdrawal' | 'bet' | 'winning',
  amount: Number,
  status: 'pending' | 'success' | 'failed',
  paystackReference: String,
  balanceBefore: Number,
  balanceAfter: Number
}
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Bets
- `GET /api/bets` - Get all active bets
- `POST /api/bets/place` - Place a bet

### Payment
- `POST /api/payment/initialize` - Initialize Paystack transaction
- `POST /api/payment/verify` - Verify payment

### Admin
- `GET /api/admin/stats` - Get platform statistics

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
3. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

### Other Platforms

#### Netlify
- Connect GitHub repository
- Add build command: `npm run build`
- Add start command: `npm start`
- Set environment variables

#### AWS/Heroku
- Use similar environment setup
- Ensure MongoDB and Paystack credentials are configured

## Security Best Practices

1. **Environment Variables**: Never commit `.env.local`
2. **JWT Secret**: Use a strong, random secret (min 32 characters)
3. **Paystack Keys**: Keep secret key private, only use public key in frontend
4. **HTTPS**: Always use HTTPS in production
5. **Rate Limiting**: Implement rate limiting on API routes
6. **Input Validation**: Validate all user inputs
7. **Password Security**: Enforce strong password requirements

## Testing

Create test users:
```javascript
// Admin User
{
  email: 'admin@puntxer.com',
  password: 'Admin@123',
  username: 'admin'
}

// Regular User
{
  email: 'user@puntxer.com',
  password: 'User@123',
  username: 'user1'
}
```

## Troubleshooting

### MongoDB Connection Error
- Verify connection string in `.env.local`
- Check IP whitelist in MongoDB Atlas
- Ensure network access is enabled

### Paystack Payment Fails
- Verify API keys are correct
- Check Paystack account is not in test mode
- Ensure webhook is configured

### Authentication Issues
- Clear browser cookies/localStorage
- Verify JWT_SECRET is set correctly
- Check token expiration (30 days)

## Support & Maintenance

### Regular Updates
- Keep Next.js and dependencies updated
- Monitor Paystack API changes
- Check MongoDB version compatibility

### Monitoring
- Set up logging for errors
- Monitor payment transactions
- Track platform performance

## License

© 2024 Punter X. All rights reserved.

---

**WHERE FORTUNE MEETS GREATNESS** 🏆
