/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Agregar cualquier configuración personalizada de Webpack aquí
      return config;
    },
  };
  
  export default nextConfig;
  