import React, { useEffect } from "react";
import routes from "./Store/routes";

import { Redirect, useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import { Header } from "../../Components/Dashboard/Header/Header";
import { Sidebar } from "../../Components/Dashboard/Sidebar/Sidebar";

import { EditProfile } from "./Pages/Profile/EditProfile";
import { ChangeEmail } from "./Pages/Profile/ChangeEmail";
import { ChangePassword } from "./Pages/Profile/ChangePassword";
import privateRoutes from "./Store/privateRoutes";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token_foodScan") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}

export function Dashboard() {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("token_foodScan")) {
      history.push("/auth/login");
    }
  }, []);

  return (
    <div className="Dashboard">
      <Header />
      <div className="Container" id="container">
        <Sidebar />

        <div className="Content">
          <Switch>
            {privateRoutes.map((route) => (
              <ProtectedRoute
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}

            <ProtectedRoute
              path="/admin/dashboard/edit/profile"
              component={EditProfile}
            />

            <ProtectedRoute
              path="/admin/dashboard/change/email"
              component={ChangeEmail}
            />

            <ProtectedRoute
              path="/admin/dashboard/change/password"
              component={ChangePassword}
            />

            {routes.flatMap((routeGroup) =>
              routeGroup.items.map((route) => (
                <ProtectedRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  exact={route.name == "Dashboard"}
                />
              ))
            )}
          </Switch>
        </div>
      </div>
    </div>
  );
}
