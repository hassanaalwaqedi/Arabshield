This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

 NovaArabia - Tech Company Website

A modern, professional website for NovaArabia built with Next.js 14, TypeScript, and Tailwind CSS with full multilingual support (English/Arabic).

## Features

- 🚀 Next.js 14 with App Router
- 💻 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- ✨ Framer Motion for animations
- 📱 Fully responsive design
- 🔒 SEO optimized pages
- 🎯 Modern UI/UX design
- 🌍 Full multilingual support (English/Arabic) with RTL support
- 🗄️ Prisma ORM with PostgreSQL/SQLite support
- 🔐 JWT-based authentication
- 📧 Contact and order forms
- 💼 Client dashboard

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- (Optional) PostgreSQL for production, or SQLite for development

### Quick Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env.local` file:**
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-minimum-32-characters"
JWT_SECRET="your-jwt-secret-minimum-32-characters"
```

3. **For SQLite (easiest):**
   - Update `prisma/schema.prisma` - Change `provider = "postgresql"` to `provider = "sqlite"`
   - Run: `npm run prisma:generate && npm run prisma:migrate && npm run prisma:seed`

4. **Run the development server:**
```bash
npm run dev
```

5. **Open in browser:**
   - English: [http://localhost:3000/en](http://localhost:3000/en)
   - Arabic: [http://localhost:3000/ar](http://localhost:3000/ar)

### Detailed Setup

For complete setup instructions, see:
- **`SETUP_CHECKLIST.md`** - Quick checklist of what you need to do
- **`MANUAL_SETUP_GUIDE.md`** - Detailed step-by-step guide

## Project Structure

```
NovaArabia/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── pricing/           # Pricing page
│   ├── order/             # Order form page
│   ├── contact/           # Contact page
│   ├── support/           # Support center
│   ├── faq/               # FAQ page
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── dashboard/         # Client dashboard
│   ├── privacy-policy/    # Privacy policy
│   └── terms/             # Terms of service
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── ServiceCard.tsx
│   └── PricingCard.tsx
├── lib/                   # Utility functions
└── styles/                # Global styles
```

## Available Pages

All pages support both English (`/en`) and Arabic (`/ar`) and Turkish (/tr) locales:

- `/` or `/en` or `/ar` - Home page
- `/about` - About NovaArabia
- `/services` - All services
- `/pricing` - Pricing packages
- `/order` - Order form
- `/contact` - Contact page
- `/support` - Support center
- `/faq` - FAQ page
- `/login` - Login page
- `/register` - Register page
- `/dashboard` - Client dashboard (protected)
- `/portfolio` - Portfolio showcase
- `/privacy-policy` - Privacy policy
- `/terms` - Terms of service

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed database with initial data
npm run prisma:studio   # Open Prisma Studio (database GUI)
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **next-intl** - Internationalization
- **Prisma** - Next-generation ORM
- **Zod** - Schema validation
- **React Hook Form** - Form management
- **SWR** - Data fetching
- **JWT** - Authentication

## License

© 2024 NovaArabia. All rights reserved.




You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
