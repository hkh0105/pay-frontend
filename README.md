# frontend [![Build Status](https://travis-ci.com/ridi/pay-frontend.svg?token=16qtyzyM3jfWvR4jy2oZ&branch=master)](https://travis-ci.com/ridi/pay-frontend)

> RIDI Pay Web Frontend

## Security

All security bugs in RIDI Pay should be reported by email to security@ridi.com.

## Requirements

- [Yarn](https://yarnpkg.com/)

## Getting Started

**Install Dependencies**

```sh
$ yarn
```

**Set environment variables**

You can refer `.env.example` to see which variables are required.

**Start the Dev Server**

You can use `PORT` environment variable to run the server on a different port.

```sh
$ yarn start
```

**[optional] traefik config**

```toml
[frontends]
  [frontends.frontend-ridipay]
  backend = "backend-ridipay"
    [frontends.frontend-ridipay.routes.test_1]
    rule = "Host:pay.local.ridi.io"
[backends]
  [backends.backend-ridipay]
    [backends.backend-ridipay.servers.server1]
    url = "http://host.docker.internal:8090"
```
