#!/bin/bash
set -x

# 1. **Write a failing test**
# 2. **Run the test** (it should fail)
# 3. **Write the minimum code to pass the test**
# 4. **Refactor the code**

prompt=$1

function is_feature_complete {
    return 1
}

function write_failing_test {
    echo "Writing a failing test..."    
    
    # codex -q "given the following user input: $prompt\n\n and the following tests $(cat test.js)\n\n and the following code $(cat index.js)\n\n write a test that fails in the test.js file"
    claude -p "given the following user input: $prompt\n\n and the following tests $(cat test.js)\n\n and the following code $(cat index.js)\n\n write a test that fails in the test.js file"
}

echo user input: $prompt

# create a new folder for the project
workspace_dir="./workspaces/$(date +%Y%m%d%H%M%S)-tdd-coding-agent"
mkdir -p $workspace_dir
mkdir -p $workspace_dir/.claude
cp claude-settings-template.json $workspace_dir/.claude/settings.json
cd $workspace_dir
touch index.js
touch test.js
npm init -y
npm install --save-dev vitest


#while ! is_feature_complete; do
    write_failing_test
    sleep 3  # Add this to prevent a tight loop
#done