# Sayed Safi - Portfolio Website

A fully animated, modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- ✨ **Fully Animated** - Advanced animations with Framer Motion
- 🎆 **Particle Effects** - Interactive particle background using TSParticles
- 🌓 **Dark/Light Mode** - Seamless theme switching
- 📱 **100% Responsive** - Perfect on all devices
- 🎨 **Modern UI/UX** - Beautiful and intuitive design
- ⚡ **Fast & Optimized** - Next.js 14 with performance optimizations
- 🎯 **Smooth Scroll** - Parallax and scroll-triggered animations
- 💫 **Interactive Elements** - Hover effects, 3D transforms, and more
- 🖼️ **Hero Image** - Customizable hero section with image support
- 📊 **Animated Stats** - Dynamic statistics and skill bars
- 🎭 **Loading Screen** - Elegant loading animation

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Advanced animations
- **TSParticles** - Particle effects library
- **next-themes** - Dark mode support
- **Lucide React** - Beautiful icons
- **React Intersection Observer** - Scroll animations

## Getting Started

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Projects.tsx     # Projects section
│   ├── Experience.tsx   # Experience & Education
│   ├── Services.tsx     # Services section
│   ├── Contact.tsx      # Contact form
│   ├── Footer.tsx       # Footer
│   └── ThemeProvider.tsx # Theme provider
└── ...
```

## Customization

### Adding Your Hero Image

1. Place your image in the `public` folder (e.g., `public/hero-image.jpg`)
2. Open `components/Hero.tsx`
3. Uncomment the Image import and component
4. Update the src path to your image

See `public/hero-image-placeholder.md` for detailed instructions.

### Customizing Content

- **Personal Information**: Update `components/Hero.tsx`, `components/About.tsx`
- **Projects**: Edit `components/Projects.tsx` - Add your project details
- **Experience**: Modify `components/Experience.tsx` - Update work history
- **Services**: Update `components/Services.tsx` - Change service offerings
- **Skills**: Edit skill percentages in `components/About.tsx`
- **Colors**: Adjust `tailwind.config.ts` - Change theme colors
- **Particles**: Customize particle effects in `components/ParticlesBackground.tsx`

### Performance Tips

- Optimize images before adding (use WebP format)
- Reduce particle count on slower devices
- Use Next.js Image component for all images
- Enable production build for best performance

## License

© 2025 Sayed Safi. All rights reserved.

# Nextjs-Animated-Portfolio
