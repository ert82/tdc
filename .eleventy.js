require('dotenv').config();
const contentful = require("contentful");
const client = contentful.createClient({
  space: process.env.CTFL_SPACE,
  accessToken: process.env.CTFL_ACCESSTOKEN
});

const {
    documentToHtmlString
} = require('@contentful/rich-text-html-renderer');

module.exports = function(eleventyConfig) {
    eleventyConfig.addShortcode("documentToHtmlString", function(content) {
        return documentToHtmlString(content);
    });
}
