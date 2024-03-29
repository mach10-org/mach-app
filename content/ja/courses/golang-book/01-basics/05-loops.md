---
title: ループ文
description: ステートメントの繰り返しとリスト構造の反復、ループの制御方法について
lastmod: 2023-05-26T02:38:25.874Z
---

# ループの操作

この章では、Goでのループの操作について説明します。ループはコード内のステートメントを繰り返し実行するために使用されます。

## はじめに

この章では以下の内容をカバーします：

- `for`を使用したループ文
- ループを終了する条件の設定
- 配列の反復に`range`を使用する方法
- `continue`と`break`を使用してループを制御する方法

## ループ文の必要性

一連の命令を繰り返し実行したい場合があります。例えば、処理する必要がある注文のリストがあるかもしれません。または、行ごとにファイルを読み込む必要があるかもしれません。他にもさまざまな計算があるかもしれません。どのような状況でも、ループ構造が必要になる可能性があります。では、Goではどのようなオプションがあるのでしょうか？

`for`ループを使用します。以下の3つの主要な方法で使用することができます：

- **増分ステップ**。変数の助けを借りて、開始点、終了条件、増分ステップを定義します。これが「クラシックな」forループです。以下はその例です：

  ```go
  for i := 0; i < 10; i++ {
    // これらのステートメントを実行する
  }
  ```

- **while**。多くのプログラミング言語では`while`キーワードがありますが、Goにはありません。しかし、同様にforループを使用することができます。初期化ステップと増分ステップを省略し、次のようなコードになります：

  ```go
  for <条件> {
    // これらのステートメントを実行する
  }
  ```

- **for each**。最後に、配列のようなシーケンスに対して操作を行う`for-each`のような構造があります。これには`range`キーワードが使用されます：

  ```go
  for i, s := range array {
    // これらのステートメントを実行する
  }
  ```

## `for`ループ

通常のforループには3つの異なる部分があります：

- **初期化**。ここでは、変数を作成し、スターターの値を割り当てます。以下のようになります：

  ```go
  for i := 0;
  ```

  `;`の使用に注意してください。通常はセミコロンを使用しませんが、この構造では必要です。

- **条件**。次のステップは、増分を続けるかどうかを評価することです。ここではブール式を定義し、`true`の場合にループを続けます：

  ```go
  for i := 0; i < 10
  ```

  `i < 10`は、値が0から10の間（10になったらループが終了）である限り、`true`を返し、ループが続行されます。

- **増分**。このステップでは、ループ変数`i`が更新されます。一般的には1を加算しますが、任意の増分サイズ（負の値や正の値）を追加することもできます。

  ```go
  for i := 0; i < 10; i++ {

  }
  ```

  ここでは`i`が1で更新されます。このループは10回実行されます。

## 条件が満たされるまで`while`で繰り返す

このループの簡略版では、初期化ステップと増分ステップを省略します。条件ステップのみが残ります。このステップでは、変数が`true`または`false`であるかをテストし、ループが`false`で終了します。以下は例です：

```go
i := 1
for i < 10 {
  i++
  // 何かを行う
}
```

この場合、ループの外で`i`を宣言しています。ループ内では、ループ式が`false`に評価される値に変更する必要があります。そうしないと、無限ループになります。

以下は同じ考え方を使用した別のコードですが、この場合はユーザーからの入力を求めます：

```go
var keepGoing = true
answer := ""
for keepGoing {
  fmt.Println("Type command: ")
  fmt.Scan(&answer)
  if answer == "quit" {
    keepGoing = false
  }
}
fmt.Println("program exit")
```

プログラムの実行例は次のようになります：

```bash
Type command: test
Type command: something
Type command: quit
program exit
```

## `range`を使用したfor-eachの反復

次のループ構造では、配列や既知のシーケンスに対して操作を行います。各反復では、現在のインデックスと次の項目を取得することができます。以下はいくつかの例です：

```go
arr := []string{"arg1", "arg2", "arg3"}
for i, s := range arr {
  fmt.Printf("index: %d, item: %s \n", i, s)
}
```

`arr`は配列として定義され、`range`構文を使用して配列を反復処理します。各反復では、現在のインデックスが`i`に割り当てられ、配列の項目が`s`に割り当てられます。上記のコードの出力は次のようになります：

```
index: 0, item: arg1
index: 1, item: arg2
index: 2, item: arg3
```

## `continue`と`break`でループを制御する

これまでに、`for`構文の使用方法を3つ見てきました。ループを制御する方法もあります。以下のキーワードを使用してループを制御することができます：

- `break`：これによりループが終了します。

  ```go
  arr = []int{-1,2}
  for i := 0; i < 2; i++ {
    fmt.Println(arr[i])
    if arr[i] < 0 {
      break;
    }
  }
  ```

  出力は次のようになります：

  ```
  -1
  ```

  ループは最初の反復後に終了するため、`2`は出力されません。

- `continue`：次の反復に進みます。`break`がループを終了する場合、`continue`は現在の反復をスキップします。

  ```go
  arr = []int{-1,2,-1, 3}
  for i := 0; i < 4; i++ {
    if arr[i] < 0 {
      break;
    }
    fmt.Println(arr[i])
  }
  ```

  出力は次のようになります：

  ```
  2
  3
  ```

## 課題 - コマンドラインループの作成

コンソールアプリを作成する際には、ユーザーの入力を読み取ることがよくあります。ユーザーの入力は、プログラムで使用されるデータである場合もありますし、"save"、"print"、"backup"などのコマンドを入力する場合もあります。ここでは、後者の場合のプログラムを作成します。

1. _main.go_という名前のファイルを作成し、以下のコードを追加します：

   ```go
   package main

   import "fmt"

   func main() {

   }
   ```

1. `main()`メソッドに以下のコードを追加します：

   ```go
   var keepGoing = true
   answer := ""
   for keepGoing {
     fmt.Println("Type command: ")
     fmt.Scan(&answer)
     if answer == "quit" {
       keepGoing = false
     }
   }
   fmt.Println("program exit")
   ```

1. `go run main.go`と入力してコードを実行します：

   ```bash
   go run main.go
   ```

   以下のような出力が表示されるはずです：

   ```
   Type command: command
   Type command: quit
   program exit
   ```

## 🚀 チャレンジ

- "print"というコマンドを追加し、"printing file"と出力するようにしてください。

- ユーザーが"quit"と入力した場合にループを終了するために、変数`keepGoing`の代わりに`break`を使用できるか試してみてください。

## 解答例

```go
package main

import "fmt"

func main() {
  var keepGoing = true
   answer := ""
   for keepGoing {
     fmt.Println("Type command: ")
     fmt.Scan(&answer)
     if answer == "quit" {
       keepGoing = false
     }
   }
   fmt.Println("program exit")
}
```