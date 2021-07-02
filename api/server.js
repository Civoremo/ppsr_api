/** @format */

require("dotenv").config();

const { cors, helmet, morgan, express } = require("../configMW/configMW.js");

// add routes here
const startRouter = require("../knex/routes/startRouter.js");
const usersRoute = require("../knex/routes/usersRouter.js");
const cagesRouter = require("../knex/routes/cagesRouter.js");

const server = express();

server.use(helmet());
server.use(morgan("short"));
server.use(express.json());
server.use(cors());

// set up routes here
server.use("/", startRouter);
server.use("/users", usersRoute);
server.use("/cages", cagesRouter);

server.get("/", (req, res) => {
  res.send("sanity check; server connected");
});

module.exports = server;
