import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

// BlockNote block type - uses z.any() to allow flexible block structure
// as BlockNote blocks have a complex, extensible schema that varies by block type.
// The ServerBlockNoteEditor handles internal validation of block structure.
export const BlockSchema = z.any().openapi({
	description:
		"BlockNote block structure with id, type, content, and props. BlockNote blocks have a dynamic schema that varies by block type and is validated by the ServerBlockNoteEditor.",
	example: {
		id: "block-id",
		type: "paragraph",
		content: [{ type: "text", text: "Hello World", styles: {} }],
		props: {},
	},
});

export type Block = z.infer<typeof BlockSchema>;

// Request schema for markdown to blocks conversion
export const MarkdownToBlocksRequestSchema = z.object({
	body: z.object({
		markdown: z.string().openapi({
			description: "Markdown content to convert to BlockNote blocks",
			example: "# Hello World\n\nThis is a paragraph.",
		}),
	}),
});

// Request schema for blocks to markdown conversion
export const BlocksToMarkdownRequestSchema = z.object({
	body: z.object({
		blocks: z.array(BlockSchema).openapi({
			description: "Array of BlockNote blocks to convert to markdown",
		}),
	}),
});

// Request schema for blocks to HTML conversion
export const BlocksToHTMLRequestSchema = z.object({
	body: z.object({
		blocks: z.array(BlockSchema).openapi({
			description: "Array of BlockNote blocks to convert to HTML",
		}),
	}),
});

// Request schema for HTML to blocks conversion
export const HTMLToBlocksRequestSchema = z.object({
	body: z.object({
		html: z.string().openapi({
			description: "HTML content to convert to BlockNote blocks",
			example: "<h1>Hello World</h1><p>This is a paragraph.</p>",
		}),
	}),
});

// Response schemas
export const BlocksResponseSchema = z.object({
	blocks: z.array(BlockSchema).openapi({
		description: "Resulting BlockNote blocks",
	}),
});

export const MarkdownResponseSchema = z.object({
	markdown: z.string().openapi({
		description: "Resulting markdown content",
	}),
});

export const HTMLResponseSchema = z.object({
	html: z.string().openapi({
		description: "Resulting HTML content",
	}),
});

export type MarkdownToBlocksRequest = z.infer<typeof MarkdownToBlocksRequestSchema>;
export type BlocksToMarkdownRequest = z.infer<typeof BlocksToMarkdownRequestSchema>;
export type BlocksToHTMLRequest = z.infer<typeof BlocksToHTMLRequestSchema>;
export type HTMLToBlocksRequest = z.infer<typeof HTMLToBlocksRequestSchema>;
export type BlocksResponse = z.infer<typeof BlocksResponseSchema>;
export type MarkdownResponse = z.infer<typeof MarkdownResponseSchema>;
export type HTMLResponse = z.infer<typeof HTMLResponseSchema>;
