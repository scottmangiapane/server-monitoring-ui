#!/bin/sh

set -e

until PGPASSWORD=$POSTGRES_PASSWORD psql -h postgres -U "$POSTGRES_USER" "$POSTGRES_DB" -c '\q'; do
    >&2 echo "Postgres is unavailable - sleeping"
    sleep 1
done

>&2 echo "Postgres is up"

npx knex migrate:latest
