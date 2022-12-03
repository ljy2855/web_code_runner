#!/bin/bash

docker rm --force code_runner_api
docker build -t code_runner .
docker run -d --name code_runner_api -p 8000:8000 code_runner