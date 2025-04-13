"use strict";
/**
 * Enhanced WordPress Node for n8n
 * Supports custom post types, media uploads, comments, taxonomies, advanced field mapping, and improved error handling.
 * Uses the existing n8n WordPress credentials.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordPress = void 0;
const WordPressDescription_1 = require("./WordPressDescription");
const GenericFunctions_1 = require("./GenericFunctions");
class WordPress {
    constructor() {
        this.description = WordPressDescription_1.WordPressDescription;
    }
    async execute() {
        return GenericFunctions_1.execute.call(this);
    }
}
exports.WordPress = WordPress;
