export default {
  history: 'hash',
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      antd: true,
    }],
  ],
  proxy: {
    '/goods': {
      target: 'http://localhost:8080',
      changeOrigin: true
    },
    '/user': {
      target: 'http://localhost:8080',
      changeOrigin: true
    },
    '/service': {
      target: 'http://localhost:8080',
      changeOrigin: true
    },
    '/order': {
      target: 'http://localhost:8080',
      changeOrigin: true
    },
    '/report': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
};