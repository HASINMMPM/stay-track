# StayTrack Backend

A modern TypeScript and Express.js backend API for the StayTrack application.

## 🚀 Features

- **TypeScript** - Full type safety and modern JavaScript features
- **Express.js** - Fast, unopinionated web framework
- **Security** - Helmet.js for security headers
- **CORS** - Cross-Origin Resource Sharing enabled
- **Logging** - Morgan for HTTP request logging
- **Environment Variables** - dotenv for configuration management
- **Hot Reload** - ts-node-dev for development

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts              # Main application entry point
│   ├── routes/
│   │   └── index.ts          # API routes
│   ├── middleware/
│   │   └── errorHandler.ts   # Error handling middleware
│   └── types/
│       └── index.ts          # TypeScript type definitions
├── dist/                     # Compiled JavaScript output
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── .gitignore               # Git ignore rules
├── env.example              # Environment variables template
└── README.md                # This file
```

## 🛠️ Installation

1. **Clone the repository** (if not already done)
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Edit `.env` file with your configuration.

## 🚀 Development

### Start development server
```bash
npm run dev
```
This will start the server with hot reload enabled on `http://localhost:3000`

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Server health status
- `GET /` - Welcome message and API information

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (placeholder)

## 🛡️ Security Features

- **Helmet.js** - Sets various HTTP headers to help protect your app
- **CORS** - Configurable Cross-Origin Resource Sharing
- **Input Validation** - TypeScript provides compile-time type checking
- **Error Handling** - Centralized error handling middleware

## 🗄️ Database Integration

The project is ready for database integration. Common options include:

- **PostgreSQL** with Prisma or TypeORM
- **MongoDB** with Mongoose
- **MySQL** with Sequelize

## 🔐 Authentication

Ready for JWT authentication implementation. Environment variables are prepared for:
- JWT secret key
- Token expiration time
- CORS origin configuration

## 📝 Environment Variables

Copy `env.example` to `.env` and configure:

```env
NODE_ENV=development
PORT=3000
# Add your database and authentication configuration
```

## 🧪 Testing

Test setup is ready to be configured with your preferred testing framework:
- Jest
- Mocha + Chai
- Vitest

## 📦 Dependencies

### Production
- `express` - Web framework
- `cors` - CORS middleware
- `helmet` - Security middleware
- `morgan` - HTTP request logger
- `dotenv` - Environment variable loader

### Development
- `typescript` - TypeScript compiler
- `@types/*` - TypeScript type definitions
- `ts-node-dev` - Development server with hot reload

## 🚀 Deployment

1. Build the project: `npm run build`
2. Set production environment variables
3. Start the server: `npm start`

## 📄 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions and support, please open an issue in the repository.
