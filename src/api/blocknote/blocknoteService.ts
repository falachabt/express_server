import { ServerBlockNoteEditor } from "@blocknote/server-util";
import { StatusCodes } from "http-status-codes";

import type { Block, BlocksResponse, HTMLResponse, MarkdownResponse } from "@/api/blocknote/blocknoteModel";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class BlocknoteService {
	private editor: ServerBlockNoteEditor;

	constructor() {
		this.editor = ServerBlockNoteEditor.create();
	}

	// Convert markdown to BlockNote blocks
	async markdownToBlocks(markdown: string): Promise<ServiceResponse<BlocksResponse | null>> {
		try {
			const blocks = await this.editor.tryParseMarkdownToBlocks(markdown);
			return ServiceResponse.success<BlocksResponse>("Markdown converted to blocks successfully", { blocks });
		} catch (ex) {
			const errorMessage = `Error converting markdown to blocks: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while converting markdown to blocks.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}

	// Convert BlockNote blocks to markdown
	async blocksToMarkdown(blocks: Block[]): Promise<ServiceResponse<MarkdownResponse | null>> {
		try {
			const markdown = await this.editor.blocksToMarkdownLossy(blocks);
			return ServiceResponse.success<MarkdownResponse>("Blocks converted to markdown successfully", { markdown });
		} catch (ex) {
			const errorMessage = `Error converting blocks to markdown: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while converting blocks to markdown.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}

	// Convert BlockNote blocks to HTML
	async blocksToHTML(blocks: Block[]): Promise<ServiceResponse<HTMLResponse | null>> {
		try {
			const html = await this.editor.blocksToFullHTML(blocks);
			return ServiceResponse.success<HTMLResponse>("Blocks converted to HTML successfully", { html });
		} catch (ex) {
			const errorMessage = `Error converting blocks to HTML: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while converting blocks to HTML.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}

	// Convert HTML to BlockNote blocks
	async htmlToBlocks(html: string): Promise<ServiceResponse<BlocksResponse | null>> {
		try {
			const blocks = await this.editor.tryParseHTMLToBlocks(html);
			return ServiceResponse.success<BlocksResponse>("HTML converted to blocks successfully", { blocks });
		} catch (ex) {
			const errorMessage = `Error converting HTML to blocks: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while converting HTML to blocks.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}
}

export const blocknoteService = new BlocknoteService();
