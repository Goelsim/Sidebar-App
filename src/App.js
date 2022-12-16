import "./App.css";
import SideMenu, { menuItems } from "./components/sideMenu";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import URLScreen from "./utils/urlScreen";

function App() {
  const [inactive, setInactive] = useState(false);

  return (
    <div className="App">
      <Router>
        <SideMenu
          onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        />

        <div className={`container ${inactive ? "inactive" : ""}`}>
          {menuItems.map((menu, index) => (
            <>
              <Route key={menu.name} exact={menu.exact} path={menu.to}></Route>
              {menu.subMenus && menu.subMenus.length > 0
                ? menu.subMenus.map(
                    (subMenu, i) =>
                      subMenu.name === "URL" && (
                        <Route key={subMenu.name} path={subMenu.to}>
                          <URLScreen />
                        </Route>
                      )
                  )
                : null}
            </>
          ))}
        </div>
      </Router>
    </div>
  );
}

export default App;
