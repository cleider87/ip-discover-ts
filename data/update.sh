#!/bin/bash

download_and_extract() {
    local file_url=$1
    local file_name=$(basename "$file_url")
    local target_dir=$2

    echo "Downloading $file_name..."
    wget -q "$file_url" -P "$target_dir"

    # Uncompress
    if echo "$file_name" | grep -q "\.gz$"; then
        echo "Unzip $file_name..."
        gunzip -f "$target_dir/$file_name"
    fi
}

# PostgreSQL Config
db_host="localhost"
db_port="5432"
db_name="ip-discovery"
db_user="postgres"
db_password="administrator"

# Temporal Directory
target_dir="/tmp/data-$db_name"

mkdir -p "$target_dir"

rm $target_dir/*

# Read datasource
while IFS=";" read -r table schema url; do
    echo "Cleaning $table..."
    psql postgresql://$db_user:$db_password@$db_host:$db_port/$db_name -c "TRUNCATE $table;"

    download_and_extract "$url" "$target_dir"

    # Get filename without extension
    file_name=${url%.*}
    file_name=${file_name##*/}
    file_name=${file_name%.*}

    # Import csv to table
    echo "Importando $file_name a la tabla $table..."
    psql postgresql://$db_user:$db_password@$db_host:$db_port/$db_name \
        -c "\\copy $table($schema) FROM '$target_dir/$file_name.csv' WITH CSV HEADER DELIMITER ','"

done < "datasource.csv"

echo "Completed!"