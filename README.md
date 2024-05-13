# Serverless & NestJS Template

This project contains a backend starter template for running NestJS GraphQL APIs on AWS Lambda with security and performance best practices.

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Features
- MySQL Database config with TypeORM migrations
- Docker database for local development
- AWS Deployment with [Serverless Framework](https://www.serverless.com/)
- AWS Lambda NodeJS 18x configuration and optimizations

### Authentication/Authorization
- Basic example of JWT authentication is included as an example

## Technology Choices

### NestJS
- Opinionated, mature backend framework with active community
- Supports dependency injection out of the box
- First-class typescript support

### AWS Lambda
- Pay-per-use pricing is ideal for early-stage startups where traffic and access patterns are unknown
- Cold starts can be minimized by keeping package bundles small, caching server between invocations and keeping lambdas warm

### Serverless framework
- Strong community of plugins and supports for NodeJS/Typescript

## Dependencies
- NodeJS
- NVM `brew install nvm`
- Yarn
- Docker
- VSCode
- AWS Account

## Setup
To be continued...