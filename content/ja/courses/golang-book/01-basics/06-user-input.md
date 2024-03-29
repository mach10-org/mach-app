---
title: ユーザー入力
description: コンソールからユーザー入力を読み取る方法
lastmod: 2023-05-26T02:39:31.932Z
---

# ユーザー入力の読み取り

ユーザー入力を読み取る方法について、より簡単なテクニックとフォーマッタを使用したより高度な方法の両方を学びます。

## はじめに

この章では以下の内容をカバーします：

- ユーザー入力を読み取るための `Scan()` メソッド
- 1つの入力を読み取る方法
- 複数の入力を読み取る方法
- フォーマッタを使用する方法

## ユーザー入力

コンソールからユーザー入力を読み取ることは重要なことです。これにより、ユーザーはプログラムと対話する機会を得ることができます。ユーザーに入力を求める方法、1つの単語か複数の入力か、ユーザーが入力をスペースまたは改行で区切るかどうかなどを考慮する必要があります。どのアプローチを選んでも、選択したアプローチをユーザーに伝えるようにしましょう。

## `fmt` を使用したユーザー入力の管理

これまでに、`fmt` パッケージを使用してコンソールに出力する方法を見てきました。`fmt` パッケージを使用してユーザー入力を読み取ることもできます。

`fmt` ライブラリには、ユーザー入力をキャプチャするために使用する組み込みの `Scan()` メソッドがあります。

## 1つの入力を読み取る

最初はユーザーから1つの入力を読み取りたいと思うかもしれません。それが `Scan()` メソッドのデフォルトの動作です。

以下のコードは、ユーザー入力を収集する方法を示しています：

```go
package main

import "fmt"

func main() {
    var response string
    fmt.Scan(&response)
    fmt.Println("ユーザーが入力した内容: ", response)
}
```

`Scan()` メソッドに対して `response` 文字列を参照として送信する方法に注目してください。`Scan()` メソッドは、送信した変数を変更するため、このように行われます。

このコードを実行すると、以下の出力が表示されます：

```
hello
ユーザーが入力した内容: hello
```

## 複数の入力を読み取る

`Scan()` メソッドに複数の引数を指定することができます。複数の引数を指定することで、複数のユーザー入力を収集し、`Scan()` 関数内で各入力をカンマで区切ることができます。このテクニックを適用する方法は次のとおりです：

```go
var a1, a2 string
// 複数の入力を受け取る
fmt.Scan(&a1, &a2)

// ユーザー入力を出力するためのフォーマットされた文字列
str := fmt.Sprintf("a1: %s a2: %s", a1, a2)
```

`a1` と `a2` を `Scan()` に送信し、それらをカンマで区切ります。では、このコードはどのように動作するのでしょうか？

このコードを実行すると、ユーザーは2つの方法で入力することができます。ユーザーはスペースで値を区切るか、改行で区切るかのいずれかです：

```
hi you
a1: hi a2: you
```

または改行で区切る場合：

```
hi
you
a1: hi a2: you
```

## `Scanf()` を使用してフォーマッタで入力を読み取る

これまでに、スペースと改行を区切り文字として入力を収集する方法を見てきました。入力を収集する方法を具体的に指定することもできます。ユーザーが "INV200" や "INV114" のような請求書番号を入力することを想像してみてください。あなたが興味を持っているのは番号部分であり、または接頭辞にも興味があるかもしれません。

この問題の解決策は、`Scanf()` 関数にあります。フォーマッタを使用することができます。フォーマッタを使用すると、興味のあるユーザー入力の部分を選択し、それを希望する変数に配置することができます。

上記の場合、次のようなコードを作成できます：

```go
var prefix string
var no int
// inv110
fmt.Scanf("%3s%d", &prefix, &no)
fmt.Printf("接頭辞: %s, 請求書番号: %d", prefix, no)
```

`Scanf()` の最初の引数、つまり `"%3s%d"` に興味があります。これは、最初の3文字 `"%3s"` を取り、それを文字列として解釈します。残りの部分を数値として解釈し、変数に配置します。

このプログラムを実行すると、次のような出力が得られます：

```
inv200
接頭辞: inv, 請求書番号: 200
```

"inv" が `prefix` に配置され、200 が `no` 変数に配置されます。

## 詳細を学ぶ

この領域についてさらに学ぶには、次のリンクを参照してください：<https://pkg.go.dev/fmt#Scanf>

## 課題 - ユーザー入力の読み取り

この課題では、カードゲームのためにユーザー入力を読み取ります。目的は、プレイヤーの名前をキャプチャすることです。

1. 以下の内容で _main.go_ ファイルを作成します：

   ```go
   package main

   import "fmt"

   func main() {

   }
   ```

1. `main()` メソッドに以下のコードを追加します：

   ```go
   fmt.Println("プレイヤーの名前を入力してください（スペースまたは改行で区切ってください）：")
   var player1, player2 string
   fmt.Scan(&player1, &player2)
   fmt.Println("プレイヤーは: ", player1, player2)
   ```

1. `go run main.go` を使用してプログラムを実行します：

   ```bash
   go run main.go
   ```

   以下の出力が表示されるはずです：

   ```
   プレイヤーの名前を入力してください（スペースまたは改行で区切ってください）：
   Alice Bob
   プレイヤーは:  Alice Bob
   ```

## 🚀 チャレンジ

プログラムを変更して、まず複数のプレイヤーを受け取り、その後すべてのプレイヤーに名前が付けられるようにしてみてください。以下はそのようなプログラムの例です：

```
プレイヤーの数を入力してください：
3
Player 1 の名前を入力してください：
Alice
Player 2 の名前を入力してください：
Bob
Player 3 の名前を入力してください：
Jean
プレイヤーは: Alice Bob Jean
```

## 解答例

```go
package main

import "fmt"

func main() {
 fmt.Println("プレイヤーの名前を入力してください（スペースで区切ってください）：")
 var player1, player2 string
 fmt.Scan(&player1, &player2)
 fmt.Println("プレイヤーは: ", player1, player2)
}
```