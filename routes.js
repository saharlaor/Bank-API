const utils = require("./utils");

// Functions
const getAllUsers = (req, res) => {
  res.send(utils.parseUsers());
};

const getUser = (req, res) => {
  const user = utils
    .parseUsers()
    .find((item) => item.id === parseInt(req.params.id));
  user
    ? res.send(user)
    : res.status(404).send(`User ${req.params.id} not found`);
};

const createUser = (req, res) => {
  res.send("createUser is not Implemented");
};

const makeDeposit = (req, res) => {
  res.send("makeDeposit is not Implemented");
};

const updateUserCredit = (req, res) => {
  res.send("updateUserCredit is not Implemented");
};

const makeWithdraw = (req, res) => {
  res.send("makeWithdraw is not Implemented");
};

const makeTransfer = (req, res) => {
  res.send("makeTransfer is not Implemented");
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  makeDeposit,
  updateUserCredit,
  makeWithdraw,
  makeTransfer,
};
