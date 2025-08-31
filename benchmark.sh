#!/bin/bash

PROMPT_DIR="prompts"
AGENT="${1:-tdd.sh}"
pids=()

for prompt_file in "$PROMPT_DIR"/*.txt; do
  (
    ./$AGENT "$prompt_file"
  ) &
  pids+=($!)
done

for pid in "${pids[@]}"; do
  wait "$pid"
done

echo "Benchmark finished."
