import { Controller, Get, Header, Query, Res } from "@nestjs/common";
import Avataaars from "avataaars";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { generateAvatar } from "../utils";

@Controller("avatar")
export class AvatarController {
	@Get()
	@Header("Content-Type", "image/svg+xml")
	async getAvatar(@Query() queryParams: any, @Res() res: any) {
		res.send(ReactDOMServer.renderToString(<Avataaars {...queryParams} />));
	}

	@Get("/random")
	@Header("Content-Type", "application/json")
	async getRandomAvatar(@Res() res: any) {
		const { url } = generateAvatar();
		res.send({ url });
	}
}
