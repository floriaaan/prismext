<p align="center">
   <br/>
   
   <h1 align="center">Prismext</h1>
   <p align="center">Database management for NextJS+Prisma apps</p>
   <p align="center">
   A plug'n'play back-office solution for your apps
   </p>
   <p align="center" style="align: center;">
      <a href="https://packagephobia.com/result?p=prismext">
        <img src="https://packagephobia.com/badge?p=prismext" alt="Bundle Size"/>
      </a>
      <a href="https://www.npmtrends.com/prismext">
        <img src="https://img.shields.io/npm/dm/prismext" alt="Downloads" />
      </a>
      <a href="https://github.com/floriaaan/prismext/stargazers">
        <img src="https://img.shields.io/github/stars/floriaaan/prismext" alt="Github Stars" />
      </a>
      <a href="https://www.npmjs.com/package/prismext">
        <img src="https://img.shields.io/github/v/release/floriaaan/prismext?label=latest" alt="Github Stable Release" />
      </a>
   </p>
</p>

## Overview

Prismext is a plug'n'play back-office solution for your apps. It is built on top of [NextJS](https://nextjs.org/) and [Prisma](https://www.prisma.io/). Prismext repo is composed of two parts:

- [Prismext](https://github.com/floriaaan/prismext) - The main repo, which contains the core of the project
- [Prismext Examples](https://github.com/floriaaan/prismext/tree/main/examples) - A collection of examples to help you get started with Prismext

## Getting Started

```
npm install prismext
```

TODO: Add more info

## Features

### CRUD operations

Prismext provides a set of components to perform CRUD operations on your database. It is built on top of [Prisma](https://www.prisma.io/) and [NextJS](https://nextjs.org/).

Supported operations:

[X] Create
[X] Read
[ ] Update
[ ] Delete

### Pages

TO BE COMPLETED

### TypeScript

Prismext comes with built-in types to help you get started with Prismext configuration.
You can check the [Prismext Types](https://github.com/floriaaan/prismext/tree/main/src/types.ts) to see all the available types.

## Example

### Add API Route

```javascript
// pages/api/[...prismext]/index.(js|ts)
import { Prismext } from "prismext";
import prisma from "lib/prisma";

export default Prismext({
  prisma: {
    // You can bring your own prisma instance
    instance: prisma,
  },
});
```

### Add Prismext page

```jsx
// pages/prismext.(js|tsx) (or any other path, e.g. pages/admin/prismext.tsx)
import { PrismextPage } from "prismext/client";

// You can add a GetServerSideProps function to manage access to the page (with cookies or Nextauth.js for example)

const PrismextClient = () => {
  {
    /* You can add your own components here such as a "middleware" */
  }
  return <PrismextPage />;
};

export default PrismextClient;
```

## Security

If you think you have found a vulnerability (or not sure) in Prismext, please open Pull Requests/Issues/Discussions.

## Contributing

We're open to all community contributions!

## License

Apache-2.0
