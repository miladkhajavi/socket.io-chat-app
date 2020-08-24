const generateMSG = (txt) => {
  return {
    txt,
    createdAt: new Date().getTime(),
  };
};

const generateLocationMSG = (loc) => {
  return {
      loc,
      createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMSG,
  generateLocationMSG
};
