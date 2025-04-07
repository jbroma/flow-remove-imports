# flow-remove-imports

A tool for comparing behaviour of babel and flow-remove-types when removing type imports.

## Installation

```bash
pnpm install
```

## Usage

```bash
node index.js
```

## Results

```js

Case 1 - "removing type only imports":
Input                      [37]:  import { type x } from 'some-module';
Output - Babel             [37]:  import { type x } from 'some-module';
Output - Babel Strip Types [0]:
Output - Flow Strip Types  [37]:  import {        } from 'some-module';

Case 2 - "mixed type and non-type imports":
Input                      [40]:  import { type x, y } from 'some-module';
Output - Babel             [40]:  import { type x, y } from 'some-module';
Output - Babel Strip Types [32]:  import { y } from 'some-module';
Output - Flow Strip Types  [40]:  import {         y } from 'some-module';

Case 3 - "preserving empty import":
Input                      [29]:  import {} from 'some-module';
Output - Babel             [21]:  import 'some-module';
Output - Babel Strip Types [21]:  import 'some-module';
Output - Flow Strip Types  [29]:  import {} from 'some-module';

Case 4 - "mixed with DefaultImport":
Input                      [52]:  import DefaultImport, { type x } from 'some-module';
Output - Babel             [52]:  import DefaultImport, { type x } from 'some-module';
Output - Babel Strip Types [40]:  import DefaultImport from 'some-module';
Output - Flow Strip Types  [52]:  import DefaultImport, {        } from 'some-module';

Case 5 - "mixed with DefaultImport - type":
Input                      [57]:  import type DefaultImport, { type x } from 'some-module';
Output - Babel             [57]:  import type DefaultImport, { type x } from 'some-module';
Output - Babel Strip Types [0]:
Output - Flow Strip Types  [57]:

Case 6 - "mixed with DefaultImport - typeof":
Input                      [59]:  import typeof DefaultImport, { type x } from 'some-module';
Output - Babel             [59]:  import typeof DefaultImport, { type x } from 'some-module';
Output - Babel Strip Types [0]:
Output - Flow Strip Types  [59]:
```
