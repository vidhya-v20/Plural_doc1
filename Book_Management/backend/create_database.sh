#!/bin/bash

# Define MySQL credentials
MYSQL_USER="root"
MYSQL_PASSWORD="root"  # Replace with your MySQL root password
MYSQL_HOST="localhost"

# Define the path to the SQL script
SQL_SCRIPT_PATH="create_database.sql"

# Execute the SQL script
mysql -h $MYSQL_HOST -u $MYSQL_USER -p$MYSQL_PASSWORD < $SQL_SCRIPT_PATH

# Check if the script executed successfully
if [ $? -eq 0 ]; then
  echo "Database created successfully"
else
  echo "Failed to create the database"
fi