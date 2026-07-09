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
infra/        AWS CDK
```

## Getting started

### Mobile app

```bash
npm install   # only needed on a fresh clone
npm start     # scan QR code with Expo Go on your phone
npm run web   # open in browser
```

### Infrastructure (CDK)

```bash
cd infra
npm install
npm run synth   # validates the stack template — does not deploy anything
```

Deploy and teardown commands will be added when AWS resources are defined.

### Database

SQL schema lives in `infra/sql/schema.sql`. See `infra/sql/README.md` for table overview and how to apply it once a DSQL cluster exists.

