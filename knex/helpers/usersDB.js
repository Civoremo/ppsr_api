/** @format */

const db = require("../knex.js");
const { sgMail, emailjs } = require("../../configMW/configMW.js");

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserInfo,
  deleteUser,
  updateUser,
  confirmUser,
  getUserInfoToConfirmKey,
  sendConfirmationKey,
  sendEstimateRequest,
  recatpchaRequest,
};

function getAllUsers() {
  return db("users")
    .select(
      "id",
      "firstName",
      "lastName",
      "userRole",
      "email",
      // "password",
      "activeUser"

      //   'activationKey'
    )
    .orderBy("created_at", "desc");
}

function registerUser(user) {
  const allUsers = db("users").select();
  const reachedAdminCount = 0;

  return Promise.all([allUsers]).then(result => {
    for (let user of result[0]) {
      if (user.userRole === "admin") {
        reachedAdminCount++;
      }
    }

    if (user.userRole !== "admin") {
      return db("users").insert(user);
    } else if (user.userRole === "admin" && reachedAdminCount < 2) {
      return db("users").insert(user);
    } else {
      return "Something went wrong with user registration!";
    }
  });
}

function loginUser(user) {
  return db("users").where({ email: user.email }).first();
}

function getUserInfo(user) {
  return db("users")
    .select(
      "id",
      "firstName",
      "lastName",
      "userRole",
      "email",
      // "password",
      "activeUser"
      // "activationKey"
    )
    .where({ email: user.email });
}

function getUserInfoToConfirmKey(user) {
  return db("users")
    .select("id", "activeUser", "activationKey")
    .where({ email: user.email });
}

function deleteUser(user) {
  console.log("user token", user.decodedToken);
  if (user.decodedToken.userRole === "admini") {
    return db("users").where({ email: user.body.email }).del();
  } else if (user.decodedToken.userRole === "user") {
    return db("users").where({ email: user.decodedToken.email }).del();
  } else {
    return "Failed to delete user";
  }
}

function updateUser(user, updatedUserInfo) {
  return db("users").where({ id: user.id }).update(updatedUserInfo);
}

function confirmUser(user) {
  return db("users").where({ email: user.email }).update({ activeUser: true });
}

function sendConfirmationKey(user) {
  // sendgrid code goes here
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: `${user.email}`,
    from: `ppsr@ppscreens.com`,
    subject: "PPSR Confirmation Key",
    html: `Thank you for registering with Pool & Patio Screen Repair website.<br>
		If this email was not meant for you, please ignore its contents and delete.<br><br>
		Your Confirmation Number:<br>
		<strong>${user.activationKey}</strong>
		`,
  };

  return sgMail.send(msg);
}

function sendEstimateRequest(info) {
  // console.log("estimaet request: " + info);
  // console.log("complete " + JSON.stringify(info.senderServices.complete));
  const templateParams = {
    from_name:
      JSON.stringify(info.senderFirstName) +
      " " +
      JSON.stringify(info.senderLastName) +
      " ( " +
      JSON.stringify(info.senderEmail) +
      " ) ",
    from_email: JSON.stringify(info.senderEmail),
    to_name: "PPSR",
    subject: "PPSR Contact Form",
    message_html: {
      customer:
        `Customer: ` +
        JSON.stringify(info.senderFirstName) +
        " " +
        JSON.stringify(info.senderLastName),
      phone: `Phone: ` + JSON.stringify(info.senderPhone),
      email: `Email: ` + JSON.stringify(info.senderEmail),

      address: `Address:`,
      street: JSON.stringify(info.senderStreet),
      cityStateZip:
        JSON.stringify(info.senderCity) +
        ", " +
        JSON.stringify(info.senderState) +
        ", " +
        JSON.stringify(info.senderZipcode),

      gateCode: `Gate Code: ` + JSON.stringify(info.senderGateCode),

      services: `Services:`,
      complete:
        `Complete Re-Screen: ` + JSON.stringify(info.senderServices.complete),
      individual:
        `Individual Panels: ` + JSON.stringify(info.senderServices.individual),
      window: `Window Screens: ` + JSON.stringify(info.senderServices.window),
      lanai: `New Lanai Insert: ` + JSON.stringify(info.senderServices.lanai),
      entry:
        `New Entry Way Insert: ` + JSON.stringify(info.senderServices.entry),
      washing:
        `Pressure Washing: ` + JSON.stringify(info.senderServices.washing),
      gutter: `Gutter Cleaning: ` + JSON.stringify(info.senderServices.gutter),
      misc: `Misc. Repairs: ` + JSON.stringify(info.senderServices.misc),

      message: `Message:`,
      details: JSON.stringify(info.senderMessage),
    },
  };

  return emailjs.send(
    process.env.REACT_APP_EMAILJS_SERVICEID,
    process.env.REACT_APP_EMAILJS_TEMPLATE,
    templateParams,
    process.env.REACT_APP_EMAILJS_USER
  );
}

function recatpchaRequest(info) {
  // console.log("We have made it to the server function");
  fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    // mode: 'no-cors',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({
      secret: `${process.env.REACT_APP_CAPTCHASECRET}`,
      response: `${info.response}`,
      // remoteip: 'localhost'
    }),
  })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      console.log("error " + err);
      return err;
    });
}
