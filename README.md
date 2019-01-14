# RIDI Pay [![Build Status](https://travis-ci.com/ridi/pay-frontend.svg?token=16qtyzyM3jfWvR4jy2oZ&branch=master)](https://travis-ci.com/ridi/pay-frontend)

> RIDI Pay Web Frontend

## Security

All security bugs in RIDI Pay should be reported by email to security@ridi.com.

## Requirements

- [Docker](https://www.docker.com/)
- [traefik](https://github.com/ridi/traefik/blob/master/README.md)
- [Yarn](https://yarnpkg.com/) (for development)

## Getting Started

**Set environments**

```sh
$ cp .env.example .env
```

**Serve with TLS**

> First run [traefik](https://github.com/ridi/traefik/blob/master/README.md),

```sh
$ docker-compose up [-d] [--build]
```

## Development

**Install dependencies for IDE**

```sh
$ yarn install --frozen-lockfile
```

**Rebuild docker image, after modifying depencencies**

```sh
$ yarn add/remove [-D] packages
$ docker-compose up --build [--force-recreate]
```
