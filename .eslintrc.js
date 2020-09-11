module.exports = {
  parser: `@typescript-eslint/parser`, // Specifies the ESLint parser
  extends: [
    `plugin:@typescript-eslint/recommended` // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018, 
    sourceType: `module` 
  },
  ignorePatterns: ['*.js', 'src/js/**/*.js ', 'build/js/**/*.js'],
  rules: {
    'no-cond-assign': `error`,
    'no-irregular-whitespace': `error`,
    'no-unexpected-multiline': `error`,
    'valid-jsdoc': [`error`, {
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturn: false,
      prefer: { returns: `return` }
    }],
    'no-console': `error`,
    'no-constant-condition': `error`,
    'no-control-regex': `error`,
    'no-debugger': `error`,
    'no-dupe-keys': `error`,
    'no-dupe-args': `error`,
    'no-duplicate-case': `error`,
    'no-empty': `error`,
    'no-empty-character-class': `error`,
    'no-ex-assign': `error`,
    'no-extra-boolean-cast': `error`,
    'no-extra-semi': `error`,
    'no-func-assign': `error`,
    'no-inner-declarations': [`error`, `functions`],
    'no-invalid-regexp': `error`,
    'no-unsafe-negation': `error`,
    'no-obj-calls': `error`,
    'no-regex-spaces': `error`,
    'no-sparse-arrays': `error`,
    'no-unreachable': `error`,
    'use-isnan': `error`,
    'valid-typeof': `error`,
    'guard-for-in': `error`,
    'max-nested-callbacks': [`error`, { max: 3 }],
    'no-caller': `error`,
    'no-extra-bind': `error`,
    'no-multi-spaces': `error`, // 1
    'no-multi-str': `error`,
    'no-new-wrappers': `error`,
    'no-throw-literal': `error`,
    'no-with': `error`,
    // 'curly': [`error`, `all`], // 2
    'curly': 'off',
    'eqeqeq': `error`,
    'no-alert': `error`,
    'no-eval': `error`,
    'no-fallthrough': `error`,
    'no-floating-decimal': `error`,
    'no-implied-eval': `error`,
    'no-iterator': `error`,
    'no-labels': `error`,
    'no-lone-blocks': `error`,
    'no-global-assign': `error`,
    'no-new': `error`,
    'no-new-func': `error`,
    'no-octal': `error`,
    'no-octal-escape': `error`,
    'no-proto': `error`,
    'no-redeclare': `error`,
    'no-script-url': `error`,
    'no-sequences': `error`,
    'radix': `error`,
    'strict': [`error`, `global`],
    'no-shadow': `error`,
    'no-shadow-restricted-names': `error`,
    'no-undef-init': `error`,
    '@typescript-eslint/explicit-member-accessibility': `off`,
    '@typescript-eslint/explicit-function-return-type': `off`,
    '@typescript-eslint/indent': `off`,
    '@typescript-eslint/no-explicit-any': `off`,
    '@typescript-eslint/no-non-null-assertion': `off`,
    '@typescript-eslint/camelcase': `off`,
    '@typescript-eslint/array-type': `off`,
    '@typescript-eslint/no-object-literal-type-assertion': `off`,
    '@typescript-eslint/no-empty-function': `off`,

    // Stylistic Issues
    // ----------------------------------------------
    'indent': [`error`, 2, {
      SwitchCase: 1,
      // continuation indent
      VariableDeclarator: 1, // indent is multiplier * indent = 1 * 2
      MemberExpression: `off`,
      FunctionDeclaration: { parameters: 2 },
      FunctionExpression: { parameters: 2 },
      CallExpression: { arguments: 2 }
    }],
    'block-spacing': [`error`, `always`],
    'array-bracket-spacing': [`error`, `never`],
    'brace-style': `error`, // 3
    'camelcase': `error`,
    'comma-dangle': [`error`, `only-multiline`], // 4 fix comma
    'comma-spacing': `error`,
    'comma-style': `error`, // 5
    'computed-property-spacing': `error`,
    'eol-last': `error`, // 6
    'func-call-spacing': `error`,
    'key-spacing': `error`,
    'keyword-spacing': `error`,
    'linebreak-style': `off`,
    'new-cap': `error`,
    'no-array-constructor': `error`,
    'no-mixed-spaces-and-tabs': `error`,
    'no-multiple-empty-lines': [`error`, { max: 2 }], // 7
    'no-new-object': `error`,
    'no-trailing-spaces': `error`, // 8
    'object-curly-spacing': [`error`, `always`],
    'one-var': [`error`, { // 9 fix let aa, bb
      var: `never`,
      let: `never`,
      const: `never`
    }],
    'padded-blocks': [`off`, `never`],
    'quote-props': [`error`, `consistent`], // 10
    'semi-spacing': `error`,
    'semi': `error`, // 11 last dot&semi
    'space-in-parens': [`error`, `never`],
    'space-before-blocks': `error`,
    'space-before-function-paren': [`error`, { 'anonymous': `always`, 'named': `never`, 'asyncArrow': `always` }],
    'spaced-comment': [`error`, `always`], // 12
    'unicode-bom': `warn`,
    'new-parens': `error`,
    'space-infix-ops': `error`,
    'space-unary-ops': [`error`, { words: true, nonwords: false }],
    'yoda': [`error`, `never`],

    // ECMAScript 6
    'arrow-parens': [`error`, `always`],
    'constructor-super': `error`,
    'generator-star-spacing': [`error`, `after`],
    'no-new-symbol': `error`,
    'no-this-before-super': `error`,
    'no-var': `error`,
    'prefer-rest-params': `error`,
    'prefer-spread': `error`,
    'rest-spread-spacing': `error`,
    'yield-star-spacing': [`error`, `after`],
    'object-shorthand': [`error`, `always`, { 'avoidQuotes': true }],
    'quotes': [`error`, `single`, { allowTemplateLiterals: true }], // 10 backtipes

    // custom
    'no-return-assign': 'off',
    'no-unused-expressions': 'off',
    'no-invalid-this': 'off',
    'consistent-return': 'off',
    'no-nested-ternary': 'off',
    'no-extend-native': 'off'
  }
};
