import AppRouting from "./app-routing";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import promiseMiddleware from "redux-promise";

const createStoreWithMW = applyMiddleware(promiseMiddleware)(createStore);
const App = () => {
  return (
    <Provider store={createStoreWithMW(rootReducer)}>
      <AppRouting />
    </Provider>
  );
};

export default App;
