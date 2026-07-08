#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ReverieStack } from '../lib/reverie-stack';

const app = new cdk.App();

new ReverieStack(app, 'ReverieStack', {
  description: 'Reverie book club API — Cognito, API Gateway, Lambda, DSQL access',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
  },
});
