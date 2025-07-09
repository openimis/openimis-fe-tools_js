import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.jsx'),
      name: 'OpenIMISFeTools',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    sourcemap: true,
    outDir: 'dist',
    rollupOptions: {
      external: [
        /^@babel.*/,
        /^@date-io\/.*/,
        /^@material-ui\/.*/,
        /^@openimis.*/,
        'classnames',
        'clsx',
        'history',
        /^lodash.*/,
        'moment',
        'prop-types',
        /^react.*/,
        /^redux.*/
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
