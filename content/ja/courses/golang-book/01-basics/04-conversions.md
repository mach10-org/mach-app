---
title: 文字列と数値の変換
description: \'strconv\' ライブラリを使用してプリミティブ型と文字列の間で変換する方法について説明します。
lastmod: 2023-05-26T02:36:47.549Z
---

# 型の変換

この章では、文字列と数値の間での変換方法について説明します。

## はじめに

この章では以下の内容を説明します。

- データ変換が意味を持つ使用例の紹介
- `strconv` ライブラリの使用方法の紹介

## なぜ型を変換するのか

異なるデータ型が存在し、それらの間で変換が必要な場合があります。たとえば、表示上やその他の理由でテキストと数値の間を変換する必要があります。また、情報を失わずに数値と小数点の間を変換する必要があります。

Goで変換を扱うための主要なパッケージは `strconv` です。

## 使用例 - コマンドライン引数

まず、文字列から始まり、それを数値に変換する必要がある一般的なケースであるコマンドライン引数を示します。プログラムでコマンドライン引数を使用するには、`os` パッケージが必要です。

`os.Args` は、コマンドライン引数を表す配列を指します。特定の引数にアクセスするには、インデックス演算子 `[]` を使用します。

```go
arg := os.Args[1]
```

次のようにプログラムを実行できます。

```bash
go run main.go 1
```

その場合、`arg` には 1 が格納されます。

### 型の特定

上記のコードでの `arg` の型は何でしょうか？いくつかの方法があります。

- **IDE**。たとえば、Visual Studio CodeとGoプラグインを使用している場合、コード上にカーソルを合わせると、`os.Args` が文字列の配列 `string[]` であることが表示されます。
- **PrintF() と %T**。型を特定する最も簡単な方法の1つは、次のように入力することです。

  ```go
  Printf("%T", os.Args[1])
  Printf("%T", 1)
  ```

  以下のような出力が得られます。

  ```
  string
  int
  ```

- **型の強制変換**。次のようにコードを変更して整数に強制変換しようとすることもできます。

  ```go
  var no int = os.Args[1]
  ```

  しかし、エラーが発生します。

  ```
  cannot use os.Args[1] (type string) as type int in assignment
  ```

- **リフレクションの使用**。上記のように、`reflect` パッケージを使用して型を特定する別の方法もあります。

  ```go
  package main

  import (
    "reflect"
    "fmt"
    "os"
  )

  func main () {
    arg := os.Args[1]
    fmt.Println(reflect.TypeOf(arg))
  }
  ```

  これにより、プログラムは型として "string" を出力します。

### `strconv` による問題の解決

では、何の型であるかがわかったとして、たとえばコマンドライン引数（`string` 型）を計算機プログラムに渡す必要がある場合はどうでしょうか？

以下のコードを考えてみましょう。現時点では、これはコンパイルされません。

```go
package main

import (
  "fmt"
  "os"
)

func add(first int, second int) int {
  return first + second
}

func main() {
  add(os.Args[1], os.Args[2]) // これはコンパイルされません
}
```

その理由は、`os.Args[1]` と `os.Args[2]` の値が `string` 型であり、`int` 型ではないためです。この問題を修正するには、変換パッケージ `strconv` を使用する必要があります。

## `strconv` を使用した文字列から整数への変換

文字列を整数に変換するには、`strconv` を使用し、`Atoi()`（Ascii to integer の略）関数を呼び出します。

```go
package main

import (
 "fmt"
 "os"
 "strconv"
)

func add(first int, second int) int {
 return first + second
}

func main() {
 no1, _ := strconv.Atoi(os.Args[1])
 no2, _ := strconv.Atoi(os.Args[2])
 var sum = add(no1, no2)
 fmt.Println(sum)
}
```

ここで `_` は「どちらでもよい」という意味です。`Atoi()` を呼び出すと、数値とエラー（失敗した場合）の2つが返されます。

### 変換エラーの処理

エラーを処理するには、変数 `err` に格納し、それを検査する必要があります。`nil` でない場合はエラーが発生していることを意味します。

以下にその動作をエンコードする方法を示します。

```go
package main

import (
 "fmt"
 "os"
 "strconv"
)

func main() {
 no, err := strconv.Atoi(os.Args[1])
 fmt.Println(no)
 if err != nil {
  fmt.Println(err)
  fmt.Println("Couldn't convert: " + os.Args[1])

 } else {
  fmt.Println(no)
 }
}
```

上記のプログラムをコンパイルして次のように実行してみてください。

```bash
main 1 # 1
main hi # trconv.Atoi: parsing "hi": invalid syntax, Couldn't convert: hi
```

## 文字列から整数へのパース

文字列を整数に変換する別の方法があります。それは `ParseInt()` メソッドを使用する方法です。ただし、変換だけでなく、2つのことを行います。

- **基数**：数値を解釈するための基数を選択できます。
- **ビットサイズ**：0から64までのビットサイズを指定できます。

メソッドの構文は次のようになります。

```go
ParseInt(<s string>, <base int>, <bit int>) (int64, error)
```

以下にいくつかの例を示します。

```go
package main

import (
 "fmt"
 "reflect"
 "strconv"
)

func main() {
 var no int = 100
 fmt.Println(reflect.TypeOf(no))

 var intStr string = "100"
 fourBaseEightBitInt, _ := strconv.ParseInt(intStr, 4, 8)    // 16 と int64 になります
 tenBaseSixteenBitInt, _ := strconv.ParseInt(intStr, 10, 16) // 100 と int64 になります
 fmt.Println(reflect.TypeOf(fourBaseEightBitInt))
 fmt.Println(reflect.TypeOf(tenBaseSixteenBitInt))
}
```

## 整数から文字列へ

逆の場合もあります。整数があり、それを文字列にしたい場合は、`Itoa()` 関数（integer to ascii）を使用できます。以下に例を示します。

```go
var noOfPlayers = 8
str := strconv.Itoa(noOfPlayers)
```

## その他のパース

`strconv` ライブラリは、文字列から別の形式に変換したり、その逆を行いたい場合に使用するものです。[strconv ライブラリの詳細はこちら](https://pkg.go.dev/strconv)をご覧ください。

## 課題

2つの数値を足し合わせるアプリを作成してください。値はコマンドラインから取得します。プログラムの実行方法は次のとおりです。

```bash
go run main.go 2 4
6
```

## 解答例

```go
package main

import (
 "fmt"
 "os"
 "strconv"
)

func add(no int, secondNumber int) int {
 return no + secondNumber
}

func main() {
 no1, _ := strconv.Atoi(os.Args[1])
 no2, _ := strconv.Atoi(os.Args[2])
 var sum = add(no1, no2)
 fmt.Println(sum)
}
```

## 🚀 チャレンジ

次のようにプログラムを実行した場合、どうなるでしょうか？

```bash
go run main.go one two
```

変換エラーを処理し、変換エラーが発生した場合に `panic()` を呼び出してください。