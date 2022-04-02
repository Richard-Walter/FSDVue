import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import getUser from "../composables/getUser";

export default route(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from) => {
    //First check if user is logged in
    const {user} = getUser();
    if (!user) {
      const canUserAccess = canLoggedInUserAccess(to);
      if (!canUserAccess) {
        return "/";
      }
    } else {
      //User is not logged in.  Check what routes an anonymous user can access
      const canAnonymousAccess = canAnonymousUserAccess(to);
      if (!canAnonymousAccess) return "/";
    }
  });

  return Router;
});

const canAnonymousUserAccess = (to) => {
  console.log(to.path);

  if (
    [
      "/account",
      "/mypois",
      "/myrecordedflights",
      "/myflightplans",
      "/myairports",
    ].includes(to.path)
  ) {
    console.log(`deny anonymous user access to ${to.path}`);
    return false;
  }

  return true;
};

const canLoggedInUserAccess = (to) => {
  if (["/admin"].includes(to.path)) {
    console.log(`deny loggged in user access to ${to.path}`);

    return false;
  }

  return true;
};
