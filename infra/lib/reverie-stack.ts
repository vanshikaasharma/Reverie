import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ReverieStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Step 6+: Cognito User Pool (email/password)
    // Step 7+: HTTP API + Cognito JWT authorizer + Lambda handlers
    // Step 7+: IAM roles for Lambda → Aurora DSQL (token auth)
    // Later: AWS Budgets billing alerts
  }
}
