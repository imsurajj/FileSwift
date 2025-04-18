# FileSwift - Instant File Sharing

![FileSwift Logo](public/logo.png)

FileSwift is a modern, serverless file sharing application that allows users to quickly share files with anyone through unique links and QR codes. No login or account creation required - just upload and share.

## 🚀 Features

- **Drag & Drop Upload**: Simple and intuitive file uploading
- **Instant Sharing**: Generate unique links and QR codes immediately
- **No Registration**: No account creation or login required
- **Temporary Storage**: Files are automatically deleted after download or after 1 hour
- **Privacy-Focused**: Files are stored temporarily and securely
- **Mobile-Friendly**: Responsive design works on all devices
- **Dark Mode**: Built-in dark mode support
- **Offline Support**: Works offline with PWA capabilities
- **Original Filenames**: Preserves original file names during download

## 📋 Prerequisites

- Node.js 18 or later
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/fileswift.git
cd fileswift
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**  
   Create a `.env.local` file in the root directory:
   ```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**  
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔄 How It Works

1. User uploads a file through the web interface
2. File is stored in temporary server storage
3. A unique link and QR code are generated
4. User shares the link or QR code with recipients
5. Recipients can download the file with the original filename
6. After download, the file is automatically deleted
7. Files not downloaded within 1 hour are automatically removed

## 🏗️ Project Structure

```
fileswift/
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js app directory
│   │   ├── api/      # API endpoints
│   │   ├── components/  # Reusable UI components
│   │   ├── download/ # File download routes
│   │   ├── upload/   # File upload routes
│   │   ├── help/     # Help documentation
│   │   └── changelog/ # Version changelog
│   └── utils/        # Utility functions
├── .env.local        # Environment variables
└── package.json      # Project dependencies
```

## 💻 Technologies

- **Frontend**: React, Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **QR Code**: react-qr-code
- **File Handling**: Node.js file system APIs
- **Unique IDs**: nanoid, uuid

## 🚀 Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Traditional Hosting
```bash
npm run build
npm run start
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please check out our [Contributing Guide](CONTRIBUTING.md) for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- All open-source contributors whose libraries made this possible

## 📧 Contact

For questions or support, please open an issue on GitHub.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
