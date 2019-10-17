require("dotenv").config();

const { cors, helmet, morgan, express } = require("../configMW/configMW.js");

// add routes here
const usersRoute = require("../knex/routes/usersRouter.js");

const server = express();

server.use(helmet());
server.use(morgan("short"));
server.use(express.json());
server.use(cors());

// set up routes here
server.use("/users", usersRoute);

server.get("/", (req, res) => {
	res.send("sanity check; server connected");
});

module.exports = server;
