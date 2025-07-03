import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';
import {
  userSchemaSwagger,
  userCreateSchemaSwagger,
  userUpdateSchemaSwagger,
  userScoresSchemaSwagger,
} from '../validators/user.validator';
import {
  companySchemaSwagger,
  companyCreateSchemaSwagger,
  companyUpdateSchemaSwagger,
} from '../validators/companies.validator';
import {
  problemSchemaSwagger,
  problemCreateSchemaSwagger,
  problemUpdateSchemaSwagger,
} from '../validators/problems.validator';
import {
  submissionSchemaSwagger,
  submissionCreateSchemaSwagger,
  submissionUpdateSchemaSwagger,
} from '../validators/submissions.validator';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CodeRush API Documentation',
      version,
      description: `## Overview

Welcome to the CodeRush API documentation. This API provides access to the CodeRush platform's resources and operations.

### Authentication

Most endpoints require authentication using a JWT token. To authenticate:

1. Log in using the authentication endpoint to receive a token
2. Include the token in the Authorization header or send the token with credentials for subsequent requests:
   \`\`\`
   Authorization: Bearer <your-token>
   \`\`\`
   or
   \`\`\`
   { withCredentials: true }
   \`\`\`

### Error Handling

Standard HTTP status codes are used to indicate success or failure:
- 2xx: Success
- 4xx: Client errors (invalid request, unauthorized, etc.)
- 5xx: Server errors

Error responses include a JSON object with an \`error\` field describing the issue.`,
      contact: {
        name: 'CodeRush Team',
        url: 'https://github.com/CodeRush-App',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'https://coderush.loca.lt/api/v1',
        description: 'Production server',
      },
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Enter JWT token returned from the login endpoint in the format: Bearer <token>',
        },
      },
      schemas: {
        User: userSchemaSwagger,
        UserCreate: userCreateSchemaSwagger,
        UserUpdate: userUpdateSchemaSwagger,
        UserScores: userScoresSchemaSwagger,
        Company: companySchemaSwagger,
        CompanyCreate: companyCreateSchemaSwagger,
        CompanyUpdate: companyUpdateSchemaSwagger,
        Problem: problemSchemaSwagger,
        ProblemCreate: problemCreateSchemaSwagger,
        ProblemUpdate: problemUpdateSchemaSwagger,
        Submission: submissionSchemaSwagger,
        SubmissionCreate: submissionCreateSchemaSwagger,
        SubmissionUpdate: submissionUpdateSchemaSwagger,
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.controller.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
