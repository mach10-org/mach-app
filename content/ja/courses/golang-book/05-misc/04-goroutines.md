---
title: ゴルーチン
description: ゴルーチンとチャネルを使って作業する
lastmod: 2023-05-26T03:13:50.244Z
---

# ゴルーチンとチャネル

ゴルーチンはGoランタイムによって管理される軽量なスレッドです。

チャネルはルーチン間の通信手段です。

## はじめに

この章では以下のことを学びます：

- 並行性と並列性の違いを理解する
- ゴルーチンを使用して関数を実行する
- ゴルーチン間で通信するためのチャネルを作成して使用する
- ファイルを検索するアプリケーションにゴルーチンを適用して高速化する

## 並行性の利点

並行性は複数の計算を同時に実行し管理するタスクです。一方、_並列性_は複数の計算を同時に実行するタスクです。

以下にいくつかの利点を挙げます：

- **高速な処理**。タスクをより速く完了させる利点です。コンピュータでファイルを検索したりデータを処理したりする場合、これらのワークロードを並列で処理できれば、より早く結果を得ることができます。
- **応答性の高いアプリケーション**。もう一つの利点は、応答性の高いアプリケーションを実現できることです。UIを持つアプリケーションの場合、UIの応答性を損なうことなくバックグラウンドで作業を実行できると便利です。

## ゴルーチン

ゴルーチンはGoランタイムによって管理される軽量なスレッドです。関数の前にキーワード `go` を追加することでゴルーチンを実行します。以下に例を示します：

```go
go myFunction()
```

次のコードが実行されると、どのような結果が得られるでしょうか？

```go
package main

import "fmt"

func myFunction() {
 for i := 0; i < 3; i++ {
  fmt.Println("my function: ", i)
 }
}
func anotherFunction() {
 for i := 4; i <7; i++ {
  fmt.Println("another function: ", i)
 }
}

func main() {
 go myFunction()
 anotherFunction()
}
```

ゴルーチンの起動には少し時間がかかるため、`anotherFunction()` の結果のみが表示されます。ゴルーチンも実行させるためには、次のように少しの遅延を追加することができます：

```go
func main() {
 go myFunction()
 anotherFunction()
 time.Sleep(1 * time.Second)
}
```

結果は次のようになります：

```
another function:  4
another function:  5
another function:  6
my function:  0
my function:  1
my function:  2
```

ゴルーチンを使用した関数の実行は最後に完了します。コードを少し変更して、2つの関数が異なる時間で処理を行うようにしてみましょう：

```go
func myFunction() {
 time.Sleep(1500 * time.Millisecond)
 for i := 0; i < 3; i++ {
  fmt.Println("my function: ", i)
 }
}
func anotherFunction() {
 time.Sleep(500 * time.Millisecond)
 for i := 4; i < 7; i++ {
  fmt.Println("another function: ", i)
 }
}

func main() {
 go myFunction()
 go anotherFunction()
 time.Sleep(2 * time.Second)
}
```

この時点では、最も遅い遅延時間を持つ `anotherFunction()` が最初に完了します。以下は、出力の例です：

```
another function:  4
another function:  5
another function:  6
my function:  0
my function:  1
my function:  2
```

### ユースケース - ファイル検索

ディスク上のファイルを検索する必要がある場合を想像してみてください。次のような関数を作成すると、ディレクトリを検索し、ファイルが見つかった場合に結果を報告します：

```go
func SearchFiles(dir string, lookFor string) string {
 log.Println("[SEARCHING] ", dir)
 files, err := ioutil.ReadDir(dir)
 if err != nil {
  log.Fatal(err)
 }

 for _, file := range files {
  log.Println(dir+file.Name(), file.IsDir())
  if file.Name() == lookFor {
   return "[FOUND] " + filepath.Join(dir, file.Name())
  }
 }
 return "[NOT FOUND] " + dir
}
```

次のように、多くのディレクトリを検索するためにこのコードを実行すると、以下のような出力が得られます：

```go
result := make([]string, 0)
append(result, SearchFile("./tmp", "myfile.txt"))
append(result, SearchFile("./tmp2", "myfile.txt"))
append(result, SearchFile("./tmp3", "myfile.txt"))
append(result, SearchFile("./tmp4", "myfile.txt"))

for i := 0 i< len(result); i++ {
  fmt.Println(result[i])
}
```

見つかった場合、以下のような出力が得られます。検索されたディレクトリによって異なりますが、_myfile.txt_ がどのディレクトリにも見つからない場合は次のようになります：

```go
[FOUND] ./tmp/myfile.txt
[NOT FOUND] ./tmp2/myfile.txt
[NOT FOUND] ./tmp3/myfile.txt
[NOT FOUND] ./tmp4/myfile.txt
```

このプロセスを高速化するために、複数のディレクトリを同時に検索できると便利です。次のように入力することができます：

```go
go SearchFile("./tmp", "myfile.txt")
go SearchFile("./tmp2", "myfile.txt")
go SearchFile("./tmp3", "myfile.txt")
go SearchFile("./tmp4", "myfile.txt")
```

これにより、すべてのディレクトリが並列で検索されます。ただし、次のように書くことはできません：

```go
result := make([]string, 0)
go append(result,SearchFile("./tmp", "myfile.txt")) // コンパイルエラー、"go discards results" と表示されます
```

では、ゴルーチンからの結果を取得するにはどうすればよいでしょうか？答えは、チャネルを使用することです。次に、チャネルについて説明します。

## チャネル

チャネルは、ゴルーチン間だけでなく、ゴルーチンとゴルーチンを使用しない部分のコードとの間で通信するための手段です。

値をチャネルに送信し、コードの一部がチャネルからの値を受信するというアイデアです。

