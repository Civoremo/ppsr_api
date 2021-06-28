/** @format */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("altScreens")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("altScreens").insert([
        // Dome Door
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 1,
        },
        {
          altScreenName: "Florida Glass",
          price: 60,
          cageId: 1,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 1,
        },
        {
          altScreenName: "Pet Screen",
          price: 60,
          cageId: 1,
        },
        // Dome Bottom
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 2,
        },
        {
          altScreenName: "Florida Glass",
          price: 60,
          cageId: 2,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 2,
        },
        {
          altScreenName: "Pet Screen",
          price: 60,
          cageId: 2,
        },
        // Dome Side
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 3,
        },
        {
          altScreenName: "Florida Glass",
          price: 60,
          cageId: 3,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 3,
        },
        // Dome Riser
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 4,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 4,
        },
        {
          altScreenName: "Solar Screen",
          price: 60,
          cageId: 4,
        },
        // Dome Roof
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 5,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 5,
        },
        {
          altScreenName: "Solar Screen",
          price: 60,
          cageId: 4,
        },

        ////////////////////
        // Gable Door
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 6,
        },
        {
          altScreenName: "Florida Glass",
          price: 60,
          cageId: 6,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 6,
        },
        {
          altScreenName: "Pet Screen",
          price: 60,
          cageId: 6,
        },
        // Gable Bottom
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 7,
        },
        {
          altScreenName: "Florida Glass",
          price: 60,
          cageId: 7,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 7,
        },
        {
          altScreenName: "Pet Screen",
          price: 60,
          cageId: 7,
        },
        // Gable Side
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 8,
        },
        {
          altScreenName: "Florida Glass",
          price: 60,
          cageId: 8,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 8,
        },
        {
          altScreenName: "Pet Screen",
          price: 60,
          cageId: 8,
        },
        // Gable Low Riser
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 9,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 9,
        },
        {
          altScreenName: "Solar Screen",
          price: 60,
          cageId: 4,
        },
        // Gable High Riser
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 10,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 10,
        },
        {
          altScreenName: "Solar Screen",
          price: 60,
          cageId: 4,
        },
        // Gable Low Roof
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 11,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 11,
        },
        {
          altScreenName: "Solar Screen",
          price: 60,
          cageId: 4,
        },
        // Gable High Roof
        {
          altScreenName: "TuffScreen",
          price: 60,
          cageId: 12,
        },
        {
          altScreenName: "NoSeeUms Screen",
          price: 60,
          cageId: 12,
        },
        {
          altScreenName: "Solar Screen",
          price: 60,
          cageId: 4,
        },
      ]);
    });
};
