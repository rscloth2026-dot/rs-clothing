#!/usr/bin/env bash
# Ralph - Long-running autonomous AI agent loop
# Usage: ralph [--tool agy|claude|amp] [max_iterations]
#        ralph init [--tool agy|claude|amp]

set -e

RALPH_HOME="${RALPH_HOME:-$HOME/.ralph}"

# Detect project directory
CWD="$(pwd)"

if [[ "$1" == "init" ]]; then
  shift
  TARGET_TOOL="agy"
  while [[ $# -gt 0 ]]; do
    case $1 in
      --tool) TARGET_TOOL="$2"; shift 2 ;;
      --tool=*) TARGET_TOOL="${1#*=}"; shift ;;
      *) shift ;;
    esac
  done
  mkdir -p "$CWD/scripts/ralph" "$CWD/tasks"
  cp "$RALPH_HOME/prd.json.example" "$CWD/scripts/ralph/prd.json.example"
  if [[ "$TARGET_TOOL" == "claude" ]]; then
    cp "$RALPH_HOME/CLAUDE.md" "$CWD/scripts/ralph/CLAUDE.md"
  elif [[ "$TARGET_TOOL" == "amp" ]]; then
    cp "$RALPH_HOME/prompt.md" "$CWD/scripts/ralph/prompt.md"
  else
    cp "$RALPH_HOME/GEMINI.md" "$CWD/scripts/ralph/GEMINI.md"
    cp "$RALPH_HOME/AGENTS.md" "$CWD/scripts/ralph/AGENTS.md"
  fi
  cp "$RALPH_HOME/ralph.sh" "$CWD/scripts/ralph/ralph.sh"
  chmod +x "$CWD/scripts/ralph/ralph.sh"
  echo "✓ Initialized Ralph in $CWD/scripts/ralph"
  echo "Run 'ralph' or './scripts/ralph/ralph.sh' after generating tasks/prd-[feature].md and converting to prd.json"
  exit 0
fi

# Locate prd.json & progress.txt
if [ -f "$CWD/prd.json" ]; then
  WORK_DIR="$CWD"
elif [ -f "$CWD/scripts/ralph/prd.json" ]; then
  WORK_DIR="$CWD/scripts/ralph"
elif [ -f "$CWD/.ralph/prd.json" ]; then
  WORK_DIR="$CWD/.ralph"
else
  # Default to current directory or scripts/ralph
  if [ -d "$CWD/scripts/ralph" ]; then
    WORK_DIR="$CWD/scripts/ralph"
  else
    WORK_DIR="$CWD"
  fi
fi

PRD_FILE="$WORK_DIR/prd.json"
PROGRESS_FILE="$WORK_DIR/progress.txt"
ARCHIVE_DIR="$WORK_DIR/archive"
LAST_BRANCH_FILE="$WORK_DIR/.last-branch"

# Parse arguments
TOOL=""
MAX_ITERATIONS=10

while [[ $# -gt 0 ]]; do
  case $1 in
    --tool)
      TOOL="$2"
      shift 2
      ;;
    --tool=*)
      TOOL="${1#*=}"
      shift
      ;;
    *)
      if [[ "$1" =~ ^[0-9]+$ ]]; then
        MAX_ITERATIONS="$1"
      fi
      shift
      ;;
  esac
done

# Auto-detect tool if not explicitly specified
if [[ -z "$TOOL" ]]; then
  if command -v agy &>/dev/null; then
    TOOL="agy"
  elif command -v claude &>/dev/null; then
    TOOL="claude"
  elif command -v amp &>/dev/null; then
    TOOL="amp"
  else
    TOOL="agy"
  fi
fi

# Validate tool choice
if [[ "$TOOL" != "agy" && "$TOOL" != "antigravity" && "$TOOL" != "claude" && "$TOOL" != "amp" ]]; then
  echo "Error: Invalid tool '$TOOL'. Must be 'agy', 'claude', or 'amp'."
  exit 1
fi

# Check for jq
if ! command -v jq &>/dev/null; then
  echo "Error: 'jq' is required by Ralph. Please ensure jq is installed in PATH."
  exit 1
fi

