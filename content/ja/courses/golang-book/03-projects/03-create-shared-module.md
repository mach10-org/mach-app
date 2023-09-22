---
title: 共有モジュールの作成
description: 他の人と共有できるモジュールを作成します
lastmod: 2023-05-26T03:02:06.161Z
---

# 共有用のモジュールを作成する

この章では、他の人と共有できるモジュールを作成する方法について説明します。

## はじめに

この章では以下の内容をカバーします：

- プロジェクトの作成
- モジュールのローカルでのテスト
- モジュールに異なるバージョンのタグを付ける
- 外部ライブラリとしてモジュールを使用する

## モジュールの作成

共有用のモジュールを作成する際には、いくつかの注意点があります：

- パッケージを作成する必要があります。
- パッケージ名は"main"ではありません。
- コードの公開部分と非公開部分の概念があります。
- ローカルでテストすることができます。
- パッケージをGitHubにアップロードして広く配布することができます。

## 課題 - 共有用のモジュールを作成し、使用する

より広範な使用を想定したモジュールを作成するには、まずモジュールを初期化する必要があります。

1. 新しいパッケージ用のディレクトリ「logger」を作成します：

   ```go
   mkdir logger
   cd logger
   ```

1. `go mod init <GitHubのアドレス>` を実行します。例：

   ```bash
   go mod init github.com/softchris/logger
   ```

   これにより、ディレクトリ内に _go.mod_ ファイルが作成されます。

   ```
   logger/
     go.mod
   ```

   ファイルの内容は以下のようになります：

   ```go
   module github.com/softchris/logger

   go 1.16
   ```

   これにはパッケージ名と使用するGoのバージョンが含まれています。

1. パッケージのコードをホストするファイルを作成します。例えば _log.go_ というファイルを作成し、以下の内容を追加します：

   ```go
    package logger

    import (
     "fmt"
    )

    var Version string = "1.0"

    func Log(mess string) {
     fmt.Println("[LOG] " + mess)
    }
   ```

   - `package logger` となっていることに注意してください。`main` ではありません。
   - 大文字で始まる変数やメソッドは公開されます。小文字で始まるものはパッケージ内でのみ使用されます。

### ローカルでテストする

パッケージをローカルでテストすることができます。そのためには、パッケージをインポートするための別のパッケージが必要です。

1. 一つ上のディレクトリに移動します：

   ```bash
   cd ..
   ```

1. 新しいディレクトリ **logger-test** を作成します：

   ```bash
   mkdir logger-test
   cd logger-test
   ```

1. テスト専用のパッケージを作成します：

   ```bash
   go mod init logger-test
   ```

1. _main.go_ というファイルを作成し、以下のコードを追加します：

   ```go
    package main

    import "github.com/softchris/logger"

    func main() {
     logger.Log("hey there")
    }
   ```

   この時点では、"logger" パッケージを使用していますが、まだGitHubを指しており、パッケージはまだ存在しません。しかし、次にローカルアドレスに変更することができます。

1. _go.mod_ を開き、以下を追加します：

   ```go
   require github.com/softchris/logger v0.0.0

   replace github.com/softchris/logger => ../logger
   ```

   ここで行っていることは2つあります：

   - "logger" パッケージを要求していること：

     ```go
     require github.com/softchris/logger v0.0.0
     ```

   - GitHubの代わりにローカルシステムを指すようにしていること

     ```go
     replace github.com/softchris/logger => ../logger
     ```

1. `go run` でパッケージを実行します：

   ```bash
   go run main.go
   ```

   以下が表示されるはずです：

   ```
   [LOG] hey there
   ```

### パッケージを公開する

パッケージを公開するために、GitHubにアップロードすることができます。

1. `git init` でGitリポジトリを作成します：

   ```bash
   git init
   ```

1. GitHub上でリポジトリを作成します。

1. 少なくとも1つのコミットを行ってください：

   ```bash
   git add .
   git commit -m "first commit"
   ```

1. 以下のコマンドを実行してパッケージをGitHubにアップロードします：

   ```bash
   git remote add origin https://github.com/softchris/logger.git

   git branch -M main
   git push -u origin main
   ```

1. `git tag` でパッケージにタグを付けます：

   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

   これでパッケージにタグが付けられました。

### テストしてみる

1. プロジェクト "logger-test" に移動します：

   ```bash
   cd ..
   cd logger-test
   ```

1. _go.mod_ を開き、以下の行を削除します：

   ```go
   require github.com/softchris/logger v0.0.0

   replace github.com/softchris/logger => ../logger
   ```

1. `go mod tidy` を実行します。これにより、Goがパッケージを探しに行きます：

   これにより、_go.mod_ には以下が含まれるはずです：

   ```go
   require github.com/softchris/logger v0.1.0
   ```

   また、_go.sum_ には以下が含まれるはずです：

   ```go
   github.com/softchris/logger v0.1.0 h1:Kqw7t9C3Y7BtHDLTx/KXEqHy5x8EJxrLian742S0di0=

   github.com/softchris/logger v0.1.0/go.mod h1:rrzWjMsM3tqjetDBDyezI8mFCjGucF/b5RSAqptKF/M=
   ```

1. `go run` でプログラムを実行します：

   ```bash
   go run main.go
   ```

   以下が表示されるはずです：

   ```
   [LOG] hey there
   ```

## チャレンジ

新しいパッケージに機能を追加してみてください。Gitを使用して新しいタグを付け、アプリケーションが新しいバージョンを使用していることを確認してください。