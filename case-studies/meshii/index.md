---
title: Meshii WiFi Architecture Case Study | Adam Brewer
description: A case study based on private Meshii WiFi source code, covering its app for web, iOS and Android, AWS services, device performance data and test rewards on Polygon.
canonical: https://brewerlogic.com/case-studies/meshii/
---

# Meshii WiFi Architecture

Architecture review based on source code, 2023.

A reconstruction of a private-pilot platform, based on its application, API, infrastructure and test source code. The platform combined device management across web, iOS and Android, AWS services, mesh network performance data and test rewards on Polygon Mumbai.

- Role: Software Architect
- Delivery: Private pilot
- App: React Native / Expo
- Services and data: AWS / PostgreSQL / Polygon testnet

## Architecture

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

Application services and device performance processing were kept separate. The application APIs managed user identities, wallets, device pairing and configuration. A separate set of services collected the larger volume of device data and calculated reward scores.

## Why It Was Designed This Way

### One App, Platform-Specific Connections

Expo and React Native allowed the browser, iOS and Android versions to share navigation, screens and API connections. Platform-specific code connected each version to Auth0, Mapbox and nearby device discovery using mDNS.

### Cloud, Device and Blockchain Data

The app combined account information from cloud services, information found directly from nearby devices and transaction data from the blockchain. React Query gave the rest of the app one consistent way to access this information.

### AWS Application Services

API Gateway, AWS Lambda and shared code separated the services for users, wallets, devices and maps. PostgreSQL and Prisma held the application's main records.

### Separate Device Data Processing

AWS IoT rules, Kinesis, S3 and EventBridge separated the collection of device performance data from reward scoring and processing. This allowed each stage to change independently during the private pilot.

### Test Rewards on Polygon

Alchemy submitted groups of smart-contract reward transactions to the Polygon Mumbai test network. Signed notifications from Alchemy then updated each transaction's status in the application database.

### Automated Builds and Deployments

AWS SAM defined the AWS services. GitHub Actions deployed changes using short-lived AWS access through OIDC. AWS Amplify hosted the Expo web app, while EAS configuration defined preview builds for iOS and Android.

## What the Evidence Does Not Show

This architecture supported a private pilot, not a production launch or a launch on Polygon's main network. The source shows integration with the Polygon Mumbai test network, automated development and staging deployments, and unit tests using simulated dependencies. It does not show that every reward could only be processed once, that repeated requests were safe at every stage, that blockchain and application records were always compared and corrected, that device setup could not partly complete, or that native app releases were fully automated.

### Work Needed Before Production

- Save a unique record for each reward group before submitting any blockchain transaction.
- Add controls for repeated events, storage for failed events, and regular checks between blockchain transactions and application records.
- Track recovery steps when device pairing spans multiple systems.
- Give each AWS Lambda only the secrets and AWS permissions it requires.

### Additional Testing Needed

- Add tests covering PostgreSQL, AWS SAM events and repeated webhook notifications working together.
- Test mDNS discovery, authentication and pairing on physical devices.
- Make the development, staging and production infrastructure definitions consistent before launch.
- Test deployment health and rollback after database structure changes.

## Evidence Used

- Expo app configuration, platform-specific connections, API code and component tests.
- AWS SAM definitions for APIs, device performance processing, reward scoring and device setup.
- AWS Lambda code for authentication, device pairing, rewards and signed notifications.
- Prisma and SQL database changes for application and device performance data.
- GitHub Actions, AWS Amplify and EAS build and deployment configuration.

The source code is private. Identifiers for infrastructure and devices, credentials, customer data, smart-contract addresses and private service addresses have been intentionally omitted.

- Portfolio: https://brewerlogic.com/
- CV: https://brewerlogic.com/Adam-Brewer-Senior-Full-Stack-Engineer-CV.pdf
