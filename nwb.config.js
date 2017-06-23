module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    define: {
      'process.env':{
        'API_HOST': JSON.stringify('http://localhost:3000/nexdoc-external-ui')
      }
    }
  }

}
