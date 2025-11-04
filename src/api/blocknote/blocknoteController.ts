import type { Request, RequestHandler, Response } from "express";

import { blocknoteService } from "@/api/blocknote/blocknoteService";

class BlocknoteController {
	public markdownToBlocks: RequestHandler = async (req: Request, res: Response) => {
		const { markdown } = req.body;
		const serviceResponse = await blocknoteService.markdownToBlocks(markdown);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};

	public blocksToMarkdown: RequestHandler = async (req: Request, res: Response) => {
		const { blocks } = req.body;
		const serviceResponse = await blocknoteService.blocksToMarkdown(blocks);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};

	public blocksToHTML: RequestHandler = async (req: Request, res: Response) => {
		const { blocks } = req.body;
		const serviceResponse = await blocknoteService.blocksToHTML(blocks);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};

	public htmlToBlocks: RequestHandler = async (req: Request, res: Response) => {
		const { html } = req.body;
		const serviceResponse = await blocknoteService.htmlToBlocks(html);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};
}

export const blocknoteController = new BlocknoteController();
