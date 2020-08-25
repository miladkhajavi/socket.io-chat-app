const generateMSG = ( username, txt) => {
  return {
    // own,
    username,
    txt,
    createdAt: new Date().getTime(),
  };
};

const generateLocationMSG = (username, loc) => {
  return {
    // own,
    username,
    loc,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMSG,
  generateLocationMSG,
};
