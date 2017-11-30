import _ from 'lodash';

const makeActionCreator =
  (type, ...keys) => (...vals) =>
    _.assign({ type }, _.zipObject(keys, vals));

const makeDelayActionCreator = 
  _.throttle( (type, ...keys) => (...vals) => 
     _.assign({ type }, _.zipObject(keys, vals)), 3000);


export default makeActionCreator;