# Archive previous run if branch changed
if [ -f "$PRD_FILE" ] && [ -f "$LAST_BRANCH_FILE" ]; then
  CURRENT_BRANCH=$(jq -r '.branchName // empty' "$PRD_FILE" 2>/dev/null || echo "")
  LAST_BRANCH=$(cat "$LAST_BRANCH_FILE" 2>/dev/null || echo "")
  
  if [ -n "$CURRENT_BRANCH" ] && [ -n "$LAST_BRANCH" ] && [ "$CURRENT_BRANCH" != "$LAST_BRANCH" ]; then
    DATE=$(date +%Y-%m-%d)
    FOLDER_NAME=$(echo "$LAST_BRANCH" | sed 's|^ralph/||')
    ARCHIVE_FOLDER="$ARCHIVE_DIR/$DATE-$FOLDER_NAME"
    
    echo "Archiving previous run: $LAST_BRANCH"
    mkdir -p "$ARCHIVE_FOLDER"
    [ -f "$PRD_FILE" ] && cp "$PRD_FILE" "$ARCHIVE_FOLDER/"
    [ -f "$PROGRESS_FILE" ] && cp "$PROGRESS_FILE" "$ARCHIVE_FOLDER/"
    echo "   Archived to: $ARCHIVE_FOLDER"
    
    echo "# Ralph Progress Log" > "$PROGRESS_FILE"
    echo "Started: $(date)" >> "$PROGRESS_FILE"
    echo "---" >> "$PROGRESS_FILE"
  fi
fi

# Track current branch
if [ -f "$PRD_FILE" ]; then
  CURRENT_BRANCH=$(jq -r '.branchName // empty' "$PRD_FILE" 2>/dev/null || echo "")
  if [ -n "$CURRENT_BRANCH" ]; then
    echo "$CURRENT_BRANCH" > "$LAST_BRANCH_FILE"
  fi
fi

# Initialize progress file if it doesn't exist
if [ ! -f "$PROGRESS_FILE" ]; then
  echo "# Ralph Progress Log" > "$PROGRESS_FILE"
  echo "Started: $(date)" >> "$PROGRESS_FILE"
  echo "---" >> "$PROGRESS_FILE"
fi

if [ ! -f "$PRD_FILE" ]; then
  echo "Notice: No prd.json found in $WORK_DIR."
  echo "Generate one using '/prd' and '/ralph' skills, or run 'ralph init' to scaffold an example."
  exit 1
fi

# Select instructions file
if [[ "$TOOL" == "agy" || "$TOOL" == "antigravity" ]]; then
  if [ -f "$WORK_DIR/GEMINI.md" ]; then
    PROMPT_CONTENT=$(cat "$WORK_DIR/GEMINI.md")
  elif [ -f "$WORK_DIR/AGENTS.md" ]; then
    PROMPT_CONTENT=$(cat "$WORK_DIR/AGENTS.md")
  else
    PROMPT_CONTENT=$(cat "$RALPH_HOME/GEMINI.md")
  fi
elif [[ "$TOOL" == "claude" ]]; then
  if [ -f "$WORK_DIR/CLAUDE.md" ]; then
    PROMPT_FILE="$WORK_DIR/CLAUDE.md"
  else
    PROMPT_FILE="$RALPH_HOME/CLAUDE.md"
  fi
elif [[ "$TOOL" == "amp" ]]; then
  if [ -f "$WORK_DIR/prompt.md" ]; then
    PROMPT_FILE="$WORK_DIR/prompt.md"
  else
    PROMPT_FILE="$RALPH_HOME/prompt.md"
  fi
fi

echo "Starting Ralph - Tool: $TOOL - Working dir: $WORK_DIR - Max iterations: $MAX_ITERATIONS"

for i in $(seq 1 $MAX_ITERATIONS); do
  echo ""
  echo "==============================================================="
  echo "  Ralph Iteration $i of $MAX_ITERATIONS ($TOOL)"
  echo "==============================================================="

  if [[ "$TOOL" == "agy" || "$TOOL" == "antigravity" ]]; then
    OUTPUT=$(agy --dangerously-skip-permissions --print -p "$PROMPT_CONTENT" 2>&1 | tee /dev/stderr) || true
  elif [[ "$TOOL" == "amp" ]]; then
    OUTPUT=$(cat "$PROMPT_FILE" | amp --dangerously-allow-all 2>&1 | tee /dev/stderr) || true
  else
    OUTPUT=$(claude --dangerously-skip-permissions --print < "$PROMPT_FILE" 2>&1 | tee /dev/stderr) || true
  fi
  
  # Check for completion signal
  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    echo ""
    echo "🎉 Ralph completed all tasks!"
    echo "Completed at iteration $i of $MAX_ITERATIONS"
    exit 0
  fi
  
  echo "Iteration $i complete. Continuing..."
  sleep 2
done

echo ""
echo "Ralph reached max iterations ($MAX_ITERATIONS) without completing all tasks."
echo "Check $PROGRESS_FILE for status."
exit 1
