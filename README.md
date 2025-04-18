# 🚀 FileSwift v1.0.0 - Instant File Sharing Made Beautiful ✨


![FileSwift Logo](https://github.com/imsurajj/FileSwift/raw/main/public/logo.png)

FileSwift is a modern, serverless file sharing application that allows users to quickly share files with anyone through unique links and QR codes. No login or account creation required - just upload and share.

[![Sponsor this project](https://img.shields.io/github/sponsors/imsurajj?style=flat-square&logo=github&label=Sponsor%20FileSwift)](https://github.com/sponsors/imsurajj)

## 🚀 Features

### ✅ Currently Available (Free)
- **Instant File Sharing** - Share files with unique links
- **QR Code Generation** - For easy mobile sharing
- **Drag & Drop Upload** - Simple file uploading interface
- **Automatic File Deletion** - Files removed after download or expiry
- **Mobile-Responsive Design** - Works on all devices
- **Original Filenames** - Preserved during download
- **No Registration Required** - Use instantly without sign-up

### 🔄 Coming Soon (Free)
- **Multiple File Upload** - Share up to 5 files at once
- **Basic File Preview** - Preview images before download
- **Custom Expiry Options** - Choose 1hr, 6hr, or 24hr expiry
- **Simple Stats** - See when files are downloaded
- **Copy to Clipboard** - One-click link copying
- **Light/Dark Mode** - Basic theme options
- **Social Media Sharing** - Direct links for popular platforms
- **Basic Email Notifications** - Get notified when files are downloaded
- **Public API** - Limited access for integrations
- **File Compression** - Automatic compression for faster transfers
- **Link Shortening** - Compact URLs for easier sharing
- **Browser File Converting** - Basic file format conversion
- **Text Snippets** - Share text/code snippets with syntax highlighting
- **QR Code Customization** - Basic color and style options
- **Upload from URL** - Import files directly from web links
- **Basic Folder Sharing** - Share multiple files as a simple folder
- **Markdown Previews** - Preview and share markdown documents
- **Link Expiry Countdown** - Visual timer for file expiration
- **File Checksum Verification** - Ensure file integrity

### 🛠️ Future Tools & Utilities (Free)
- **File Comparer** - Compare differences between text files
- **Image Resizer** - Basic image resizing before sharing
- **PDF Tools** - Split, merge, and compress PDF files
- **Code Beautifier** - Format and beautify code snippets
- **Metadata Cleaner** - Remove sensitive metadata from files
- **Color Picker** - Extract colors from uploaded images
- **Audio Trimmer** - Basic audio file editing
- **Screenshot Tool** - Capture and share screenshots instantly
- **URL Bookmarking** - Save and organize shared links
- **Markdown Editor** - Create and share markdown content
- **CSV Viewer** - Simple table view for CSV files
- **JSON Formatter** - Clean and format JSON data

### 💎 Premium Features (Sponsor Access)
- **Password Protection** - Secure your files with passwords
- **Extended File Storage** - Up to 30 days (vs 24hr for free)
- **Increased File Size** - Up to 2GB per file (vs 100MB for free)
- **Unlimited File Uploads** - No daily limits
- **Advanced Analytics** - Detailed sharing statistics
- **Custom Branding** - Remove FileSwift branding
- **Team Collaboration** - Share with controlled access
- **End-to-End Encryption** - Enhanced security
- **Priority Support** - Fast responses to issues
- **Advanced File Analytics** - Track views, downloads, locations
- **Scheduled Sharing** - Set future times for file availability
- **Custom Upload Page** - Personalized receiving pages
- **AI Content Summary** - Automatic summaries of shared documents
- **Watermarking** - Add text/image watermarks to documents
- **Virus Scanning** - Security checks on uploaded files
- **Advanced File Conversion** - Convert between many file formats
- **Team Workspaces** - Collaborative spaces for groups
- **Version History** - Track changes to shared files
- **Document Signing** - Basic e-signature capabilities
- **Embedded File Viewers** - Share viewable files in websites
- **Advanced Permissions** - Granular access controls

### Free Plan Limits
- **Max File Size**: 100MB per file
- **Storage Duration**: Up to 24 hours
- **Files Per Day**: 10 uploads
- **Concurrent Transfers**: 2 active sessions
- **Monthly Bandwidth**: 2GB total transfer

## 🔧 Free Tools & Integrations

FileSwift is built using completely free tools and services, making it accessible for developers to fork and deploy:

- **Frontend & Hosting**: [Vercel](https://vercel.com/) (Hobby Plan)
- **Storage**: [Cloudflare R2](https://www.cloudflare.com/products/r2/) (Free tier - 10GB)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Open source)
- **Database**: [Supabase](https://supabase.com/) (Free tier)
- **Analytics**: [Umami](https://umami.is/) (Self-hosted analytics)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions) (Free for public repos)
- **Monitoring**: [Sentry](https://sentry.io/) (Free tier)
- **Email Notifications**: [Resend](https://resend.com/) (Free tier - 100 emails/day)
- **QR Code Generation**: [react-qr-code](https://www.npmjs.com/package/react-qr-code) (Open source)

## 📋 Prerequisites

- Node.js 18 or later
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/imsurajj/FileSwift.git
cd FileSwift
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
FileSwift/
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

## 💖 Support This Project

If you find FileSwift useful, please consider [becoming a sponsor](https://github.com/sponsors/imsurajj). Your support helps maintain and improve this project!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
