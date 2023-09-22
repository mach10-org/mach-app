---
title: エラーハンドリング
description: コード内のエラーの管理方法について説明します。エラーの発生方法とそれに対処する方法の両方を学びます。
lastmod: 2023-05-26T02:41:18.154Z
---

# エラーハンドリング

この章では、エラーハンドリングについて説明します。

## はじめに

この章では以下の内容をカバーします。

- `panic`と`recover`を使用してエラーを発生させ、処理する方法。
- エラーを管理するためのより習慣的なアプローチとしてのエラーパターンの使用。

## エラー

私たちのアプリは完璧ではありません。エラーが発生することがあります。エラーは、私たちが書いたコードによって発生することもあれば、使用しているパッケージのコードによって発生することもあります。時には、悪い入力を与えた場合にコードがエラーをスローすることが意図されていることさえあります。

しかし、私たちのユーザーはこれらのエラーを処理することを期待しています。また、私たち自身のためにも、予期しないエラーが発生した場合にそれらのエラーを修正できるように、これらのエラーをログに記録する必要があります。

Goでエラーを処理するための2つの主要な方法があります。

- **panic/recover**。`panic`と`recover`は言語の構文です。他のプログラミング言語を知っている場合、これらはthrowとcatchのように機能します。具体的にはどういう意味でしょうか？エラーが発生し、エラーメッセージとスタックトレースがあり、それをキャッチして回復させるか、プログラムをクラッシュさせることができます。
- **エラーパターン**。これはGoの習慣的な方法として言及されます。アイデアは、関数呼び出しの結果とエラーオブジェクトを返すことです。エラーが発生した場合、エラーオブジェクトが含まれているか、エラーが発生しなかった場合は`nil`が含まれています。

## `panic()`でプログラムをクラッシュさせる

次の`Divide()`関数を見てみましょう。

```go
func Divide(nominator int, divider int) float32 {
  if divider == 0 {
    panic("can't divide by 0")
  }
  return float32(nominator) / float32(divider)
}
```

この関数には`if`文があります。もし`divider`が`0`であれば、`panic()`を呼び出します。では、その後に何が起こるのでしょうか？次のようなものが表示されます。

```
panic: can't divide by 0

goroutine 1 [running]:
main.Divide(...)
        /<path>/panic.go:20
main.main()
        /<path>/panic.go:33 +0x96
exit status 2
```

一番上には`panic()`に渡したエラー文字列が表示されます。つまり、文字列"can't divide by 0"です。その下には、エラーが発生した場所を示すエントリが表示されます。下から読んでいくと、エラーは33行目で発生し、20行目にあります。20行目は次の行です。

```go
panic("can't divide by 0")
```

では、私たちは望まない入力値から自分自身を保護する方法を持っています。しかし、プログラムをクラッシュさせることは必要なのでしょうか？場合によっては必要ですし、場合によっては必要ではありません。後者の場合には、`recover()`があります。

### `recover()`でエラーをキャプチャする

`recover()`を使用することは、エラーをキャプチャしてプログラムを継続させることです。続行する前に、`defer`という概念を学ぶ必要があります。`defer`は、近くの関数が返るまで関数の実行を遅延させる言語の構文です。以下に例を示します。

```go
defer fmt.Println("second")
fmt.Println("first")
```

このプログラムを実行すると、次のように表示されます。

```go
first
second
```

> `defer`は最後に実行されるものとして考えてください。

エラーをキャプチャするという文脈でこれがどのように役立つのでしょうか？エラーをキャプチャする場合、それをキャプチャするために行う必要があるのは、最後に実行されることです。先ほどの`Divide()`関数を見てみましょう。

```go
func Divide(nominator int, divider int) float32 {
  defer errorHandler()
  if divider == 0 {
    panic("can't divide by 0")
  }
  return float32(nominator) / float32(divider)
}
```

今回は、`defer errorHandler()`という行が追加されています。これは、最後に実行されるものです。`divider`の値によっては、`panic()`を呼び出すか、`return`文を呼び出します。

では、`errorHandler()`はどのようなものでしょうか？

