Perform a session wrap-up for this repository. Work through these steps in order:

1. **Undocumented changes**: Run `git diff HEAD` and `git status --short`. For any modified source files not yet reflected in CHANGELOG.md, add concise bullet points under today's date. Skip if CHANGELOG is already current.

2. **README check**: If any feature, command, or behaviour changed this session that affects how someone would use or understand the project, update README.md. Otherwise skip.

3. **Code TODOs**: Run `grep -rn "TODO\|FIXME" src/ --include="*.ts" --include="*.tsx" 2>/dev/null`. List any findings.

4. **Write SESSION-NOTES.md**: Overwrite (never append) the file with:
   - Today's date and a 1-line session summary
   - **Completed** — bullet list of what was done
   - **Open items** — anything discussed or planned but not implemented, plus any code TODOs found above
   - **Decisions** — non-obvious choices made (WHY, not what)

5. **Commit prompt**: If there are uncommitted changes, ask: "Commit and push? (Y to confirm)" and proceed if the user says Y.
