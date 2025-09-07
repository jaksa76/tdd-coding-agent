#!/bin/bash
set -x

function show_usage {
    cat << EOF
Usage: $0 [OPTIONS] <prompt>

Runs this workflow

OPTIONS:
    --agent-cmd <cmd>     Command to run the agent (default: claude -p)
    --workspace|-w <dir>  Use existing workspace directory
    --main-file <file>    Main source file to process
    --test-file <file>    Test file to process
    -x <instruction>      Add extra instruction (can be used multiple times)
    --help                Show this help message

ARGUMENTS:
    <prompt>             The prompt to send to the agent

EXAMPLES:
    $0 "Create a calculator function"
    $0 --workspace ./my-workspace "Add unit tests"
    $0 -x "Use TypeScript" "Create a todo app"
    $0 --agent-cmd "codex -p" "Implement sorting algorithm"
    $0 --main-file "src/calculator.js" --test-file "test/calculator.test.js" "Create a calculator function"

ENVIRONMENT VARIABLES:
    AGENT_CMD            Default agent command (overridden by --agent-cmd)
EOF
}

function check_tool {
    local tool="$1"
    if ! command -v "$tool" &> /dev/null; then
        echo "Error: Required tool '$tool' is not installed or not in PATH"
        return 1
    fi
    return 0
}

function check_required_tools {
    local tools=("$@")
    local missing_tools=()
    
    for tool in "${tools[@]}"; do
        if ! check_tool "$tool"; then
            missing_tools+=("$tool")
        fi
    done
    
    if [ ${#missing_tools[@]} -gt 0 ]; then
        echo "Missing required tools: ${missing_tools[*]}"
        echo "Please install the missing tools and try again."
        exit 1
    fi
}

# Parse command line arguments
AGENT_CMD_ARG=""
PROMPT_ARG=""
WORKSPACE_ARG=""
MAIN_FILE=""
TEST_FILE=""
EXTRA_INSTRUCTIONS=()

# Check for help or no arguments
if [[ $# -eq 0 ]]; then
    show_usage
    exit 0
fi

while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            show_usage
            exit 0
            ;;
        --agent-cmd)
            AGENT_CMD_ARG="$2"
            shift 2
            ;;
        --workspace|-w)
            WORKSPACE_ARG="$2"
            shift 2
            ;;
        --test-file)
            TEST_FILE="$2"
            shift 2
            ;;
        --main-file)
            MAIN_FILE="$2"
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

# Check if prompt was provided
if [ -z "$PROMPT_ARG" ]; then
    echo "Error: No prompt provided"
    echo
    show_usage
    exit 1
fi

# Check for required tools early
required_tools=()

# Extract the base command from AGENT_CMD to check if it's available
if [ -n "$AGENT_CMD_ARG" ]; then
    base_cmd=$(echo "$AGENT_CMD_ARG" | awk '{print $1}')
elif [ -n "$AGENT_CMD" ]; then
    base_cmd=$(echo "$AGENT_CMD" | awk '{print $1}')
else
    base_cmd="claude"
fi

required_tools+=("$base_cmd")

# Add other commonly used tools
required_tools+=("git" "curl")

check_required_tools "${required_tools[@]}"

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

# Handle workspace: use specified or create new one
if [ -n "$WORKSPACE_ARG" ]; then
    workspace_dir="$WORKSPACE_ARG"
    if [ ! -d "$workspace_dir" ]; then
        echo "Error: Specified workspace directory '$workspace_dir' does not exist"
        exit 1
    fi
    cd "$workspace_dir"
    echo "Using existing workspace: $workspace_dir"
fi

echo user input: $prompt

$AGENT_CMD "$prompt $EXTRA_INSTRUCTIONS"