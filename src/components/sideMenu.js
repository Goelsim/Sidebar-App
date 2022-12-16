import React, { useEffect, useState } from "react";
import MenuItem from "./menuItem";

export const menuTitle = {
  name: "Lorem Impsum",
  exact: true,
  to: "/",
  iconClassName: "bi bi-robot ",
};

export const menuItems = [
  {
    name: "Net",
    exact: true,
    to: "/net",
    iconClassName: "bi bi-globe",
    subMenus: [
      { name: "Domain", to: "/net/domain" },
      { name: "URL", to: "/net/url" },
      { name: "I2P", to: "/net/i2p" },
      { name: "Deep", to: "/net/deep" },
      { name: "DeepURL", to: "/net/deepurl" },
      { name: "Hosting", to: "/net/hosting" },
      { name: "Browser", to: "/net/browser" },
      { name: "WiFi", to: "/net/wifi" },
    ],
  },
  {
    name: "File",
    exact: true,
    to: `/file`,
    iconClassName: "bi bi-file-earmark",
    subMenus: [
      { name: "Image", to: "/file/image" },
      { name: "Document", to: "/file/document" },
      { name: "Other File", to: "/file/otherfile" },
    ],
  },
  { name: "sms", to: `/design`, iconClassName: "bi bi-messenger" },
  {
    name: "tag",
    exact: true,
    to: `/content-2`,
    iconClassName: "bi bi-octagon",
  },
  { name: "people", to: `/design-2`, iconClassName: "bi bi-people" },
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo"></div>
        <div className="toggle-menu">
          <div
            onClick={() => setInactive(!inactive)}
            className="toggle-menu-btn"
          >
            {inactive ? (
              <i class="bi bi-arrow-right-square-fill"></i>
            ) : (
              <i class="bi bi-arrow-left-square-fill"></i>
            )}
          </div>
        </div>
      </div>

      <div className="sidebar-title"></div>

      <div className="main-menu">
        <div className="main-menu-title">
          <MenuItem
            name={menuTitle.name}
            iconClassName={menuTitle.iconClassName}
            exact={menuTitle.exact}
            to={menuTitle.to}
          />
        </div>
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
