#!/bin/bash

uvicorn --factory app:create_app --host 0.0.0.0 --port 9100 --reload

