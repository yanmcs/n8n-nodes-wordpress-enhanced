/**
 * Enhanced WordPress Node for n8n
 * Supports custom post types, media uploads, comments, taxonomies, advanced field mapping, and improved error handling.
 * Uses the existing n8n WordPress credentials.
 */
import { INodeType, INodeTypeDescription, IExecuteFunctions } from 'n8n-workflow';
export declare class WordPress implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<import("n8n-workflow").INodeExecutionData[][]>;
}
