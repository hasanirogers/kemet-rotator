```js script
import { html } from '@open-wc/demoing-storybook';
import '../kemet-rotator.js';

export default {
  title: 'KemetRotator',
  component: 'kemet-rotator',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# KemetRotator

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add kemet-rotator
```

```js
import 'kemet-rotator/kemet-rotator.js';
```

```js preview-story
export const Simple = () => html`
  <kemet-rotator></kemet-rotator>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <kemet-rotator title="Hello World"></kemet-rotator>
`;
```
