---
title: インターフェース
description: データをインターフェースとしてモデル化する方法とその実装方法について学びましょう
lastmod: 2023-05-26T02:57:42.084Z
---

# インターフェース

この章では、インターフェースとは何か、どのように使用するかについて説明します。

## イントロダクション

この章では以下の内容をカバーします：

- インターフェースとは何か、それが構造体とどのように異なるか
- 振る舞いの追加方法
- インターフェースの実装
- 型アサーション
- 値の変更

## インターフェース

インターフェースについて説明するために、まずは構造体について話しましょう。構造体では、例えば車のような概念が持つべきプロパティを定義することができます。

```go
type Car struct {
  make string
  model string
}
```

一方、インターフェースは異なることを伝えるために使用されます。構造体が車自体を記述するのに対して、インターフェースは車が何ができるかを記述します。

## インターフェース - 振る舞いの記述

インターフェースが構造体と異なることを説明したところで、なぜインターフェースを使用するのかについて考えてみましょう。インターフェースを使用する場合のいくつかの良い理由があります：

- **振る舞いの追加**。型に振る舞いを持たせたい場合には、インターフェースが必要です。
- **契約を通じたコミュニケーション**。他のコードを呼び出す場合、具体的な実装をできるだけ公開したくないことがよくあります。車と言う代わりに、走ることができるものを渡すことができると便利です。これにより、コードが柔軟になり、各型ごとに特定のコードを実装する必要がなくなり、特定の振る舞いに対応するコードを記述することができます。

### インターフェースの定義

インターフェースを定義するには、`type` キーワードと `interface` キーワードが必要であり、1つまたは複数の型が実装する必要があるメソッドのセットが必要です。以下に例を示します。

```go
type Describable interface {
  describe() string
}
```

別の例を示します。

```go
type Point struct {
  x int
  y int
}

type Shape interface {
  area() int
  location() Point
}
```

## インターフェースの実装

どの型でもインターフェースを実装することができます。同じインターフェースを複数の型が実装することもできます。`Rectangle` 型が `Shape` インターフェースを実装する方法を見てみましょう。

```go
type Rectangle struct {
  x int
  y int
}

func (r Rectangle) area() int {
  return r.x * r.y
}

func (r Rectangle) location() Point {
  return P{ x: r.x, y: r.y }
}
```

では、ここで何が起こっているのでしょうか？まず最初のメソッド `area()` を見てみましょう。

```go
func (r Rectangle) area() int {
  return r.x * r.y
}
```

通常の関数のように見えますが、関数名の前に `(r Rectangle)` という部分があります。これは、Goに対して `Rectangle` 型に特定の関数を実装していることを示すものです。`location()` の実装も同様です。

これらのメソッドを両方実装することで、`Rectangle` は `Shape` インターフェースを完全に実装しました。

### インターフェースの渡し方

インターフェースを完全に実装したので、それによって何ができるようになるのでしょうか？以下の2つのことができます。

- **プロパティと振る舞いの呼び出し**。この時点で、インスタンスを作成し、プロパティとメソッド（新しい振る舞い）の両方を呼び出す準備ができています。

  ```go
  var rectangle Rectangle = Rectangle{x: 5, y: 2}
  fmt.Println(rectangle.area()) // 10 を出力
  ```

  素晴らしいですね。`Rectangle` 型は `x` と `y` のプロパティと `Shape` の振る舞いの両方を持っています。

- **インターフェースの渡し方**。関数に振る舞いを渡すために、インターフェースを渡すことができます。

  ```go
  func printArea(shape Shape) {
    fmt.Println(shape.area())
  }
  ```

  これを実現するために、`Rectangle` インスタンスの構築方法を少し変更しましょう。

  ```go
  var shape Shape = Rectangle{x: 5, y: 2}
  printArea(rectangle) // 10 を出力
  ```

### `Square` の実装

さきほど作成したものの力を実感するために、別の構造体 `Square` を作成し、`Shape` を実装してみましょう。

```go
type Square struct {
  side int
}

func (s Square) area() int {
  return s.square * s.square
}
func (s Square) location() Point {
  return Point{x: s.side, y: s.side}
}

func main() {
  var shape Shape = Rectangle{x: 5, y: 2}
  var shape2 Shape = Square{side: 5}
  printArea(shape) // 10 を出力
  printArea(shape2) // 25 を出力
}
```

