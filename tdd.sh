#!/bin/bash
set -x

# 1. **Write a failing test**
# 2. **Run the test** (it should fail)
# 3. **Write the minimum code to pass the test**
# 4. **Refactor the code**

prompt=$1

function is_feature_complete {
    p="Given the following user input: $prompt\n\n and the following tests: $(cat index.test.js) is the feature complete? Answer with FEATURE_COMPLETE for yes and FEATURE_NOT_COMPLETE for no."
    claude_ouput=$(claude -p "$p")
    if [[ $claude_ouput == *"FEATURE_COMPLETE"* ]]; then
        return 0
    fi
    return 1
}

function setup_test_framework {
    echo "Setting up the test framework..."
    npm install --save-dev vitest
}

function write_failing_test {
    echo "Writing a failing test..."    
    
    claude -p "given the following user input: $prompt\n\n and the following tests $(cat index.test.js)\n\n and the following code $(cat index.js)\n\n write a test that fails in the index.test.js file. It should be only a single test case added to the previous tests. Make sure the test doesn't specify a conflicting requirement with the previous tests."
}

function run_test {
    echo "Running the test..."
    test_result=$(npx vitest run --reporter=verbose)
    echo "$test_result"    
}

function fix_failing_test {
    echo "Fixing the failing test..."

    read -r test_result
    
    claude -p "given the following user input: $prompt\n\n and the following tests $(cat index.test.js)\n\nthe following test result: $test_result and the following code $(cat index.js)\n\n write the minimum code to pass the test in the index.js file. Make sure the code is minimal and only addresses the failing test."
}

function refactor_code {
    echo "Refactoring the code..."

    claude -p "given the following user input: $prompt\n\n and the following tests $(cat index.test.js)\n\nand the following code $(cat index.js)\n\n refactor the code in the index.js file if necessary. Keep the code simple, clean and maintainable, ensuring it adheres to best practices like Clean Code. If not necessary, do not change the code."
}

function setup_workspace {
    workspace_dir="./workspaces/$(date +%Y%m%d%H%M%S)-tdd-coding-agent"
    mkdir -p $workspace_dir
    mkdir -p $workspace_dir/.claude
    cp claude-settings-template.json $workspace_dir/.claude/settings.json
    cd $workspace_dir
    touch index.js
    touch index.test.js
    npm init -y
    setup_test_framework
    echo $workspace_dir
}

echo user input: $prompt

setup_workspace

while ! is_feature_complete; do
    write_failing_test
    run_test | fix_failing_test
    refactor_code
    echo --------------------------------------------------------------
    sleep 3  # Add this to prevent a tight loop
done