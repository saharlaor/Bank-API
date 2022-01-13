// Functions
function validateUserNonexistent(users, user) {
  const userIndex = users.findIndex(({ id }) => id === user.id);
  return userIndex === -1;
}

module.exports = { validateUserNonexistent };
