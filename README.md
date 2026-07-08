# Reverie

Spoiler-safe book club app for mobile. Discussion is gated by reading progress — you only see comments for chapters you've reached.

## Stack

- **Mobile:** React Native (Expo) + Expo Router + TypeScript
- **Auth:** Amazon Cognito
- **API:** API Gateway + Lambda
- **Database:** Aurora DSQL

## Project structure

```
app/          Expo Router screens
src/          Shared client code (types, api, auth)
api/          Lambda handlers (planned)
infra/        AWS CDK (planned)
```

## Getting started

```bash
npm install   # only needed on a fresh clone
npm start     # scan QR code with Expo Go on your phone
```

