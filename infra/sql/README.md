# Database schema

Reverie uses **Aurora DSQL** (Postgres-compatible, serverless).

## Files

- `schema.sql` — all tables and indexes for the app

## Tables

| Table | Purpose |
|-------|---------|
| `profiles` | User display name + avatar (`id` = Cognito sub) |
| `clubs` | Book clubs with invite codes |
| `club_members` | Who belongs to each club (`admin` / `member`) |
| `books` | Cached Open Library metadata |
| `club_books` | Book linked to a club (`candidate` → `voting` → `current` → `finished`) |
| `votes` | One vote per user per candidate book |
| `reading_progress` | Per-user chapter progress (powers the spoiler gate) |
| `comments` | Chapter-tagged discussion threads |

## DSQL notes

- **UUID primary keys** with `gen_random_uuid()` (except `profiles.id`, which comes from Cognito).
- **No foreign keys** — Lambdas validate references before insert/update.
- **Indexes use `CREATE INDEX ASYNC`** — they build in the background after the statement returns.

## Apply the schema

When your DSQL cluster is configured (AWS console or Cursor DSQL MCP with cluster endpoint):

1. Run each statement in `schema.sql` via the DSQL MCP `transact` tool, or
2. Use the AWS DSQL query editor / `psql` with IAM auth.

The schema is linted for DSQL compatibility before commit.