### チャネルの作成

チャネルを作成するには、キーワード `chan` とメッセージのデータ型が必要です。以下に例を示します：

```go
ch := make(chan int)
```

上記の例では、`int` 型のメッセージを受け入れるチャネル `ch` が作成されます。

### チャネルへの値の送信

チャネルに送信するには、`<-` という演算子を使用します。これは左に向かって矢印を指しているように見え、何かが送信される方向を示すために使用されます。以下に、チャネルにメッセージを送信する例を示します：

```go
ch <- 2
```

上記のコードでは、数値の2がチャネル `ch` に送信されます。

### チャネルの受信

チャネルを受信するには、再び矢印 `<-` を使用しますが、この場合は受信変数を左側に、チャネルを右側に配置する必要があります。以下に例を示します：

```go
value := <- ch
```

### 送信と受信のマッチング

次のコードがあるとします：

```go
package main

import "fmt"

func produceResults(ch chan int) {
 ch <- 1
 ch <- 2
}

func main() {
 ch := make(chan int)
 produceResults(ch)

 var result int
 result = <-ch
 fmt.Println(result)
 result = <-ch
 fmt.Println(result)
}
```

`produceResults()` を呼び出し、チャネルに2回メッセージを送信しています：

```go
ch <- 1
ch <- 2
```

`main()` では、結果を受け取っています：

```go
var result int
result = <-ch
fmt.Println(result)
result = <-ch
fmt.Println(result)
```

では、次のように送信する値の数が受信する値の数よりも多い場合はどうなるでしょうか？

```go
ch <- 1
ch <- 2
ch <- 3
```

答えは、余分な値が無視されることです。

逆に、受信する値の数よりも1つ多く受信しようとした場合はどうなるでしょうか？

```go
var result int
result = <-ch
fmt.Println(result)
result = <-ch
fmt.Println(result)
result = <-ch
fmt.Println(result)
```

この時点で、コードはデッドロックし、**fatal error: all goroutines are asleep - deadlock!** と表示されます。その値は到着しないため、コードは終了しません。

ここからの教訓は、受け取る結果の数を追跡し、その数だけ受け取る必要があるということです。

値を受け取る別の方法があります。それは、次のように `select` を使用する方法です：

```go
for i := 0; i < 2; i++ {
  select {
  case x, ok := <-ch:
   if ok {
    fmt.Println(x)
   }
  }
 }
```

次のように値の受信を_マッチング_しています：

```go
case x, ok := <-ch:
```

受け取るのは2つのものです。値そのものの `x` と、`ok` という名前の `bool` 型です。値を受け取ることができた場合、`ok` には `true` が格納されます。もし受け取れなかった場合はどうなるでしょうか？チャネルが閉じられ、これ以上値を生成できない場合は、`ok` は `false` になります。次に、これについて説明します。

### チャネルのクローズ

チャネルはクローズするまで開いています。`close()` を呼び出すことで明示的にクローズすることができます：

```go
close(ch)
```

ただし、チャネルから値を受信しようとするとクラッシュが発生します。チャネルが開いているかどうかをテストするためには、先ほど作成した `select` を使用できます：

```go
  select {
  case x, ok := <-ch:
   if ok {
    fmt.Println(x)
   } else {
     break // チャネルがクローズされています
   }
  }
```

`ok` の値は `false` になります。

チャネルのクローズの概念を適用するために、`produceResults()` に `close()` を追加し、forループを値よりも1回多く実行するようにします：

```go
package main

import (
 "fmt"
)

func produceResults(ch chan int) {
 ch <- 1
 ch <- 2
 // ch <- 3
 close(ch)
}

func main() {
 ch := make(chan int)
 produceResults(ch)
 // time.Sleep(1 * time.Second)

 for i := 0; i < 3; i++ {
  select {
  case x, ok := <-ch:
   if ok {
    fmt.Println(x)
   } else {
    fmt.Println("channel closed")
   }
  }
 }
}
```

上記のコードを実行すると、次のような出力が得られます：

```
1
2
channel closed
```

3回目の繰り返しで `else` 節がマッチしていることがわかります。

さらに、より長時間実行するタスクがある場合、チャネルがクローズするまで待機する必要があります。次のコードはその処理を行います：

```go
label:
 for {
  select {
  case x, ok := <-ch:
   if ok {
    fmt.Println(x)
   } else {
    fmt.Println("channel closed")
    break label
   }
  }
 }
```

ここで行っていることは、クローズするまで永遠に実行されるforループを設定しています。forループから抜けるために `select` だけでなく `label:` も追加しています。

TODO: チャネルを範囲で使用することもできます。

## 課題 - `SearchFiles()` をチャネルを使用して実装する

これまでの学習を活かして、ファイル検索プログラムにチャネルを追加しましょう。

## チャレンジ

## 解決策

```go
package main

import (
 "io/ioutil"
 "log"
 "path/filepath"
)

func SearchFiles(dir string, lookFor string, ch chan string) {
 log.Println("[SEARCHING] ", dir)
 files, err := ioutil.ReadDir(dir)
 if err != nil {
  log.Fatal(err)
 }

 for _, file := range files {
  log.Println(dir+file.Name(), file.IsDir())
  if file.Name() == lookFor {
   ch <- "[FOUND] " + filepath.Join(dir, file.Name())
   return
  }
 }
 ch <- "[NOT FOUND] " + dir
}

func main() {
 ch := make(chan string)

 go SearchFiles("./test/", "test2.txt", ch)
 go SearchFiles("./other/", "test2.txt", ch)

 var res = ""
 for i := 0; i < 2; i++ {
  res = <-ch
  log.Println(res)
 }
}
```
