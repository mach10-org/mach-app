---
title: IfとElseを使ったブール論理
description: ブール変数を使って、If、Else、Else Ifを使った異なる実行パスを作成する方法について学びます。
lastmod: 2023-05-26T02:36:24.931Z
---

# フロー制御

この章では、アプリケーションのフローを制御するための`if`と`else`の構文について学びます。

## はじめに

この章では以下の内容をカバーします：

- ブール論理の扱い方
- ブールデータの作成
- `if`、`else if`、`else`などの構文の使用方法

## フロー制御とは

プログラム内でブール論理を使用することは、コードを異なる実行パスにすることを意味します。

> それはどういう意味ですか？

それは、与えられたデータによってプログラムが複数の実行パスを持つことができるということです。

> なるほど、具体的な例を見せてもらえますか？

もちろんです。以下のコードを考えてみてください：

```go
printMessage := true

if printMessage {
  fmt.Println("メッセージ")
}
```

もし`printMessage`が`true`であれば、文字列"メッセージ"が表示されます。もし`false`であれば、何も表示されません。

> なるほど、理解しました。

## `if`の構文

すでに値によって実行されるかどうかが異なるコードの例を見てきました。それを可能にするのが`if`の構文です。`if`は以下のようにブール式を受け取ります：

```go
if true {
  // ここにある文は常に実行されます
}
```

### ブール変数の使用

ブール値をブール式の一部として使用する場合、評価する必要があります。以下はその例です：

```go
accountBalance = 100
accountCredit = 200
if accountBalance + accountCredit > 0 {
  fmt.Println("お金を使うことができます")
}
```

上記のプログラムは、お金を使うことができるかどうかを正しく評価します。ただし、条件が満たされない場合に何かを表示したい場合は、`else`を使用することができます。

### `else`の導入

先ほどのコードを改善したいと思うかもしれません。`else`節は、`if`が`false`に評価された場合に実行されます。以下にその追加方法を示します：

```go
accountBalance = 100
accountCredit = 200
if accountBalance + accountCredit > 0 {
  fmt.Println("お金を使うことができます")
} else {
  fmt.Println("お金がないので、追加の資金を入れてください")
}
```

## `else if`の使用

`if`と`else`だけでもかなりのことができますが、場合によっては不十分な場合もあります。例えば、試験の点数に応じて異なるレベルで評価する必要があるかもしれません。そのような場合には、`else if`構文が必要です。これは、`if`構文が`false`に評価された場合に評価される構文です。`else`とは異なり、式も受け取ります。以下はその使用例です：

```go
if testScore >= testScoreGrade5 {
  fmt.Println("最高の成績")
 } else if testScore >= testScoreGrade4 {
  fmt.Println("優秀な成績で合格")
 } else if testScore >= testScoreGrade3 {
  fmt.Println("合格")
 } else {
  fmt.Println("不合格")
 }
```

## 複数の式

式は複数の変数や条件を検査することができます。それをサポートするために使用できるブール演算子があります。以下によく使用される演算子のいくつかを示します：

- `&&`は、左側と右側の値が両方とも`true`の場合に`true`と評価されます。以下はその使用例です：

  ```go
  hasGas := true
  hasKeyInIgnition := true
  if hasGas && hasKeyInIgnition {
    fmt.Println("車を運転できます")
   }
  ```

  上記のコードでは、`hasGas`と`hasKeyInIgnition`が両方とも`true`なので、式は`true`と評価されます。

- `||`は、左側または右側の値が`true`の場合に`true`と評価されます。以下はその使用例です：

  ```go
  hasBurger := true
  hasSandwich := false

  if hasBurger || hasSandwich {
    fmt.Println("食べることができます")
  }
  ```

  上記のコードでは、`hasBurger`が`true`であるため、式は`true`と評価されます。

- `!`は、式を否定します。以下はその例です：

  ```go
  hasSandwich := false

  if !hasSandwich {
   fmt.Println("サンドイッチがないので、餓死します。私はサンドイッチしか食べません")
  }
  ```

  上記のコードでは、式は`!`によって否定されるため、`true`と評価されます。

## 課題 - ブール論理をテストするプログラムを作成する

この課題では、さまざまなブール論理をテストするプログラムを作成します。

1. _main.go_というファイルを作成し、以下の内容を記述します：

   ```go
    package main

    import "fmt"

    func main() {
     testScoreGrade5 := 80
     testScoreGrade4 := 60
     testScoreGrade3 := 50
     testScore := 49

     hasGas := true
     hasKeyInIgnition := true

     hasBurger := true
     hasSandwich := false

     printMessage := true
     if printMessage {
      fmt.Println("メッセージ")
     }

     if testScore >= testScoreGrade5 {
      fmt.Println("最高の成績")
     } else if testScore >= testScoreGrade4 {
      fmt.Println("優秀な成績で合格")
     } else if testScore >= testScoreGrade3 {
      fmt.Println("合格")
     } else {
      fmt.Println("不合格")
     }

     if hasGas && hasKeyInIgnition {
      fmt.Println("車を運転できます")
     }

     if hasBurger || hasSandwich {
      fmt.Println("食べることができます")
     }

     if !hasSandwich {
      fmt.Println("サンドイッチがないので、餓死します。私はサンドイッチしか食べません")
     }
    }
   ```

1. `go run main.go`コマンドを実行してプログラムを実行します。

   ```bash
   go run main.go
   ```

   以下の出力が表示されるはずです：

   ```
    メッセージ
    不合格
    車を運転できます
    食べることができます
    サンドイッチがないので、餓死します。私はサンドイッチしか食べません
   ```

1. コードをいじってみてください。`testScore`の値を51、62、3、90に変更すると、出力はどのように変化しますか？

## 🚀 チャレンジ

テストの点数は負になるべきではありません。どのようにしてそのチェックを追加できるでしょうか？

## 解答例

```go
package main

import "fmt"

func main() {
 testScoreGrade5 := 80
 testScoreGrade4 := 60
 testScoreGrade3 := 50
 testScore := 49

 hasGas := true
 hasKeyInIgnition := true

 hasBurger := true
 hasSandwich := false

 printMessage := true
 if printMessage {
  fmt.Println("メッセージ")
 }

 if testScore >= testScoreGrade5 {
  fmt.Println("最高の成績")
 } else if testScore >= testScoreGrade4 {
  fmt.Println("優秀な成績で合格")
 } else if testScore >= testScoreGrade3 {
  fmt.Println("合格")
 } else {
  fmt.Println("不合格")
 }

 if hasGas && hasKeyInIgnition {
  fmt.Println("車を運転できます")
 }

 if hasBurger || hasSandwich {
  fmt.Println("食べることができます")
 }

 if !hasSandwich {
  fmt.Println("サンドイッチがないので、餓死します。私はサンドイッチしか食べません")
 }
}

```

## レビューと自己学習

この[公式チュートリアル](https://go.dev/tour/flowcontrol/6)を参照して、フロー制御について学習してみてください。Goのサンドボックスを使用しています。