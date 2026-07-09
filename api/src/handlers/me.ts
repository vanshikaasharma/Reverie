import type { APIGatewayProxyHandlerV2WithJWTAuthorizer } from 'aws-lambda';

import { getUserId } from '../lib/auth';
import { json } from '../lib/http';

/**
 * GET /me — proves the Cognito JWT authorizer works.
 * Returns the caller's Cognito sub from the verified token (not from the client body).
 */
export const handler: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (event) => {
  try {
    const userId = getUserId(event);
    return json(200, { userId });
  } catch {
    return json(401, { error: 'Unauthorized' });
  }
};
