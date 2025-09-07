#!/bin/bash
set -x

# Parse command line arguments
AGENT_CMD_ARG=""
PROMPT_ARG=""
WORKSPACE_ARG=""
INPUT_FILE=""
OUTPUT_FILE=""
EXTRA_INSTRUCTIONS=()

while [[ $# -gt 0 ]]; do
    case $1 in
        --agent-cmd)
            AGENT_CMD_ARG="$2"
            shift 2
            ;;
        --workspace|-w)
            WORKSPACE_ARG="$2"
            shift 2
            ;;
        --input)
            INPUT_FILE="$2"
            shift 2
            ;;
        --output)
            OUTPUT_FILE="$2"
            shift 2
            ;;
        -x)
            EXTRA_INSTRUCTIONS+=("$2")
            shift 2
            ;;
        *)
            PROMPT_ARG="$1"
            shift
            ;;
    esac
done

prompt=$PROMPT_ARG

# Concatenate extra instructions if provided
if [ ${#EXTRA_INSTRUCTIONS[@]} -gt 0 ]; then
    extra_instructions_text=$(printf '%s\n' "${EXTRA_INSTRUCTIONS[@]}")
    prompt="$prompt

Extra instructions:
$extra_instructions_text"
fi

# Set agent command: command line arg > env var > default
if [ -n "$AGENT_CMD_ARG" ]; then
    AGENT_CMD="$AGENT_CMD_ARG"
elif [ -z "$AGENT_CMD" ]; then
    AGENT_CMD="claude -p"
fi

function setup_workspace {
    workspace_dir="./workspaces/$(date +%Y%m%d%H%M%S)-tdd-coding-agent"
    mkdir -p $workspace_dir
    mkdir -p $workspace_dir/.claude
    cp claude-settings-template.json $workspace_dir/.claude/settings.json
    cd $workspace_dir
    touch index.js
    touch index.test.js
    npm init -y
    npm install --save-dev vitest
    npm pkg set scripts.test="vitest run"
    echo $workspace_dir
}

# Handle workspace: use specified or create new one
if [ -n "$WORKSPACE_ARG" ]; then
    workspace_dir="$WORKSPACE_ARG"
    if [ ! -d "$workspace_dir" ]; then
        echo "Error: Specified workspace directory '$workspace_dir' does not exist"
        exit 1
    fi
    cd "$workspace_dir"
    echo "Using existing workspace: $workspace_dir"
else
    workspace_dir=$(setup_workspace)
    echo "Created new workspace: $workspace_dir"
fi

echo user input: $prompt

$AGENT_CMD "$prompt $EXTRA_INSTRUCTIONS"