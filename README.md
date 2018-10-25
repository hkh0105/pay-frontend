# frontend [![Build Status](https://travis-ci.com/ridi/pay-frontend.svg?token=16qtyzyM3jfWvR4jy2oZ&branch=master)](https://travis-ci.com/ridi/pay-frontend)

> RIDI Pay Web Frontend

## Requirements

- [Yarn](https://yarnpkg.com/)

## Getting Started

**Install Dependencies**

```sh
$ yarn
```

**Create a local certificate**

```sh
$ make cert
```

**Add a host name**

```
127.0.0.1    pay.ridi.io
```

**Set environment variables**

You can refer `.env.example` to see which variables are required.

**Start the Dev Server**

You can use `PORT` environment variable to run the server on a different port.

```sh
$ yarn start
```
