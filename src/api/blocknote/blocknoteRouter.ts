import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";

import {
	BlocksResponseSchema,
	BlocksToHTMLRequestSchema,
	BlocksToMarkdownRequestSchema,
	HTMLResponseSchema,
	HTMLToBlocksRequestSchema,
	MarkdownResponseSchema,
	MarkdownToBlocksRequestSchema,
} from "@/api/blocknote/blocknoteModel";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { blocknoteController } from "./blocknoteController";

export const blocknoteRegistry = new OpenAPIRegistry();
export const blocknoteRouter: Router = express.Router();

// Register schemas
blocknoteRegistry.register("BlocksResponse", BlocksResponseSchema);
blocknoteRegistry.register("MarkdownResponse", MarkdownResponseSchema);
blocknoteRegistry.register("HTMLResponse", HTMLResponseSchema);

// POST /blocknote/markdown-to-blocks
blocknoteRegistry.registerPath({
	method: "post",
	path: "/blocknote/markdown-to-blocks",
	tags: ["BlockNote"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: MarkdownToBlocksRequestSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(BlocksResponseSchema, "Success"),
});

blocknoteRouter.post(
	"/markdown-to-blocks",
	validateRequest(MarkdownToBlocksRequestSchema),
	blocknoteController.markdownToBlocks,
);

// POST /blocknote/blocks-to-markdown
blocknoteRegistry.registerPath({
	method: "post",
	path: "/blocknote/blocks-to-markdown",
	tags: ["BlockNote"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: BlocksToMarkdownRequestSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(MarkdownResponseSchema, "Success"),
});

blocknoteRouter.post(
	"/blocks-to-markdown",
	validateRequest(BlocksToMarkdownRequestSchema),
	blocknoteController.blocksToMarkdown,
);

// POST /blocknote/blocks-to-html
blocknoteRegistry.registerPath({
	method: "post",
	path: "/blocknote/blocks-to-html",
	tags: ["BlockNote"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: BlocksToHTMLRequestSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(HTMLResponseSchema, "Success"),
});

blocknoteRouter.post("/blocks-to-html", validateRequest(BlocksToHTMLRequestSchema), blocknoteController.blocksToHTML);

// POST /blocknote/html-to-blocks
blocknoteRegistry.registerPath({
	method: "post",
	path: "/blocknote/html-to-blocks",
	tags: ["BlockNote"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: HTMLToBlocksRequestSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(BlocksResponseSchema, "Success"),
});

blocknoteRouter.post("/html-to-blocks", validateRequest(HTMLToBlocksRequestSchema), blocknoteController.htmlToBlocks);
