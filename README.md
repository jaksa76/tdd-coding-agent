# TDD Coding Agent

## TDD Cycle

1. **Write a failing test**
2. **Run the test** (it should fail)
3. **Write the minimum code to pass the test**
4. **Refactor the code**

## Architectural Options

### Code everything by hand and invoke LLM directly
Need to solve the editing problem, i.e. how the LLM modifies the code.
Full control over the code.

### Use a coding agent for invidiual steps (e.g. Claude Code, OpenAI Codex)
Lack of control.
Easiest to implement.

### Modify an existing coding agent
OpenAI Codex is open source, I could modify it to support TDD.
Both control and a lot of problems are already solved.
By far the most complex option.

