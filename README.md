# FileSwift - Instant File Sharing

FileSwift is a modern web application that allows users to easily share files with anyone through unique links and QR codes, without requiring any login or account creation. Files are stored temporarily and automatically deleted after download or after 1 hour.

## Features

- Drag and drop file upload
- Instant file sharing via unique links
- QR code generation for easy mobile access
- No sign-up required
- Beautiful, responsive UI with animations
- Temporary file storage with automatic cleanup
- Files are automatically deleted after download or after 1 hour
- Original file names preserved during download

## Prerequisites

- Node.js 18 or later
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd fileswift
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variable:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How it Works

1. When a user uploads a file, it is stored in a temporary directory on the server
2. A unique link and QR code are generated for the file
3. The file can be downloaded using the unique link with its original filename
4. After download, the file is automatically deleted
5. Any files not downloaded within 1 hour are automatically cleaned up
6. Files are stored in the system's temporary directory, which is automatically cleaned by the OS

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- react-qr-code

## License

MIT License

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
