---
title: ファイルとディレクトリ
description: ファイルとディレクトリに対する操作を学びましょう
lastmod: 2023-05-26T03:18:02.709Z
---

# ファイルとディレクトリの操作

ファイルやディレクトリに対して行いたいことは、移動、削除、名前の変更などです。つまり、ファイルの内容に関わらず、何かしらの操作を行う高レベルな操作です。

## はじめに

この章では、次のことを学びます：

- ファイルのサイズ、変更日時などのメタデータを分析する。
- ファイルを一つの場所から別の場所にコピーする。
- ファイルの名前を変更する。
- ファイルを削除する。
- ディレクトリを作成し、読み取る。

## ファイル情報

特定のファイルを見て、さまざまな詳細を調べたい場合があります。興味深い情報は次のとおりです：

- **名前**。ファイルのリストを見ているときに、パスから始めたかもしれません。ファイル名を取得することは価値があります。
- **サイズ**。ディスクのサイズを知ることは良いことです。
- **パーミッション**。ファイルに対してどのような権限があるかを知ることで、実行したり、書き込んだりすることができるかどうかがわかります。
- **最終更新日時**。新しく更新されたファイルのみを検索するクエリがあるかもしれません。変更日時を調べることが必要です。
- **ディレクトリであるかどうか**。ファイルとディレクトリは最終的には単なるファイルです。ファイルとディレクトリを区別するフラグがあります。

ファイル情報を取得するには、次のように`Stat()`関数を使用します：

```go
fileStat, err := os.Stat(path)
fmt.Println("ファイル名:", fileStat.Name())        // ファイルのベース名
fmt.Println("サイズ:", fileStat.Size())             // 通常のファイルのバイト数
fmt.Println("パーミッション:", fileStat.Mode())      // ファイルモードビット
fmt.Println("最終更新日時:", fileStat.ModTime()) // 最終更新日時
fmt.Println("ディレクトリであるかどうか: ", fileStat.IsDir())   // Mode().IsDir()の省略形
```

また、`ReadDir()`を呼び出すと、`FileInfo`オブジェクトの配列が返されます：

```go
files, err := ioutil.ReadDir(path)
```

## ファイルのコピー

ファイルのコピーは、実際には3つの操作です：

- 宛先のファイルを**開く**。
- 指定した宛先に新しいファイルを**作成**する。
- **コピー**して、その場所にコンテンツを転送する。

以下は、_コピー_操作の実装方法です：

```go
// 'test.txt'とその内容を'copy.txt'にコピーする
src := "test.txt"
dest := "copy.txt"

srcFile, err := os.Open(src)
if err != nil {
  log.Fatal(err)
}
defer srcFile.Close()

newFile, err := os.Create(dest)
if err != nil {
  log.Fatal(err)
}
defer newFile.Close()

_, err = io.Copy(newFile, srcFile)
if err != nil {
  log.Fatal(err)
}
```

## 名前の変更

名前の変更は少し簡単に行うことができます。`os`パッケージには`Rename()`関数があります。以下はその使用方法です：

```go
err := os.Rename(src, dest)
```

## ファイルの削除

ファイルを削除するには、`Remove()`関数を使用します。以下はその使用方法です：

```go
err := os.Remove(path)
```

## ディレクトリの作成

ディレクトリを作成するには、`os`ライブラリの`MkdirAll()`関数を使用できます。ただし、まずディレクトリが存在するかどうかを確認する必要があります。そのためには、`IsNotExist()`関数を使用します：

```go
_, err := os.Stat(dirName)

 if os.IsNotExist(err) {
  errDir := os.MkdirAll(dirName, 0755)
  if errDir != nil {
   log.Fatal(err)
  }
 } else if err != nil {
  log.Fatal("ディレクトリの作成エラー")
 } else {
  log.Fatal("ディレクトリは既に存在します")
 }
```

上記のコードでは次のことがわかります：

1. 最初に`Stat()`関数を使用します。`Stat()`は`FileInfo`オブジェクトまたは`PathError`型のエラーを返します。パスが存在しない場合は`PathError`が返されます。

1. `os.IsNotExist(err)`。これは、`err`が`PathError`である場合、つまりパスが存在しない場合に`true`を返します。これは望ましい動作であり、ディレクトリを作成したいのです。

1. 最後に、`os.MkdirAll(dirName, 0755)`を呼び出します。755の指示は、作成されたディレクトリのパーミッションに関するもので、パーミッションは、読み取り/書き込み/実行、読み取り/実行、読み取り/実行の順に与えられます。755はWebサーバーで一般的なパーミッションセットです。基本的には、自分以外の誰もファイルを変更できないようにしたいのです。

## ディレクトリの読み取り

ディレクトリの読み取りは非常に簡単です。`io/ioutil`ライブラリの`ReadDir()`関数を使用します。以下はディレクトリを読み取る方法です：

```go
files, err := ioutil.ReadDir(path)
```

`files`は`FileInfo`型の配列です。

TODO: コピー、名前の変更、削除、存在のチェック

## 課題

次のように、次のファイルとディレクトリを作成してください：

```
tmp/
  a.txt
  b.xt
  subdir/
```

プログラムはディレクトリ_tmp_を読み取り、各エントリについて、ディレクトリかファイルか、サイズ、最終更新日時をリストアップする必要があります。

プログラムの出力は次のようになります：

```
ディレクトリtmpを読み取っています：
名前、タイプ、サイズ、更新日時
a.txt、ファイル、1kb、2022-01-01
b.txt、ファイル、1kb、2022-01-01
subdir、ディレクトリ、1kb、2022-01-01
```

## 解決策

```go
package main

import (
 "fmt"
 "io/ioutil"
 "log"
)

func GetType(isDir bool) string {
 if isDir {
  return "ディレクトリ"
 }
 return "ファイル"
}

func main() {
 var path string = "tmp"
 files, err := ioutil.ReadDir(path)
 if err != nil {
  log.Fatal(err)
 }
 fmt.Println("ディレクトリ", path, "を読み取っています")
 fmt.Println("名前、タイプ、サイズ、更新日時")
 for _, file := range files {
  if err != nil {
   log.Fatal(err)
  }
  fmt.Printf("ファイル名: %s, ", file.Name())
  fmt.Printf("タイプ: %s, ", GetType(file.IsDir()))
  fmt.Printf("サイズ: %d, ", file.Size())
  fmt.Printf("最終更新日時: %s, ", file.ModTime())
  fmt.Print("\n")
 }
}

```