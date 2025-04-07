// Import required dependencies
const babel = require('@babel/core');
const flowRemoveTypes = require('flow-remove-types');

// Test cases for different import scenarios
const testCases = [
  {
    name: `"removing type only imports"`,
    code: `import { type x } from 'some-module';`,
  },
  {
    name: `"mixed type and non-type imports"`,
    code: `import { type x, y } from 'some-module';`,
  },
  {
    name: `"preserving empty import"`,
    code: `import {} from 'some-module';`,
  },
  {
    name: `"mixed with DefaultImport"`,
    code: `import DefaultImport, { type x } from 'some-module';`,
  },
  {
    name: `"mixed with DefaultImport - type"`,
    code: `import type DefaultImport, { type x } from 'some-module';`,
  },
  {
    name: `"mixed with DefaultImport - typeof"`,
    code: `import typeof DefaultImport, { type x } from 'some-module';`,
  },
];

// Test each case
testCases.forEach(({ name, code }, index) => {
  console.log(`\nCase ${index + 1} - ${name}:`);
  console.log(`Input                      [${code.length}]: `, code);

  const babelResult = babel.transformSync(code, {
    plugins: ['babel-plugin-syntax-hermes-parser'],
  }).code;
  console.log(
    `Output - Babel             [${babelResult.length}]: `,
    babelResult
  );

  const babelStripTypesResult = babel.transformSync(code, {
    plugins: [
      'babel-plugin-syntax-hermes-parser',
      '@babel/plugin-transform-flow-strip-types',
    ],
  }).code;
  console.log(
    `Output - Babel Strip Types [${babelStripTypesResult.length}]: `,
    babelStripTypesResult
  );

  const flowResult = flowRemoveTypes(code, { all: true }).toString();
  console.log(
    `Output - Flow Strip Types  [${flowResult.length}]: `,
    flowResult
  );
});
