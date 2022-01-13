const utils = require("./utils");
const { validateUserExists } = require("./helpers");

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
  const users = utils.parseUsers();
  const newUser = {
    id: req.body.id,
    cash: 0,
    credit: 0,
  };
  if (!validateUserExists(users, newUser)) {
    users.push(newUser);
    res.status(200).send(newUser);
  } else {
    res.status(400).send("400 - User already exists");
  }

  utils.writeUsers(users);
};

const makeDeposit = (req, res) => {
  const users = utils.parseUsers();
  const user = users.find((item) => item.id === parseInt(req.params.id));
  if (user) {
    if (req.body.amount && req.body.amount > 0) {
      user.cash += req.body.amount;
      res.status(200).send(user);
    } else {
      res.status(400).send("Invalid amount");
    }
  } else {
    res.status(404).send(`User ${req.params.id} not found`);
  }

  utils.writeUsers(users);
};

const updateUserCredit = (req, res) => {
  const users = utils.parseUsers();
  const user = users.find((item) => item.id === parseInt(req.params.id));
  if (user) {
    if (req.body.amount >= 0 && req.body.amount) {
      user.credit = req.body.amount;
      res.status(200).send(user);
    } else {
      res.status(400).send("Invalid amount");
    }
  } else {
    res.status(404).send(`User ${req.params.id} not found`);
  }

  utils.writeUsers(users);
};

const makeWithdraw = (req, res) => {
  const users = utils.parseUsers();
  const user = users.find((item) => item.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send(`User ${req.params.id} not found`);
  } else if (req.body.amount < 0 || !req.body.amount) {
    res.status(400).send("Invalid amount");
  } else if (user.credit + user.cash - req.body.amount < 0) {
    res.status(400).send("Not enough credit");
  } else {
    user.cash -= req.body.amount;
    res.status(200).send(user);
  }

  utils.writeUsers(users);
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
