/** @format */

const { express, bcrypt } = require("../../configMW/configMW.js");
const { genToken } = require("../middleware/genToken.js");
const { protected, adminProtected } = require("../middleware/protectedMW.js");

const userDB = require("../helpers/usersDB.js");
const router = express.Router();

function getRandomActivationKey(min, max) {
  return Math.floor(Math.random() * (9876 - 1234)) + 1234;
}

router.get("/all", adminProtected, (req, res) => {
  userDB
    .getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to load users" });
    });
});

router.get("/user", (req, res) => {
  const creds = req.body;

  userDB
    .getUserInfo(creds)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to load user info" });
    });
});

router.post("/register", (req, res) => {
  const creds = req.body;

  if (creds.password) {
    const hashedPassword = bcrypt.hashSync(creds.password, 14);
    creds.password = hashedPassword;
    creds.activationKey = getRandomActivationKey();

    // console.log("Random Activation Key:");
    // console.log(`${creds.activationKey}`);

    if (creds.firstName && creds.lastName && creds.email) {
      userDB
        .registerUser(creds)
        .then(ids => {
          // console.log(ids);
          // res.status(201).json(1);

          const sendEmail = userDB
            .sendConfirmationKey(creds)
            .then(result => {
              res.status(201).json({
                registered: 1,
                message: "Confirmation key email sent.",
              });
            })
            .catch(err => {
              res.status(500).json({ err, error: "Confirmation not sent" });
            });
        })
        .catch(err => {
          res.status(500).json({
            err: err,
            error: "Registration Failed",
            message: "Email already exists",
          });
        });
    } else {
      res.status(500).json({ error: "Missing input fields" });
    }
  } else {
    res.status(500).json({ err, message: "Password required" });
  }
});

router.post("/login", (req, res) => {
  const creds = req.body;
  userDB
    .getUserInfo(creds)
    .then(foundUser => {
      // console.log(foundUser);
      if (foundUser.length === 0) {
        res.status(204).json("No user found");
      }
      // console.log("USER: ", foundUser[0].activeUser);
    })
    .then(foundUser => {
      if (foundUser[0].activeUser === true) {
        // console.log("active user status is TRUE");
        userDB
          .loginUser(creds)
          .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
              const token = genToken(user);
              res.status(200).json({
                token,
                user: {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  userRole: user.userRole,
                  email: user.email,
                  password: user.password,
                  activeUser: user.activeUser,
                  activationKey: user.activationKey,
                },
              });
            } else {
              res.status(401).json({ message: "Invalid login info" });
            }
          })
          .catch(err => {
            res.status(500).json({ err, error: "Login failed" });
          });
      } else {
        res.status(500).json({ Error: "User has not been confirmed." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong during Login." });
    });
});

router.delete("/delete", protected, (req, res) => {
  // console.log(req.decodedToken);
  userDB
    .deleteUser(req.decodedToken)
    .then(count => {
      if (count === 1) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ count, message: " - User failed to delete" });
      }
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to delete user" });
    });
});

router.put("/update", protected, (req, res) => {
  const creds = req.body;
  // const hashedPassword = bcrypt.hashSync(creds.password, 14);
  // creds.password = hashedPassword;

  userDB
    .updateUser(req.decodedToken, creds)
    .then(id => {
      res.status(200).json(id);
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to update user." });
    });
});

router.put("/confirmUser", (req, res) => {
  const creds = req.body;
  // const hashedPassword = bcrypt.hashSync(creds.password, 14);
  // creds.password = hashedPassword;
  userDB
    .getUserInfoToConfirmKey(creds)
    .then(foundUser => {
      if (!foundUser[0].activeUser) {
        if (foundUser[0].activationKey === creds.activationKey) {
          userDB
            .confirmUser(creds, creds)
            .then(id => {
              res.status(200).json(id);
            })
            .catch(err => {
              res
                .status(500)
                .json({ err, error: "Account activation failed." });
            });
        } else {
          res.status(500).json({ error: "Incorrect Activation Key." });
        }
      } else {
        res.status(500).json({ message: "User is already actived." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Could not find user." });
    });
});

module.exports = router;
