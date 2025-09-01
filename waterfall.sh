#!/bin/bash
set -x

prompt=$1
echo user input: $prompt

function setup_workspace {
    workspace_dir="./workspaces/$(date +%Y%m%d%H%M%S)-waterfall-coding-agent"
    mkdir -p $workspace_dir
    mkdir -p $workspace_dir/.claude
    cp claude-settings-template.json $workspace_dir/.claude/settings.json
    cd $workspace_dir
    touch index.js
    touch index.test.js
    npm init -y
    npm install --save-dev vitest
    npm pkg set scripts.test="vitest"
    echo $workspace_dir
}

function refine_requirements {
    claude -p "You are a coding agent refining requirements. This is the feature being developed:\n$prompt\n\nAnalyze the requirements and provide a refined version. Save the requirements as requirements.txt"
}

function design_solution {
    claude -p "You are a coding agent designing a solution. This is the feature being developed:\n$prompt\n\nBased on the refined requirements in requirements.txt, design a solution and save it as design.txt."
}

function implement_solution {
    claude -p "You are a coding agent implementing a solution. This is the feature being developed:\n$prompt\n\nBased on the requirements in requirements.txt and the design in design.txt, implement the solution, write the tests and make sure they pass. Use import instead of require. Use vitest for testing."
}

setup_workspace
refine_requirements
design_solution
implement_solution