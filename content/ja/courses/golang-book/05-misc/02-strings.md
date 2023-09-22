---
title: 文字列
description: 文字列ライブラリを使用する
lastmod: 2023-05-26T03:13:25.945Z
---

# 文字列の操作

さまざまな方法で文字列を操作する必要がある理由はたくさんあります。以下に、よく遭遇するであろう状況と、その解決策を提供する`strings`ライブラリのいくつかを紹介します。

- **ユーザー入力**や他の種類のストレージには、対応が必要な特殊文字が含まれている場合があります。
- **検査**：文字列には、ビジネスロジックに必要なものが含まれているかどうかを確認する必要があります。
- **解析**：必要な情報を取得するまで、ファイルを分割することがあります。たとえば、数値や日付などです。
- **表示**：時には、UIなどでテキストを特定の方法で表示する必要があります。たとえば、情報を強調表示するためです。

## 特殊文字の処理

ユーザーの入力を読み取り、それを数値として解釈したいとします。プログラムを堅牢にするために、ユーザーがスペースや改行文字を入力することを許容します。次の入力は許容されるべきです：

```
114
   114
114\n
```

このようなケースを処理するために、次の3つの興味深いメソッドがあります：`Trim()`、`TrimLeft()`、`TrimRight()`です。

- `Trim()`は、左右の空白文字を削除します。
- `TrimLeft()`は、左側の空白を削除します。また、特殊文字も指定できます。
- `TrimRight()`は、右側の空白を削除します。また、特殊文字も指定できます。

これらの関数は、第2引数として_cutset_パラメータを持ちます。ここで、取り除きたい文字を指定します。たとえば、スペース、改行、タブ文字を削除するように指定できます：

```go
" \n\t"
```

以下のコードは、上記の3つのメソッドを使用した例です：

```go
fmt.Printf("%s , string length %d \n", s, len(s))
res := strings.Trim(s, " ")
fmt.Printf("%s , string length %d \n", res, len(res))

s2 := "   114  "
fmt.Printf("%s , string length %d \n", s2, len(s2))
res = strings.TrimLeft(s2, " ")
fmt.Printf("%s , string length %d \n", res, len(res))

s3 := "   114  "
fmt.Printf("%s , string length %d \n", s3, len(s3))
res = strings.TrimRight(s3, " ")
fmt.Printf("%s , string length %d \n", res, len(res))
```

上記の文字列は、左側に3つの空白、右側に2つの空白があり、合計の長さは8です。

上記のコードの出力は次のようになります：

```
  114   , string length 8
114 , string length 3
   114   , string length 8
114   , string length 5
   114   , string length 8
   114 , string length 6
```

行ごとに出力を解説します。

`Trim()`を使用したこの出力では、両側のスペースが削除され、左揃えのような結果になります：

```
"114"
```

`TrimLeft()`を使用した次の出力では、右側のスペースが残っていることがわかります：

```
"114   "
```

最後の行では、`TrimRight()`を使用した結果、右揃えで左側のスペースが残っていることがわかります：

```
"   114"
```

## `Contains()`で検査する

特定の部分文字列が含まれているかどうかを確認するために、文字列を検査したい場合を想像してみてください。

そのためには、`Contains()`関数を使用できます。構文は次のようになります：

```go
strings.Contains(stringSource, pattern)
```

たとえば、ポイントオブセールシステムからのリストを処理し、各アイテムが特定の接頭辞を含んでいるかどうかを確認するために使用できます：

```go
rows := []string{"order: 5", "order: 10", "order: 5", "separator"}

for item := range rows {
  if strings.Contains("order") {
    // 注文を処理する
  }
  // 無視する
}
```

## `Split()`で解析する

ポイントオブセールシステムからの行を処理し続けましょう。今度は、特定のアイテムを見て、必要な情報を抽出します。そのために、`Split()`関数を使用します：

```go
rows := []string{"order: 5", "order: 10", "order: 5", "separator"}

for item := range rows {
  if strings.Contains("order") {
     tokens := strings.Split(item, ":") // [ "order", " 5"]
     value := strings.Trim(tokens[1])
     fmt.Println(value)
  }
  // 無視する
}
```

このコードを使用すると、文字列"order: 5"に対して`strings.Split(item, ":")`を実行し、配列`["order", "5"]`が得られます。`strings.Trim(tokens[1])`は、5を参照します。

> ヒント：計算の一部として上記の5を数値として扱う必要がある場合は、まず数値に変換する必要があります。

## 表示

顧客管理システムがあり、表示するデータがたくさんあるとします。特定のデータに重要性を付けるために、関数を使用して視覚的な外観を強調することができます。

次の複数行の顧客文字列を考えてみましょう：

```
Jean Normand
123 Way
Washington
```

都市名に`ToUpper()`を使用すると、次のような結果が得られます：

```
Jean Normand
123 Way
WASHINGTON
```

`ToLower()`を使用すると、すべての文字が小文字でフォーマットされます。

## 課題

名前、住所、都市を含む構造体が与えられた場合、名前を小文字に、住所を大文字にするプログラムを作成してください。

## 解決策

```go
package main

import (
 "fmt"
 "strings"
)

type Person struct {
 Name    string
 Address string
 City    string
}

func main() {
 person := Person{Name: "jean Normand", Address: "123 Way", City: "Washington"}

 fmt.Println(strings.ToUpper(person.Name))
 fmt.Println(person.Address)
 fmt.Println(strings.ToUpper(person.City))
}
```