module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current', // Important for Jest
          },
        },
      ],
    ],
  };
  