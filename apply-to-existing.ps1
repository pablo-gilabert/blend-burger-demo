param(
	[Parameter(Mandatory = $true)]
	[string]$ProjectPath
)

$ErrorActionPreference = "Stop"
$sourceRoot = $PSScriptRoot
$destinationRoot = (Resolve-Path -LiteralPath $ProjectPath).Path

if (-not (Test-Path -LiteralPath (Join-Path $destinationRoot "package.json"))) {
	throw "The destination must be the existing Blend Burger project root."
}

if ($sourceRoot -eq $destinationRoot) {
	throw "Extract this archive outside the existing project before applying it."
}

$backupRoot = Join-Path (Split-Path $destinationRoot -Parent) ("blend-burger-code-backup-" + (Get-Date -Format "yyyyMMdd-HHmmss"))
New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null

$sourceFiles = Get-ChildItem -LiteralPath $sourceRoot -Recurse -File -Force | Where-Object {
	$_.Name -ne "apply-to-existing.ps1" -and
	$_.FullName -notmatch '[\\/]src[\\/]assets[\\/]'
}

foreach ($file in $sourceFiles) {
	$relativePath = $file.FullName.Substring($sourceRoot.Length + 1)
	$destinationFile = Join-Path $destinationRoot $relativePath

	if (Test-Path -LiteralPath $destinationFile) {
		$backupFile = Join-Path $backupRoot $relativePath
		New-Item -ItemType Directory -Path (Split-Path $backupFile -Parent) -Force | Out-Null
		Copy-Item -LiteralPath $destinationFile -Destination $backupFile -Force
	}

	New-Item -ItemType Directory -Path (Split-Path $destinationFile -Parent) -Force | Out-Null
	Copy-Item -LiteralPath $file.FullName -Destination $destinationFile -Force
}

foreach ($obsoleteFolder in @("src/pages/About", "src/pages/Contact")) {
	$obsoletePath = Join-Path $destinationRoot $obsoleteFolder

	if (Test-Path -LiteralPath $obsoletePath) {
		$backupFolder = Join-Path $backupRoot $obsoleteFolder
		New-Item -ItemType Directory -Path (Split-Path $backupFolder -Parent) -Force | Out-Null
		Copy-Item -LiteralPath $obsoletePath -Destination $backupFolder -Recurse -Force
		Remove-Item -LiteralPath $obsoletePath -Recurse -Force
	}
}

Write-Host "Optimization applied. Backed-up original code: $backupRoot"
Write-Host "Original src/assets, package-lock.json and .git were preserved."
Write-Host "Run npm install, npm run build and npm run lint in: $destinationRoot"
