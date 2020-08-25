const users = [];

// add user  , remove user  , get User  , get Users in room
const addUser = ({ id,username, room }) => {
  // clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // validate data
  if (!username || !room) {
    return {
      error: "نام کاربری و نام گروه الزامیست",
    };
  }
  // check for exist users
  const existUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  // validate username
  if (existUser) {
    return {
      error: "نام کاربر موجود است",
    };
  }
  // push users
  const user = { id,username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
