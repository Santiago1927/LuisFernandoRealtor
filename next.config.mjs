/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Agrega aquí dominios donde se alojan las imágenes remotas
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
