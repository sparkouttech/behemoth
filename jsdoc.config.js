module.exports = {
    source: {
      include: [__dirname, "README.md"],
      exclude: ["node_modules"]
    },
    opts: {
      destination: "./docs",
      recurse: true
    },
    plugins: ["plugins/markdown"],
    templates: {
      cleverLinks: false,
      monospaceLinks: false
    }
};
  