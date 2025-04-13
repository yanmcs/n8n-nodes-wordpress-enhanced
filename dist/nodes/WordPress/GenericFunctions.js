"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
// Main execute logic for the enhanced WordPress node
async function execute() {
    const items = this.getInputData();
    const returnData = [];
    for (let i = 0; i < items.length; i++) {
        try {
            const resource = this.getNodeParameter('resource', i);
            const operation = this.getNodeParameter('operation', i);
            if (resource === 'post') {
                if (operation === 'getAll') {
                    // Fetch all posts from WordPress REST API
                    const responseData = await this.helpers.requestWithAuthentication.call(this, 'wordpressApi', {
                        method: 'GET',
                        url: '/wp/v2/posts',
                        qs: {
                            per_page: 10, // Default: first 10 posts
                        },
                        json: true,
                    });
                    if (Array.isArray(responseData)) {
                        returnData.push(...responseData);
                    }
                    else {
                        returnData.push(responseData);
                    }
                }
                else if (operation === 'create') {
                    // Create a new post
                    const title = this.getNodeParameter('title', i);
                    const content = this.getNodeParameter('content', i, ''); // Default to empty string if not provided
                    const responseData = await this.helpers.requestWithAuthentication.call(this, 'wordpressApi', {
                        method: 'POST',
                        url: '/wp/v2/posts',
                        body: {
                            title,
                            content,
                            status: 'publish', // Default to publish, could add as an option later
                        },
                        json: true,
                    });
                    returnData.push(responseData);
                }
                else if (operation === 'get') {
                    // Get a post by ID
                    const postId = this.getNodeParameter('postId', i);
                    if (!postId) {
                        throw new Error('Post ID is required for the get operation.');
                    }
                    const responseData = await this.helpers.requestWithAuthentication.call(this, 'wordpressApi', {
                        method: 'GET',
                        url: `/wp/v2/posts/${postId}`,
                        json: true,
                    });
                    returnData.push(responseData);
                }
                else if (operation === 'update') {
                    // Update a post by ID
                    const postId = this.getNodeParameter('postId', i);
                    if (!postId) {
                        throw new Error('Post ID is required for the update operation.');
                    }
                    const title = this.getNodeParameter('title', i);
                    const content = this.getNodeParameter('content', i, undefined); // Only include if provided
                    const body = {};
                    if (title)
                        body.title = title;
                    if (content !== undefined)
                        body.content = content; // Allow sending empty content
                    if (Object.keys(body).length === 0) {
                        throw new Error('Either Title or Content must be provided for the update operation.');
                    }
                    const responseData = await this.helpers.requestWithAuthentication.call(this, 'wordpressApi', {
                        // WordPress API uses POST for updates
                        method: 'POST',
                        url: `/wp/v2/posts/${postId}`,
                        body: body,
                        json: true,
                    });
                    returnData.push(responseData);
                }
                else if (operation === 'delete') {
                    // Delete a post by ID
                    const postId = this.getNodeParameter('postId', i);
                    if (!postId) {
                        throw new Error('Post ID is required for the delete operation.');
                    }
                    // Add force=true to bypass trash and permanently delete
                    const responseData = await this.helpers.requestWithAuthentication.call(this, 'wordpressApi', {
                        method: 'DELETE',
                        url: `/wp/v2/posts/${postId}`,
                        qs: {
                            force: true,
                        },
                        json: true,
                    });
                    // The response for a successful delete might be the deleted object or just status.
                    // We'll return it directly, or add a success message if needed based on testing.
                    returnData.push(responseData);
                }
                else {
                    returnData.push({ error: `Unknown operation: ${operation}` });
                }
            }
            else {
                returnData.push({ error: `Resource not implemented: ${resource}` });
            }
        }
        catch (error) {
            returnData.push({ error: error.message });
        }
    }
    return [this.helpers.returnJsonArray(returnData)];
}
