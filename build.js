'use strict';
const rollupGlobal = require('./rollup.global')

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('camelcase');
const ngc = require('@angular/compiler-cli/src/main').main;
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const inlineResources = require('./inline-resources');

const libName = require('./package.json').name;
const rootFolder = path.join(__dirname);
const compilationFolder = path.join(rootFolder, 'out-tsc');
const srcFolder = path.join(rootFolder, './widget');
const distFolder = path.join(rootFolder, 'dist');
const tempLibFolder = path.join(compilationFolder, 'lib');
const es5OutputFolder = path.join(compilationFolder, 'lib-es5');
const es2015OutputFolder = path.join(compilationFolder, 'lib-es2015');

return complile()

function complile() {
  let libs = [
    {
      libName: libName,
      libFolder: tempLibFolder,
      packageRootFolder: rootFolder,
      esEntryFolder: ""
    },
    {
      libName: "core",
      libFolder: path.join(tempLibFolder , "core"),
      packageRootFolder: path.join(tempLibFolder , "core"),
      esEntryFolder: "core"
    },    
    {
      libName: "eu-ag-grid",
      libFolder: tempLibFolder + "\\eu-ag-grid",
      packageRootFolder: tempLibFolder + "\\eu-ag-grid",
      esEntryFolder: "eu-ag-grid"
    }
  ]
  return Promise.resolve()
    // Copy library to temporary folder and inline html/css.
    .then(() => _relativeCopy(`**/*`, srcFolder, tempLibFolder)
      .then(() => inlineResources(tempLibFolder))
      .then(() => console.log('Inlining succeeded.'))
    ).then(
    () => Promise.all(libs.map(value => complileLib(value.libFolder, value.libName, value.packageRootFolder, value.esEntryFolder)))
    )
  // let compile = complileLib(tempLibFolder, libName, rootFolder)
  // Promise.all([c])
}

/**
 * 
 */
function complileLib(libFolder, packageLibName, packageRootFolder, esEntryFolder) {
  console.log("=======")
  console.log("libFolder", libFolder)
  console.log("packageLibName", packageLibName)
  console.log("packageRootFolder", packageRootFolder)
  console.log("=======")
  return Promise.resolve()
    // Compile to ES2015.
    .then(() => ngc(['--project', `${libFolder}/tsconfig.lib.json`]))
    .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
    .then(() => console.log('ES2015 compilation succeeded.'))
    // Compile to ES5.
    .then(() => ngc(['--project', `${libFolder}/tsconfig.es5.json`]))
    .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
    .then(() => console.log('ES5 compilation succeeded.'))
    // Copy typings and metadata to `dist/` folder.
    .then(() => Promise.resolve()
      .then(() => _relativeCopy('**/*.d.ts', es2015OutputFolder, distFolder))
      .then(() => _relativeCopy('**/*.metadata.json', es2015OutputFolder, distFolder))
      .then(() => console.log('Typings and metadata copy succeeded.'))
    )
    // Bundle lib.
    .then(() => {
      // Base configuration.
      // const es5Entry = esEntryFolder != undefined ?
      //   path.join(es5OutputFolder, esEntryFolder, `${packageLibName}.js`) :
      //   path.join(es5OutputFolder, `${packageLibName}.js`);
      // const es2015Entry = esEntryFolder != undefined ?
      //   path.join(es2015OutputFolder, esEntryFolder, `${packageLibName}.js`) :
      //   path.join(es2015OutputFolder, `${packageLibName}.js`);
      const es5Entry = path.join(es5OutputFolder, esEntryFolder, `${packageLibName}.js`)
      const es2015Entry = path.join(es2015OutputFolder, esEntryFolder, `${packageLibName}.js`)
      const rollupBaseConfig = {
        moduleName: camelCase(packageLibName),
        sourceMap: true,
        // ATTENTION:
        // Add any dependency or peer dependency your library to `globals` and `external`.
        // This is required for UMD bundle users.
        // globals: {
        //   // The key here is library name, and the value is the the name of the global variable name
        //   // the window object.
        //   // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.
        //   '@angular/core': 'ng.core',
        //   'rxjs/operator/map':            'Rx.Observable.prototype',
        // },
        // globals:  rollupGlobal,
        globals: rollupGlobal,
        external: Object.keys(rollupGlobal),

        plugins: [
          commonjs({
            include: ['node_modules/rxjs/**']
          }),
          sourcemaps(),
          nodeResolve({ jsnext: true, module: true })
        ]
      };

      // UMD bundle.
      const umdConfig = Object.assign({}, rollupBaseConfig, {
        entry: es5Entry,
        dest: path.join(distFolder, `bundles`, `${packageLibName}.umd.js`),
        format: 'umd',
      });

      // Minified UMD bundle.
      const minifiedUmdConfig = Object.assign({}, rollupBaseConfig, {
        entry: es5Entry,
        dest: path.join(distFolder, `bundles`, `${packageLibName}.umd.min.js`),
        format: 'umd',
        plugins: rollupBaseConfig.plugins.concat([uglify({})])
      });

      // ESM+ES5 flat module bundle.
      const fesm5config = Object.assign({}, rollupBaseConfig, {
        entry: es5Entry,
        dest: path.join(distFolder, esEntryFolder, `${packageLibName}.es5.js`),
        format: 'es'
      });

      // ESM+ES2015 flat module bundle.
      const fesm2015config = Object.assign({}, rollupBaseConfig, {
        entry: es2015Entry,
        dest: path.join(distFolder, esEntryFolder, `${packageLibName}.js`),
        format: 'es'
      });

      const allBundles = [
        umdConfig,
        minifiedUmdConfig,
        fesm5config,
        fesm2015config
      ].map(cfg => rollup.rollup(cfg).then(bundle => bundle.write(cfg)));

      return Promise.all(allBundles)
        .then(() => console.log('All bundles generated successfully.'))
    })
    // Copy package files
    .then(() => Promise.resolve()
      .then(() => _relativeCopy('LICENSE', packageRootFolder, path.join(distFolder, esEntryFolder)))
      .then(() => _relativeCopy('package.json', packageRootFolder, path.join(distFolder, esEntryFolder)))
      .then(() => _relativeCopy('README.md', packageRootFolder, path.join(distFolder, esEntryFolder)))
      .then(() => console.log('Package files copy succeeded.'))
    )
    .catch(e => {
      console.error('\Build failed. See below for errors.\n');
      console.error(e);
      process.exit(1);
    });
}



// Copy files maintaining relative paths.
function _relativeCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
      if (err) reject(err);
      files.forEach(file => {
        const origin = path.join(from, file);
        const dest = path.join(to, file);
        const data = fs.readFileSync(origin, 'utf-8');
        _recursiveMkDir(path.dirname(dest));
        fs.writeFileSync(dest, data);
        resolve();
      })
      if (!files || files.length == 0) {
        resolve();
      }
    })
  });
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}
