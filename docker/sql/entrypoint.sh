#!/bin/bash

# Variables
SQLCMD="/opt/mssql-tools/bin/sqlcmd"
DATABASE_SETUP_SCRIPT="./sql/create-database.sql"

# Function to check if SQL Server is up and running
check_sql_server() {
    $SQLCMD -S localhost -U sa -P "$SA_PASSWORD" -Q "SELECT 1;" > /dev/null 2>&1
    return $?
}

# Wait for SQL Server to come up
echo "Checking SQL Server status..."
until check_sql_server; do
    sleep 5s
done

# Run the setup script to create the DB and the schema in the DB
# Note: Make sure that your password matches what is in the Dockerfile
echo "Running setup script..."
if ! $SQLCMD -S localhost -U sa -P "$SA_PASSWORD" -d master -i "$DATABASE_SETUP_SCRIPT"; then
    echo "Error: Failed to run the setup script."
    exit 1
fi

echo "Database setup completed successfully."