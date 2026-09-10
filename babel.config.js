export default {
  presets: ['@babel/preset-env'],

  plugins: [
    [
      'polyfill-corejs3',
      {
        method: 'entry-global',
      },
    ],
  ],
};
