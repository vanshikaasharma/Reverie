import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpUserPoolAuthorizer } from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class ReverieStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // --- Auth: Cognito email/password (public client for Expo) ---
    const userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'reverie-users',
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      standardAttributes: {
        email: { required: true, mutable: true },
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const userPoolClient = userPool.addClient('MobileClient', {
      userPoolClientName: 'reverie-mobile',
      generateSecret: false,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      preventUserExistenceErrors: true,
      // Mobile uses SRP/password directly; Hosted UI OAuth comes later if needed.
      disableOAuth: true,
    });

    // --- First Lambda: GET /me (identity from verified JWT) ---
    // Handlers live in ../api — bundle from that package so local esbuild is found.
    const apiRoot = path.join(__dirname, '../../api');

    const meHandler = new NodejsFunction(this, 'MeHandler', {
      entry: path.join(apiRoot, 'src/handlers/me.ts'),
      projectRoot: apiRoot,
      depsLockFilePath: path.join(apiRoot, 'package-lock.json'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(10),
      memorySize: 128,
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'node20',
      },
    });

    const authorizer = new HttpUserPoolAuthorizer('CognitoAuthorizer', userPool, {
      userPoolClients: [userPoolClient],
      identitySource: ['$request.header.Authorization'],
    });

    const httpApi = new apigwv2.HttpApi(this, 'HttpApi', {
      apiName: 'reverie-api',
      description: 'Reverie book club API',
      corsPreflight: {
        allowHeaders: ['Authorization', 'Content-Type'],
        allowMethods: [
          apigwv2.CorsHttpMethod.GET,
          apigwv2.CorsHttpMethod.POST,
          apigwv2.CorsHttpMethod.PUT,
          apigwv2.CorsHttpMethod.PATCH,
          apigwv2.CorsHttpMethod.DELETE,
          apigwv2.CorsHttpMethod.OPTIONS,
        ],
        allowOrigins: ['*'],
      },
    });

    httpApi.addRoutes({
      path: '/me',
      methods: [apigwv2.HttpMethod.GET],
      integration: new HttpLambdaIntegration('MeIntegration', meHandler),
      authorizer,
    });

    // --- Outputs for the Expo app (.env) ---
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
      description: 'Cognito User Pool ID',
    });
    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
      description: 'Cognito app client ID (no secret)',
    });
    new cdk.CfnOutput(this, 'UserPoolRegion', {
      value: this.region,
      description: 'Region for Cognito / Amplify Auth config',
    });
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: httpApi.apiEndpoint,
      description: 'HTTP API base URL',
    });
  }
}
