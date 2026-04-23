# Push S2 Designs to a private GitHub repo.
# Run from c:\Agentic-Exp:    powershell -ExecutionPolicy Bypass -File .\scripts\push-to-github.ps1

param(
    [string]$RepoName = "s2-designs",
    [string]$GitName  = "",
    [string]$GitEmail = ""
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

# Make sure node + gh are on PATH for this session (Windows installers don't always refresh it)
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "==> Checking GitHub CLI auth..." -ForegroundColor Cyan
gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in. Launching browser-based GitHub login..." -ForegroundColor Yellow
    gh auth login --hostname github.com --git-protocol https --web --scopes "repo,read:org"
    if ($LASTEXITCODE -ne 0) { throw "gh auth login failed." }
}

# Pull the GitHub username and use it for the noreply email if the user didn't pass one.
$ghUser = (gh api user --jq .login).Trim()
Write-Host "==> Authenticated as: $ghUser" -ForegroundColor Green

if (-not $GitName)  { $GitName  = $ghUser }
if (-not $GitEmail) { $GitEmail = "$ghUser@users.noreply.github.com" }

Write-Host "==> Setting local git identity to: $GitName <$GitEmail>" -ForegroundColor Cyan
git config user.name  "$GitName"
git config user.email "$GitEmail"

# If the existing initial commit was authored under a placeholder, rewrite it.
$lastAuthor = git log -1 --pretty=format:"%an <%ae>"
if ($lastAuthor -ne "$GitName <$GitEmail>") {
    Write-Host "==> Rewriting initial commit author to match identity..." -ForegroundColor Cyan
    git commit --amend --no-edit --reset-author | Out-Null
}

Write-Host "==> Creating private repo: $ghUser/$RepoName" -ForegroundColor Cyan
gh repo create "$RepoName" --private --source=. --remote=origin --push --description "S2 Designs - architecture & interior design studio portfolio"
if ($LASTEXITCODE -ne 0) { throw "gh repo create failed (does the repo already exist?)." }

Write-Host ""
Write-Host "Done. Repo URL:" -ForegroundColor Green
$repoUrl = (gh repo view --json url --jq .url).Trim()
Write-Host "  $repoUrl" -ForegroundColor White
Write-Host ""
Write-Host "Next: enable GitHub Pages so the site goes live." -ForegroundColor Cyan
Write-Host "  1. Open: $repoUrl/settings/pages" -ForegroundColor Gray
Write-Host "  2. Under 'Build and deployment', set Source = GitHub Actions." -ForegroundColor Gray
Write-Host "  3. The 'Deploy to GitHub Pages' workflow will run on the next push (or trigger it manually under Actions)." -ForegroundColor Gray
Write-Host "  4. Once green, your site will be at: https://$ghUser.github.io/$RepoName/" -ForegroundColor Gray
Write-Host ""
Write-Host "Tip: to trigger a deploy now, run:  gh workflow run 'Deploy to GitHub Pages'" -ForegroundColor DarkGray
