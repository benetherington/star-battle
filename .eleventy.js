module.exports = (eleventyConfig) => {
    eleventyConfig.addPassthroughCopy('static');
    eleventyConfig.addPassthroughCopy('levels');
    eleventyConfig.setServerOptions({showAllHosts: true});
    return {dir: {input: 'src'}};
};
