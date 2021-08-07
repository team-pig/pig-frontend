import { Switch, Route } from "react-router-dom";
import DocBlank from "../pages/DocBlank";

import Main from "../pages/Main";
import DocAdd from "../pages/DocAdd";
import DocEdit from "../pages/DocEdit";
import DocView from "../pages/DocView";
import Board from "../pages/Board";
import Calendar from "../pages/Calendar";

const WSRouter = ({ path }) => {
  return (
    <Switch>
      <Route path={path} component={Main} exact />
      <Route path={`${path}/doc/add`} component={DocAdd} exact />
      <Route path={`${path}/doc/blank`} component={DocBlank} exact />
      <Route path={`${path}/doc/:docId`} component={DocView} exact />
      <Route path={`${path}/doc/:docId/edit`} component={DocEdit} exact />
      <Route path={`${path}/board`} component={Board} exact />
      <Route path={`${path}/timeline`} component={Calendar} exact />
    </Switch>
  );
};

export default WSRouter;
