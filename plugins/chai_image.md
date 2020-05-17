---
layout: plugin
permalink: plugins/chai-image/
pluginName: chai-image
---

# chai-image

[![Build Status](https://github.com/mooyoul/chai-image/workflows/workflow/badge.svg)](https://github.com/mooyoul/chai-image/actions)
[![Semantic Release enabled](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg)](http://mooyoul.mit-license.org/)

Extends Chai with assertions about images

```typescript
expect(bufImage).to.matchImage(bufExpectedImage);
```


![Example](example.png)

| Expected | Actual |
| --- | --- |
| ![Expected Image](fixtures/red_velvet_perfect_velvet_all_2_co_m_l.png) | ![Actual Image](fixtures/red_velvet_perfect_velvet_all_2_co_l.png)

| Diff (LEFT_TOP Aligned) | Diff (CENTER Aligned)
| --- | --- |
| ![Diff Image](fixtures/test_diff_left_top.png) | ![Diff Image](fixtures/test_diff_center.png) |

In this case, `matchImage` assertion will fail.

## Usage

Install `chai-image` to get up and running. 

```bash
$ npm install chai-image --save-dev
```

Then:

```typescript
import * as chai from "chai";
import { chaiImage } from "chai-image";

chai.use(chaiImage);

// Then either:
const expect = chai.expect;
// or:
const assert = chai.assert;
// or:
chai.should();
// according to your preference of assertion style

```

## Assertions

#### `matchImage(expected: Buffer, options?: MatchImageOptions)`

> NOTE: Currently it only supports PNG image format.

##### Example

```typescript
// Simple Example
import * as fs from "fs";

const bufActual = fs.readFileSync("actual.png");
const bufExpected = fs.readFileSync("expected.png");

expect(bufActual).to.matchImage(bufExpected);
```

```typescript
// Real-world Example
import * as sharp from "sharp";

class ImageService {
  public async transform(buf: Buffer): Promise<Buffer> {
    return await sharp(buf).resize().max(320, 320).png().toBuffer();
  }
}

const service = new ImageService();

describe("ImageService", () => {
  describe("#transform", () => {
    it("should transform image", async () => {
      const input = fs.readFileSync("fixtures/input.png");
      const output = fs.readFileSync("fixtures/output.png");
      
      expect(await service.transform(input)).to.matchImage(output);
    });
  });
});

```

Tests image matches to given image or not.

Image comparision is proceeded by [pixelmatch](https://github.com/mapbox/pixelmatch) library.
If output config is provided, `chai-image` will create some files to show diff results.



```typescript

enum Align {
  LEFT_TOP = "leftTop",
  CENTER = "center",
}

interface MatchImageOptions {
  // Custom diff config passed to pixelmatch
  diff?: DiffOptions;
  
  // Image aligning config for aligning different size image (default: Align.LEFT_TOP)
  align?: Align;
  
  // Output config
  // if specified, chai-image will create output files to visualize diff 
  output?: OutputOptions;
}

interface DiffOptions {
  threshold?: number;
  includeAA?: boolean;
  alpha?: number;
  aaColor?: [number, number, number];
  /* The color of differing pixels in the diff output. [255, 0, 0] by default. */
  diffColor?: [number, number, number];
}

interface OutputOptions {
  // Currently name is used to generate filename
  name: string;
  // Path of output directory (default: WORKDING_DIR/outputs)
  dir?: string;
  
  // Output creation conditions
  // Controls when to create output files (default: failure)
  on?: "failure" | "always";
  
  // Controls output file types (default: false)
  diffOnly?: boolean;
}
```

## Changelog

See [CHANGELOG](/CHANGELOG.md).

## Testing

```bash
$ npm run test
```

## Build

```bash
$ npm run build
```


## License
[MIT](LICENSE)

See full license on [mooyoul.mit-license.org](http://mooyoul.mit-license.org/)
