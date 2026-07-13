# Reverie — continue from here

Paste this whole file into a new Cursor chat when you are ready to keep building.
The app name is **Reverie**. Do not rename it. Follow existing tech decisions; do not re-litigate the stack.

## Product (one sentence)

Spoiler-safe book club mobile app: users log reading progress by chapter and only see discussion comments at or below that chapter. The gate is enforced server-side in Lambda from the Cognito JWT (`sub`), never from client-supplied user ids.

## Stack (already decided)

- Mobile: Expo (managed) + Expo Router + TypeScript
- Auth: Amazon Cognito email/password; JWT on device; sent as `Authorization` header
- API: API Gateway HTTP API + Cognito JWT authorizer + Lambda
- DB: Aurora DSQL (schema in `infra/sql/schema.sql`; no FKs; UUID keys)
- Books: Open Library from the app
- Realtime: TanStack Query refetch / pull-to-refresh (not websockets yet)
- IaC: AWS CDK TypeScript in `infra/`
- UI reference: cream / forest-green literary mockups (My Clubs, Discussion, Voting, locked chapter + slider)

## What’s already done

1. Expo app scaffolded and branded Reverie
2. Mockup-based UI with mock data:
   - Tabs: Clubs / Search / Profile / Alerts
   - Club detail: Discussion + Voting
   - Chapter lock UI + progress slider
   - Auth screens (login/signup) — **local mock auth**, not Cognito yet
   - Create/Join modal — UI only
3. Shared types in `src/types/`
4. DSQL schema file: `infra/sql/schema.sql` (+ README)
5. CDK stack defines Cognito + HTTP API + `GET /me` Lambda (`infra/lib/reverie-stack.ts`, handlers in `api/`)
6. AWS CLI was installed on the school machine once; **credentials were not configured** — do that at home

## What is NOT done yet (do in this order)

### A. AWS credentials (home machine)

```powershell
aws configure
# Access key, secret, region us-east-1, output json

aws sts get-caller-identity
```

### B. Deploy Cognito + API (no DSQL required for this step)

```powershell
cd infra
npm install
npx cdk bootstrap
npm run deploy
```

Save stack outputs:

- `UserPoolId`
- `UserPoolClientId`
- `UserPoolRegion`
- `ApiUrl`

Put them in a local `.env` / Expo public env (do **not** commit secrets).  
Teardown anytime: `cd infra; npm run destroy`

Cost note: this stack is free-tier friendly for light demo use. Set a budget alert soon (e.g. notify if monthly spend > ~$1).

### C. Wire real Cognito into the Expo app

- Replace mock `src/auth/AuthContext.tsx` with Cognito email/password (SRP or Amplify Auth)
- Store JWT on device (AsyncStorage / SecureStore)
- Attach `Authorization: Bearer <token>` to API calls
- Login/signup screens already exist under `app/auth/`

### D. Prove the loop

- After login, call `GET {ApiUrl}/me`
- Expect `{ userId }` = Cognito `sub` from verified JWT

### E. Aurora DSQL

- Create DSQL cluster (CDK or console)
- Apply `infra/sql/schema.sql` (indexes use `CREATE INDEX ASYNC`)
- Configure DSQL MCP / app IAM so Lambdas can connect with IAM auth tokens
- On signup, create `profiles` row (`id` = Cognito sub)

### F. API feature routes (spoiler gate lives here)

Implement Lambdas + routes for:

- Clubs: create, join by invite code, list mine
- Club books: propose candidate, list, vote, admin promote to current
- Reading progress: upsert `current_chapter`
- Comments: create + list with gate:

```sql
select c.* from comments c
where c.club_book_id = :club_book_id
  and c.chapter <= coalesce((
    select rp.current_chapter from reading_progress rp
    where rp.club_book_id = :club_book_id and rp.user_id = :user_id
  ), 0)
order by c.chapter, c.created_at;
```

`:user_id` must come from the verified JWT, never the body.

### G. Point the UI at real data

- Swap `src/data/mock.ts` for TanStack Query + API client
- Keep the current visual design (cream, forest green, serif titles)

### H. Guardrails

- AWS Budgets alerts (50/75/90% of credit + low absolute ~$1)
- Document destroy/redeploy in README
- Stay single-region (`us-east-1`)

## Repo map

```
app/                 Expo Router screens (UI)
components/          UI pieces (ClubCard, ChapterCard, …)
constants/theme.ts   Design tokens from mockups
src/auth/            Auth context (mock → Cognito)
src/types/           Shared domain types
src/data/mock.ts     Temporary UI data
api/src/handlers/    Lambda handlers (me.ts exists)
infra/               CDK + sql/schema.sql
```

## Working style

- Baby steps; small commits; plain conventional commit messages
- No AI attribution anywhere
- Comments explain why, not what
- Run typecheck before finishing a milestone
- User commits themselves unless they ask you to commit

## First message to the agent at home (optional short paste)

```
Continue Reverie from TODO.md. Start with AWS configure check, then cdk bootstrap + deploy of Cognito/API, save outputs, then wire Cognito into the Expo auth screens and call GET /me. Follow TODO.md order; don’t re-litigate the stack.
```
