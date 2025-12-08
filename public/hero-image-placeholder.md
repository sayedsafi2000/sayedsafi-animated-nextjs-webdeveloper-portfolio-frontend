# Hero Image Instructions

To add your hero image:

1. Place your image in the `public` folder (e.g., `public/hero-image.jpg`)
2. Update `components/Hero.tsx`:
   - Uncomment the Image import
   - Uncomment the Image component
   - Update the src path to `/hero-image.jpg`
   - Remove or comment out the emoji placeholder

Example:
```tsx
<Image
  src="/hero-image.jpg"
  alt="Sayed Safi"
  width={500}
  height={500}
  className="w-full h-full object-cover rounded-2xl"
  priority
/>
```

Recommended image specs:
- Size: 500x500px or larger (square format works best)
- Format: JPG, PNG, or WebP
- Optimize the image for web (use tools like TinyPNG or ImageOptim)

