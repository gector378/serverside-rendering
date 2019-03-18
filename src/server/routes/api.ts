import { Express } from "express";
import * as PassportConfig from "../config/passport";
import * as ApiController from "../controllers/api";
import * as UserController from "../controllers/user";
import * as ContactController from "../controllers/contact";
const populateWithApiRoutes = (app: Express): void => {
	app.get("/api", ApiController.getApi);
	app.post("/api/signin", UserController.postLogin);
	app.put("/api/logout", UserController.logout);
	app.post("/api/forgot", UserController.postForgot);
	app.post("/api/reset/:token", UserController.postReset);
	app.post("/api/signup", UserController.postSignup);
	app.post("/api/contact", ContactController.postContact);
	app.post("/api/account/profile", PassportConfig.isAuthenticated, UserController.postUpdateProfile);
	app.post("/api/account/password", PassportConfig.isAuthenticated, UserController.postUpdatePassword);
	app.delete("/api/account", PassportConfig.isAuthenticated, UserController.postDeleteAccount);
	app.delete("/api/account/provider", PassportConfig.isAuthenticated, UserController.getOauthUnlink);
};

export default populateWithApiRoutes;