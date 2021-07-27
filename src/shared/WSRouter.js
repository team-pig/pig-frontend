import { Switch, Route } from "react-router-dom";

import DocAdd from "../pages/DocAdd";
import DocEdit from "../pages/DocEdit";
import DocView from "../pages/DocView";
import Auth from "../shared/auth";

const WSRouter = ({ path }) => {
  return (
    <Switch>
      {/* <Route path={path} component={Main} exact /> */}\
      <Route path={`${path}/doc/add`} component={Auth(DocAdd, null)} exact />
      <Route
        path={`${path}/doc/:docId`}
        component={Auth(DocView, null)}
        exact
      />
      <Route
        path={`${path}/doc/:docId/edit`}
        component={Auth(DocEdit, null)}
        exact
      />
    </Switch>
  );
};

export default WSRouter;
