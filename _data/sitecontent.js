require('dotenv').config();
const contentful = require("contentful");
const client = contentful.createClient({
  space: process.env.CTFL_SPACE,
  accessToken: process.env.CTFL_ACCESSTOKEN
});

const {
  documentToHtmlString
} = require('@contentful/rich-text-html-renderer');

let documentToHtmlStringOptions = {
  renderNode: {
    'embedded-asset-block': (node) =>
      `<img src="${node.data.target.fields.file.url}"/>`
  }
}

let sitecontent = async options => {

  var home = await client.getEntry("3emdXxS9c1GUoan1sJevuE");
  var homePage = {
    page: home,
    content: documentToHtmlString(home.fields.content, documentToHtmlStringOptions)
  }  
  if (home.fields.mainImage != null)
  {
    homePage.image = home.fields.mainImage.fields.file.url
  }

  var about = await client.getEntry("53JxR4ICuT3oF1rml3NdRX");
  var aboutPage = {
    page: about,
    content: documentToHtmlString(about.fields.content, documentToHtmlStringOptions)
  }  
  if (about.fields.mainImage != null)
  {
    aboutPage.image = about.fields.mainImage.fields.file.url
  }

  var membership = await client.getEntry("L5oaTawSPP96xVvWlpbNO");
  var membershipPage = {
    page: membership,
    content: documentToHtmlString(membership.fields.content, documentToHtmlStringOptions)
  }  
  if (membership.fields.mainImage != null)
  {
    membershipPage.image = membership.fields.mainImage.fields.file.url
  }

  var contact = await client.getEntry("6bSLVNJWZwXMw9ZnL62Lea");
  var contactPage = {
    page: contact,
    content: documentToHtmlString(contact.fields.content, documentToHtmlStringOptions)
  }  
  if (contact.fields.mainImage != null)
  {
    contactPage.image = contact.fields.mainImage.fields.file.url
  }

  var news = await client.getEntries({ content_type: 'news', order: 'sys.createdAt' });
  
  var persons = await client.getEntries({ content_type: 'person', order: 'sys.createdAt' });
  var people = new Array();
  for (let i = 0; i < persons.items.length; i++) {
    people.push({
      name: persons.items[i].fields.name,
      mainImage: persons.items[i].fields.mainImage.fields.file.url,
      bio: persons.items[i].fields.bio
    })
  }
  
  var result = {
    homePage,
    aboutPage,
    membershipPage,
    contactPage,

    news,
    people
  }
  console.log(people)

  return result
}

module.exports = sitecontent;

// module.exports = function () {
//   return client.getEntry("3emdXxS9c1GUoan1sJevuE").then(function (response) {
//     console.log(response.fields);
//     return response.fields;
//   })
//   .catch(console.error);
// };
