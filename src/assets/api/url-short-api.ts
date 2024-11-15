export const URL_SHORT_API = {
  openapi: '3.0.1',
  info: {
    title: 'Short Url API',
    description: 'API for handling Short Url operations.',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://app-prod-sag-wcms-interview-weu-001.azurewebsites.net/',
      description: 'dev',
    },
  ],
  paths: {
    '/api/short-url/find': {
      post: {
        tags: ['crud-controller'],
        operationId: 'find_1',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ShortUrlSearchRequest',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/ShortUrlSearchResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/short-url/create': {
      post: {
        tags: ['crud-controller'],
        operationId: 'create',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ShortUrlCreationRequest',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/ShortUrl',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ShortUrlSearchRequest: {
        type: 'object',
        properties: {
          pageNumber: {
            type: 'integer',
            format: 'int32',
          },
          pageSize: {
            type: 'integer',
            format: 'int32',
          },
          term: {
            type: 'string',
          },
        },
      },
      ShortUrl: {
        type: 'object',
        properties: {
          shortUrl: {
            type: 'string',
          },
          fullUrl: {
            type: 'string',
          },
          creationDate: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      ShortUrlSearchResponse: {
        type: 'object',
        properties: {
          hits: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ShortUrl',
            },
          },
        },
      },
    },
  },
};
