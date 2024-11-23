module.exports = {
  injectChanges: false,
  server: {
    baseDir: "./", // Base directory is now the root, since index.html is at the root level
    routes: {
      "/src": "./src" // Map the `/src` path to the `src` folder to serve assets from there
    }
  },
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: function (snippet, match) {
        return snippet + match;
      }
    }
  }
};


  