`printArea()` は `Rectangle` や `Shape` の内部に関与する必要がないため、その振る舞いを持つパラメーターが必要です。これが可能になるのは、`Shape` を実装していることです。

### 完全なコード

以下に完全なコードを示します。

```go
package main

import "fmt"

type Rectangle struct {
 x int
 y int
}

type Point struct {
 x int
 y int
}

type Square struct {
 side int
}

type Shape interface {
 area() int
 location() Point
}

func printArea(shape Shape) {
 fmt.Println(shape.area())
}

func (r Rectangle) area() int {
 return r.x * r.y
}

func (r Rectangle) location() Point {
 return Point{x: r.x, y: r.y}
}

func (s Square) area() int {
 return s.side * s.side
}

func (s Square) location() Point {
 return Point{x: s.side, y: s.side}
}

func main() {
 var shape Shape = Rectangle{x: 5, y: 2}
 var shape2 Shape = Square{side: 5}
 printArea(shape)  // 10 を出力
 printArea(shape2) // 25 を出力
}
```

## 型アサーション

これまで、`Rectangle` や `Square` は `Shape` インターフェースを実装していると説明しました。

次のコードを詳しく見てみましょう。

```go
var shape Shape = Rectangle{x: 5, y: 2}
var shape2 Shape = Square{side: 5}
printArea(shape)  // 10 を出力
printArea(shape2) // 25 を出力
```

`shape` と `shape2` を `Shape` 型として宣言しました。これは `printArea()` メソッドに渡すために便利です。しかし、`shape` の `Rectangle` のプロパティにアクセスする必要がある場合、どうすればいいでしょうか？試してみましょう。

```go
var shape Shape = Rectangle{x: 5, y: 2}
fmt.Println(shape.x) // shape.x は未定義です（型 Shape にはフィールドまたはメソッド x がありません）
```

うまくいきません。アンダーラインのフィールドにアクセスする方法を見つける必要があります。これを行うためには、_型アサーション_ と呼ばれるものを使用できます。

```go
var shape Shape = Rectangle{x: 5, y: 2}
fmt.Println(shape.(Rectangle).x) // 5 を出力
```

これでうまくいきました。`.(<型>)` は、基になる型が正しい型である場合に機能します。

## 値の変更

これまでのアプローチでは、データを読み取るメソッドを持つ構造体のインターフェースを実装してきました。では、データを変更したい場合はどうでしょうか？

以下に例を示します。

```go
package main
import "fmt"

type Car struct {
 speed int
 model string
 make string
}

type Runnable interface {
 run()
}

func (c Car) run() {
 c.speed = 10
}

func main() {
  c := Car{make: "Ferrari", model: "F40", speed: 0}
  c.run()
  fmt.Println(c.speed) // ?
}
```

このコードを実行すると、`0` が返されます。では、`run()` メソッドを見てみましょう。

```go
func (c Car) run() {
 c.speed = 10
}
```

これはうまくいくはずですよね？実際にはそうではありません。なぜなら、インスタンスを変更していないからです。そのため、参照を送る必要があります。

`run()` メソッドをわずかに変更して、`*` を追加します。

```go
func (c *Car) run() {
 c.speed = 10
}
```

これでコードが正しく動作するようになります。

## 課題

以下のコードから始めます。

```go
package main

type Point struct {
 x float32
 y float32
}

type Vehicle struct {
 velocity float32
 Point
}

func main() {
 v := Vehicle{
  velocity: 0,
  Point: Point{
   x: 0,
   y: 0,
  },
 }
 v.fly()
 fmt.Println(v.velocity)
 v.land()
 fmt.Println(v.velocity)
}
```

以下のインターフェースを実装してください。

```go
type Spaceship interface {
 fly()
 land()
 position() Point
}
```

プログラムを実行した結果は以下の通りである必要があります。

```
10
0
```

## 解答

```go
package main

import "fmt"

type Point struct {
 x float32
 y float32
}

type Vehicle struct {
 velocity float32
 Point
}

type Spaceship interface {
 fly()
 land()
 position() Point
}

func (v *Vehicle) fly() {
 v.velocity = 10
}

func (v *Vehicle) land() {
 v.velocity = 0
}

func (v Vehicle) position() Point {
 return v.Point
}

func main() {
 v := Vehicle{
  velocity: 0,
  Point: Point{
   x: 0,
   y: 0,
  },
 }
 v.fly()
 fmt.Println(v.velocity)
 v.land()
 fmt.Println(v.velocity)
}
```