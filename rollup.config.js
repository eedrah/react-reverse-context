import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      external(),
      babel({
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs({
        namedExports: {
          'prop-types': ['func', 'any', 'object'],
        },
      }),
    ],
  },
]
