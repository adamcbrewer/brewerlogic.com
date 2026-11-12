---
title: Meshii WiFi / Case studies / Adam Brewer
description: The app, AWS services, device data processing and Polygon test rewards I worked on as Software Architect for the Meshii WiFi private pilot.
canonical: https://brewerlogic.com/case-studies/meshii/
---

# Meshii WiFi

Private pilot, 2023.

I designed the app and AWS service architecture for a private Meshii WiFi pilot and led three developers through delivery. The system combined device setup, network performance data and test rewards on Polygon Mumbai, with one app for web, iOS and Android.

- Role: Software Architect
- Delivery: Private pilot
- App: React Native / Expo
- Services and data: AWS / PostgreSQL / Polygon testnet

## How the system worked

```text
APP FOR WEB, IOS AND ANDROID
Web / iOS / Android
  -> Built with Expo / React Native
  -> Login, data and maps: Auth0 / React Query / Mapbox

APPLICATION SERVICES
Secure API access: API Gateway + JWT
  -> Business functions: AWS Lambda
  -> Application records: PostgreSQL / Prisma
  -> Network and device services: RADIUSdesk / AWS IoT

DEVICE PERFORMANCE DATA
Mesh node performance data
  -> Collection: AWS IoT rules / Kinesis
  -> Storage and triggers: S3 / EventBridge
  -> Database and reward scoring: PostgreSQL

TEST REWARD PROCESSING
Calculated reward group
  -> Reward processing: AWS Lambda
  -> Test transaction: Alchemy / Polygon Mumbai
  -> Signed notification / status update
```

I kept the application APIs separate from device-data processing. The APIs handled accounts, wallets, device pairing and configuration. Another set of services collected node measurements and calculated reward scores.

## Why I built it this way

### One app across three platforms

Expo and React Native let us share screens, navigation and API connections across web, iOS and Android. Platform-specific code handled Auth0, Mapbox and nearby device discovery through mDNS.

### Bringing different data sources together

The app needed account information from cloud services, details from nearby devices and blockchain transaction data. React Query gave the rest of the app a consistent way to use those sources.

### Application APIs and records

API Gateway, Lambda and shared code separated the services for users, wallets, devices and maps. PostgreSQL and Prisma held the application's main records.

### Device data as a separate workflow

AWS IoT rules, Kinesis, S3 and EventBridge handled device-data collection separately from reward scoring and processing. That let us change each stage independently during the pilot.

### Test rewards on Polygon

Alchemy submitted groups of smart-contract reward transactions to Polygon Mumbai. Signed notifications from Alchemy updated transaction status in the application database.

### Builds and deployments

AWS SAM defined the services. GitHub Actions deployed changes using short-lived AWS access through OIDC. Amplify hosted the Expo web app, and EAS configuration defined preview builds for iOS and Android.

## What I'd finish before production

This was a private pilot on Polygon Mumbai. The code records automated development and staging deployments and unit tests with mocked dependencies. Before production, I would need to test and harden the complete workflow: duplicate rewards, repeated events, recovery during device setup and keeping blockchain transactions in sync with application records. Native release automation would also need work.

### Recovery and production controls

- Save a unique record for each reward group before submitting a blockchain transaction.
- Handle repeated events, retain failed events and regularly compare blockchain transactions with application records.
- Track recovery steps when device pairing spans multiple systems.
- Limit each Lambda to the secrets and AWS permissions it needs.

### Integration and release checks

- Test PostgreSQL, AWS SAM events and repeated webhook notifications together.
- Check mDNS discovery, authentication and pairing on physical devices.
- Bring development, staging and production infrastructure definitions into line.
- Test deployment health and rollback after database changes.

## What I checked

- Expo configuration, platform-specific connections, API code and component tests.
- AWS SAM definitions for APIs, device-data processing, reward scoring and device setup.
- Lambda code for authentication, device pairing, rewards and signed notifications.
- Prisma and SQL changes for application records and device performance data.
- GitHub Actions, Amplify and EAS build and deployment configuration.

The source code is private. I've left out credentials, customer data, infrastructure and device identifiers, smart-contract addresses and private service addresses.

- Case studies: https://brewerlogic.com/case-studies/
- Portfolio: https://brewerlogic.com/
- CV: https://brewerlogic.com/Adam-Brewer-Senior-Full-Stack-Engineer-CV.pdf
