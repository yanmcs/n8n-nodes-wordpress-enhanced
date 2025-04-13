"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordPressDescription = void 0;
exports.WordPressDescription = {
    displayName: 'WordPress (Enhanced)',
    name: 'wordpressEnhanced',
    icon: 'fa:wordpress',
    group: ['input'],
    version: 1,
    description: 'Interact with WordPress sites with enhanced capabilities',
    defaults: {
        name: 'WordPress (Enhanced)',
        color: '#21759b',
    },
    inputs: ["main" /* NodeConnectionType.Main */],
    outputs: ["main" /* NodeConnectionType.Main */],
    credentials: [
        {
            name: 'wordpressApi',
            required: true,
            testedBy: 'wordpressApiTest',
        },
    ],
    properties: [
        {
            displayName: 'Resource',
            name: 'resource',
            type: 'options',
            noDataExpression: true,
            options: [
                {
                    name: 'Post',
                    value: 'post',
                    description: 'Manage posts',
                },
                {
                    name: 'Page',
                    value: 'page',
                    description: 'Manage pages',
                },
                {
                    name: 'Media',
                    value: 'media',
                    description: 'Manage media items',
                },
            ],
            default: 'post',
            description: 'Resource to operate on.',
        },
        {
            displayName: 'Operation',
            name: 'operation',
            type: 'options',
            noDataExpression: true,
            displayOptions: {
                show: {
                    resource: [
                        'post',
                    ],
                },
            },
            options: [
                {
                    name: 'Create',
                    value: 'create',
                    description: 'Create a new post',
                    action: 'Create a post',
                },
                {
                    name: 'Get',
                    value: 'get',
                    description: 'Get a post by ID',
                    action: 'Get a post',
                },
                {
                    name: 'Update',
                    value: 'update',
                    description: 'Update a post by ID',
                    action: 'Update a post',
                },
                {
                    name: 'Delete',
                    value: 'delete',
                    description: 'Delete a post by ID',
                    action: 'Delete a post',
                },
                {
                    name: 'Get All',
                    value: 'getAll',
                    description: 'Retrieve all posts',
                    action: 'Get all posts',
                },
            ],
            default: 'getAll',
            description: 'Operation to perform.',
        },
        // Post ID for Get, Update, Delete
        {
            displayName: 'Post ID',
            name: 'postId',
            type: 'string',
            required: true,
            displayOptions: {
                show: {
                    resource: ['post'],
                    operation: ['get', 'update', 'delete'],
                },
            },
            default: '',
            description: 'The ID of the post.',
        },
        // Title for Create, Update
        {
            displayName: 'Title',
            name: 'title',
            type: 'string',
            required: true,
            displayOptions: {
                show: {
                    resource: ['post'],
                    operation: ['create', 'update'],
                },
            },
            default: '',
            description: 'The title of the post.',
        },
        // Content for Create, Update
        {
            displayName: 'Content',
            name: 'content',
            type: 'string',
            typeOptions: {
                rows: 5,
            },
            required: false,
            displayOptions: {
                show: {
                    resource: ['post'],
                    operation: ['create', 'update'],
                },
            },
            default: '',
            description: 'The content/body of the post.',
        },
    ],
};
