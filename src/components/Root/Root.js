let rootComponent = (
  __DEV__ ?
    require('./Root.dev.js') :
    require('./Root.prod.js')
  ).default;

export default rootComponent;
