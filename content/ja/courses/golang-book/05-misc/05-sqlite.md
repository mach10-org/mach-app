---
title: Sqliteを使用したデータベース
description: データベースの操作
lastmod: 2023-05-26T03:14:04.136Z
---

# データベースの操作

Sqliteデータベースとやり取りし、値の読み書きを行います。

## はじめに

この章では以下の操作を行います:

- データベースとその構造の作成
- データベースへの書き込み
- データベースからの読み取り

## Sqliteドライバの選択

Sqliteデータベースに接続するためには、いくつかのライブラリから選択する必要があります。これらのライブラリは、データベースに接続するために必要なSqliteドライバを提供します。以下に一般的なものをいくつか示します:

- SQLite (cgoを使用): <https://github.com/mattn/go-sqlite3> [*]
- SQLite (cgoを使用): <https://github.com/gwenn/gosqlite> - SQLiteの動的データ型をサポート
- SQLite (cgoを使用): <https://github.com/mxk/go-sqlite>
- SQLite (cgoを使用): <https://github.com/rsc/sqlite>
- SQLite (純粋なGo): <https://modernc.org/sqlite>

他のデータベースのライブラリについては、以下のリンクを参照してください:

- <https://github.com/golang/go/wiki/SQLDrivers>
  .

## コンソールから`sqlite3`を使用する

