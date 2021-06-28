/** @format */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cages")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("cages").insert([
        {
          cageType: "Dome",
          cagePart: "Door",
          price: 40,
        },
        {
          cageType: "Dome",
          cagePart: "Bottom",
          price: 45,
        },
        {
          cageType: "Dome",
          cagePart: "Side",
          price: 50,
        },
        {
          cageType: "Dome",
          cagePart: "Riser",
          price: 60,
        },
        {
          cageType: "Dome",
          cagePart: "Roof",
          price: 70,
        },
        {
          cageType: "Gable",
          cagePart: "Door",
          price: 40,
        },
        {
          cageType: "Gable",
          cagePart: "Bottom",
          price: 45,
        },
        {
          cageType: "Gable",
          cagePart: "Side",
          price: 50,
        },
        {
          cageType: "Gable",
          cagePart: "Low Riser",
          price: 60,
        },
        {
          cageType: "Gable",
          cagePart: "High Riser",
          price: 70,
        },
        {
          cageType: "Gable",
          cagePart: "Low Roof",
          price: 70,
        },
        {
          cageType: "Gable",
          cagePart: "High Roof",
          price: 80,
        },
      ]);
    });
};
