# flow-remove-imports

A tool for testing and comparing different methods of removing Flow type imports from JavaScript code.

## Installation

```bash
pnpm install
```

## Usage

```bash
node index.js
```

## Results

```
Case 1 - removing type only imports:
Input                      [37]:  import { type x } from 'some-module';
Output - Babel             [37]:  import { type x } from 'some-module';
Output - Babel Strip Types [0]:
Output - Flow Strip Types  [37]:  import {        } from 'some-module';

Case 2 - preserving empty import:
Input                      [29]:  import {} from 'some-module';
Output - Babel             [21]:  import 'some-module';
Output - Babel Strip Types [21]:  import 'some-module';
Output - Flow Strip Types  [29]:  import {} from 'some-module';

Case 3 - mixed with DefaultImport:
Input                      [52]:  import DefaultImport, { type x } from 'some-module';
Output - Babel             [52]:  import DefaultImport, { type x } from 'some-module';
Output - Babel Strip Types [40]:  import DefaultImport from 'some-module';
Output - Flow Strip Types  [52]:  import DefaultImport, {        } from 'some-module';
```
