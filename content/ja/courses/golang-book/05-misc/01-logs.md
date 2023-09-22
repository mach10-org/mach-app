---
title: ログ
description: アプリ内のさまざまなメッセージをより良く管理するためにログを使用します
lastmod: 2023-05-26T03:13:13.596Z
---

# ロギングライブラリを使ったより良いログ出力

コードを書き始めると、画面に表示するだけでなく、ファイルやログサービスに出力する必要があることに早く気づきます。ログ出力の種類は、通常何を言いたいのかを示します。

## はじめに

この章では、以下の内容を学びます：

- ログを出力する理由と方法
- `log` ライブラリの使用方法

## ログを出力する理由

ログを出力する理由はたくさんありますが、以下にいくつかの理由を示します：

- **情報**：プログラムを使用する人に役立つ情報を提供したい場合があります。
- **成功**：成功メッセージは単なる情報以上のものであり、何かに成功したことを示します。
- **警告**：警告が発生すると、注意が必要な状況が発生したことを示します。アプリをシャットダウンするほど深刻ではない場合が一般的ですが、メモリが不足している可能性があるなど、注意が必要です。
- **エラー**：エラーが発生すると、継続することが賢明でなくなる状態になります。
- **パフォーマンス**：何かの処理にかかる時間を測定することは一般的です。改善のためには、この情報は役立ちます。
- **その他**：ログを出力する理由は他にもありますが、通常はビジネスに関連しています。

## 何をログに出力するか

一般的なルールは、できるだけ多くのログを出力することです。特に修正したいエラーの場合は、次のような情報をログに出力することがあります：

- 発生した日時
- 発生した内容
- 具体的なエラー情報

ログに出力する場合は、ログメッセージの使用方法を確認し、チームがこれらのログを通じてログを出力するかどうか、そしてどのような情報が役立つかを確認してください。そのチームの誰かにインタビューできるかどうか確認してみてください。

## `log` の使用方法

一般的には、Webリクエストを行ったり、I/Oを行ったりするなど、何かがうまくいかない可能性がある場所でログを出力することが望ましいです。

ログを出力するタイミングの一般的なガイドラインは次のとおりです：

- **不正な入力**：プログラムが不正な応答を生成する可能性がある場合、数値の変換/キャストに問題があったり、予期しない入力があったりする場合など。
- **エラー状態**：プログラムが回復できない状態になった場合、例えばデータソースからのデータのバッチを取得できない場合など。

コードのすべての行にログを出力する必要はありません。

### 標準のログ出力 `Println()`

標準のログメッセージを出力するには、`log` パッケージの `Println()` 関数を使用します。この関数は文字列を受け取り、日付、時刻、エラーメッセージを組み合わせたログメッセージを出力します。

以下は `Println()` を使用したコードの例です：

```go
package main

import (
 "fmt"
 "log"
)

func main() {
  log.Println("ログメッセージ")
}
```

次のような出力が生成されます：

```
2022/03/24 12:42:13 ログメッセージ
```

### エラー時に `Fatal()` を使用する

`Println()` は、日付、時刻、メッセージを含む通常のログメッセージを出力します。`Fatal()` はプログラムを終了させたい場合に使用します。`Fatal()` は与えられたメッセージを出力し、`os.Exit(1)` を呼び出します。

以下は `Fatal()` の使用例です：

```go
log.Fatal("<終了の理由>によりプログラムを終了します")
```

### ファイルにログを出力する

アプリを開発すると、アプリが出力する内容をコンソールで確認することが多くなります。

ただし、アプリが本番環境で使用できるようになると、分析に役立つログをどこかに保存する必要があります。ログをログサービスに送信するか、ファイルに保存するかのいずれかです。

これにより、後でこれらのログを分析して何がうまくいかなかったのかを理解したり、プログラムのパフォーマンスを分析したりすることができます。

ファイルにログを出力するには、`SetOutput()` 関数を使用します。この関数はファイルハンドラを受け取ります。次の3行のコードを使用してログを出力できます：

```go
f, err := os.OpenFile("testlogfile", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

defer f.Close()

log.SetOutput(f)
```

- 最初の行では、ファイル "testlogfile" を開き、追記できるようにします。

  ```go
  f, err := os.OpenFile("testlogfile", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
  ```

- 2行目では、ファイルがプログラム内で最後に閉じられるようにします。

  ```go
  defer f.Close()
  ```

- 最後に `SetOutput()` を呼び出し、すべてのログメッセージがファイル "testlogfile" に送信され、コンソールに表示されないようにします。

  ```go
  log.SetOutput(f)
  ```

## 課題

この課題では、コードに `log` ライブラリを追加します。

