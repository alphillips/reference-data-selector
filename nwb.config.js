module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    define: {
      'process.env':{
        'API_HOST': JSON.stringify('https://next-doc.now.sh')
      }
    }
  }

}