データベースを操作するためには、コマンドラインからsqliteを使用すると便利です。公式の[ダウンロードページ](https://www.sqlite.org/download.html)からsqliteをダウンロードし、適切なオペレーティングシステム用の実行可能ファイルを選択してください。sqliteをインストールすると、実行可能ファイルが提供されます。

実行可能ファイルを使用すると、以下の操作が可能です:

- データベースの作成
- SQLコマンドの実行
- 実行可能ファイルでサポートされている他のコマンドの実行

### データベースの作成

データベースを作成するには、次のようにデータベースの名前を指定します:

```console
sqlite3 activities.db
```

上記のコマンドにより、"activities.db"という名前のファイルにデータベースが作成されます。

> また、SQLコマンドやsqlite3でサポートされているコマンドを実行できるシェルも起動されます。

### SQLコマンドの実行

シェルでSQLコマンドを実行するには、SQLを入力し、セミコロン `;` で終了します。

```sql
CREATE TABLE `person` (
        `uid` INTEGER PRIMARY KEY AUTOINCREMENT,
        `name` VARCHAR(64) NULL,
        `lastname` VARCHAR(64) NULL,
        `created` DATE NULL
    );
```

### シェルの終了

作業が終了したら、`.exit` と入力してシェルを終了します:

```console
.exit
```

## Goを介したデータベースへのアクセス

Goを使用してデータベースにアクセスするためには、以下の手順が必要です:

1. **プロジェクトの作成**: データベースに接続するためにGoパッケージをインポートできるようにするために、プロジェクトを作成する必要があります。`go mod init` を実行してプロジェクトを作成します。以下に例を示します:

   ```console
   go mod init "example-project"
   ```

1. **インポートの追加**: 必要なパッケージがある場合は、インポートセクションでそれらを参照する必要があります:

   ```go
   import (
     "database/sql"
     _ "github.com/mattn/go-sqlite3"
    )
   ```

   上記では、使用する2つのパッケージが指定されています。"database/sql" はクエリやステートメントを実行するためのインターフェースを提供します。"github.com/mattn/go-sqlite3" はデータベースに接続するためのドライバを含んでいます。

1. **接続の確立**: データベースに接続するためには、`sql` インスタンスの `Open()` 関数を呼び出します:

   ```go
   db, err := sql.Open("sqlite3", "./mydb.db")
   ```

   上記のコマンドでは、まずデータベースの種類を指定し、2番目のパラメータにデータベースの名前と場所を指定します。`*sql.DB` 型のデータベースインスタンスが返されます。

1. **クエリの実行**: この時点で、クエリを実行することができます。`Query()` 関数を使用し、SQLステートメントを指定します。以下に例を示します:

   ```go
   rows, err := db.Query("SELECT * FROM person")
   ```

   結果を反復処理するためには、以下のようにforループを使用します:

   ```go
   for rows.Next() {
      var uid int
      var name string
      var lastname string
      var created time.Time
      err = rows.Scan(&uid, &name, &lastname, &created)
   }
   ```

1. **プリペアドステートメントの実行**: プリペアドステートメントは、後でパラメータ値を指定できるSQLステートメントです。`Prepare()` 関数を使用し、データが挿入される場所に `?` をプレースホルダとして指定します:

   ```go
   stmt, err := db.Prepare("UPDATE person set lastname=? where uid=?")
   ```

   データベースに対してステートメントを実行するには、`Exec()` を呼び出すことができます:

   ```go
   res, err := stmt.Exec("smith", 1)
   ```

   `res` インスタンスには、`RowsAffected()` 関数があり、変更された行数を返します:

   ```go
   affected, _ := res.RowsAffected()
   ```

   変更された行数は、実際に何かが変更されたことを示す良い指標です。

1. データベース接続を閉じる。使用が終わったら、データベースを閉じる必要があります:

   ```go
   db.Close()
   ```

## 課題

この課題では、データベースに書き込みと読み取りができるGoプログラムを作成します。コンソールでデータベースの作成からGoコードの記述までを行います。

### データベースの作成とデータの追加

データベースを作成するために、コンソールでsqliteの実行可能ファイルを使用します。

1. `sqlite` を実行してデータベースを作成し、sqliteのシェルを初期化します:

   ```console
   sqlite3 mydb.db
   sqlite3SQLite version 3.32.3 2020-06-18 14:16:19
   Enter ".help" for usage hints.
   ```

   この時点でデータベースが作成されます。次に、いくつかのテーブルが必要です。

1. sqliteのシェルで次のSQLコマンドを実行します:

   ```sql
   CREATE TABLE `person` (
            `uid` INTEGER PRIMARY KEY AUTOINCREMENT,
            `name` VARCHAR(64) NULL,
            `lastname` VARCHAR(64) NULL,
            `created` DATE NULL
        );
   ```

   これにより、"person"というテーブルが作成されます。次に、このテーブルにデータを追加します。

1. 以下のSQLコマンドを実行して、"person"テーブルにデータを挿入します:

   ```sql
    insert into person(name,lastname, created) values ("joe", "schmoo", '2021-01-01');
   ```

   これでテーブルにデータが追加されました。次はGoコードに焦点を当てましょう。

1. `.exit` を実行してデータベースから抜けます。

### プロジェクトの作成

次に、データベースにアクセスできるGoプロジェクトとコードを作成します。

1. _db.go_ ファイルを作成し、以下の内容を追加します:

   ```go
   package main

   import (
    "database/sql"
    "fmt"
    "log"
    _ "github.com/mattn/go-sqlite3"
   )

   func main() {
    db, err := sql.Open("sqlite3", "./mydb.db")
    if err != nil {
     log.Fatal(err)
    }
    fmt.Println("database open")

    fmt.Println("bye")

    fmt.Println("closing db")
    db.Close()

   }
   ```

   次に、Goプロジェクトを初期化します。

1. 以下のコマンドを実行してプロジェクトを作成します:

   ```console
   go mod init sql-demo
   ```

1. `go mod tidy` を実行して、プログラムのインポートセクションで指定した必要なパッケージをインストールします（これにより、"github.com/mattn/go-sqlite3" がプロジェクトにダウンロードされ追加されます）:

   ```console
   go mod tidy
   ```

### データの読み取り

次に、データを読み取るための関数を追加します。

1. 以下のような `Read()` 関数を追加します:

   ```go
   func Read(db *sql.DB) {
     rows, err := db.Query("SELECT * FROM person")

    }
   ```

   この時点で、`rows` に結果が読み込まれます。次に、結果を反復処理する必要があります。

1. `Read()` に以下のコードを追加して、結果を反復処理します:

   ```go
   for rows.Next() {
      var uid int
      var name string
      var lastname string
      var created time.Time
      err = rows.Scan(&uid, &name, &lastname, &created)
      if err != nil {
       log.Fatal(err)
      }
      fmt.Println(uid)
      fmt.Println(name)
      fmt.Println(lastname)
      fmt.Println(created)
   }
   ```

   `Scan()` の使用と、変数を参照として送信することで、結果がそれらに書き込まれることに注意してください。

### データの作成

次に、データベースにデータを作成するためのコードを追加します。

1. 以下のような `Create()` 関数を追加します:

   ```go
   func Create(db *sql.DB) {
     stmt, err := db.Prepare("INSERT INTO person(name, lastname, created) values(?,?,?)")

   }
   ```

   この時点で、実行時に値を指定できるステートメントが作成されます。`?` は、実行時に値を指定するためのプレースホルダです。

1. `Create()` に以下のコードを追加します:

   ```go
   if err != nil {
      log.Fatal(err)
     }
     res, err := stmt.Exec("Mrs", "Smith", "2022-01-01")
     if err != nil {
      log.Fatal(err)
     }
     affected, _ := res.RowsAffected()
     log.Printf("Affected rows %d", affected)
   ```

   `Exec()` の呼び出しに注目してください。ここではデータを提供し、`?` は送信する値で置き換えられます。また、最後の2行に注目してください:

   ```go
   affected, _ := res.RowsAffected()
   log.Printf("Affected rows %d", affected)
   ```

   ここでは、結果の `res` に対して `RowsAffected()` を呼び出し、変更された行数を返します。その後、その値を表示します。

### データの更新と削除

データの更新と削除は、データの作成と非常に似たアプローチを取ります。準備されたステートメントを使用し、実際の値を送信します。以下に、これらの操作を実行するためのコードを示します:

**更新**

```go
func Update(db *sql.DB) {
 stmt, err := db.Prepare("UPDATE person set lastname=? where uid=?")
 if err != nil {
  log.Fatal(err)
 }
 res, err := stmt.Exec("smith", 1)
 if err != nil {
  log.Fatal(err)
 }
 affected, _ := res.RowsAffected()
 log.Printf("Affected rows %d", affected)
}
```

**削除**

```go
func Delete(db *sql.DB) {
 stmt, err := db.Prepare("delete from person where uid=?")
 if err != nil {
  log.Fatal(err)
 }
 res, err := stmt.Exec(1)
 if err != nil {
  log.Fatal(err)
 }
 affected, _ := res.RowsAffected()
 log.Printf("Affected rows %d", affected)
}
```

## 解答例

```go
package main

import (
 "database/sql"
 "fmt"
 "log"
 "time"

 _ "github.com/mattn/go-sqlite3"
)

func Read(db *sql.DB) {
 rows, err := db.Query("SELECT * FROM person")
 if err != nil {
  log.Fatal(err)
 }
 for rows.Next() {
  var uid int
  var name string
  var lastname string
  var created time.Time
  err = rows.Scan(&uid, &name, &lastname, &created)
  if err != nil {
   log.Fatal(err)
  }
  fmt.Println(uid)
  fmt.Println(name)
  fmt.Println(lastname)
  fmt.Println(created)
 }
}

func Update(db *sql.DB) {
 stmt, err := db.Prepare("UPDATE person set lastname=? where uid=?")
 if err != nil {
  log.Fatal(err)
 }
 res, err := stmt.Exec("smith", 1)
 if err != nil {
  log.Fatal(err)
 }
 affected, _ := res.RowsAffected()
 log.Printf("Affected rows %d", affected)
}

func Create(db *sql.DB) {
 stmt, err := db.Prepare("INSERT INTO person(name, lastname, created) values(?,?,?)")
 if err != nil {
  log.Fatal(err)
 }
 res, err := stmt.Exec("Mrs", "Smith", "2022-01-01")
 if err != nil {
  log.Fatal(err)
 }
 affected, _ := res.RowsAffected()
 log.Printf("Affected rows %d", affected)
}

func Delete(db *sql.DB) {
 stmt, err := db.Prepare("delete from person where uid=?")
 if err != nil {
  log.Fatal(err)
 }
 res, err := stmt.Exec(1)
 if err != nil {
  log.Fatal(err)
 }
 affected, _ := res.RowsAffected()
 log.Printf("Affected rows %d", affected)
}

func main() {
 db, err := sql.Open("sqlite3", "./mydb.db")
 if err != nil {
  log.Fatal(err)
 }
 fmt.Println("database open")
 Create(db)
 Read(db)
 // Update(db)

 fmt.Println("bye")

 fmt.Println("closing db")
 db.Close()

}
```
