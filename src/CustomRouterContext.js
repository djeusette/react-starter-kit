import { RouterContext } from 'react-router';
import { PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import _ from 'lodash';

class CustomRouterContext extends RouterContext {
  static propTypes = {
    history: PropTypes.object,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    components: PropTypes.array.isRequired,
    createElement: PropTypes.func.isRequired,
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      onSetTitle: PropTypes.func,
      onSetMeta: PropTypes.func,
      onPageNotFound: PropTypes.func,
    }),
    error: PropTypes.object
  };

  static childContextTypes = {
    history: PropTypes.object,
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    insertCss: PropTypes.func.isRequired,
    onSetTitle: PropTypes.func.isRequired,
    onSetMeta: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired
  };

  getChildContext() {
    let defaultContext = super.getChildContext();
    let { context } = this.props;

    context = _.defaults(context, {
      insertCss: emptyFunction,
      onSetTitle: emptyFunction,
      onSetMeta: emptyFunction,
      onPageNotFound: emptyFunction
    });

    return {...defaultContext, ...context};
  }
}

export default CustomRouterContext;
