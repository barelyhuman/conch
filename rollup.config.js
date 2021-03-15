import cleanup from 'rollup-plugin-cleanup'

export default [
  {
    input: './src/index.js',
    plugins: [
      cleanup()
    ],
    output: {
      file: './dist/index.umd.js',
      format: 'umd',
      name: 'Themer',
      globals: {
        'feather-icons': 'feather'
      }
    },
    external: ['feather-icons']
  },
  {
    input: './src/index.js',
    plugins: [
      cleanup()
    ],
    output: {
      file: './dist/index.esm.js',
      format: 'esm',
      name: 'Themer'
    },
    external: ['feather-icons']
  },
  {
    input: './src/index.js',
    plugins: [
      cleanup()
    ],
    output: {
      file: './dist/index.cjs.js',
      format: 'cjs',
      name: 'Themer',
      exports: 'default'
    },
    external: ['feather-icons']
  }
]
