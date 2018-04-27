import { checkTx, setTx, constants } from './utils';
import { REQUIRED_VALUE_TRANSFER_TX_PARAMETERS } from './utils/constants';


const validateTx = (tx) => {
  checkTx.checkRequiredParams(tx, REQUIRED_VALUE_TRANSFER_TX_PARAMETERS);
};

const createTx = (from, receiver, value, nonce) => {
  const tx = setTx({
    from,
    nonce,
    to: receiver,
    value,
    type: constants.VALUE_TRANSFER,
  });
  validateTx(tx);
  return tx;
};


export default {
  createTx,
};
