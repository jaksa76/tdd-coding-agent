#!/bin/bash
set -x

# 1. **Write a failing test**
# 2. **Run the test** (it should fail)
# 3. **Write the minimum code to pass the test**
# 4. **Refactor the code**

prompt=$1

function is_feature_complete {
    p="You are a TDD coding agent evaluating whether a feature is complete. This is the feature being developed:\n$prompt\n\n Do the tests in index.test.js fully specify the behaviour or is there more tests missing? Answer with FEATURE_COMPLETE for yes and FEATURE_NOT_COMPLETE for no."
    claude_ouput=$(claude -p "$p")
    if [[ $claude_ouput == *"FEATURE_COMPLETE"* ]]; then
        return 0
    fi
    return 1
}

function write_failing_test {
    echo "Writing a failing test..."

    claude -p "You are a TDD coding agent writing a failing test. This is the feature being developed:\n$prompt\n\n Analyse the tests in index.test.js and the implementation in index.js. Add a single test to index.test.js that fails in the index.test.js file. It should be only a single test case added to the previous tests. Make sure the test doesn't specify a conflicting requirement with the previous tests. Use import instead of require. Use vitest for testing."
}

function run_test {
    echo "Running the test..."
    test_result=$(npx vitest run --reporter=verbose)
    echo "$test_result"    
}

function fix_failing_test {
    echo "Fixing the failing test..."

    read -r test_result

    claude -p "You are a TDD coding agent fixing a failing test. This is the feature being developed:\n$prompt\n\n Read the tests from index.test.js. These are the test results: $test_result\n\nWrite the minimal code in index.js that would make the tests pass. Make sure the code is minimal and only addresses the failing test."
}

function refactor_code {
    echo "Refactoring the code..."

    claude -p "You are a TDD coding agent refactoring code. This is the feature being developed:\n$prompt\n\nAnalyze the tests in index.test.js and the following code in index.js. Then refactor the code in the index.js file if necessary. Keep the code simple, clean and maintainable, ensuring it adheres to best practices like Clean Code. If not necessary, do not change the code."
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
    npm install --save-dev vitest
    npm pkg set scripts.test="vitest"
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