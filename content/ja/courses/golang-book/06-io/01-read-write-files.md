---
title: ファイルの読み書き
description: ファイルから読み込み、ファイルに書き込む方法を学びましょう
lastmod: 2023-05-26T03:17:50.397Z
---

# ファイルの読み書き

テキストファイル、画像ファイル、動画ファイルなど、さまざまな種類のファイルがあります。そのため、コンテンツを異なる方法で読み取りたい場合があります。バイト単位で読み取ることもできますし、テキストとして一括して読み取ることもできます。

## はじめに

この章では、次のことを学びます：

- テキストファイルからコンテンツを読み取る方法。
- テキストファイルに書き込む方法。
- テキストファイルの末尾にテキストを追加する方法。
- ファイルのサイズ、変更日などのメタデータを分析する方法。

## テキストファイルの読み取り

一つのアプローチとして、`ioutil` ライブラリとその `ReadFile()` メソッドを使用する方法があります。

```go
  import (
    "io/ioutil"
    "log"
  )
  func main() {
    filebuffer, err := ioutil.ReadFile(path)

    if err != nil {
      log.Fatal(err)
    }
    var inputdata string = string(filebuffer)
  }
```

ファイルの読み取り結果は `filebuffer` に格納されます。文字列として解釈するには、`string(filebuffer)` を使用して変換する必要があります。これで、ファイルのコンテンツを処理し、行ごとに読み取るなど、必要な処理を行う準備が整いました。

## テキストの書き込み

このシナリオでは、次の2つのことを行います：

- ファイルの作成。
- 新しく作成したファイルにテキストを書き込む。

このシナリオでは、`os` ライブラリと `Create()` メソッドを組み合わせてファイルを作成し、`WriteString()` メソッドを使用して文字列をファイルに書き込むことができます。

```go
 import (
  "os"
  "log"
 )

 f, err := os.Create(path)
 if err != nil {
  log.Fatal(err)
 }

 n, err := f.WriteString(content + "\n")
 if err != nil {
  log.Fatal(err)
 }
 fmt.Printf("wrote %d bytes\n", n)
 f.Sync()
```

まず、`Create()` を呼び出してファイルを作成します。これにより、ファイルハンドル `f` を取得します。`f` を使用して、文字列を含む `WriteString()` を呼び出すことができます。最後に、`Sync()` を呼び出して文字列がファイルに永続化されるようにします。

## ファイルへの追記

テキストの追記は、既存のファイルがすでに存在する場合に行います。追記すると、情報がファイルの末尾に追加されます。追記は、ログファイルに新しいエントリを追加したり、食料品店のPOS（販売時点）システムに新しい購入を追加したりする場合によく行われる操作です。

ファイルに追記するには、`os` ライブラリの `OpenFile()` メソッドを使用します。追記するコンテンツを指定するために、いくつかのフラグを渡す必要があります。また、既存のファイルが存在しない場合に作成するという動作も必要です。以下のようなコードになります：

```go
f, err := os.OpenFile("text.log",
 os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
if err != nil {
 log.Println(err)
}
defer f.Close()
```

0644 は、3x3 ビットフラグです。ユーザー（6、読み書き）、グループ（4、読み取り）、その他（4、読み取り）の権限を設定します。

文字列を追記するには、次のように `WriteString()` を呼び出すことができます：

```go
f.WriteString("my text \n")
```

## 課題

以下のような _invoices.csv_ というファイルがあるとします：

```
customer, amount, date
Wood LTD, 100, 2020-01-01
Metal, 345, 2020-01-29
Steel, 700, 2020-07-29
```

このファイルを開き、行ごとにコンテンツを読み取ってください。

## 解答例

```go
package main

import (
 "fmt"
 "io/ioutil"
 "log"
 "strings"
)

func main() {
 var path = "invoices.csv"
 filebuffer, err := ioutil.ReadFile(path)

 if err != nil {
  log.Fatal(err)
 }
 var inputdata string = string(filebuffer)

 rows := strings.Split(inputdata, "\n")
 for _, row := range rows {
  fmt.Println("row:", row)
 }
}

```

## チャレンジ

各行をさらに列に分割し、注文の合計金額を集計してみてください。