import vento from "ventojs";
import { User } from "../db/schema/users.ts";

const vto = vento();
const navLinks = [
    {
       group: "",
       links: [
         { name: "Dashboard", icon: "dashboard" },
       ],
     },
   ];

const appTitle = Deno.env.get("APP_TITLE");
const appName = Deno.env.get("APP_NAME");

export const renderSessionAppTemplate = async (user: User, page: string = "index", params: {[key: string]: unknown} = {}) => {

  page = "./views/pages/app/" + page + ".vto";
  
  vto.cache.clear();
  return await vto.run(page, {
    title: appTitle,
    navLinks,
    appName,
    user,
    ...params
  });
};

export const renderFormPartialTemplate = async (page: string, params: {[key: string]: unknown} = {}) => {

    page = "./views/partials/" + page + ".vto";
  
    vto.cache.clear();
    return await vto.run(page, {
      ...params
    });
  };
