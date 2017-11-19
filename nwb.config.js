module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    define: {
      'process.env':{
        'API_HOST': JSON.stringify('http://act001appd0001.devagdaff.gov.au:9001/nexdoc')
      }
    }
  }

}
