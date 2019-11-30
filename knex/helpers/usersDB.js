const db = require("../knex.js");
const { sgMail } = require("../../configMW/configMW.js");

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
	return db("users").select(
		"id",
		"firstName",
		"lastName",
		"userRole",
		"email",
		"password",
		"activeUser",
		"activationKey"
	);
}

function registerUser(user) {
	return db("users").insert(user);
}

function loginUser(user) {
	return db("users")
		.where({ email: user.email })
		.first();
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
	return db("users")
		.where({ email: user.email })
		.del();
}

function updateUser(user, updatedUserInfo) {
	return db("users")
		.where({ id: user.id })
		.update(updatedUserInfo);
}

function confirmUser(user) {
	return db("users")
		.where({ email: user.email })
		.update({ activeUser: true });
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
	const templateParams = {
		from_name: info.senderFirstName + " " + info.senderLastName + " ( " + info.senderEmail + " ) ",
		from_email: info.senderEmail,
		to_name: "PPSR",
		subject: "PPSR Contact Form",
		message_html: {
			customer: `Customer: ${info.senderFirstName} ${info.senderLastName}`,
			phone: `Phone: ${info.senderPhone}`,
			email: `Email: ${info.senderEmail}`,

			address: `Address:`,
			street: `${info.senderStreet}`,
			cityStateZip: `${info.senderCity}, ${info.senderState}, ${info.senderZipcode}`,

			gateCode: `Gate Code: ${info.senderGateCode}`,

			services: `Services:`,
			complete: `Complete Re-Screen: ${info.senderServices.complete}`,
			individual: `Individual Panels: ${info.senderServices.individual}`,
			window: `Window Screens: ${info.senderServices.window}`,
			lanai: `New Lanai Insert: ${info.senderServices.lanai}`,
			entry: `New Entry Way Insert: ${info.senderServices.entry}`,
			washing: `Pressure Washing: ${info.senderServices.washing}`,
			gutter: `Gutter Cleaning: ${info.senderServices.gutter}`,
			misc: `Misc. Repairs: ${info.senderServices.misc}`,

			message: `Message:`,
			details: `${info.senderMessage}`,
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
