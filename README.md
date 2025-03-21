# esbuild null mapping reproduction

This project is a minimal reproduction of an issue that causes esbuild to emit source maps with null mappings when bundling and using the external file loader. The issue appears to have been introduced in esbuild v0.24.1 and is still present as of v0.25.1.

### Install

```
npm install
```

### Build

```
npm run build
```

### List null mappings

```
npm run list-null-mappings
```

Example output:
```
Mapping {
  generatedLine: 4,
  generatedColumn: 0,
  lastGeneratedColumn: null,
  source: null,
  originalLine: null,
  originalColumn: null,
  name: null
}
```

### See the problem Safari

Open `index.html` in Safari 18.3. Open dev tools, and try to navigate to `dummy.js` in the "Sources" panel. It is not available because the null mappings cause Safari to fail to show any source files from the source map.

Chrome (135.0.7049.28) and Firefox (137.0b9) succeed in showing source files even in the presence of the null mappings.

### Discussion

The esbuild [file loader](https://esbuild.github.io/content-types/#external-file) generates comments listing the original source file in bundled output. Example:

```js
// img/triangle.png
var triangle_default = "./triangle-5XHGZ7W6.png";
```

In esbuild v0.24.1 through v0.25.1, a source map mapping with `source: null` is generated for the first comment of this kind in each file that uses the file loader plugin.

This problem does not appear to occur if the file that uses the external file plugin is the first file in the bundled output (the purpose of `dummy.js` is to have something come before `index.js` in the bundled output).

`scripts/list-null-mappings.js` uses the [source-map](https://github.com/mozilla/source-map) library to parse the generated source map and print null mappings. You can run it with `npm run list-null-mappings`.

`scripts/list-mappings.js` lists all mappings (not just null ones). You can run this script with `npm run list-mappings`.

A very similar issue was fixed in v0.25.1 ([changelog](https://github.com/evanw/esbuild/pull/4082), [PR](https://github.com/evanw/esbuild/pull/4082)), but the issue reported here was not fixed by that change.
