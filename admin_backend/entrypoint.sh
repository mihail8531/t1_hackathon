#!/bin/bash

migrate -database postgresql://${ADMIN_BACKEND_DB_USER}:${ADMIN_BACKEND_DB_PASSWORD}@${ADMIN_BACKEND_DB_HOST}:${ADMIN_BACKEND_DB_PORT}/${ADMIN_BACKEND_DB_NAME}?sslmode=disable -path migrations up

uvicorn --factory main:create_app --host ${ADMIN_BACKEND_HOST} --port ${ADMIN_BACKEND_PORT}
