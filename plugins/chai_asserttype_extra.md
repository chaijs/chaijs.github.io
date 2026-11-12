---
layout: plugin
permalink: "plugins/chai-asserttype-extra/"
pluginName: chai_asserttype_extra
---

# chai-asserttype-extra

Chai 類型斷言外掛程式，支援 TypeScript，提供多種類型檢查方法。

Chai plugin for type assertions with TypeScript support, providing various type checking methods.

## 特色 (Features)

- 支援多種類型檢查 / Supports various type checking (number, string, array, etc.)
- 整合自定義數字檢查（integer, float, infinity, zero, positive, negative）/ Integrates custom number checks
- 支援 TypeScript 類型推斷 / Supports TypeScript type inference
- 提供鏈式呼叫方法 / Provides chainable methods
- 多種安裝方式 / Multiple installation methods

## 安裝 (Installation)

```bash
npm install chai chai-asserttype-extra
# or
yarn add chai chai-asserttype-extra
```

## 使用方式 (Usage)

### 引入方式 (Import Options)

```typescript
// CommonJS
const ChaiPluginAssertType = require('chai-asserttype-extra');

// ES Module
import ChaiPluginAssertType from 'chai-asserttype-extra';
import { ChaiPlugin as ChaiPluginAssertType } from 'chai-asserttype-extra';
```

### 安裝外掛程式 (Install Plugin)

```typescript
// 方法一：使用 install() 自動處理 TypeScript 類型 / Method 1: Use install() for TypeScript type handling
const chai = ChaiPluginAssertType.install();

// 方法二：傳入現有的 Chai 實例 / Method 2: Pass existing Chai instance
const chai = ChaiPluginAssertType.install(require('chai'));

// 方法三：直接使用 use() / Method 3: Direct use with use()
const chai = require('chai');
chai.use(ChaiPluginAssertType);
```

## 支援的類型檢查 (Supported Type Checks)

### 列出所有方法 (List All Methods)

```typescript
console.log(ChaiPluginAssertType.list());
// [ 'array', 'boolean', 'date', 'float', 'function', 'integer',
//   'nan', 'negative', 'null', 'number', 'object', 'positive',
//   'regexp', 'string', 'undefined', 'zero' ]
```

### 數字類型 (Number Types)

```typescript
// 基本數字 / Basic number
expect(1).to.be.number();
expect(27.11).to.be.number;

// 整數 / Integer
expect(27).to.be.integer();
expect(27).to.be.integer;

// 浮點數 / Float
expect(27.11).to.be.float();
expect(27.11).to.be.float;

// 無限大 / Infinity
expect(Infinity).to.be.infinity();

// 零 / Zero
expect(0).to.be.zero();
expect(-0).to.be.zero();

// 正數 / Positive
expect(5).to.be.positive();

// 負數 / Negative
expect(-5).to.be.negative();

// NaN
expect(NaN).to.be.nan();
```

### 其他類型 (Other Types)

```typescript
// 字串 / String
expect('').to.be.string();
expect('foobar').to.be.string();

// 布林值 / Boolean
expect(true).to.be.boolean();
expect(false).to.be.boolean();

// 物件 / Object
expect({}).to.be.object();

// 陣列 / Array
expect([]).to.be.array();
expect([1, 2, 3]).to.be.array();

// 日期 / Date
expect(new Date()).to.be.date();

// 函式 / Function
expect(() => true).to.be.function();

// 正規表示式 / RegExp
expect(/abc/).to.be.regexp();

// null
expect(null).to.be.null();

// undefined
expect(undefined).to.be.undefined();
```

## API 參考 (API Reference)

### `ChaiPluginAssertType.list()`

取得所有支援的類型檢查方法名稱陣列。

Returns array of all supported type checking method names.

### `ChaiPluginAssertType.install(chai?)`

安裝外掛程式並回傳 Chai 實例。

Installs plugin and returns Chai instance.

| 參數 (Parameter) | 類型 (Type) | 說明 (Description) |
|-----------------|------------|-------------------|
| `chai` | `ChaiObject` | 可選的 Chai 實例 / Optional Chai instance |

## 參考連結 (Reference)

- [GaneshSPatil/chai-asserttype](https://github.com/GaneshSPatil/chai-asserttype) - 原始靈感來源 / Original inspiration

## 授權 (License)

ISC
