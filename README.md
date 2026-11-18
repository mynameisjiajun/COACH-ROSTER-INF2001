# CoachRoster

Clickable prototype of the coach company workload app for **INF2001 Team P14-3** (SIT).

It runs fully in the browser. There is no server and no real database. Data is saved in each tester's own browser.

## Roles

| Role | Employee ID | Notes |
|---|---|---|
| Staff (Ahmad Faizal) | 104233 | |
| Manager (Rachel Goh) | 200118 | Needs sign-in code `246810` |
| IT Admin (Kelvin Ong) | 300021 | Needs sign-in code `246810` |
| Inactive staff (Priya Nair) | 105902 | Sign-in is refused |

Password for all test accounts: `Roster@2026!`

## Testing

Tap **Test tools** (bottom right) to:

- read the emails the app sends (activation, reset, maintenance)
- jump between roles
- force errors (deadline passed, email down, publish fails, expired links)
- reset all demo data

The demo runs on a fixed date (Wed 4 Nov 2026 for staff and IT, Thu 5 Nov 2026 for the manager) so the deadline rules can be tested.

## Deploy

Static site. On Vercel: **Add New → Project → Import this repo → Deploy**. No build settings needed.
