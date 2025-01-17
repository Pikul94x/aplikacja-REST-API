const express = require("express");
const { avatarResize } = require("./avatarResize");
const { avatarUpload } = require("./avatarUpload");
const { authorization } = require("./usersAuth");

const {
	listCurrent,
	login,
	logout,
	registration,
	setAvatar,
} = require("./usersFunctions");

const router = express.Router();

router.post("/signup", registration);
router.post("/login", login);
router.get("/logout", authorization, logout);
router.get("/current", authorization, listCurrent);
router.patch(
	"/avatars",
	authorization,
	avatarUpload.single("avatar"),
	avatarResize,
	setAvatar
);

module.exports = router;
