#!/bin/bash

PROMPT_DIR="prompts"
AGENT="${1:-tdd.sh}"
pids=()

for prompt_file in "$PROMPT_DIR"/*.txt; do
  sleep 5 # keep runs a few seconds apart to avoid generating the same workspace name
  (
    ./$AGENT "$(cat $prompt_file)"
  )
  pids+=($!)
done

for pid in "${pids[@]}"; do
  wait "$pid"
done

echo "Benchmark finished."
