import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { BlocksResponse, HTMLResponse, MarkdownResponse } from "@/api/blocknote/blocknoteModel";
import type { ServiceResponse } from "@/common/models/serviceResponse";
import { app } from "@/server";

describe("BlockNote API Endpoints", () => {
	describe("POST /blocknote/markdown-to-blocks", () => {
		it("should convert markdown to blocks successfully", async () => {
			// Arrange
			const markdown = "# Hello World\n\nThis is a paragraph.";

			// Act
			const response = await request(app).post("/blocknote/markdown-to-blocks").send({ markdown });
			const responseBody: ServiceResponse<BlocksResponse> = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(responseBody.success).toBeTruthy();
			expect(responseBody.message).toContain("Markdown converted to blocks successfully");
			expect(responseBody.responseObject?.blocks).toBeDefined();
			expect(Array.isArray(responseBody.responseObject?.blocks)).toBeTruthy();
		});

		it("should return a bad request for missing markdown", async () => {
			// Act
			const response = await request(app).post("/blocknote/markdown-to-blocks").send({});
			const responseBody: ServiceResponse = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
			expect(responseBody.success).toBeFalsy();
		});
	});

	describe("POST /blocknote/blocks-to-markdown", () => {
		it("should convert blocks to markdown successfully", async () => {
			// Arrange
			const blocks = [
				{
					id: "test-id",
					type: "paragraph",
					content: "Hello World",
				},
			];

			// Act
			const response = await request(app).post("/blocknote/blocks-to-markdown").send({ blocks });
			const responseBody: ServiceResponse<MarkdownResponse> = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(responseBody.success).toBeTruthy();
			expect(responseBody.message).toContain("Blocks converted to markdown successfully");
			expect(responseBody.responseObject?.markdown).toBeDefined();
			expect(typeof responseBody.responseObject?.markdown).toBe("string");
		});

		it("should return a bad request for missing blocks", async () => {
			// Act
			const response = await request(app).post("/blocknote/blocks-to-markdown").send({});
			const responseBody: ServiceResponse = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
			expect(responseBody.success).toBeFalsy();
		});
	});

	describe("POST /blocknote/blocks-to-html", () => {
		it("should convert blocks to HTML successfully", async () => {
			// Arrange
			const blocks = [
				{
					id: "test-id",
					type: "paragraph",
					content: "Hello World",
				},
			];

			// Act
			const response = await request(app).post("/blocknote/blocks-to-html").send({ blocks });
			const responseBody: ServiceResponse<HTMLResponse> = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(responseBody.success).toBeTruthy();
			expect(responseBody.message).toContain("Blocks converted to HTML successfully");
			expect(responseBody.responseObject?.html).toBeDefined();
			expect(typeof responseBody.responseObject?.html).toBe("string");
		});

		it("should return a bad request for missing blocks", async () => {
			// Act
			const response = await request(app).post("/blocknote/blocks-to-html").send({});
			const responseBody: ServiceResponse = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
			expect(responseBody.success).toBeFalsy();
		});
	});

	describe("POST /blocknote/html-to-blocks", () => {
		it("should convert HTML to blocks successfully", async () => {
			// Arrange
			const html = "<h1>Hello World</h1><p>This is a paragraph.</p>";

			// Act
			const response = await request(app).post("/blocknote/html-to-blocks").send({ html });
			const responseBody: ServiceResponse<BlocksResponse> = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(responseBody.success).toBeTruthy();
			expect(responseBody.message).toContain("HTML converted to blocks successfully");
			expect(responseBody.responseObject?.blocks).toBeDefined();
			expect(Array.isArray(responseBody.responseObject?.blocks)).toBeTruthy();
		});

		it("should return a bad request for missing HTML", async () => {
			// Act
			const response = await request(app).post("/blocknote/html-to-blocks").send({});
			const responseBody: ServiceResponse = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
			expect(responseBody.success).toBeFalsy();
		});
	});
});