1. 次の内容で _records.csv_ というファイルを作成します：

   ```
   item,quantity

   112, 2
   94, 3
   ```

1. _app.go_ というファイルを作成し、次の内容を追加します：

   ```go
    package main

    import (
     "fmt"
     "io/ioutil"
     "os"
    )

    func ProcessFile(path string) {
     filebuffer, err := ioutil.ReadFile(path)
     if err != nil {
      fmt.Println("エラー: ", err)
      os.Exit(1)
     }
     inputdata := string(filebuffer)
     fmt.Println("入力データを処理します: \n", inputdata)
    }

    func main() {
     fileName := "records.csv"

     fmt.Printf("ファイル '%s' を処理しています \n", fileName)
     ProcessFile(fileName)
    }
   ```

1. `go run` を使用してファイルを実行します：

   ```go
   go run app.go
   ```

   次の出力が表示されるはずです：

   ```
   ファイル 'records.csv' を処理しています

   入力データを処理します:
   item,quantity
   112, 2
   94, 3
   ```

1. `import` に `log` パッケージを追加し、すべての `fmt` の呼び出しを `log` に置き換えます。次のように修正します：

   ```go
    package main

    import (
     "io/ioutil"
     "log"
    )

    func ProcessFile(path string) {
     filebuffer, err := ioutil.ReadFile(path)
     if err != nil {
      log.Fatal("エラー: ", err)
     }
     inputdata := string(filebuffer)
     log.Print("入力データを処理します: \n", inputdata)
    }

    func main() {
     fileName := "records.csv"

     log.Printf("ファイル '%s' を処理しています \n", fileName)
     ProcessFile(fileName)
    }
   ```

   出力がどのように変わるか見てみましょう。

1. `go run` を使用してプログラムを実行します：

   ```go
   go run main.go
   ```

   出力は次のようになります：

   ```
    2022/03/28 13:57:57 ファイル 'records.csv' を処理しています

    2022/03/28 13:57:57 入力データを処理します:
    item,quantity
    112, 2
    94, 3
   ```

1. 次に、`fileName` を "record.csv" に変更してエラーを発生させます（そのようなファイルは存在しません）。

   ```go
   fileName := "record.csv"
   ```

1. 今度はアプリを実行します `go run`：

   ```bash
   go run app.go
   ```

   次のような出力が表示されるはずです：

   ```
   2022/03/28 14:04:52 ファイル 'record.csv' を処理しています

   2022/03/28 14:04:52 エラー: open record.csv: no such file or directory
   exit status 1
   ```

   今回はプログラムが終了ステータス 1 で終了することがわかります。

   結論として、`log` ライブラリを使用する方が良いです。日付と時刻が表示され、入力が少なくなります。さらに、ログをファイルに出力することもできます。次に、その方法を見てみましょう。

### ファイルにログを出力する

プログラムの出力を調査する人は、通常、ターミナルを見落としてログファイルを調べることがあります。`log` にログをファイルに出力するように指示しましょう。

1. `main()` 関数の最初に、次のコードを追加します：

   ```go
     logFile := "logfile"

     f, err := os.OpenFile(logFile, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

     if err != nil {
      log.Fatal("ファイルにログを出力できませんでした: ", logFile)
     }
     defer f.Close()
   ```

   これにより、すべてのエントリが _logfile_ に書き込まれるように `log` に指示されます。

1. プログラムを再度実行します `go run`：

   ```bash
   go run main.go
   ```

   次の出力が表示されるはずです：

   ```
   exit status 1
   ```

   すべてのログエントリが _logfile_ に移動しました。次に、その内容を確認してみましょう：

   ```
   2022/03/28 14:11:24 ファイル 'record.csv' を処理しています

   2022/03/28 14:11:24 エラー: open record.csv: no such file or directory
   ```

   素晴らしいですね。すべてのエントリが1つの場所に集約されましたので、分析が容易になるはずです。

## 解答例

```go
package main

import (
 "io/ioutil"
 "log"
 "os"
)

func ProcessFile(path string) {
 filebuffer, err := ioutil.ReadFile(path)
 if err != nil {
  log.Fatal("エラー: ", err)
 }
 inputdata := string(filebuffer)
 log.Print("入力データを処理します: \n", inputdata)
}

func main() {
 fileName := "record.csv"
 logFile := "logfile"

 f, err := os.OpenFile(logFile, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

 if err != nil {
  log.Fatal("ファイルにログを出力できませんでした: ", logFile)
 }
 defer f.Close()

 log.SetOutput(f)

 log.Printf("ファイル '%s' を処理しています \n", fileName)
 ProcessFile(fileName)
}
```
