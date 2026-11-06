# GitHub integrations

Three GitHub integrations are set up for this machine/project.

## 1. GitHub MCP server

The official remote GitHub MCP server is configured globally in
`%USERPROFILE%\.config\opencode\opencode.jsonc`:

```jsonc
"mcp": {
  "servers": {
    "github": {
      "type": "remote",
      "url": "https://api.githubcopilot.com/mcp/",
      "oauth": false,
      "headers": {
        "Authorization": "Bearer {env:GITHUB_PERSONAL_ACCESS_TOKEN}"
      }
    }
  }
}
```

The token comes from the `GITHUB_PERSONAL_ACCESS_TOKEN` user environment
variable, which was set from the existing `gh auth login` session. To use a
different token (for example a fine-grained PAT), replace the user variable:

```powershell
[Environment]::SetEnvironmentVariable("GITHUB_PERSONAL_ACCESS_TOKEN", "<token>", "User")
```

Restart OpenCode after changing the variable so the server inherits it.
Verify with:

```powershell
opencode mcp list
```

## 2. Git & GitHub panel

`opencode-github-panel` is enabled in the global `plugins` list. It adds the
Git/GitHub side panel to OpenCode Desktop and the `github_panel` agent tools.

- Open it from the side panel's **+** menu (**Git & GitHub**), `Ctrl+Shift+G`,
  `/git`, or the branch chip in the session header.
- It uses the GitHub CLI, so `gh auth status` must stay signed in.

## 3. GitHub bot workflow

`.github/workflows/opencode-bot.yml` runs
[`link-seek/opencode-github-bot`](https://github.com/link-seek/opencode-github-bot)
to review pull requests and fix assigned issues.

The job is skipped until the repository variable `OPENCODE_BOT_ENABLED` is
`true`. Configure it with:

```powershell
gh secret set OPENCODE_API_KEY          # model provider key
gh secret set AGENT_GITHUB_TOKEN        # token the bot uses to comment/push
gh variable set OPENCODE_REVIEW_MODEL --body "opencode/<model>"
gh variable set OPENCODE_BOT_ENABLED --body "true"
```

`AGENT_GITHUB_TOKEN` needs `repo` and `workflow` scopes (a fine-grained PAT with
contents, pull requests, issues, and workflows write access also works).
