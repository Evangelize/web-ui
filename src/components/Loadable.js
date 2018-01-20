import L from 'react-loadable';
import LoadingPage from './LoadingPage';
const Loadable = (opts) => {
  L({
    loading: LoadingPage,
    ...opts,
    delay: 300,
  });
};

export default Loadable;