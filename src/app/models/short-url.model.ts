export interface ShortUrlSearchRequest {
  pageNumber: number;
  pageSize: number;
  term: string;
}

export interface ShortUrl {
  shortUrl: string;
  fullUrl: string;
  creationDate: string;
}

export interface ShortUrlSearchResponse {
  hits: ShortUrl[];
}

interface ApiInfo {
  title: string;
  description: string;
  version: string;
}

interface ApiServer {
  url: string;
  description: string;
}

// interface ApiOperation<Record> {
//   tags: string[];
//   operationId: string;
//   requestBody: {
//     content: {
//       'application/json': {
//         schema: {
//           $ref: string;
//         };
//       };
//     };
//     required: boolean;
//   };
//   responses: {
//     '200': {
//       description: string;
//       content: {
//         '*/*': {
//           schema: {
//             $ref: string;
//           };
//         };
//       };
//     };
//   };
// }

// Interface for API Paths
// interface ApiPaths {
//   '/api/short-url/find': {
//     post: ApiOperation<ShortUrlSearchRequest, ShortUrlSearchResponse>;
//   };
//   '/api/short-url/create': {
//     post: ApiOperation<ShortUrlCreationRequest, ShortUrl>;
//   };
// }

// Interface for the entire API documentation
export interface ShortUrlApi {
  openapi: string;
  info: ApiInfo;
  servers: ApiServer[];
  // paths: ApiPaths;
  components: {
    schemas: {
      ShortUrlSearchRequest: ShortUrlSearchRequest;
      ShortUrl: ShortUrl;
      ShortUrlSearchResponse: ShortUrlSearchResponse;
    };
  };
}

// To handle request body for create operation
export interface ShortUrlCreationRequest {
  fullUrl: string;
}
