---
title: こんにちは世界
description: Goの利用方法と最初のプログラムの書き方
lastmod: 2023-06-04T23:43:48.626Z
---

# 最初のプログラム

このレッスンでは、Goの歴史について説明し、最初のGoアプリを作成する方法を教えます。

> 動画を見る

<div class='youtube-player'>
  <iframe
    width='560'
    height='315'
    src='https://www.youtube.com/embed/1825FjiewWs'
    title='YouTube video player'
    frameborder='0'
    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
    allowfullscreen
  ></iframe>
</div>

## はじめに

このレッスンでは以下の内容をカバーします：

- Goの歴史
- アプリにGoを使用する理由
- Goアプリの構造
- 最初のアプリの作成と実行

## Goの歴史

この言語はGoと呼ばれていますが、最初のウェブサイトはgolang.orgとして知られています。

Goは2009年にRobert Griesemer、Rob Pike、Ken Thompsonによって作成されました。Goの開発者の数は正確にはわかりませんが、1.1〜2.7百万人の間と推定されています。Google、Pinterest、Uberなど、2500以上の企業がGoを使用しています。つまり、多くの人々や大企業によって使用されていることがわかります。

> なぜGoが作られたのですか？

よくあることですが、プログラミング言語は他の言語の不備に対処するために作られます。この場合、作成者たちはこの新しい言語に以下の機能を持たせたかったのです：

- Cからの**静的型付け**と実行時の効率性。
- JavaScriptとPythonからの**可読性**。
- **高性能**なネットワーキングとマルチプロセッシング。

C++が嫌いなことについては、作成者たちは意見が一致しているようです :)

## しかし、Goは何に使われているのでしょうか？

以下のような領域でGoが使用されていることがあります：

- クラウドベースのアプリやサーバーサイドのアプリ。
- DevOps、自動化。
- コマンドラインツール。
- AIやデータサイエンス。

## 参考文献

Goプログラミング言語を学ぶための多くの素晴らしいリソースがあります：

- [https://go.dev/](https://go.dev/)
- [https://www.tutorialspoint.com/go/index.htm](https://www.tutorialspoint.com/go/index.htm)
- [https://gobyexample.com/](https://gobyexample.com/)
- [https://www.w3schools.com/go/](https://www.w3schools.com/go/)
- [https://docs.microsoft.com/en-us/learn/modules/go-get-started/](https://docs.microsoft.com/en-us/learn/modules/go-get-started/)
- [https://docs.microsoft.com/en-us/learn/modules/serverless-go/](https://docs.microsoft.com/en-us/learn/modules/serverless-go/)

## 特徴

それでは、Goの魅力的な特徴は何でしょうか？以下にいくつかの特徴を挙げてみます：

- **静的型付け**。私は型が好きです :)
- **パッケージシステム**。他のパッケージを利用したり、自分自身のパッケージを作成したりすることができます。利用可能なパッケージについては[こちら](https://pkg.go.dev/)を参照してください。
- **コマンドラインツール**。Goをインストールすると、一連の実行可能ファイルがインストールされます。これらの実行可能ファイルを使用して、パッケージの実行、ビルド、インストール、テスト実行などが行えます。
- **標準ライブラリ**。Goには強力な標準ライブラリがあり、ほとんどの必要な機能をサポートしています。[標準ライブラリ](https://pkg.go.dev/std)の詳細についてはこちらを参照してください。
- **組み込みのテスト**。使いやすいテストライブラリが最初から提供されていることは当たり前のことではありません。
- 並行性。Goは並行処理を扱うのに優れています。ゴルーチンやチャネルなどの概念を使用しています。
- **ガベージコレクション**。詳細については[こちら](https://medium.com/safetycultureengineering/an-overview-of-memory-management-in-go-9a72ec7c76a8#:~:text=Go%20has%20all%20goroutines%20reach,the%20collector%20to%20run%20simultaneously)を参照してください。自分でそれを扱う必要がなく、問題解決に集中できるのは嬉しいですね。

## Goのインストール

それでは、この時点で興味を持っているので、いくつかのコードを見たいと思いますか？もちろんですね :)

マシンにGoをインストールするための手順に従っていることを確認してください。

> [https://go.dev/doc/install](https://go.dev/doc/install)

## Goプログラム

最初のプログラムは次のようになります：

```go
package main

import "fmt"

func main() {
 fmt.Println("hello")
}
```

### プログラムの詳細

- `package main`：エントリーポイントのモジュールはこの指示を持つ必要があります。
- `import "fmt"`：fmtは入出力のための標準パッケージです。
- `func main`：プログラムが開始するエントリーポイントの関数です。

## コマンド

プログラムができたら、次の2つのことができるかもしれません：

- **実行する**：コンパイルして実行してみる。
- **実行可能ファイルを作成する**：実行可能ファイルはもはやGoのコードではなく、マシン上の他の実行可能プログラムと同じです。

### アプリを実行する

アプリを実行するには、`go run <file>.go`と入力します。例：

```bash
go run main.go
```

### アプリをビルドする

実行可能ファイルを作成するには、`go build <file>.go`と入力します。例：

```bash
go build main.go
```

これにより、実行可能ファイルが生成されます。MacOSとLinuxでは、-Xというパーミッションを持つファイルになります。Windowsでは、.exeファイルになります。

おめでとうございます、最初のGoアプリケーションを作成しました。

## まとめ

この記事では、Goプログラミング言語について学び、その特徴や最初のプログラムの書き方について説明しました。

## 🚀 チャレンジ

Goを他のプログラミング言語と比較して、それらの間の違いをいくつか挙げることができますか？

## レビューと自己学習

以下のリソースのいずれかを選んでチュートリアルを試してみてください。

- [https://go.dev/](https://go.dev/)
- [https://www.tutorialspoint.com/go/index.htm](https://www.tutorialspoint.com/go/index.htm)
- [https://gobyexample.com/](https://gobyexample.com/)
- [https://www.w3schools.com/go/](https://www.w3schools.com/go/)
- [https://docs.microsoft.com/en-us/learn/modules/go-get-started/](https://docs.microsoft.com/en-us/learn/modules/go-get-started/)
- [https://docs.microsoft.com/en-us/learn/modules/serverless-go/](https://docs.microsoft.com/en-us/learn/modules/serverless-go/)

## 課題

ファイル_main.go_を作成してください。`fmt`ライブラリを使用してコンソールに出力します。プログラムは`go run <my program>.go`で実行します。

## 解答

ファイル_main.go_を作成してください。

```go
package main

import "fmt"

func main() {
  fmt.Println("コンソールに出力します")
}
```

# 課題

## アプリをビルドする

### 指示

ファイル_main.go_を作成してください。`fmt`ライブラリを使用してコンソールに出力します。プログラムは`go run <my program>.go`で実行します。

::compiler
---
title: My Go Playground
code: |
  package main

  import "fmt"

  func main() { 
    fmt.Println("Hello, from code fence")
  }
---
::
