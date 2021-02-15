# pretty-validate

A lightweight and minimalistic library designed for serverside validations.

## Installation and Usage
Install the library with `npm install pretty-validate`

#### Usage

Koa Example:
```javascript
import * as Router from "@koa/router";
import validate from 'pretty-validate';

export const router = new Router({});

router.post("/signin", async ctx => {
    try {
        validate(ctx.request.body, {
            username: {required: true, isString: true},
            password: {required: true, isString: true}
        });
    } catch (error) {
        const { message, details } = error;
        ctx.status = 400;
        ctx.body = { message, details };
    }
});
```

## License (MIT)

```
Copyright (c) 2021 Kamran Naghiyev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```