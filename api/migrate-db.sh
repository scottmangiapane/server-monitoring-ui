#!/bin/sh

set -e

until pg_isready -h postgres; do
    sleep 1
done

npx knex migrate:latest
