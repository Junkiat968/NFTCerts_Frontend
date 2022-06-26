const actions = {
  init: "INIT",
};

// const initialState = {
//   artifact: null,
//   web3: null,
//   accounts: null,
//   networkID: null,
//   contract: null
// };

const initialState = {
  artifact: null,
  artifactSS: null,
  artifactC: null,
  web3: null,
  accounts: null,
  networkID: null,
  contractSS: null,
  contractC: null,
  contractBase64: null,
  contractsitnft: null,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export {
  actions,
  initialState,
  reducer
};
