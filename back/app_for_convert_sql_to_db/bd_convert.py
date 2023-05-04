import sqlite3
import sys

def main(sqlite_db_path, sql_file_path):
    connection = sqlite3.connect(sqlite_db_path)
    cursor = connection.cursor()

    with open(sql_file_path, 'r', encoding='utf-8') as sql_file:
        sql_script = sql_file.read()

    try:
        cursor.executescript(sql_script)
        connection.commit()
        print(f"Successfully imported SQL file '{sql_file_path}' into SQLite database '{sqlite_db_path}'")
    except Exception as e:
        print(f"Error occurred while importing SQL file: {e}")
        connection.rollback()
    finally:
        connection.close()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python import_sql_to_sqlite.py <sqlite_db_path> <sql_file_path>")
        sys.exit(1)

    sqlite_db_path = sys.argv[1]
    sql_file_path = sys.argv[2]

    main(sqlite_db_path, sql_file_path)
