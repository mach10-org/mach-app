---
title: 関数
description: 関数を作成することでコードを再利用しましょう。パラメータの扱い方や戻り値と戻り値の型の扱い方を学びましょう。
lastmod: 2023-05-26T02:40:23.201Z
---

# 関数の使用方法

この章では、関数の定義と使用方法について説明します。関数は、同じ種類のコードを多くの場所で使用する場合に便利です。関数を使用することで、繰り返しを減らすことができます。

## 概要

この章では以下の内容をカバーします：

- 関数とは何か、なぜ使用するのか。
- 関数の定義と呼び出し方。
- 複数の値の返却。

## 関数の利点

同じ一連のステートメントを複数の場所で繰り返し使用する場合は、関数を作成するのが適切です。関数には、ファイルへのログ出力、計算の実行、データソースへのアクセスなど、典型的な処理が含まれます。

## 最初の関数 `main()`

これまでに、`main()` という関数を次のように定義しました：

```go
func main(){
}
```

このような関数は1つだけ存在し、エントリーポイントと呼ばれ、プログラムの開始点を表します。ただし、他の関数も定義することができます。

## 関数の構造

関数はさまざまな部分で構成されています。これらの部分を組み合わせることで、多くの場所で再利用可能なコードを作成することができます。

以下の部分に注意してください：

- `func` キーワード。
- **パラメータ**、0個以上のパラメータ。
- **関数本体**、つまり関数の動作を示すステートメント。
- **戻り値**がある場合、戻り値の構造。

以下は例です：

```go
func add(first int, second int) int {
  return first + second
}
```

上記のコードでは、関数の名前は `add()` です。パラメータは `first` と `second` です。関数本体は次のコードで構成されています：

```go
return first + second
```

## 戻り値の追加

戻り値を追加するには、関数の括弧の後に戻り値の型を追加します。以下は例です：

```go
add(firstNumber int, secondNumber int) int {
 ...
}
```

`int` 型の戻り値を追加したため、関数は何かしらの値を返す必要があります。値を返す方法は、キーワード `return` を使用することです。以下は例です：

```go
add(firstNumber int, secondNumber int) int {
  return firstNumber + secondNumber
}
```

### 名前付き戻り値

以下のように戻り値のパラメータに名前を付けることもできます：

```go
add(firstNumber int, secondNumber int) (sum int) {
  sum = firstNumber + secondNumber
  return
}
```

- `sum` は関数のプロトタイプ宣言 `(sum int)` の一部であり、値 `sum = firstNumber + secondNumber` が代入されています。

- `return` は独立した行にありますが、戻り値の変数が存在するため、このコードはコンパイルされます。

## 複数の戻り値

複数の値を返すことも可能です。

`(sum int)` のように名前付きパラメータを返すようにした場合、`(sum int, product int)` のようにカンマで区切ることができます。複数の値を返す場合、以下のように型を指定します：

```go
sum = first + second
product = first * second
return
```

`sum` と `product` に値が代入され、`return` が行われています。

これらをまとめると、以下のような関数が得られます：

```go
func calc(first int, second int) (sum int, product int) {
  sum = first + second
  product = first * second
  return
}
```

関数を呼び出すには、次のように記述します：

```go
sum, product := calc(1, 2)
fmt.Println(sum)
fmt.Println(product)
```

戻り値の2つの値を変数 `sum` と `product` に代入していることに注意してください。

## 課題 - プログラムに関数を追加する

1. _main.go_ というファイルを作成し、以下の内容を追加します：

   ```go
   package main

   import "fmt"

   func main() {

   }
   ```

1. メッセージを出力するために使用できる `log()` という関数を追加します。

   プログラムに追加すると、コードは次のようになります：

   ```go
   package main

   import "fmt"

   func log() {
     fmt.Println("message")
   }

   func main() {
     log()
   }
   ```

この時点では、`log()` 関数は非常に柔軟ではありません。呼び出されるたびに "message" を出力します。

`log()` 関数をより柔軟にするために、パラメータを追加しましょう。

### パラメータの追加

パラメータにはデータ型が必要です。この場合、`string` 型にします。

1. 次のように括弧 `()` 内にパラメータを追加します：

   ```go
   func log(message string) {
     fmt.Println(message)
   }

   // 使用方法
   log("hi")
   log("there")
   ```

`log()` 関数が `message` というパラメータを受け取り、その型が `string` であることに注意してください。コードが柔軟になりました。

## 解答例

```go
package main

import "fmt"

func log(message string) {
  fmt.Println(message)
}

func main() {
  log("hi")
  log("there")
}
```