/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO and Performance Optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production
  
  // HTTP Headers for improved security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Strict Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // Enable HSTS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  },

  // Webpack configuration for additional optimizations
  webpack: (config: { optimization: { minimize: boolean; }; resolve: { fallback: { fs: boolean; net: boolean; tls: boolean; }; }; }, { }: any) => {
    // Additional webpack optimizations
    config.optimization.minimize = true;
    
    // Ignore unnecessary files for smaller bundle size
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    return config;
  }
};

module.exports = nextConfig;
