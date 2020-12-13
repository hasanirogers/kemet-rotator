# \<kemet-rotator>

## Installation
```bash
npm i @kemet/kemet-rotator
```

## Usage
```js
import '@kemet/kemet-rotator/kemet-rotator.js';
```

```html
<kemet-rotator
  rotation-speed="5000"
  transition-speed="2s">
</kemet-rotator>
```

```js
const rotator = document.querySelector('kemet-rotator');

rotator.messages = [
  'Hello! This is a rotator.',
  'Pass it an array and watch it rotator through the text.',
  'You can set the rotation speed and transition speed!',
  'You can pass it html like <strong><a href="http://kemet.online/rotator">this link</a></strong>!'
];
```

[Click here](http://kemet.online/rotator) for more docs.
