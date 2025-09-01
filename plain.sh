#!/bin/bash
set -x

prompt=$1

function setup_workspace {
    workspace_dir="./workspaces/$(date +%Y%m%d%H%M%S)-plain-coding-agent"
    mkdir -p $workspace_dir
    mkdir -p $workspace_dir/.claude
    cp claude-settings-template.json $workspace_dir/.claude/settings.json
    cd $workspace_dir
    touch index.js
    touch index.test.js
    npm init -y
    npm install --save-dev vitest
    echo $workspace_dir
}

echo user input: "$prompt"

setup_workspace

claude -p "$prompt"