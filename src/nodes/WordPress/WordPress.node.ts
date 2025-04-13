/**
 * Enhanced WordPress Node for n8n
 * Supports custom post types, media uploads, comments, taxonomies, advanced field mapping, and improved error handling.
 * Uses the existing n8n WordPress credentials.
 */

import { INodeType, INodeTypeDescription, IExecuteFunctions } from 'n8n-workflow';
import { WordPressDescription } from './WordPressDescription';
import { execute } from './GenericFunctions';

export class WordPress implements INodeType {
	description: INodeTypeDescription = WordPressDescription;

	async execute(this: IExecuteFunctions) {
		return execute.call(this);
	}
}
