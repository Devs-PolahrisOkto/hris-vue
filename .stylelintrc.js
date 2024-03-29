module.exports = {
  root: true,
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'order/order': [
      [
        'custom-properties',
        'declarations',
      ],
      {
        disableFix: true,
      },
    ],
    'no-descending-specificity': null,
    'order/properties-alphabetical-order': true,
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'declaration-no-important': true,
    'unit-allowed-list': [ 'em', 'vh', 'rem', '%', 's', 'deg', 'px' ],
    'color-no-hex': true,
    'number-leading-zero': 'always',
    'color-named': 'never',
    'no-invalid-double-slash-comments': true,
    'comment-no-empty': true,
    'comment-empty-line-before': 'always',
    'comment-whitespace-inside': 'always',
  },
};
