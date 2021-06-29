/** @format */

const db = require("../knex.js");

module.exports = {
  getAllCages,
  getCageById,
  updateCageById,
  deleteCageById,
  updateAltScreenById,
  addAltScreenToCage,
  deleteAltScreenFromCage,
};

function getAllCages() {
  const altScreens = db("altScreens").select(
    "id",
    "altScreenName",
    "price",
    "cageId"
  );
  const cages = db("cages")
    .select("id", "cageType", "cagePart", "price", "imageURL")
    .orderBy("created_at", "desc");

  return Promise.all([cages, altScreens]).then(result => {
    let combinedCageData = [];

    for (let cageItem of result[0]) {
      let combinedAltScreens = [];
      for (let altScreenItem of result[1]) {
        if (altScreenItem.cageId === cageItem.id) {
          combinedAltScreens.push(altScreenItem);
        }
      }
      combinedCageData.push({
        ...cageItem,
        altScreenOptions: combinedAltScreens,
      });
    }
    return combinedCageData;
  });
}

function getCageById(Id) {
  const altScreens = db("altScreens").select(
    "id",
    "altScreenName",
    "price",
    "cageId"
  );
  const cage = db("cages")
    .where({ id: Id })
    .select("id", "cageType", "cagePart", "price", "imageURL");

  return Promise.all([cage, altScreens]).then(result => {
    let otherScreens = [];

    for (let screen of result[1]) {
      if (screen.cageId === result[0][0].id) {
        otherScreens.push(screen);
      }
    }

    result[0][0].altScreenOptions = otherScreens;
    return result[0][0];
  });
}

function updateCageById(Id, newData) {
  let cage = db("cages").where({ id: Id }).update(newData);

  return Promise.all([cage]).then(result => {
    // console.log(newData);
    return result;
  });
}

function deleteCageById(Id) {
  const cageToDelete = db("cages").where({ id: Id }).del();

  return Promise.all([cageToDelete]).then(result => {
    return result[0];
  });
}

function updateAltScreenById(Id, newData) {
  let altScreen = db("altScreens")
    .where({ id: Id })
    .update({ price: newData.price });

  return Promise.all([altScreen]).then(result => {
    return result;
  });
}

function addAltScreenToCage(cageId, screenData) {
  console.log(cageId, screenData);
  const newAltScreen = db("altScreens").insert({
    ...screenData,
    cageId: cageId,
  });

  return Promise.all([newAltScreen]).then(result => {
    console.log(result);
    return result;
  });
}

function deleteAltScreenFromCage(screenId) {
  const deletedScreen = db("altScreens").where({ id: screenId }).del();

  return Promise.all([deletedScreen]).then(result => {
    return result[0];
  });
}
