import { Context, Hono } from "hono";
import vento from "ventojs";
import profile from "./profile.ts";

const app = new Hono();
const vto = vento();

app.use('*', async (c: Context, next) => {
  const session = c.get("session");
  const userId = session.get("userId");

  if (!userId) {
    return c.redirect('/login'); 
  }

  await next(); 
});

// todo: move navLinks as constants to a file
const navLinks = [
  {
    group: "",
    links: [
      { name: "Dashboard", icon: "dashboard" },
      { name: "Profile", icon: "profile" },
    ],
  },
  {
    group: "Manage",
    links: [
      { name: "Members", icon: "members" },
    ],
  },
];

app.get("/", async (c: Context) => {
  //const session = c.get("session");
  //const userId = session.get("userId");

  const template = await vto.run("./views/layouts/app.vto", {
    navLinks: navLinks,
    title: Deno.env.get("TITLE"),
    appName: Deno.env.get("APP_NAME"),
  });

  vto.cache.clear();
  return c.html(template.content);
});

app.route("/profile", profile);

export default app;
