module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // msw/@mswjs/interceptors используют static class blocks — RN-preset их не транспилит
    '@babel/plugin-transform-class-static-block',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: { '@': './src' },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    ],
  ],
};
