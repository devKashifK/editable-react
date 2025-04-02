# Blog Editor

A modern, feature-rich blog editor built with Next.js and TipTap. This editor provides a comprehensive set of tools for creating and managing blog content.

## Features

- **Rich Text Editing**
  - Text formatting (bold, italic, underline, strikethrough)
  - Headings (H1-H3)
  - Lists (bullet and numbered)
  - Blockquotes
  - Text alignment
  - Links
  - YouTube video embedding

- **Image Management**
  - Drag-and-drop image upload
  - Image preview
  - Multiple image upload support

- **SEO Tools**
  - Meta title and description management
  - URL slug generation
  - Character count indicators

- **Category Management**
  - Predefined category selection
  - Custom category creation
  - Multiple category support

- **Author Management**
  - Author profile selection
  - New author creation
  - Author image upload

- **Publishing Controls**
  - Save as draft
  - Publish functionality
  - Mobile-responsive interface

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000/admin/news/new](http://localhost:3000/admin/news/new) to access the blog editor.

## Usage

### Creating a New Blog Post

1. Navigate to the "Add New Blog" page
2. Enter your blog title
3. Use the rich text editor toolbar to format your content
4. Add images by dragging and dropping them into the editor
5. Fill in SEO information (meta title, description, URL slug)
6. Select or create categories
7. Choose an author or create a new author profile
8. Save as draft or publish directly

### Managing Content

- Use the toolbar buttons to format text and add media
- Drag and drop images directly into the editor
- Paste URLs to embed YouTube videos
- Preview your content as you write
- Monitor SEO metrics in real-time

### Publishing

- Save your work as a draft at any time
- Preview the post before publishing
- Publish when ready to make the post live

## Development

The project uses:
- Next.js for the framework
- TipTap for the rich text editor
- Tailwind CSS for styling
- TypeScript for type safety

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Admin

First changing the jsx to json with a script that is within this folder
