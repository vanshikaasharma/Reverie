import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

/**
 * Cognito JWT authorizer puts verified claims on the event.
 * Prefer `sub` — that is the stable user id we store as profiles.id.
 */
export function getUserId(
  event: APIGatewayProxyEventV2WithJWTAuthorizer,
): string {
  const claims = event.requestContext.authorizer?.jwt?.claims;
  const sub = claims?.sub;

  if (typeof sub !== 'string' || sub.length === 0) {
    throw new Error('Missing Cognito sub in JWT claims');
  }

  return sub;
}
