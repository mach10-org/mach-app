---
title: 外部パッケージの利用
description: 外部パッケージの使用方法を学びます
lastmod: 2023-05-26T03:02:22.046Z
---

# 外部モジュールの利用

この章では、外部モジュールのダウンロードと使用方法について説明します。

## はじめに

この章では以下の内容をカバーします：

- プロジェクトの作成
- 外部モジュールのプロジェクトへの追加
- アプリケーションで外部ライブラリの使用

## 外部モジュール

外部モジュールを利用するためには、以下の手順が必要です：

- **インポートする**：`import`文を使用し、モジュールの場所を完全修飾で指定します。
- **コード内で使用する**：使用するモジュールのコードを呼び出します。
- **ダウンロードを確認する**：コードが実行できるように、モジュールをダウンロードします。

## モジュールのインポート

モジュールをインポートするには、次のいずれかの方法を使用できます：

- `go get <モジュールのパス>`：モジュールを取得し、ダウンロードしてプロジェクトで使用できるようにします。
- `go mod tidy`：プログラムで使用されているインポートをチェックし、まだダウンロードされていない場合はモジュールを取得します。

## コード内での使用方法

モジュールをコード内で使用するには、`import`セクションに追加し、アプリケーションコードの必要な場所で呼び出します。

```go
import (
  "github.com/<ユーザー名>/<リポジトリ名>"
)

func main() {
  <リポジトリ名>.<関数>()
}
```

以下に例を示します：

```go
package main

import (
"fmt"
"github.com/softchris/math"
)

func main() {
  math.Add(1,1) // 2
}
```

## 課題 - 外部モジュールの利用

新しいプロジェクトを作成しましょう。

1. `go mod init`を実行します：

   ```go
   go mod init hello
   ```

   以下の内容で _go.mod_ ファイルが作成されることに注意してください：

   ```go
   module hello

   go 1.16
   ```

### 外部ライブラリへの参照の追加

次に、外部ライブラリを使用するコードを作成します：

1. _main.go_ ファイルを作成します：

   ```go
   package main

   import (
     "fmt"
     "github.com/softchris/math"
   )
   ```

1. 同じファイルに `main()` 関数を追加し、外部の `math` パッケージの `Add` メソッドを呼び出します：

   ```go
   func main() {
     sum := math.Add(1,2)
     fmt.Println(sum)
   }
   ```

### ライブラリの取得

次に、外部ライブラリを解決する必要があります。

1. `go mod tidy` を実行します：

   ```bash
   go mod tidy
   ```

   _go.mod_ ファイルが更新されます：

   ```go
   require github.com/softchris/math v0.2.0
   ```

   また、以下の内容の _go.sum_ ファイルも作成されます：

   ```go
   github.com/softchris/math v0.2.0 h1:88L6PLRBGygS3LY5KGIJhyw9IZturmd2ksU+p13OPa4=

   github.com/softchris/math v0.2.0/go.mod h1:v8WzhjKC+ipuH+i9IZ0Ta2IArniTP53gc5TgCINCqAo=
   ```

   これは、Goがアプリをビルドするための方法を参照するための方法です。

1. `go run` を実行します：

   ```go
   go run main.go
   ```

   プログラムを実行すると、次の出力が表示されます：

   ```
   3
   ```

## 解答

go.sum

```go
github.com/softchris/math v0.2.0 h1:88L6PLRBGygS3LY5KGIJhyw9IZturmd2ksU+p13OPa4=
github.com/softchris/math v0.2.0/go.mod h1:v8WzhjKC+ipuH+i9IZ0Ta2IArniTP53gc5TgCINCqAo=

```

go.mod

```go
module hello

go 1.16

require github.com/softchris/math v0.2.0

```

main.go

```go
package main

import (
  "fmt"
  "github.com/softchris/math"
)

func main() {
  sum := math.Add(1,2)
  fmt.Println(sum)
}
```

## チャレンジ

別のモジュールを見つけて、プロジェクトに追加し、コードで使用してみてください。