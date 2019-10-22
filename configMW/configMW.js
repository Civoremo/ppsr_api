const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

module.exports = {
	cors,
	morgan,
	helmet,
	express,
	bcrypt,
	jwt,
	sgMail,
};
