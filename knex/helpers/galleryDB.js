/** @format */

const db = require("../knex.js");

module.exports = {
  getAllGallery,
  galleryPost,
  galleryDelete,
};

function getAllGallery() {
  const gallery = db("gallery").select();

  return Promise.all([gallery]).then(result => {
    console.log("gallery all", result[0]);
    return result[0];
  });
}

function galleryPost(image) {
  return db("gallery").insert(image);
}

function galleryDelete(imageId) {
  const gallery = db("gallery").where({ id: imageId }).del();

  return Promise.all([gallery]).then(result => {
    return result[0];
  });
}