```go
func errorHandler() {
  if r := recover(); r != nil {
    fmt.Println("Recovered ", r)
  }
}
```

`errorHandler()`では、`recover()`を呼び出し、その結果を変数`r`に代入し、`nil`かどうかをテストしています。`nil`でない場合はエラーが発生しているため、それを出力します。`nil`である場合は、ユーザーには何も表示されません。

## エラーハンドリングの改善

エラーハンドリングを改善するための手順があります。これまではエラーメッセージを出力していましたが、ログファイルからこのエラーを読んだ場合、どこで問題が発生し、入力データまたはコード自体を修正できるでしょうか？

以下のことを行うことができます。

- **エラーの検査**。エラーにはエラーメッセージだけでなく、スタックトレースも含まれています。
- **ログの記録**。これらのエラーを扱うために誰かに協力してもらいたい場合、ログファイルに記録する必要があります。

### `runtime/debug`でエラーを検査する

`runtime/debug`というライブラリがあります。このライブラリを使用すると、エラーが発生したときにスタックトレースやエラーの発生元など、詳細な情報を取得することができます。`Stack()`という関数はスタックトレースを生成します。以下に使用方法を示します。

```go
debug.Stack()
```

### `log`でエラーを記録する

`runtime/debug`はスタックトレースを生成できますが、これらのエラー情報をすべてファイルに記録することができれば便利です。ファイルにログを記録するには、`os`パッケージと`log`パッケージを使用します。

```go
f, err := os.OpenFile("logs", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
 if err != nil {
  log.Println(err)
 }
 log.SetOutput(f)
```

## `errors`パッケージを使用したエラーパターンの利用

他の言語では、何かが間違っていることを示すために例外を使用することが一般的です。

Goは異なる独自のアプローチを持っています。Goでは、実際の値と一緒に、関数の戻り値としてエラーを作成することを求めています。その後、関数を検査し、エラーが返されるかどうかを確認する必要があります。

上記のアプローチをサポートする`errors`パッケージがあります。

### エラーの定義

エラーを定義するには、エラーを説明する文字列を引数として`New()`関数を呼び出します。以下に例を示します。

```go
var NoTooSmall = errors.New("the number is too small")
```

次に、関数にエラーを追加する方法を見てみましょう。

### エラーを返す

エラーハンドリングとして`panic()`を使用する関数から始めましょう。

```go
func ReturnPositive(no int) int {
  if no > 0 {
    return no
  } else {
    panic("No too small")
  }
}
```

この関数を改善して、常に結果とエラーを返すようにします。

```go
func ReturnPositive(no int) (int, error) {
  if no > 0 {
    return no, nil
  } else {
    return 0, NoTooSmall
  }
}
```

`if`節では、すべてが正常な場合に`no`と`nil`を返します。`else`節では、ダミーの値とエラー`NoTooSmall`を返します。

### 結果を検査する

`ReturnPositive()`関数を呼び出し、この新しいパターンを使用する方法を見てみましょう。

```go
no, err := ReturnPositive(-2)
if err != nil {
  fmt.Println("error: ", err)
} else {
  fmt.Println("value:", no)
}
```

上記のコードでは、`if`節を使用してエラーをチェックし、エラーがある場合は出力します。`else`節では実際の値を出力します。

## 課題 I - エラーハンドリングの追加

この演習では、プログラムにエラーハンドリングを追加します。

1. _panic.go_というファイルを作成し、以下の内容を追加します。

   ```go
   package main

   import (
     "fmt"
   )

    // func errorHandler() {
    // if r := recover(); r != nil {
    //  fmt.Println("Recovered ", r)
    // }
    // }

    func Divide(nominator int, divider int) float32 {
     // defer errorHandler()
     if divider == 0 {
      panic("can't divide by 0")
     }
     return float32(nominator) / float32(divider)
    }

    func main() {
     no := Divide(10, 0)
     fmt.Println(no)
     no = Divide(10, 1)
     fmt.Println(no)
    }
   ```

1. プログラムを実行します。

   ```bash
   go run panic.go
   ```

   以下のような出力が表示されるはずです。

   ```
   panic: can't divide by 0

    goroutine 1 [running]:
    main.Divide(...)
            /<path>/panic.go:20
    main.main()
            /<path>/panic.go:33 +0x96
    exit status 2
   ```

   プログラムがクラッシュしたため、次の2つの文は実行されませんでした。

   ```go
   no = Divide(10, 1)
   fmt.Println(no)
   ```

1. コメントアウトされている部分を解除し、プログラムを再実行します。

   以下の出力が表示されるはずです。

   ```
   Recovered  can't divide by 0
   0
   10
   ```

おめでとうございます。`panic()`と`recover()`を使用したエラーハンドリングを実装することができました。

## 解答 I

```go
package main

import (
   "fmt"
)

func errorHandler() {
   if r := recover(); r != nil {
      fmt.Println("Recovered ", r)
   }
}

func Divide(nominator int, divider int) float32 {
  defer errorHandler()
  if divider == 0 {
    panic("can't divide by 0")
  }
  return float32(nominator) / float32(divider)
}

func main() {
  no := Divide(10, 0)
  fmt.Println(no)
  no = Divide(10, 1)
  fmt.Println(no)
}
```

## 課題 II - エラーロギングの改善

_panic.go_ファイルを改善し、エラーロギングを追加しましょう。

1. `errorHandler()`を以下のように変更します。

   ```go
   func errorHandler() {
     if r := recover(); r != nil {
       log.Println(r, string(debug.Stack()))
     }
   }
   ```

1. _panic.go_ファイル全体が以下のようになるようにします。

   ```go
    package main

    import (
     "fmt"
     "log"
     "os"
     "runtime/debug"
    )

    func errorHandler() {
     if r := recover(); r != nil {
      log.Println(r, string(debug.Stack()))
     }
    }

    func Divide(nominator int, divider int) float32 {
     defer errorHandler()
     if divider == 0 {
      panic("can't divide by 0")
     }
     return float32(nominator) / float32(divider)
    }

    func main() {
     f, err := os.OpenFile("logs", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
     if err != nil {
      log.Println(err)
     }
     log.SetOutput(f)

     log.Println("starting program")
     no := Divide(10, 0)
     fmt.Println(no)

     no = Divide(10, 1)
     fmt.Println(no)
     f.Close()
    }
   ```

1. プログラムを実行します。

   ```go
   go run panic.go
   ```

   以下の出力が表示されるはずです。

   ```
   0
   10
   ```

   エラーがスローされた影響を受けずに、すべての文が実行されました。

1. 作成された_logs_ファイルを確認し、以下のような内容になっているはずです。

   ```
     2022/03/11 15:03:59 starting program

    2022/03/11 15:03:59 can't divide by 0 goroutine 1 [running]:
    runtime/debug.Stack(0xc000111d30, 0x10b1b40, 0x10eae78)
     /usr/local/Cellar/go/1.16/libexec/src/runtime/debug/stack.go:24 +0x9f
    main.errorHandler()
     /<path>/panic.go:14 +0x5b
    panic(0x10b1b40, 0x10eae78)
     /usr/local/Cellar/go/1.16/libexec/src/runtime/panic.go:965 +0x1b9
    main.Divide(0xa, 0x0, 0x0)
     /<path>/panic.go:21 +0xa5
    main.main()
     /<path>/panic.go:34 +0x115
   ```

## 解答 II

```go
package main

import (
  "fmt"
  "log"
  "os"
  "runtime/debug"
)

func errorHandler() {
  if r := recover(); r != nil {
    log.Println(r, string(debug.Stack()))
  }
}

func Divide(nominator int, divider int) float32 {
  defer errorHandler()
  if divider == 0 {
    panic("can't divide by 0")
  }
  return float32(nominator) / float32(divider)
}

func main() {
  f, err := os.OpenFile("logs", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
  if err != nil {
    log.Println(err)
  }
  log.SetOutput(f)

  log.Println("starting program")
  no := Divide(10, 0)
  fmt.Println(no)

  no = Divide(10, 1)
  fmt.Println(no)
  f.Close()
}
```